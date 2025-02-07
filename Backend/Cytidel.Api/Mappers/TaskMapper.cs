using Cytidel.Api.Data.Entities;
using Cytidel.Api.Data.Entities.Enums;
using Cytidel.Api.Models.Tasks;
using Cytidel.Api.Utils;
using Microsoft.VisualBasic;

namespace Cytidel.Api.Mappers
{
    public static class TaskMapper
    {
        public static TaskModel ToModel(this TaskEntity entity)
        {
            if (entity == null) return null;

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
            if (model == null) return null;
            return new TaskEntity
            {
                Title = model.Title,
                Description = model.Description,
                Priority = model.IdPriority.ToEnum<TaskPriorityEnum>(),
                Status = model.IdStatus.ToEnum<TaskStatusEnum>(),
                DueDate = model.DueDate
            };
        }

        public static void ToEntity(this TaskUpdateModel model, TaskEntity entity)
        {
            if (model == null || entity == null)
                throw new ArgumentNullException(nameof(model));

            entity.Title = model.Title;
            entity.Description = model.Description;
            entity.Priority = model.IdPriority.ToEnum<TaskPriorityEnum>();
            entity.Status = model.IdStatus.ToEnum<TaskStatusEnum>();
            entity.DueDate = model.DueDate;

        }
            


        public static List<TaskModel> ToModel(this IEnumerable<TaskEntity> entities)
        {
            return entities.Select(ToModel).ToList();
        }
    }
}
