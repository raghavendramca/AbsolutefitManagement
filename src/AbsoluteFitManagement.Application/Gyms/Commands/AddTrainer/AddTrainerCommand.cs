using ErrorOr;
using MediatR;

namespace AbsoluteFitManagement.Application.Gyms.Commands.AddTrainer;

public record AddTrainerCommand(Guid SubscriptionId, Guid GymId, Guid TrainerId) 
    : IRequest<ErrorOr<Success>>;