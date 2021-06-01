CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (80),
	"priority" VARCHAR (80),
	"completed" boolean DEFAULT false,
	"dueDate" VARCHAR(13)

)