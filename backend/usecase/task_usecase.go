package usecase

import "backend/model"
import "backend/repository"

type TaskUseCase struct {
	repo repository.TaskRepository
}



func NewTaskUseCase(repository repository.TaskRepository) TaskUseCase {
	return TaskUseCase{
		repo: repository,
	}
}

func (tuc *TaskUseCase) GetAllTasks() ([]model.Task, error) {
	return tuc.repo.GetAllTasks()
}

func (tuc *TaskUseCase) CreateTask(task model.Task) (model.Task, error) {
	return tuc.repo.CreateTask(task)
}

func (tuc *TaskUseCase) UpdateTask(task model.Task) (model.Task, error) {
	return tuc.repo.UpdateTask(task)
}

func (tuc TaskUseCase) UpdateStatus(request model.UpdateColumnRequest) (error) {
	return tuc.repo.UpdateStatus(request)
}
func (tuc TaskUseCase) DeleteTask(taskId int64) error {
	return tuc.repo.DeleteTask(taskId)
}