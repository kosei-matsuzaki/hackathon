package individualGet

import (
	"allType"
	"connectToDb"
	"encoding/json"
	"log"
	"net/http"
)

func ContributeStatus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	//クエリパラメータからusername取得
	query := r.URL.Query()
	var name = query.Get("username")
	if name == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	switch r.Method {
	case http.MethodGet:
		tx, err := connectToDb.Db.Begin()
		if err != nil {
			log.Printf("fail: db.Begin, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//usernameのpoint取得
		var contribute allType.UserContributeForGet
		if err := tx.QueryRow("SELECT contributeSent, contributeReceived FROM userContribute WHERE username = ?", name).Scan(&contribute.Sent, &contribute.Received); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Query, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		if err := tx.Commit(); err != nil {
			log.Printf("fail: tx.Commit, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//contribute返却
		bytes, err := json.Marshal(contribute)
		if err != nil {
			log.Printf("fail: json.Marshal, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(bytes)

	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}
