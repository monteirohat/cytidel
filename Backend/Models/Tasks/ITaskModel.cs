﻿namespace Cytidel.Api.Models.Tasks
{
    public interface ITaskModel
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public int IdPriority { get; set; }
        public int IdStatus { get; set; }
        public DateTime DueDate { get; set; }
    }
}
