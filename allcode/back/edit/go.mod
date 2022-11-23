module edit

go 1.19

require (
	connectToDb v0.0.0
	github.com/oklog/ulid v1.3.1
)

require (
	github.com/go-sql-driver/mysql v1.6.0 // indirect
	github.com/joho/godotenv v1.4.0 // indirect
)

replace connectToDb => ../connectToDb

require allType v0.0.0
replace allType => ../allType