package model

type Status int

const (
	Completed  Status = 1
	InProgress Status = 2
	ToDo       Status = 3
)

type Task struct {
	ID           int64  `json:"id" `
	Title        string `json:"title" binding:"required"`
	Description  string `json:"description"`
	Status       Status `json:"status"`
	AssignedTo   int64  `json:"assigned_to"`
	DueDate      string `json:"due_date"`
	AssigneeName string `json:"assignee_name"`
}
