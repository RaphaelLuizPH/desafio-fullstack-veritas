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
			"error": "Falha ao obter tarefas",
		})
		return;
	}



	ctx.JSON(200, tasks);
}

func (tc *taskController) CreateTask(ctx *gin.Context) {
	var taskInput model.Task;

	if err := ctx.ShouldBindJSON(&taskInput); err != nil {
		ctx.JSON(400, gin.H{
			"error": "Requisição inválida",
		})
		return;
	}

	
	if taskInput.Title == "" {
		ctx.JSON(400, gin.H{"error": "Falta o campo obrigatório: título"})
		return;
	}

	createdTask, err := tc.useCase.CreateTask(taskInput);
	if err != nil {
		ctx.JSON(500, gin.H{
			"error": "Falha ao criar tarefa" + err.Error(),
		})
		return;
	}

	ctx.JSON(201, createdTask);
}
	
func (tc *taskController) UpdateTask(ctx *gin.Context) {
	var taskInput model.Task;
	if err := ctx.ShouldBindJSON(&taskInput); err != nil {
		ctx.JSON(400, gin.H{
			"error": "Invalid input",
		})
		return;
	}

	
	if taskInput.ID == 0 {
		ctx.JSON(400, gin.H{"error": "Id em falta ou inválido"})
		return;
	}
	if taskInput.Title == "" {
		ctx.JSON(400, gin.H{"error": "Falta o campo obrigatório: título"})
		return;
	}

	updatedTask, err := tc.useCase.UpdateTask(taskInput);

	if err != nil {
		ctx.JSON(500, gin.H{
			"error": "Falha ao atualizar tarefa" + err.Error(),
		})
		return;
	}

	ctx.JSON(200, updatedTask);
}

func (tc *taskController) UpdateStatus(ctx *gin.Context) {
	var updateRequest model.UpdateColumnRequest;
	if err := ctx.ShouldBindJSON(&updateRequest); err != nil {
		ctx.JSON(400, gin.H{
			"error": "Requisição inválida",
		})
		return;
	}

	if updateRequest.TaskId == 0 {
		ctx.JSON(400, gin.H{"error": "Id em falta ou inválido"})
		return;
	}
	if !isValidStatus(updateRequest.Column) {
		ctx.JSON(400, gin.H{"error": "Valor inválido de status"})
		return;
	}

	err := tc.useCase.UpdateStatus(updateRequest);
	if err != nil {
		ctx.JSON(500, gin.H{
			"error": "Falha ao atualizar o status da tarefa",
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
	if taskId == 0 {
		ctx.JSON(400, gin.H{"error": "Id em falta ou inválido"})
		return;
	}
	err = tc.useCase.DeleteTask(taskId);
	if err != nil {
		ctx.JSON(500, gin.H{
			"error": "Erro do servidor",
		})
		return;
	}
	ctx.JSON(204, nil);
}


func isValidStatus(s model.Status) bool {
	switch s {
	case model.Completed, model.InProgress, model.ToDo:
		return true
	default:
		return false
	}
}