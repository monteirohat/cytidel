using System.ComponentModel.DataAnnotations;

namespace Cytidel.Api.Data.Entities.Enums
{

    public enum TaskPriorityEnum
    {
        [Display(Name = "Low")]
        Low = 1,
        
        [Display(Name = "Medium")]
        Medium = 2,

        [Display(Name = "High")]
        High = 3
    }
}
