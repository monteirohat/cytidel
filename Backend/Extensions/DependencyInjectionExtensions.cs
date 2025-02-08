using Microsoft.EntityFrameworkCore;
using Cytidel.Api.Repositories.Interface;
using Cytidel.Api.Services;
using Cytidel.Api.Repositories;
using Cytidel.Api.Services.Interface;
using Cytidel.Api.Data;
using Cytidel.Api.Services.Validations;
using Cytidel.Api.Services.Interface.User;

namespace Cytidel.Api.Extensions
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddInfraServices(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            // DbContext
            services.AddDbContext<CytidelContext>(options =>
                options.UseSqlite(configuration.GetConnectionString("WebApiDatabase")));


            #region [Repositories]

            services.AddScoped<ITaskRepository, TaskRepository>();
            services.AddScoped<IUserRepository, UserRepository>();

            #endregion

            #region [Services]

            services.AddScoped<ITaskService, TaskService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();

            #endregion

            #region [Validations]

            services.AddScoped<ITaskValidation, TaskValidation>();
            services.AddScoped<IAuthValidation, AuthValidation>();
            services.AddScoped<IUserValidation, UserValidation>();

            #endregion

            return services;
        }

    }
}
