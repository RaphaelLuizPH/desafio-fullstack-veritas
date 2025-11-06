package repository

import (
	"backend/model"
	"database/sql"
	"fmt"
)

type TaskRepository struct {
	db *sql.DB
} 



func NewProductRepository(db *sql.DB) TaskRepository {
	return TaskRepository{
		db: db,
	}
}



func (pr *TaskRepository) GetAllTasks() ([]model.Task, error) {
	query := "SELECT *  FROM Tasks"
	
	rows, err := pr.db.Query(query);

	if err != nil {
		fmt.Println("Error executing query:", err)
		return nil, err
	}

	var tasks []model.Task



	for rows.Next() {
		var task model.Task
		var description sql.NullString ;
		var status sql.NullString;
		err := rows.Scan(
			&task.ID, 
			&task.Title, 
			&task.DueDate,
			&description, 
			&task.AssignedTo,
			&status)

		if description.Valid {
			task.Description = description.String
		} else {
			task.Description = ""
		}
			
		if status.Valid {
			switch status.String {
			case "completed": task.Status = model.Completed
			case "inProgress": task.Status = model.InProgress
			case "ToDo": task.Status = model.ToDo
			default: task.Status = model.ToDo
    		}
}
		

		if err != nil {
			fmt.Println("Error scanning row:", err)
			return nil, err
		}
		


		tasks = append(tasks, task)
	}


	rows.Close()
	return tasks, nil
}


func (pr *TaskRepository) CreateTask(request model.Task) (model.Task, error) {
	
	query, err := pr.db.Prepare("INSERT INTO Tasks" + 
	"(Title, DueDate, Description, AssignedTo)" +  
	"VALUES (?, ?, ?, ?);")
	if err != nil {
		return model.Task{}, err
	}
	
	query.QueryRow(request.Title, request.DueDate, request.Description, request.AssignedTo).Scan();
	
	pr.db.QueryRow("SELECT ID from Tasks ORDER BY ID DESC LIMIT 1").Scan(&request.ID);


	



	return request, err

}