# AbsoluteFitManagement — Skill Reference

> Common task recipes for this codebase. Each skill is a step-by-step guide for a recurring operation. Follow these patterns exactly to stay consistent with existing code.

---

## Skill 1 — Add a New API Endpoint (Full Stack)

Use this when adding a brand-new resource or operation end-to-end.

### Step 1: Define the Domain Entity (if new)

```csharp
// src/AbsoluteFitManagement.Domain/Entities/MyEntity.cs
public class MyEntity
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = null!;

    private MyEntity() { } // EF Core constructor

    public static ErrorOr<MyEntity> Create(string name)
    {
        // Validate with Throw or manual checks
        if (string.IsNullOrWhiteSpace(name))
            return MyEntityErrors.InvalidName;

        return new MyEntity { Id = Guid.NewGuid(), Name = name };
    }
}

// Companion errors
public static class MyEntityErrors
{
    public static readonly Error InvalidName =
        Error.Validation("MyEntity.InvalidName", "Name cannot be empty.");
    public static readonly Error NotFound =
        Error.NotFound("MyEntity.NotFound", "Entity not found.");
}
```

### Step 2: Define the Repository Interface

```csharp
// src/AbsoluteFitManagement.Application/Common/Interfaces/IMyEntityRepository.cs
public interface IMyEntityRepository
{
    Task<MyEntity?> GetByIdAsync(Guid id);
    Task AddAsync(MyEntity entity);
}
```

### Step 3: Write the MediatR Command/Query

```csharp
// src/AbsoluteFitManagement.Application/MyEntities/Commands/CreateMyEntity/
// CreateMyEntityCommand.cs
public record CreateMyEntityCommand(string Name) : IRequest<ErrorOr<MyEntity>>;

// CreateMyEntityCommandHandler.cs
public class CreateMyEntityCommandHandler(
    IMyEntityRepository repository,
    IUnitOfWork unitOfWork)
    : IRequestHandler<CreateMyEntityCommand, ErrorOr<MyEntity>>
{
    public async Task<ErrorOr<MyEntity>> Handle(
        CreateMyEntityCommand command,
        CancellationToken cancellationToken)
    {
        var entityOrError = MyEntity.Create(command.Name);
        if (entityOrError.IsError) return entityOrError.Errors;

        await repository.AddAsync(entityOrError.Value);
        await unitOfWork.CommitChangesAsync();
        return entityOrError.Value;
    }
}
```

### Step 4: Implement the Repository

```csharp
// src/AbsoluteFitManagement.Infrastructure/Persistence/Repositories/MyEntityRepository.cs
public class MyEntityRepository(AbsoluteFitManagementDbContext dbContext)
    : IMyEntityRepository
{
    public async Task<MyEntity?> GetByIdAsync(Guid id) =>
        await dbContext.MyEntities.FirstOrDefaultAsync(e => e.Id == id);

    public async Task AddAsync(MyEntity entity) =>
        await dbContext.MyEntities.AddAsync(entity);
}
```

Register in `DependencyInjection.cs` of Infrastructure:
```csharp
services.AddScoped<IMyEntityRepository, MyEntityRepository>();
```

### Step 5: Add DbSet and Migration

```csharp
// In AbsoluteFitManagementDbContext.cs
public DbSet<MyEntity> MyEntities { get; set; }
```

```bash
dotnet ef migrations add AddMyEntity \
  --project src/AbsoluteFitManagement.Infrastructure \
  --startup-project src/AbsoluteFitManagment.Api
dotnet ef database update \
  --project src/AbsoluteFitManagement.Infrastructure \
  --startup-project src/AbsoluteFitManagment.Api
```

### Step 6: Add Contracts (DTOs)

```csharp
// src/AbsoluteFitManagement.Contracts/MyEntities/
public record CreateMyEntityRequest(string Name);
public record MyEntityResponse(Guid Id, string Name);
```

### Step 7: Add Controller Action

