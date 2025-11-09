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
	query := "SELECT t.*, u.Name FROM Tasks t JOIN Users u ON t.AssignedTo = u.ID;";
	
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
			&status,
			&task.AssigneeName)

	

		if description.Valid {
			task.Description = description.String
		} else {
			task.Description = ""
		}
			
		if status.Valid {
			switch status.String {
			case "Completed": task.Status = model.Completed
			case "InProgress": task.Status = model.InProgress
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
	"(Title, DueDate, Description, AssignedTo, Status)" +  
	"VALUES (?, ?, ?, ?, ?);")
	if err != nil {
		return model.Task{}, err
	}
	
	 res, err := query.Exec(request.Title, request.DueDate, request.Description, request.AssignedTo, request.Status);
	
		if( err != nil ){
			return model.Task{}, err
		}


	request.ID, err = res.LastInsertId();
	request.Status = model.ToDo;
		if( err != nil ){
			return model.Task{}, err
		}


	return request, err

}


func (pr *TaskRepository) UpdateTask(request model.Task) (model.Task, error) {
	query, err := pr.db.Prepare("UPDATE Tasks SET Title = ?, DueDate = ?, Description = ?, Status = ?, AssignedTo = ? WHERE ID = ?;")
	if err != nil {
		return model.Task{}, err
	}

	println(request.Title, request.DueDate, request.Description, request.Status, request.AssignedTo, request.ID);

	 _, err = query.Exec(request.Title, request.DueDate, request.Description, request.Status, request.AssignedTo, request.ID);



	return request, err
}


func (pr *TaskRepository) DeleteTask(taskId int64) error {
	query, err :=  pr.db.Prepare("DELETE FROM Tasks WHERE ID = ?;")
	if err != nil {
		return err
	}
	 _, err = query.Exec(taskId);
	 return err
}


func (pr *TaskRepository) UpdateStatus(request model.UpdateColumnRequest ) error {
		
	
		query, err := pr.db.Prepare("UPDATE Tasks SET Status = ? WHERE ID = ?;")

		if err != nil {
			return err
		}

		 _, err = query.Exec(request.Column, request.TaskId);

		 return err


}