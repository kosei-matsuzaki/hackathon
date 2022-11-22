package globalGet

import (
	"allType"
	"connectToDb"
	"encoding/json"
	"log"
	"net/http"
)

func ChatLog(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	switch r.Method {
	case http.MethodGet:
		tx, err := connectToDb.Db.Begin()
		if err != nil {
			log.Printf("fail: db.Begin, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//chatを取得しallChatに
		rows, err := tx.Query("SELECT * FROM chat ")
		if err != nil {
			log.Printf("fail: tx.Query, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		allChat := make([]allType.ChatForHTTPGet, 0)
		for rows.Next() {
			var u allType.ChatForHTTPGet
			if err := rows.Scan(&u.Id, &u.UserName, &u.TextMessage); err != nil {
				tx.Rollback()
				log.Printf("fail: rows.Scan, %v\n", err)
				if err := rows.Close(); err != nil { // 500を返して終了するが、その前にrowsのClose処理が必要
					log.Printf("fail: rows.Close(), %v\n", err)
				}
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			allChat = append(allChat, u)
		}

		if err := tx.Commit(); err != nil {
			log.Printf("fail: tx.Commit, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//allChat返却
		bytes, err := json.Marshal(allChat)
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
