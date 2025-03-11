using Microsoft.AspNetCore.Mvc;
using UserMicroservice.Models;
using UserMicroservice.Models.Dto;


namespace UserMicroservice.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private static List<UserModel> users = new List<UserModel>
        {
            new UserModel { Id = 1, Username = "user1", Email = "user1@example.com" },
            new UserModel { Id = 2, Username = "user2", Email = "user2@example.com" }
        };

        // Get all users
        [HttpGet]
        public ActionResult<List<UserDto>> GetUsers()
        {
            var userDtos = users.Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email
            }).ToList();

            return Ok(userDtos);
        }

        // Get a single user
        [HttpGet("{id}")]
        public ActionResult<UserDto> GetUser(int id)
        {
            var user = users.FirstOrDefault(u => u.Id == id);
            if (user == null) return NotFound();

            var userDto = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email
            };

            return Ok(userDto);
        }

        // Create a new user
        [HttpPost]
        public ActionResult<UserDto> CreateUser([FromBody] UserDto newUserDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var newUser = new UserModel
            {
                Id = users.Count + 1,
                Username = newUserDto.Username,
                Email = newUserDto.Email
            };

            users.Add(newUser);

            return CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, newUserDto);
        }

        // Update an existing user
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] UserDto updatedUserDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = users.FirstOrDefault(u => u.Id == id);
            if (user == null) return NotFound();

            user.Username = updatedUserDto.Username;
            user.Email = updatedUserDto.Email;

            return NoContent();
        }

        // Delete a user
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = users.FirstOrDefault(u => u.Id == id);
            if (user == null) return NotFound();

            users.Remove(user);
            return NoContent();
        }
    }
}
