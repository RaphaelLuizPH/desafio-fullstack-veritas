package model

type UpdateColumnRequest struct {
	TaskId int64  `json:"task_id" binding:"required"`
	Column Status `json:"status" binding:"required"`
}