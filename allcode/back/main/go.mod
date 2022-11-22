module main

go 1.19

require (
	connectToDb v0.0.0
	edit v0.0.0
	globalGet v0.0.0
	individualGet v0.0.0
	remove v0.0.0
	send v0.0.0
	userInformation v0.0.0
)

require (
	allType v0.0.0 // indirect
	github.com/go-sql-driver/mysql v1.6.0 // indirect
	github.com/joho/godotenv v1.4.0 // indirect
	github.com/oklog/ulid v1.3.1 // indirect
)

replace (
	allType => ../allType
	connectToDb => ../connectToDb
	edit => ../edit
	globalGet => ../globalGet
	individualGet => ../individualGet
	remove => ../remove
	send => ../send
	userInformation => ../userInformation
)
