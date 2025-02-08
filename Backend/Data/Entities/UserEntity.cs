
using System.ComponentModel.DataAnnotations;
namespace Cytidel.Api.Data.Entities
{
    public class UserEntity
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Name { get; set; }

        [Required]
        [MaxLength(150)]
        public required string Email { get; set; }
        public required string Password { get; set; }

    }
}
