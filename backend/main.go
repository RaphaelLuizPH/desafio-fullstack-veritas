package main

import (
	"backend/controller"
	"backend/db"
	"backend/repository"
	"backend/usecase"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Printf("no .env file loaded: %v", err)
	}

	server := gin.Default()

	dbContext, err := db.ConnectDB()
	if err != nil {
		panic("Failed to connect to database: " + err.Error())
	}

	taskRepo := repository.NewProductRepository(dbContext)
	taskUsecase := usecase.NewTaskUseCase(taskRepo)

	userRepo := repository.NewUserRepository(dbContext)
	userUsecase := usecase.NewUserUseCase(userRepo)

	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:80", "http://localhost:5174"},
		AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	taskController := controller.NewTaskController(taskUsecase)
	userController := controller.NewUserController(userUsecase)

	server.GET("/tasks/all", taskController.GetTasks)
	server.GET("/users/all", userController.GetUsers)
	server.POST("/tasks/", taskController.CreateTask)
	server.PUT("/tasks/", taskController.UpdateTask)
	server.PATCH("/tasks/", taskController.UpdateStatus)
	server.DELETE("task/:id", taskController.DeleteTask)
	server.Run(":8080")
}
