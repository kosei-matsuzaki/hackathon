import React from "react";
import { useState, useCallback,useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../css/User.css"

const Login : React.FC = () => {
  const history = useHistory();

  const blockBrowserBack = useCallback(() => {
    window.history.go(1)
    }, [])

    useEffect(() => {
    // 直前の履歴に現在のページを追加
    window.history.pushState(null, '', window.location.href)

    // 直前の履歴と現在のページのループ
    window.addEventListener('popstate', blockBrowserBack)

    // クリーンアップは忘れない
    return () => {
        window.removeEventListener('popstate', blockBrowserBack)
    }
    }, [blockBrowserBack])

    //name, password
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    //function for onChange
    const handleChangeName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    const handleChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    //function for onSubmit
    const onClick = async(e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!username) {
          alert("ユーザー名を入力してください");
          return;
        }
    //@ts-ignore
        if ([...username].length > 50) {
          alert("ユーザー名は５０文字未満にしてください");
          return;
        }
        if (!password) {
            alert("パスワードを入力してください");
            return;
          }
    //@ts-ignore
        if ([...password].length > 50 || [...password].length < 6) {
            alert("パスワードは６文字以上かつ５０文字未満にしてください");
            return;
        }
    
        //POST
        try {
          const result = await fetch("https://hackathon-vfujicgnka-uc.a.run.app/login", {
            method: "POST",
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
          
          if (result.status === 406) {
            alert("ユーザー名かパスワードが間違っています")
            setPassword("");
            return;
          }
          else if (!result.ok) {
            throw Error(`Failed to create user: ${result.status}`);
          }

          setUsername("");
          setPassword("");
          history.replace({
            pathname:"/individual/" + username,
            state:{check:"ok"}
        })

        } catch (err) {
          console.error(err);
        }
    }

    //go to register
    const onClickForRegister = (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      history.push("/register")
  }

    //UI返却
    return(
      <div className="user-divAll">
        <div className = "user-component">
          <div className="user-div">
            <label className="user-label">ユーザー名</label>
                <input 
                  className = "user-input"
                  placeholder = "ユーザー名を入力してください"
                  type = "text"
                  value = {username}
                  onChange = {handleChangeName}/>
          </div>
          <div className="user-div">
            <label className = "user-label">パスワード</label>
                <input
                  className = "user-input"
                  placeholder = "パスワードを入力してください"
                  type = "password"
                  value = {password}
                  onChange = {handleChangePassword}/>      
          </div>
          <div className="user-divForButton">
            <div className="user-div">
              <button 
               className = "user-buttonForLogin"
               onClick={(e) => onClick(e)}>Login</button>       
            </div>  
            <div className="user-div">
              <button
              className="user-buttonForRegister" 
              onClick={(e) => onClickForRegister(e)}>新規登録画面へ</button>
            </div> 
          </div>             
        </div>
      </div>
    )}

export default Login