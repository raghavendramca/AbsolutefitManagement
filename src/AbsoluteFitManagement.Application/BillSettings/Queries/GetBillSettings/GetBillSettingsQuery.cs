using ErrorOr;
using MediatR;
using BillSettingsEntity = AbsoluteFitManagement.Domain.Setup.BillSettings;

namespace AbsoluteFitManagement.Application.BillSettings.Queries.GetBillSettings;

public record GetBillSettingsQuery(Guid GymId, string SettingKey) : IRequest<ErrorOr<BillSettingsEntity>>;
