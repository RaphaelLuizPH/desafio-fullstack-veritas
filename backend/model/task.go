package model

type Status int

const (
	Completed  Status = iota // 0
	InProgress               // 1
	ToDo                     // 2
)

type Task struct {
	ID          uint   `json:"id"` 
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      Status `json:"status"`
	DueDate     string `json:"due_date"`
	AssignedTo  uint   `json:"assigned_to"`
}


