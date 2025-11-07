package usecase

import (
	"backend/model"
	"backend/repository"
)

// UserUseCase orchestrates user related operations.
type UserUseCase struct {
	repo repository.UserRepository
}

func NewUserUseCase(repo repository.UserRepository) UserUseCase {
	return UserUseCase{
		repo: repo,
	}
}

func (uuc *UserUseCase) GetAllUsers() ([]model.User, error) {
	return uuc.repo.GetAllUsers()
}
