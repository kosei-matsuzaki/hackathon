package remove

import (
	"allType"
	"connectToDb"
	"encoding/json"
	"log"
	"net/http"
)

func DeleteChat(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	switch r.Method {
	case http.MethodPost:
		//textMessageのidを取得
		var chat allType.ChatForHTTPPost
		if err := json.NewDecoder(r.Body).Decode(&chat); err != nil {
			log.Printf("fail: jsonNewDecoder, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		tx, err := connectToDb.Db.Begin()
		if err != nil {
			log.Printf("fail: db.Begin, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//textMessage削除
		if _, err = tx.Exec("DELETE FROM chat WHERE id = ?", chat.Id); err != nil {
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
