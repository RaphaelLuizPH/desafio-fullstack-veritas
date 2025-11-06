package main

import (
	"backend/controller"
	"backend/db"
	"backend/repository"
	"backend/usecase"

	"github.com/gin-gonic/gin"
)


func main() {
		server := gin.Default()

	dbContext, err := db.ConnectDB();

	repository := repository.NewProductRepository(dbContext)

	usecase := usecase.NewTaskUseCase(repository)

	if err != nil {
		panic("Failed to connect to database: " + err.Error())
	}




	taskController := controller.NewTaskController(usecase)





	server.GET("/tasks/all", taskController.GetTasks);


	server.Run(":8080")
}