```csharp
// src/AbsoluteFitManagment.Api/Controllers/MyEntitiesController.cs
[Route("[controller]")]
public class MyEntitiesController(ISender sender) : ApiController
{
    [HttpPost]
    public async Task<IActionResult> Create(CreateMyEntityRequest request)
    {
        var command = new CreateMyEntityCommand(request.Name);
        var result = await sender.Send(command);
        return result.Match(
            entity => Ok(new MyEntityResponse(entity.Id, entity.Name)),
            Problem);
    }
}
```

### Step 8: Add Frontend API Module

```typescript
// frontend/src/api/myEntities.ts
import { get, post } from './client';
import { MyEntityResponse } from '../types';

export async function createMyEntity(name: string): Promise<MyEntityResponse> {
  return post<MyEntityResponse>('/myentities', { name });
}
```

Add type to `frontend/src/types/index.ts`:
```typescript
export interface MyEntityResponse {
  id: string;
  name: string;
}
```

---

## Skill 2 — Add a New Subscription Tier Limit

Use this when changing what a subscription tier allows (max gyms, rooms, sessions).

1. Update `SubscriptionType` SmartEnum values in `Domain/Enums/SubscriptionType.cs`
2. Update the domain entity method that enforces the limit (e.g., `Subscription.AddGym`)
3. Update the `Subscription.Create` factory to set the new limit
4. Verify seed data in `DataSeeder.cs` still creates valid subscriptions
5. Update `AGENT.md` tier limits table

---

## Skill 3 — Add Multi-Tenant Filtering to a New Entity

Use this whenever a new entity must be scoped to a tenant.

1. Add `SubscriptionId` (or `TenantId`) property to the entity:
   ```csharp
   public Guid SubscriptionId { get; private set; }
   ```
2. Include it in the `Create` factory method parameters
3. Filter all list/get repository queries:
   ```csharp
   await dbContext.MyEntities
       .Where(e => e.SubscriptionId == subscriptionId)
       .ToListAsync();
   ```
4. Include `subscriptionId` in API route or request body — never trust client-supplied tenant IDs without verifying against the authenticated user's subscription

---

## Skill 4 — Add a New React Page

1. Create `frontend/src/pages/{FeatureName}Page.tsx`:
   ```tsx
   import { useEffect, useState } from 'react';
   import { useParams } from 'react-router-dom';

   export default function FeatureNamePage() {
     const { id } = useParams<{ id: string }>();
     const [data, setData] = useState<MyType | null>(null);

     useEffect(() => {
       fetchMyData(id!).then(setData);
     }, [id]);

     if (!data) return <p>Loading...</p>;
     return <div>{/* render */}</div>;
   }
   ```

2. Register in `frontend/src/App.tsx`:
   ```tsx
   import FeatureNamePage from './pages/FeatureNamePage';
   // inside <Routes>:
   <Route path="/feature/:id" element={<FeatureNamePage />} />
   ```

3. Add link in `Navbar.tsx` if the page should be globally navigable

---

## Skill 5 — Run and Verify Locally

Full local run sequence (run these in separate terminals):

```bash
# Terminal 1 — Backend
cd src/AbsoluteFitManagment.Api
dotnet run
# Verify: http://localhost:5215/swagger

# Terminal 2 — Frontend
cd frontend
npm run dev
# Verify: http://localhost:5173
```

Smoke test checklist:
- [ ] Can log in with admin@absolutefit.com / Admin@123
- [ ] Branch selection screen appears after login
- [ ] Subscriptions page loads
- [ ] Gym detail page loads
- [ ] No browser console errors
- [ ] No failed network requests in DevTools

---

## Skill 6 — Writing Tests

No test projects exist yet. When adding tests:

- Create `tests/AbsoluteFitManagement.Application.Tests/` for unit tests on handlers
- Create `tests/AbsoluteFitManagement.Api.IntegrationTests/` for API integration tests
- Use `xUnit` and `FluentAssertions` (consistent with .NET ecosystem conventions)
- Integration tests must use a real SQLite in-memory database — do not mock `DbContext`
- Unit tests for handlers should mock repositories and `IUnitOfWork` using `NSubstitute`

