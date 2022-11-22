package userInformation

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

func Register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	switch r.Method {
	//okならStatusOk, username重複ならStatusNotAcceptable, それ以外はStatusBadRequest
	case http.MethodPost:
		//usernameとpassword受け取り
		var user = allType.UserInfoForHTTPPost{}
		if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
			log.Printf("fail: jsonNewDecoder, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//要件チェック
		if user.Username == "" || utf8.RuneCountInString(user.Username) > 50 || utf8.RuneCountInString(user.Password) > 50 || utf8.RuneCountInString(user.Password) < 6 {
			log.Printf("fail: post_condition_in_userRegister")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		//ユニークid生成
		t := time.Now()
		entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
		id := ulid.MustNew(ulid.Timestamp(t), entropy)
		user.Id = id.String()

		tx, err := connectToDb.Db.Begin()
		if err != nil {
			log.Printf("fail: db.Begin, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//username重複チェック(ヘッダーにStatusNotAcceptable)
		var userCheck = 0
		if err := tx.QueryRow("SELECT EXISTS(SELECT username FROM userInformation WHERE username = ?)", user.Username).Scan(&userCheck); err != nil {
			log.Printf("fail: tx.QueryRow, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		if userCheck != 0 {
			log.Printf("username_is_already_used")
			w.WriteHeader(http.StatusNotAcceptable)
			return
		}

		//tableにuser追加
		if _, err = tx.Exec("INSERT INTO userInformation(id,username,password) values(?,?,?)", user.Id, user.Username, user.Password); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Exec, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		if _, err = tx.Exec("INSERT INTO userContribute(username,contributeSent, contributeReceived) values(?,0,0)", user.Username); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Exec, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		if _, err = tx.Exec("INSERT INTO userProfile(username,nickname,introduction) values(?,?,'')", user.Username, user.Username); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Exec, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		if err = tx.Commit(); err != nil {
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
