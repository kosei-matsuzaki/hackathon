FROM golang:1.18 as build
WORKDIR bin/sh

COPY back/ ./

WORKDIR ./main
RUN go build -o /hackathon
CMD ["/hackathon"]
