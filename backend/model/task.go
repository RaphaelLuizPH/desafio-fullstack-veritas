package model

     type Status int

	  const (
        Created Status = iota // 0
        Pending               // 1
        Approved              // 2
        Rejected              // 3
    )


type Task struct {
	ID          uint   `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Status  Status   `json:"status"`
	DueDate   string `json:"due_date"`
	AssignedTo uint `json:"assigned_to"`

}