using Cytidel.Api.Data.Entities;
using Cytidel.Api.Models.User;


namespace Cytidel.Api.Mappers
{
    public static class UserMapper
    {
        public static UserModel ToModel(this UserEntity entity)
        {
            if (entity == null) return null;

            return new UserModel
            {
                Id = entity.Id,
                Name = entity.Name,
                Email = entity.Email
            };
        }

        public static UserEntity ToEntity(this UserCreateModel model)
        {
            if (model == null) return null;
            return new UserEntity
            {
                Name = model.Name,
                Email = model.Email,
                Password = model.Password
            };
        }


        public static List<UserModel> ToModel(this IEnumerable<UserEntity> entities)
        {
            return entities.Select(ToModel).ToList();
        }
    }
}
