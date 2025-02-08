using System.ComponentModel.DataAnnotations;
using Cytidel.Api.Data.Entities.Enums;

namespace Cytidel.Api.Data.Entities
{
    public class TaskEntity
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(255)]
        public required string Title { get; set; }
        public string? Description { get; set; }
        public TaskPriorityEnum Priority { get; set; }
        public DateTime DueDate { get; set; }
        public TaskStatusEnum Status { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
