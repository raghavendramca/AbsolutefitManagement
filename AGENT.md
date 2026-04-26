# AbsoluteFitManagement — Agent Guide

> Read this file before making any changes to the codebase. It defines architecture rules, coding conventions, and workflow expectations for AI agents working in this repo.

---

## Project Overview

AbsoluteFitManagement is a multi-tenant SaaS fitness management platform. It manages gyms, rooms, subscriptions, and staff across multiple branches/tenants. Built with a Clean Architecture .NET backend and a React frontend.

**Key concepts:**
- Each **Admin** owns one **Subscription** (Free / Starter / Pro)
- A Subscription determines how many **Gyms** an admin can create (1 / 2 / 3)
- Each Gym belongs to a **Tenant** (TenantId == SubscriptionId — shared-DB multi-tenancy)
- **StudioUsers** authenticate via email/password and are associated to an Admin
- **Rooms** and **Trainers** live inside Gyms and are subject to per-tier limits

---

## Repository Layout

```
AbsolutefitManagement/
├── AbsoluteFitManagement.sln
├── AGENT.md                  ← you are here
├── SKILL.md
├── frontend/                 ← React 19 + TypeScript + Vite
│   ├── src/
│   │   ├── App.tsx           ← router (7 routes)
│   │   ├── pages/            ← one file per page
│   │   ├── components/       ← shared UI components
│   │   ├── api/              ← one file per resource (no SDK)
│   │   └── types/index.ts    ← shared TypeScript interfaces
│   ├── vite.config.ts        ← proxy → http://localhost:5215
│   └── package.json
└── src/
    ├── AbsoluteFitManagment.Api/          ← ASP.NET Core 10 entry point
    ├── AbsoluteFitManagement.Application/ ← CQRS (MediatR)
    ├── AbsoluteFitManagement.Domain/      ← Entities, enums, value objects
    ├── AbsoluteFitManagement.Infrastructure/ ← EF Core, repositories, auth
    └── AbsoluteFitManagement.Contracts/   ← Request/Response DTOs
```

---

## Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Backend runtime | .NET | 10.0 |
| Backend framework | ASP.NET Core | 10.0 |
| ORM | Entity Framework Core | 8.0.11 |
| Database (default) | SQLite | 8.0.11 |
| Database (prod-ready) | SQL Server | 8.0.11 |
| CQRS | MediatR | 12.4.1 |
| Error handling | ErrorOr | 2.0.1 |
| Smart enums | Ardalis.SmartEnum | 8.2.0 |
| Guard clauses | Throw | 1.4.0 |
| Frontend framework | React | 19.2.5 |
| Frontend routing | react-router-dom | 7.14.2 |
| Frontend build | Vite | 8.0.10 |
| Frontend language | TypeScript | 6.0 |

---

## Architecture Rules

### Clean Architecture — Layer Boundaries

```
Contracts  ←  Api  →  Application  →  Domain
                           ↓
                    Infrastructure
```

- **Domain** has zero external dependencies. Never add NuGet packages here without strong justification.
- **Application** depends on Domain only. It defines repository interfaces — it does NOT import Infrastructure.
- **Infrastructure** implements Application interfaces. All EF Core code lives here.
- **Api** wires everything together via DI. Controllers call MediatR — they contain no business logic.
- **Contracts** are plain DTOs shared between Api and consumers. No domain types leak into Contracts.

### CQRS Pattern (MediatR)

Every business operation is a `IRequest<ErrorOr<T>>` handler:

```
Command  → CommandHandler  (write operation — returns ErrorOr<Result>)
Query    → QueryHandler    (read operation — returns ErrorOr<T>)
```

- Commands and Queries live under `Application/{Aggregate}/Commands/` and `Application/{Aggregate}/Queries/`
- Handlers call repositories, never DbContext directly
- All handlers return `ErrorOr<T>` — never throw for business-rule failures

### Error Handling

- Use `ErrorOr<T>` throughout Application and Domain layers
- Define domain errors as `static readonly Error` properties on entity or a companion `{Entity}Errors` class
- Controllers use `this.Problem(errors)` from the base `ApiController` to convert errors to HTTP responses
- Never `throw` for expected business failures — only for truly exceptional/unrecoverable situations

