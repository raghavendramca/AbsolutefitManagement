using ErrorOr;
using MediatR;
using BillSettingsEntity = AbsoluteFitManagement.Domain.Setup.BillSettings;

namespace AbsoluteFitManagement.Application.BillSettings.Commands.UpsertBillSettings;

public record UpsertBillSettingsCommand(Guid GymId, string SettingKey, string SettingsJson) : IRequest<ErrorOr<BillSettingsEntity>>;
