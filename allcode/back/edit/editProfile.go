package edit

import (
	"allType"
	"connectToDb"
	"encoding/json"
	"log"
	"net/http"
	"unicode/utf8"
)

func EditProfile(w http.ResponseWriter, r *http.Request) {
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
		//nickname,introductionを取得, usernameを代入
		var editProfile allType.UserProfileForHTTPPost
		if err := json.NewDecoder(r.Body).Decode(&editProfile); err != nil {
			log.Printf("fail: jsonNewDecoder, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		editProfile.Username = name

		if utf8.RuneCountInString(editProfile.Introduction) > 200 {
			log.Printf("fail: post_condition_in_login")
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if utf8.RuneCountInString(editProfile.Nickname) > 50 {
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

		//profile編集
		var mysqlNickname = "UPDATE userProfile SET nickname = ? WHERE username = ?"
		if _, err = tx.Exec(mysqlNickname, editProfile.Nickname, editProfile.Username); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Exec, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		var mysqlIntroduction = "UPDATE userProfile SET introduction = ? WHERE username = ?"
		if _, err = tx.Exec(mysqlIntroduction, editProfile.Introduction, editProfile.Username); err != nil {
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
