package userInformation

import (
	"allType"
	"connectToDb"
	"encoding/json"
	"log"
	"net/http"
	"unicode/utf8"
)

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	switch r.Method {
	//okならStatusOk, username or passwordが違ったらStatusNotAcceptable, それ以外はStatusBadRequest)
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

		//username存在チェック(ヘッダーにStatusNotAcceptable)
		var userCheck = 0
		if err := tx.QueryRow("SELECT EXISTS(SELECT username FROM userInformation WHERE username = ?)", user.Username).Scan(&userCheck); err != nil {
			log.Printf("fail: tx.QueryRow, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		if userCheck == 0 {
			log.Printf("fail: such_username_cannot_be_found")
			w.WriteHeader(http.StatusNotAcceptable)
			return
		}

		//passwordチェック(ヘッダーにStatusNotAcceptable)
		var passwordCheck = ""
		if err := tx.QueryRow("SELECT password FROM userInformation WHERE username = ?", user.Username).Scan(&passwordCheck); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Exec, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		if user.Password != passwordCheck {
			log.Printf("fail: wrong_password")
			w.WriteHeader(http.StatusNotAcceptable)
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
