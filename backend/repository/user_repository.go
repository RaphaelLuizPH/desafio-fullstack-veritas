package repository

import (
	"backend/model"
	"database/sql"
)


type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) UserRepository {
	return UserRepository{
		db: db,
	}
}

func (ur *UserRepository) GetAllUsers() ([]model.User, error) {
	const query = "SELECT ID, Name FROM Users;"

	rows, err := ur.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []model.User

	for rows.Next() {
		var user model.User


		if err := rows.Scan(&user.ID, &user.Name); err != nil {
			return nil, err
		}

	

		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}
