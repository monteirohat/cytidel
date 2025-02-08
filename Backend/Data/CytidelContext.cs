using Cytidel.Api.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Cytidel.Api.Data
{
    public class CytidelContext : DbContext
    {
        public CytidelContext(DbContextOptions<CytidelContext> options)
            : base(options)
        {
        }

        // DbSets
        public DbSet<TaskEntity> Tasks { get; set; }
        public DbSet<UserEntity> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TaskEntity>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title)
                     .IsRequired()
                     .HasMaxLength(255);
                     
                entity.Property(e => e.Priority).HasConversion<int>();
                entity.Property(e => e.Status).HasConversion<int>();
            });

            modelBuilder.Entity<UserEntity>(entity =>
             {
                 entity.HasKey(e => e.Id);

                 entity.Property(e => e.Name)
                       .IsRequired()
                       .HasMaxLength(100);

                 entity.Property(e => e.Email)
                       .IsRequired()
                       .HasMaxLength(150);

                 entity.HasIndex(e => e.Email)
                       .IsUnique();

                 entity.Property(e => e.Password)
                       .IsRequired();
             });
        }


    }
}
