FROM golang:1.18 as build
WORKDIR bin/sh

COPY back/ ./

WORKDIR ./main
RUN go build -o /hackathon

ENV PORT 8000
EXPOSE 8000
CMD ["/hackathon"]
