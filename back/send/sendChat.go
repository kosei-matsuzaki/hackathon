package send

import (
	"allType"
	"connectToDb"
	"encoding/json"
	"github.com/oklog/ulid"
	"log"
	"math/rand"
	"net/http"
	"time"
	"unicode/utf8"
)

func SendChat(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	//クエリパラメータからusername取得
	query := r.URL.Query()
	var name = query.Get("username")
	if name == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	switch r.Method {
	case http.MethodPost:
		//textMessageを取得、userNameにusernameを代入
		var chat allType.ChatForHTTPPost
		if err := json.NewDecoder(r.Body).Decode(&chat); err != nil {
			log.Printf("fail: jsonNewDecoder, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		chat.UserName = name

		if chat.TextMessage == "" || utf8.RuneCountInString(chat.TextMessage) > 200 {
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

		//ユニークidの生成
		t := time.Now()
		entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
		id := ulid.MustNew(ulid.Timestamp(t), entropy)
		chat.Id = id.String()

		//chat挿入
		var mysqlChat = "INSERT INTO chat(id,username,textMessage) VALUES (?,?,?)"
		if _, err = tx.Exec(mysqlChat, chat.Id, chat.UserName, chat.TextMessage); err != nil {
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
