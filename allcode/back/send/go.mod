module send
go 1.19

require connectToDb v0.0.0
replace connectToDb => ../connectToDb

require allType v0.0.0
replace allType => ../allType

require github.com/oklog/ulid v1.3.1 //