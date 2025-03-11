using Microsoft.AspNetCore.Mvc;
using TaskMicroservice.Models;
using TaskMicroservice.Models.DTOs;

namespace TaskMicroservice.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private static List<TaskModel> tasks = new List<TaskModel>
        {
            new TaskModel { Id = 1, Title = "Task 1", Description = "First Task", Completed = false },
            new TaskModel { Id = 2, Title = "Task 2", Description = "Second Task", Completed = true }
        };

        // Get all tasks
        [HttpGet]
        public ActionResult<List<TaskDto>> GetTasks()
        {
            var taskDtos = tasks.Select(t => new TaskDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                Completed = t.Completed
            }).ToList();

            return Ok(taskDtos);
        }

        // Get a single task by ID
        [HttpGet("{id}")]
        public ActionResult<TaskDto> GetTask(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            var taskDto = new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Completed = task.Completed
            };

            return Ok(taskDto);
        }

        // Create a new task
        [HttpPost]
        public ActionResult<TaskDto> CreateTask([FromBody] TaskDto newTaskDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var newTask = new TaskModel
            {
                Id = tasks.Count + 1,
                Title = newTaskDto.Title,
                Description = newTaskDto.Description,
                Completed = newTaskDto.Completed
            };

            tasks.Add(newTask);

            return CreatedAtAction(nameof(GetTask), new { id = newTask.Id }, newTaskDto);
        }

        // Update an existing task
        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, [FromBody] TaskDto updatedTaskDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            task.Title = updatedTaskDto.Title;
            task.Description = updatedTaskDto.Description;
            task.Completed = updatedTaskDto.Completed;

            return NoContent();
        }

        // Delete a task
        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            tasks.Remove(task);
            return NoContent();
        }
    }
}
