package model

// User represents a record in the Users table.
type User struct {
	ID    int64  `json:"id"`
	Name  string `json:"name"`
}
