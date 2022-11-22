package edit

import (
	"allType"
	"connectToDb"
	"encoding/json"
	"log"
	"net/http"
	"unicode/utf8"
)

func EditChat(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	switch r.Method {
	case http.MethodPost:
		//id,textMessageを取得
		var editChat allType.ChatForHTTPPost
		if err := json.NewDecoder(r.Body).Decode(&editChat); err != nil {
			log.Printf("fail: jsonNewDecoder, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		if editChat.TextMessage == "" || utf8.RuneCountInString(editChat.TextMessage) > 200 {
			log.Printf("fail: post_condition_in_login")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		tx, err := connectToDb.Db.Begin()
		if err != nil {
			log.Printf("fail: db.Begin, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//chat編集
		var mysqlChat = "UPDATE chat SET textMessage = ? WHERE id = ?"
		if _, err = tx.Exec(mysqlChat, editChat.TextMessage, editChat.Id); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Exec, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		if err := tx.Commit(); err != nil {
			log.Printf("fail: tx.Commit, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//ヘッダーにStatusOk
		w.WriteHeader(http.StatusOK)

	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}
