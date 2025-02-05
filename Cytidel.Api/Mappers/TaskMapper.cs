using Cytidel.Api.Data.Entities;
using Cytidel.Api.Data.Entities.Enums;
using Cytidel.Api.Models;
using Cytidel.Api.Utils;

namespace Cytidel.Api.Mappers
{
    public static class TaskMapper
    {
        public static TaskModel ToModel(TaskEntity entity)
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

        public static TaskEntity ToEntity(TaskModel model)
        {
            return new TaskEntity
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                Priority = model.IdPriority.ToEnum<TaskPriorityEnum>(),
                Status = model.IdStatus.ToEnum<TaskStatusEnum>(),
                DueDate = model.DueDate
            };
        }

        public static List<TaskModel> ToModelList(this IEnumerable<TaskEntity> entities)
        {
            return entities.Select(ToModel).ToList();
        }
    }
}
