package db

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)


const (
	DB_NAME = "VERITASdb"
	PORT    = 3307
	USER    = "VERITAS"
	PASS    = "VERITAS"
	HOST    = "localhost"
)



// ConnectDB establishes a connection to the database and returns the connection object.
func ConnectDB() (*sql.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", USER, PASS, HOST, PORT, DB_NAME)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// Verify the connection
	if err := db.Ping(); err != nil {
		db.Close()
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return db, nil
}


