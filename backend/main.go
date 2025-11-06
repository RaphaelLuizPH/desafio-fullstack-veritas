package main 

import("github.com/gin-gonic/gin")

func main() {

	server := gin.Default()


	server.GET("/task", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "Task endpoint",
		})
	})

	server.Run(":8080")
}