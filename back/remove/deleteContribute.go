package remove

import (
	"allType"
	"connectToDb"
	"encoding/json"
	"log"
	"net/http"
	_ "unicode/utf8"
)

func DeleteContribute(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	switch r.Method {
	case http.MethodPost:
		//deleteするcontributeLogのidを取得
		var contributeLog allType.ContributeLogForHTTPPost
		if err := json.NewDecoder(r.Body).Decode(&contributeLog); err != nil {
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

		//idのcontributeLog
		if err := tx.QueryRow("SELECT serverName, receiverName, sendPoint FROM contributeLog WHERE id = ?", contributeLog.Id).Scan(&contributeLog.ServerName, &contributeLog.ReceiverName, &contributeLog.SendPoint); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Query, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//serverのcontributeSent
		var send = 0
		if err := tx.QueryRow("SELECT contributeSent FROM userContribute WHERE username = ?", contributeLog.ServerName).Scan(&send); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Query, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		//receiverのcontributeReceived
		var receive = 0
		if err := tx.QueryRow("SELECT contributeReceived FROM userContribute WHERE username = ?", contributeLog.ReceiverName).Scan(&receive); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Query, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//userContribute更新
		if _, err = tx.Exec("UPDATE userContribute SET contributeSent = ? WHERE username = ?", send-contributeLog.SendPoint, contributeLog.ServerName); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Exec, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		if _, err = tx.Exec("UPDATE userContribute SET contributeReceived = ? WHERE username = ?", receive-contributeLog.SendPoint, contributeLog.ReceiverName); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Exec, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//contributeLog削除
		if _, err = tx.Exec("DELETE FROM contributeLog WHERE id = ?", contributeLog.Id); err != nil {
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
