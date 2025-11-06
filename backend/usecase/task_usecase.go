package usecase

import "backend/model"
import "backend/repository"
type TaskUseCase struct {
	repo repository.TaskRepository
}

func NewTaskUseCase(repository repository.TaskRepository) TaskUseCase {
	return TaskUseCase{
		repo : repository,
	}
}

func (tuc *TaskUseCase) GetAllTasks() ([]model.Task, error) {
return tuc.repo.GetAllTasks();
}

func (tuc *TaskUseCase) CreateTask(task model.Task) (model.Task, error) {
	return tuc.repo.CreateTask(task);
}