### Repository Pattern

- Interfaces in `Application/Common/Interfaces/`
- Implementations in `Infrastructure/Persistence/Repositories/`
- All repository methods are `async` and accept `CancellationToken` where appropriate
- Commit changes via `IUnitOfWork.CommitChangesAsync()` — never call `SaveChangesAsync` directly outside infrastructure

### Multi-Tenancy

- **Model:** Shared database, TenantId discriminator
- `TenantId` on `Gym` equals the owning `Subscription.Id`
- All queries that list gyms **must** filter by `SubscriptionId` — never return cross-tenant data
- When adding new entities that are tenant-scoped, add a `TenantId`/`SubscriptionId` foreign key and filter accordingly

---

## Backend Coding Conventions

### Controllers

```csharp
// Controllers inherit ApiController — never inherit ControllerBase directly
[Route("[controller]")]
public class ExampleController(ISender sender) : ApiController
{
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var result = await sender.Send(new GetExampleQuery(id));
        return result.Match(Ok, Problem);
    }
}
```

- Use primary constructor injection
- One action per controller method; delegate all logic to a MediatR command/query
- Return `IActionResult`, not typed results
- Use `result.Match(Ok, Problem)` to convert `ErrorOr<T>` to HTTP

### Domain Entities

- Entities use `private` setters; mutate state through explicit methods
- `Create` factory methods validate invariants and return `ErrorOr<Entity>`
- List properties (`RoomIds`, `TrainerIds`) stored as `List<Guid>` serialized to JSON by EF Core converters (SQLite limitation)
- Subscription tier limits enforced in domain methods, not application handlers

```csharp
public ErrorOr<Success> AddGym(Guid gymId)
{
    if (_gymIds.Count >= _maxGyms)
        return SubscriptionErrors.MaxGymsReached;
    _gymIds.Add(gymId);
    return Result.Success;
}
```

### Database & EF Core

- DB provider is switched via `appsettings.json → "Database:Provider"` — support both SQLite and SqlServer
- Migrations live in `Infrastructure/Common/Persistence/Migrations/`
- Use `ValueJsonConverter<T>` for any complex type that SQLite cannot store natively
- Always add migrations when changing entity shape: `dotnet ef migrations add <Name> --project src/AbsoluteFitManagement.Infrastructure --startup-project src/AbsoluteFitManagment.Api`
- Never hand-edit migration files

### Password Security

- Use `PasswordHasher` in Infrastructure — PBKDF2-SHA256, 100k iterations, 16-byte salt, 32-byte hash
- Never store plaintext passwords; never log password or hash values
- Use constant-time comparison (already implemented in `PasswordHasher`)

### CORS

- Allowed origins are hardcoded for `localhost:5173` and `localhost:5174` (Vite dev servers)
- Do not add wildcard (`*`) CORS in production builds

---

## Frontend Coding Conventions

### File Naming & Structure

- Pages: `src/pages/{FeatureName}Page.tsx` — one component per file
- Shared components: `src/components/{ComponentName}.tsx`
- API modules: `src/api/{resource}.ts` — one file per backend resource, mirrors backend controller names
- Types: all shared interfaces in `src/types/index.ts`

### API Client Pattern

```typescript
// src/api/client.ts provides get<T>, post<T>, del<T> — use these, never fetch directly
import { get, post } from './client';
import { SubscriptionResponse } from '../types';

export async function getSubscription(id: string): Promise<SubscriptionResponse> {
  return get<SubscriptionResponse>(`/subscriptions/${id}`);
}
```

- Never call `fetch` directly in components or pages — always go through `src/api/`
- The Vite proxy routes `/api/*` → `http://localhost:5215` — all API calls must use relative paths starting with `/`

### React Conventions

- Use functional components with hooks — no class components
- Keep pages thin: fetch data, pass props to components
- No global state management library — pass state via props or `useState`/`useEffect` for now
- Use `react-router-dom` v7 patterns: `useNavigate`, `useParams`, `<Link>`
- TypeScript strict mode is on — all component props must be typed

