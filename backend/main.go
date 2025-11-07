package main

import (
	"backend/controller"
	"backend/db"
	"backend/repository"
	"backend/usecase"
	"github.com/gin-contrib/cors"
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

	 server.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"http://localhost:5173"},
    AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "DELETE", "OPTIONS"},
    AllowHeaders:     []string{"Origin"},
    ExposeHeaders:    []string{"Content-Length"},
    AllowCredentials: true,
  
  }))


	taskController := controller.NewTaskController(usecase)





	server.GET("/tasks/all", taskController.GetTasks);
	server.POST("/tasks/", taskController.CreateTask);

	server.Run(":8080")
}

