package individualGet

import (
	"allType"
	"connectToDb"
	"encoding/json"
	"log"
	"net/http"
)

func ContributeLogReceived(w http.ResponseWriter, r *http.Request) {
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

		//自分宛てのcontributeLog取得しsentToYouに
		rows, err := tx.Query("SELECT id, serverName, sendPoint, message FROM contributeLog WHERE receiverName = ?", name)
		if err != nil {
			log.Printf("fail: tx.Query, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		sentToYou := make([]allType.ContributeLogForReceived, 0)
		for rows.Next() {
			var u allType.ContributeLogForReceived
			if err := rows.Scan(&u.Id, &u.ServerName, &u.SendPoint, &u.Message); err != nil {
				tx.Rollback()
				log.Printf("fail: rows.Scan, %v\n", err)
				if err := rows.Close(); err != nil { // 500を返して終了するが、その前にrowsのClose処理が必要
					log.Printf("fail: rows.Close(), %v\n", err)
				}
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			sentToYou = append(sentToYou, u)
		}

		if err := tx.Commit(); err != nil {
			log.Printf("fail: tx.Commit, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//sentToYou返却
		bytes, err := json.Marshal(sentToYou)
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
