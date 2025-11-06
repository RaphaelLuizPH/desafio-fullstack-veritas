package controller

import (
	"backend/model"
	"backend/usecase"

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
	