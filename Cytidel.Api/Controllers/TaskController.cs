using Cytidel.Api.Models;
using Cytidel.Api.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Cytidel.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _taskService.GetAll();
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _taskService.GetById(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskModel model)
        {
            var result = await _taskService.Create(model);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] TaskModel model)
        {
            var result = await _taskService.Update(model);
            return Ok(result);
        }

        [HttpPatch]
        public async Task<IActionResult> ChangeStatus(Guid id, TaskStatusEnum status)
        {
            var result = await _taskService.ChangeStatus(id, status);
            return Ok(result);
        }


        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _taskService.Delete(id);
            return Ok(result);
        }



    }
}
