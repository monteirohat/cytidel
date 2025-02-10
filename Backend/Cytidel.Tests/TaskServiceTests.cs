using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;
using Cytidel.Api.Services;
using Cytidel.Api.Repositories.Interface;
using Cytidel.Api.Services.Interface;
using Cytidel.Api.Models.Tasks;
using Cytidel.Api.Data.Entities;
using Cytidel.Api.Mappers;
using Cytidel.Api.Data.Entities.Enums;

public class TaskServiceTests
{
    private readonly Mock<ILogger<TaskService>> _mockLogger;
    private readonly Mock<ITaskRepository> _mockTaskRepository;
    private readonly Mock<ITaskValidation> _mockTaskValidation;
    private readonly TaskService _taskService;

    public TaskServiceTests()
    {
        _mockLogger = new Mock<ILogger<TaskService>>();
        _mockTaskRepository = new Mock<ITaskRepository>();
        _mockTaskValidation = new Mock<ITaskValidation>();

        _taskService = new TaskService(_mockLogger.Object, _mockTaskRepository.Object, _mockTaskValidation.Object);
    }

    [Fact]
    public async Task GetAll_ShouldReturnTasks()
    {
        var tasks = new List<TaskEntity> { new TaskEntity { Id = Guid.NewGuid(), Title = "Test Task" } };
        _mockTaskRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(tasks);

        var result = await _taskService.GetAll();
        Assert.NotNull(result);
        Assert.Single(result);
    }

    [Fact]
    public async Task GetById_ShouldReturnTask_WhenExists()
    {
        var taskId = Guid.NewGuid();
        var task = new TaskEntity { Id = taskId, Title = "Test Task" };
        _mockTaskRepository.Setup(repo => repo.GetByIdAsync(taskId)).ReturnsAsync(task);

        var result = await _taskService.GetById(taskId);
        Assert.NotNull(result);
        Assert.Equal(taskId, result.Id);
    }

    [Fact]
    public async Task Create_ShouldAddTask_AndReturnTaskModel()
    {
        var taskCreateModel = new TaskCreateModel { Title = "New Task", IdPriority = 1, IdStatus = 1, DueDate = DateTime.UtcNow };
        var taskEntity = taskCreateModel.ToEntity();
        _mockTaskRepository.Setup(repo => repo.AddAsync(It.IsAny<TaskEntity>())).Returns(Task.CompletedTask);

        var result = await _taskService.Create(taskCreateModel);
        Assert.NotNull(result);
        Assert.Equal(taskCreateModel.Title, result.Title);
    }

    [Fact]
    public async Task Update_ShouldModifyTask_AndReturnUpdatedModel()
    {
        var taskUpdateModel = new TaskUpdateModel { Id = Guid.NewGuid(), Title = "Updated Task", IdPriority = 2, IdStatus = 2, DueDate = DateTime.UtcNow };
        var taskEntity = new TaskEntity { Id = taskUpdateModel.Id, Title = "Old Task" };

        _mockTaskRepository.Setup(repo => repo.GetByIdAsync(taskUpdateModel.Id)).ReturnsAsync(taskEntity);
        _mockTaskRepository.Setup(repo => repo.UpdateAsync(It.IsAny<TaskEntity>())).Returns(Task.CompletedTask);

        var result = await _taskService.Update(taskUpdateModel);
        Assert.NotNull(result);
        Assert.Equal(taskUpdateModel.Title, result.Title);
    }

    [Fact]
    public async Task ChangeStatus_ShouldUpdateTaskStatus()
    {
        var taskId = Guid.NewGuid();
        var taskEntity = new TaskEntity { Id = taskId, Status = TaskStatusEnum.Pending, Title = "Task Test" };

        _mockTaskRepository.Setup(repo => repo.ChangeStatus(taskId, TaskStatusEnum.Completed)).ReturnsAsync(taskEntity);

        var result = await _taskService.ChangeStatus(taskId, (int)TaskStatusEnum.Completed);
        Assert.NotNull(result);
    }

    [Fact]
    public async Task Delete_ShouldCallRepositoryDelete()
    {
        var taskId = Guid.NewGuid();
        _mockTaskValidation.Setup(validation => validation.Exists(taskId)).Returns(Task.CompletedTask);
        _mockTaskRepository.Setup(repo => repo.DeleteByIdAsync(taskId)).ReturnsAsync(true);

        await _taskService.Delete(taskId);

        _mockTaskRepository.Verify(repo => repo.DeleteByIdAsync(taskId), Times.Once);
    }
}
