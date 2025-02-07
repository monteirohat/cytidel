namespace Cytidel.Api.Models.Tasks
{
    public class TaskModel: ITaskModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public int IdPriority { get; set; }
        public int IdStatus { get; set; }
        public DateTime DueDate { get; set; }

        public string NameStatus { get; set; }
        public string NamePriority { get; set; }
    }
}
