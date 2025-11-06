package controller

import "github.com/gin-gonic/gin"
import "backend/usecase"

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