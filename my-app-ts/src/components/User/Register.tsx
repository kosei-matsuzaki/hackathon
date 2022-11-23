import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";


const Register : React.FC = () => {

    //name, password, passwordCheck
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")

    //function for onChange
    const handleChangeName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    const handleChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleChangePasswordCheck = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPasswordCheck(e.target.value)
    }

    //history
    const history = useHistory()

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
        if (password !== passwordCheck) {
            alert("パスワードが一致していません")
            setPassword("")
            setPasswordCheck("")
            return;
        }
    
        //POST
        try {
          const result = await fetch("http://localhost:8000/register", {
            method: "POST",
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
          if (result.status === 400) {
            alert(`もう一度入力してください`);
            setUsername("");
            setPassword("");
            setPasswordCheck("");
            return;
          }
          else if (result.status === 406) {
            alert("ユーザー名が既に使われています")
            setUsername("");
            return;
          }
          else if (!result.ok) {
            throw Error(`Failed to create user: ${result.status}`);
          }

          setUsername("");
          setPassword("");
          setPasswordCheck("");
          history.replace({
            pathname:"/individual/" + username,
            state:{check:"ok"}
        })
          
        } catch (err) {
          console.error(err);
        }
    }

     //go to login
    const onClickForLogin = (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      history.push("/login")
    }

    //UI返却
    return(
        <div className="user-component">
          <div className="user-div">
                <label className="user-label">ユーザー名</label>
                <input
                  className="user-input"
                  placeholder = "ユーザー名を入力してください"
                  type = "text"
                  value = {username}
                  onChange = {handleChangeName}/>
          </div>
          <div className="user-div">
            <label className="user-label">パスワード</label>
                <input
                  className="user-input"
                  placeholder = "パスワードを入力してください"
                  type = "password"
                  value = {password}
                  onChange = {handleChangePassword}/>
          </div>
          <div className="user-div">
            <label className="user-label">パスワード確認</label>
                <input
                  className="user-input"
                  placeholder = "もう一度パスワードを入力してください"
                  type = "password"
                  value = {passwordCheck}
                  onChange = {handleChangePasswordCheck}/>
          </div> 
          <div className="user-div">
            <button 
              className="user-buttonForRegister"
              onClick={(e) => onClick(e)}>登録</button>
          </div>         
          <div className="user-div">
            <button
              className="user-buttonForLogin" 
              onClick={(e) => onClickForLogin(e)}>Login画面に戻る</button>
          </div> 
        </div>
    )
  }

export default Register