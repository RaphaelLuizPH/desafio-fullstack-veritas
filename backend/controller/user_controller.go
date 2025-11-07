package controller

import (
	"backend/usecase"

	"github.com/gin-gonic/gin"
)

// userController exposes user related handlers.
type userController struct {
	useCase usecase.UserUseCase
}

func NewUserController(useCase usecase.UserUseCase) userController {
	return userController{
		useCase: useCase,
	}
}

func (uc *userController) GetUsers(ctx *gin.Context) {
	users, err := uc.useCase.GetAllUsers()
	if err != nil {
		ctx.JSON(500, gin.H{
			"error": "Failed to retrieve users",
		})
		return
	}

	ctx.JSON(200, users)
}
