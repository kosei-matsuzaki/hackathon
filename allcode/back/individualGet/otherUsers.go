package individualGet

import (
	"connectToDb"
	"encoding/json"
	"log"
	"net/http"
	_ "unicode/utf8"
)

func OtherUsers(w http.ResponseWriter, r *http.Request) {
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

		//自分以外のusername取得
		rows, err := tx.Query("SELECT username FROM userContribute WHERE username != ?", name)
		if err != nil {
			log.Printf("fail: tx.Query, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//usersに代入
		var users = make([]string, 0)
		for rows.Next() {
			var u string
			if err := rows.Scan(&u); err != nil {
				log.Printf("fail: rows.Scan, %v\n", err)
				if err := rows.Close(); err != nil { // 500を返して終了するが、その前にrowsのClose処理が必要
					log.Printf("fail: rows.Close(), %v\n", err)
				}
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			users = append(users, u)
		}

		if err := tx.Commit(); err != nil {
			log.Printf("fail: tx.Commit, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//users返却
		bytes, err := json.Marshal(users)
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
