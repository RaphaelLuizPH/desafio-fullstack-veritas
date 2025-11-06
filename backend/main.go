package main 

import("github.com/gin-gonic/gin" )
import "backend/controller"


func main() {

	server := gin.Default()

	taskController := controller.NewTaskController()





	server.GET("/tasks/all", taskController.GetTasks);


	server.Run(":8080")
}

