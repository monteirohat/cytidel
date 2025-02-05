using Microsoft.EntityFrameworkCore;
using Cytidel.Api.Repositories.Interface;
using Cytidel.Api.Services;
using Cytidel.Api.Repositories;
using Cytidel.Api.Services.Interface;
using Cytidel.Api.Data;

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


            #region Repositories

            services.AddScoped<ITaskService, TaskService>();

            #endregion

            #region Services

            services.AddScoped<ITaskRepository, TaskRepository>();

            #endregion

            return services;
        }

    }
}
