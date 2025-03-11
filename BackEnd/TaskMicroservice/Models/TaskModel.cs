using System.ComponentModel.DataAnnotations;

namespace TaskMicroservice.Models
{
    public class TaskModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The Title field is required.")]
        [MaxLength(100, ErrorMessage = "Title cannot be more than 100 characters.")]
        public string Title { get; set; }

        [MaxLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string Description { get; set; }

        public bool Completed { get; set; }
    }
}