### Routes (App.tsx)

| Path | Component |
|---|---|
| `/` | LandingPage |
| `/login/:tenantType` | LoginPage |
| `/select-branch` | SelectBranchPage |
| `/subscriptions` | SubscriptionsPage |
| `/subscriptions/:subscriptionId` | SubscriptionDetailPage |
| `/subscriptions/:subscriptionId/gyms/:gymId` | GymDetailPage |

When adding a new route, add the corresponding entry in `App.tsx` and create the page file.

---

## Subscription Tier Limits

| Tier | Max Gyms | Max Rooms/Gym | Max Daily Sessions |
|---|---|---|---|
| Free | 1 | 1 | 4 |
| Starter | 2 | 3 | unlimited |
| Pro | 3 | unlimited | unlimited |

Enforce these limits in **Domain** entity methods, not in Application handlers or controllers.

---

## Authentication Flow

1. User visits `/login/:tenantType` (tenantType: `studio` or `member`)
2. Studio login: POST `/auth/studio-login` with email + password
3. Response returns `tenantId` and `adminId` — stored in component state/navigation state
4. Multi-tenant branch selection: GET `/tenants/{tenantId}/branches` → `/select-branch`
5. No JWT tokens yet — auth state is ephemeral (page refresh loses session)

> When implementing persistent auth, use HTTP-only cookies or localStorage with JWT. Do not add JWT until a proper auth middleware plan is agreed.

---

## Database Seed Data (Development)

| Entity | Value |
|---|---|
| Admin email | admin@absolutefit.com |
| Admin password | Admin@123 |
| Admin ID | 0c97fb2a-479e-44b1-9353-dea3d9f418e1 |
| Subscription ID | a1b2c3d4-e5f6-7890-abcd-ef0123456789 |
| Subscription tier | Starter |

Seed data is applied on startup via `DataSeeder` in Infrastructure.

---

## Running the Project

### Backend

```bash
cd src/AbsoluteFitManagment.Api
dotnet run
# API available at http://localhost:5215
# Swagger UI at http://localhost:5215/swagger (Development only)
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Dev server at http://localhost:5173
# Proxies /api/* to http://localhost:5215
```

### Migrations

```bash
# Add migration
dotnet ef migrations add <MigrationName> \
  --project src/AbsoluteFitManagement.Infrastructure \
  --startup-project src/AbsoluteFitManagment.Api

# Apply migrations
dotnet ef database update \
  --project src/AbsoluteFitManagement.Infrastructure \
  --startup-project src/AbsoluteFitManagment.Api
```

---

## What NOT to Do

- Do not add business logic to controllers — use MediatR handlers
- Do not call `DbContext` directly from Application layer handlers — use repositories
- Do not skip `IUnitOfWork.CommitChangesAsync()` after mutations
- Do not add cross-tenant queries (always filter by SubscriptionId/TenantId)
- Do not use `throw` for domain validation failures — return `ErrorOr` errors
- Do not add wildcard CORS
- Do not store passwords in plaintext or log sensitive values
- Do not call `fetch` directly in React components — use `src/api/` modules
- Do not create new `ErrorOr` error types inside Infrastructure — define them in Domain or Application
- Do not hand-edit EF Core migration files

---

## Adding a New Feature — Checklist

### Backend

- [ ] Add/update domain entity in `Domain/`
- [ ] Add repository interface method in `Application/Common/Interfaces/`
- [ ] Add Command or Query + Handler in `Application/{Aggregate}/`
- [ ] Implement repository method in `Infrastructure/Persistence/Repositories/`
- [ ] Add controller action in `Api/Controllers/` (thin — just sends MediatR command)
- [ ] Add request/response DTOs in `Contracts/`
- [ ] Add EF Core migration if entity shape changed

### Frontend

- [ ] Add type interfaces to `src/types/index.ts`
- [ ] Add API function to appropriate `src/api/{resource}.ts`
- [ ] Create or update page in `src/pages/`
- [ ] Register route in `src/App.tsx` if new page
- [ ] Test manually in browser (run both backend and frontend)
