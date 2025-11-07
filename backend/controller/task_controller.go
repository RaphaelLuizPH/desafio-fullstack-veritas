package controller

import (
	"backend/model"
	"backend/usecase"
	"fmt"

	"github.com/gin-gonic/gin"
)

type taskController struct {
	useCase usecase.TaskUseCase 

}

func NewTaskController(usecase usecase.TaskUseCase ) taskController {
	return taskController{
		useCase: usecase,
	}
}

func (tc *taskController) GetTasks(ctx *gin.Context) {
	tasks, err := tc.useCase.GetAllTasks()

	if( err != nil) {
		ctx.JSON(500, gin.H{
			"error": "Failed to retrieve tasks",
		})
		return;
	}



	ctx.JSON(200, tasks);
}

func (tc *taskController) CreateTask(ctx *gin.Context) {
	var taskInput model.Task;
	if err := ctx.BindJSON(&taskInput); err != nil {
		ctx.JSON(400, gin.H{
			"error": "Invalid input",
		})
		return;
	}

	createdTask, err := tc.useCase.CreateTask(taskInput);
	if err != nil {
		ctx.JSON(500, gin.H{
			"error": "Failed to create task" + err.Error(),
		})
		return;
	}

	ctx.JSON(201, createdTask);
}
	
func (tc *taskController) UpdateTask(ctx *gin.Context) {
	var taskInput model.Task;
	if err := ctx.BindJSON(&taskInput); err != nil {
		ctx.JSON(400, gin.H{
			"error": "Invalid input",
		})
		return;
	}

	createdTask, err := tc.useCase.UpdateTask(taskInput);

	if err != nil {
		ctx.JSON(500, gin.H{
			"error": "Failed to create task" + err.Error(),
		})
		return;
	}

	ctx.JSON(200, createdTask);
}

func (tc *taskController) UpdateStatus(ctx *gin.Context) {
	var updateRequest model.UpdateColumnRequest;
	if err := ctx.BindJSON(&updateRequest); err != nil {
		ctx.JSON(400, gin.H{
			"error": "Invalid input",
		})
		return;
	}
	err := tc.useCase.UpdateStatus(updateRequest);
	if err != nil {
		ctx.JSON(500, gin.H{
			"error": "Failed to update task status",
		})
		return;
	}
	ctx.JSON(204, nil);
}

func (tc *taskController) DeleteTask(ctx *gin.Context) {
	taskIdParam := ctx.Param("id")
	var taskId int64;
	_, err := fmt.Sscan(taskIdParam, &taskId);
	if err != nil {
		ctx.JSON(400, gin.H{
			"error": "Invalid task ID",
		})
		return;
	}
	err = tc.useCase.DeleteTask(taskId);
	if err != nil {
		ctx.JSON(500, gin.H{
			"error": "Failed to delete task",
		})
		return;
	}
	ctx.JSON(204, nil);
}