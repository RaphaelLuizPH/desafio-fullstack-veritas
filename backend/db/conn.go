package db

import (
	"database/sql"
	"fmt"
	"os"
	
	_ "github.com/go-sql-driver/mysql"
)

const (
	defaultDBName = "VERITASdb"
	defaultDBPort = "3306"
	defaultDBUser = "VERITAS"
	defaultDBPass = "VERITAS"
	defaultDBHost = "db"
)

func envOrDefault(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}

func ConnectDB() (*sql.DB, error) {
	dbName := envOrDefault("MYSQL_DATABASE", defaultDBName)
	dbUser := envOrDefault("MYSQL_USER", defaultDBUser)
	dbPass := envOrDefault("MYSQL_PASSWORD", defaultDBPass)
	dbHost := envOrDefault("DB_HOST", defaultDBHost)
	dbPort := envOrDefault("DB_PORT", defaultDBPort)

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", dbUser, dbPass, dbHost, dbPort, dbName)
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


