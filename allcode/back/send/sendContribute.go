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
	_ "time"
	"unicode/utf8"
	_ "unicode/utf8"
)

func SendContribute(w http.ResponseWriter, r *http.Request) {
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
		//receiverName, sendPoint, messageを取得、serverNameにusernameを代入
		var contribute allType.ContributeLogForHTTPPost
		if err := json.NewDecoder(r.Body).Decode(&contribute); err != nil {
			log.Printf("fail: jsonNewDecoder, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		contribute.ServerName = name

		if contribute.SendPoint <= 0 || utf8.RuneCountInString(contribute.Message) > 100 {
			log.Printf("fail: post_condition_in_login")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		if contribute.Message == "" {
			contribute.Message = "メッセージはありません"
		}

		tx, err := connectToDb.Db.Begin()
		if err != nil {
			log.Printf("fail: db.Begin, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//serverのcontributeSent
		var send = 0
		if err := tx.QueryRow("SELECT contributeSent FROM userContribute WHERE username = ?", name).Scan(&send); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Query, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		//receiverのcontributeReceivedを取得
		var receive = 0
		if err := tx.QueryRow("SELECT contributeReceived FROM userContribute WHERE username = ?", contribute.ReceiverName).Scan(&receive); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Query, %v\n", err)
			w.WriteHeader(http.StatusNotAcceptable)
			return
		}

		//userContribute更新
		if _, err = tx.Exec("UPDATE userContribute SET contributeSent = ? WHERE username = ?", send+contribute.SendPoint, name); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Exec, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		if _, err = tx.Exec("UPDATE userContribute SET contributeReceived = ? WHERE username = ?", receive+contribute.SendPoint, contribute.ReceiverName); err != nil {
			tx.Rollback()
			log.Printf("fail: tx.Exec, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		//ユニークidの生成
		t := time.Now()
		entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
		id := ulid.MustNew(ulid.Timestamp(t), entropy)
		contribute.Id = id.String()

		//contributeLog挿入
		var mysqlLog = "INSERT INTO contributeLog(id,serverName,receiverName,sendPoint,message) VALUES (?,?,?,?,?)"
		if _, err = tx.Exec(mysqlLog, contribute.Id, contribute.ServerName, contribute.ReceiverName, contribute.SendPoint, contribute.Message); err != nil {
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
