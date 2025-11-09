package db

import (
	"database/sql"
	"fmt"
	"os"
	"strings"

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

	
	executeSQLScript(db, "./db/insert_tasks_real.sql");

	return db, nil
}

func executeSQLScript(db *sql.DB, scriptPath string) error {

	content, err := os.ReadFile(scriptPath)
	if err != nil {
		return err
	}

	
	statements := strings.Split(string(content), ";")

	for _, statement := range statements {
		
		stmt := strings.TrimSpace(statement)
		
		
		if stmt == "" {
			continue
		}

	
		_, err := db.Exec(stmt)
		if err != nil {
			return fmt.Errorf("erro ao executar statement: %w", err)
		}

		
	}

	return nil
}
