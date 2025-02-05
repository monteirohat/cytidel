namespace Cytidel.Api.Models
{
    public class TaskModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public int IdPriority { get; set; }
        public string NamePriority { get; set; }
       
        public int IdStatus { get; set; }
        public string NameStatus { get; set; }

        public DateTime DueDate { get; set; }
    }
}
