using Cytidel.Api.Data.Entities;
using Cytidel.Api.Data.Entities.Enums;
using Cytidel.Api.Models;
using Cytidel.Api.Utils;

namespace Cytidel.Api.Mappers
{
    public static class TaskMapper
    {
        public static TaskModel ToModel(this TaskEntity entity)
        {
            return new TaskModel
            {
                Id = entity.Id,
                Title = entity.Title,
                Description = entity.Description,
                IdPriority = entity.Priority.GetEnumValue(),  
                IdStatus = entity.Status.GetEnumValue(),      
                DueDate = entity.DueDate
            };
        }

        public static TaskEntity ToEntity(this TaskCreateModel model)
        {
            return new TaskEntity
            {
                Title = model.Title,
                Description = model.Description,
                Priority = model.IdPriority.ToEnum<TaskPriorityEnum>(),
                Status = model.IdStatus.ToEnum<TaskStatusEnum>(),
                DueDate = model.DueDate
            };
        }

        public static List<TaskModel> ToModel(this IEnumerable<TaskEntity> entities)
        {
            return entities.Select(ToModel).ToList();
        }
    }
}
