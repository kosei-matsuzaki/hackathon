package main

import (
	"connectToDb"
	"edit"
	"globalGet"
	"individualGet"
	"log"
	"net/http"
	"remove"
	"send"
	"userInformation"
)

func main() {

	http.HandleFunc("/login", userInformation.Login)
	http.HandleFunc("/register", userInformation.Register)
	http.HandleFunc("/individual/status", individualGet.ContributeStatus)
	http.HandleFunc("/individual/log/received", individualGet.ContributeLogReceived)
	http.HandleFunc("/individual/log/sent", individualGet.ContributeLogSent)
	http.HandleFunc("/individual/others", individualGet.OtherUsers)
	http.HandleFunc("/individual/profile", individualGet.Profile)
	http.HandleFunc("/send/contribute", send.SendContribute)
	http.HandleFunc("/send/chat", send.SendChat)
	http.HandleFunc("/global/chat", globalGet.ChatLog)
	http.HandleFunc("/global/ranking/receiver", globalGet.ReceiverRanking)
	http.HandleFunc("/global/ranking/server", globalGet.ServerRanking)
	http.HandleFunc("/remove/chat", remove.DeleteChat)
	http.HandleFunc("/remove/contribute", remove.DeleteContribute)
	http.HandleFunc("/edit/chat", edit.EditChat)
	http.HandleFunc("/edit/profile", edit.EditProfile)

	connectToDb.CloseDBWithSysCall()

	log.Println("Listening...")
	if err := http.ListenAndServe(":8000", nil); err != nil {
		log.Fatal(err)
	}
}