Handler unit test pattern:
```csharp
public class CreateMyEntityCommandHandlerTests
{
    private readonly IMyEntityRepository _repository = Substitute.For<IMyEntityRepository>();
    private readonly IUnitOfWork _unitOfWork = Substitute.For<IUnitOfWork>();

    [Fact]
    public async Task Handle_ValidCommand_ReturnsEntity()
    {
        var handler = new CreateMyEntityCommandHandler(_repository, _unitOfWork);
        var command = new CreateMyEntityCommand("Test");

        var result = await handler.Handle(command, CancellationToken.None);

        result.IsError.Should().BeFalse();
        result.Value.Name.Should().Be("Test");
        await _unitOfWork.Received(1).CommitChangesAsync();
    }
}
```

---

## Skill 7 — Changing the Database Provider

Switch between SQLite (development) and SQL Server (production) via config:

```json
// appsettings.json
{
  "Database": {
    "Provider": "SqlServer",
    "ConnectionStrings": {
      "SqlServer": "Server=...;Database=AbsoluteFitManagement;..."
    }
  }
}
```

```json
// appsettings.Development.json
{
  "Database": {
    "Provider": "Sqlite"
  }
}
```

The provider switch is handled in `Infrastructure/DependencyInjection.cs`. When adding new EF Core features, test against both providers — SQLite does not support all SQL Server features (e.g., no native JSON columns, limited migration operations).

---

## Skill 8 — Adding a Password Reset / Auth Feature

Current auth is minimal (no JWT, no refresh tokens). Before extending auth:

1. Keep using `PasswordHasher` in Infrastructure for all password operations
2. If adding JWT: implement it in Infrastructure, expose only `ITokenGenerator` interface to Application
3. Store tokens in HTTP-only cookies — do not store JWT in `localStorage`
4. Never log tokens, passwords, or hashes
5. Add auth middleware in `Api/Program.cs` using built-in `AddAuthentication`/`AddAuthorization`

---

## Skill 9 — EF Core Value Converter Reference

When a domain property cannot be stored natively in SQLite:

```csharp
// List<Guid> → JSON string
builder.Property(e => e.MyIds)
    .HasConversion(new ListOfIdsConverter())
    .HasColumnType("TEXT");

// Complex value object → JSON string
builder.Property(e => e.MyValue)
    .HasConversion(new ValueJsonConverter<MyValueType>())
    .HasColumnType("TEXT");
```

Both converters live in `Infrastructure/Common/Persistence/ValueConverters/`.

---

## Skill 10 — Adding a Navigation/Login Option

`LoginOptions` table drives the multi-tenant login screen options.

1. Add a row via `DataSeeder.cs` (seed data) or a migration:
   ```csharp
   new LoginOption
   {
       Id = Guid.NewGuid(),
       Label = "New Option",
       Route = "/new-route",
       DisplayOrder = 3
   }
   ```
2. The `NavigationController` serves these to the frontend
3. The frontend `LoginPage` renders them as login buttons
4. If adding a new `tenantType`, handle it in `LoginPage.tsx` route param logic

---

## Quick Reference

| Task | Command |
|---|---|
| Run backend | `dotnet run` in `src/AbsoluteFitManagment.Api` |
| Run frontend | `npm run dev` in `frontend/` |
| Add migration | `dotnet ef migrations add <Name> --project src/AbsoluteFitManagement.Infrastructure --startup-project src/AbsoluteFitManagment.Api` |
| Apply migration | `dotnet ef database update --project src/AbsoluteFitManagement.Infrastructure --startup-project src/AbsoluteFitManagment.Api` |
| Build solution | `dotnet build AbsoluteFitManagement.sln` |
| Frontend type check | `cd frontend && npm run build` |
| Frontend lint | `cd frontend && npm run lint` |
| Open Swagger | `http://localhost:5215/swagger` (dev only) |
| Dev login | admin@absolutefit.com / Admin@123 |
