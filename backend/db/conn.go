package db

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)


// const (
// 	DB_NAME = "VERITASdb"
// 	PORT    = 3306
// 	USER    = "VERITAS"
// 	PASS    = "VERITAS"
// 	HOST    = "db"
// )

 const (
 	DB_NAME = "VERITASdb"
 	PORT    = 3307
 	USER    = "VERITAS"
 	PASS    = "VERITAS"
 	HOST    = "localhost"
 )






func ConnectDB() (*sql.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", USER, PASS, HOST, PORT, DB_NAME)
	println(dsn);
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}


	if err := db.Ping(); err != nil {
		db.Close()
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return db, nil
}


