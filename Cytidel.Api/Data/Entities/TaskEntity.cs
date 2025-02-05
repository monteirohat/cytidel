using Cytidel.Api.Data.Entities.Enums;

namespace Cytidel.Api.Data.Entities
{
    public class TaskEntity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public TaskPriorityEnum Priority { get; set; }
        public DateTime DueDate { get; set; }
        public TaskStatusEnum Status { get; set; }

    }
}
