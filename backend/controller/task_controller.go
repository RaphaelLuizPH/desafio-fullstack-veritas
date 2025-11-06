package controller

import "github.com/gin-gonic/gin"

type taskController struct {
}

func NewTaskController() taskController {
	return taskController{}
}

func (tc *taskController) GetTasks(ctx *gin.Context) {

}