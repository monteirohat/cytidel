using System.ComponentModel.DataAnnotations;

namespace Cytidel.Api.Data.Entities.Enums
{
    public enum TaskStatusEnum
    {
        [Display(Name = "Pending")]
        Pending = 1,

        [Display(Name = "In progress")]
        InProgress = 2,

        [Display(Name = "Completed")]
        Completed = 3,

        [Display(Name = "Archived")]
        Archived = 4
    }
}
