import userEvent from "@testing-library/user-event";
import React, {useState, useEffect} from "react";

type Props = {
  urlParams: {
    username: string;
}
}
const SendContribute : React.FC<Props> = ({urlParams}) => {

  //value
    const [to, setTo] = useState("")
    const [point, setPoint] = useState(0)
    const [message, setMessage] = useState("")

    //onChange関数
    const onChangePoint = (e:React.ChangeEvent<HTMLInputElement>) => {
      setPoint(Number(e.target.value))
    }
    const onChangeText = (e:React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value)
    }
    const onChangeTo = (e:React.ChangeEvent<HTMLSelectElement>) => {
      setTo(e.target.value)
    }

    //onClick関数
    const onClickForSend = async(e:React.MouseEvent<HTMLButtonElement>) => {     
      e.preventDefault();

      if (!to) {
        alert("送る相手を選択してください");
        return;
      }
      //@ts-ignore
      if ([...message].length > 200) {
        alert("メッセージは２００文字未満にしてください");
        return;
      }
      if (point == 0) {
        alert("ポイントを入力してください");
        return;
      }
      try{
           const result = await fetch("https://hackathon-vfujicgnka-uc.a.run.app/send/contribute?username=" + urlParams.username, {
            method: "POST",
            body: JSON.stringify({
              receiverName: to,
              sendPoint: point,
              message: message             
             }),
           });
          if (result.status === 406) {
            alert("存在しないユーザー名です")
            setTo("")
            return;
          }
          if (!result.ok) {
            throw Error(`Failed to send chat`);
          }
          window.location.reload();
          } catch (err) {     
                   console.error(err);
       }
    }

    //other users取得
    const [users, setUsers] = useState<string[]>([])

    const fetchUsers = async () => {
      try {
        const res = await fetch("https://hackathon-vfujicgnka-uc.a.run.app/individual/others?username=" + urlParams.username);
        if (!res.ok) {
          throw Error(`Failed to fetch users: ${res.status}`);
        }
  
        const others = await res.json();
        setUsers(others);
        console.log(others)
      } catch (err) {
        console.error(err);
      }
    };

  //一度だけ取得
  useEffect (() => {
    fetchUsers()
  },[])

    //返却
    return (
        <div className="home-sendDiv">
          <form id = "form" className="home-sendForm">
            <div className="home-sendFormDiv">
              <label className="home-sendLabel">送信相手を選んでください</label>
              <select
                onChange={onChangeTo}
                className="home-sendSelect">
                  <option defaultValue={""}></option>
                  {users.map(user => {
                    return(
                      <option value={user}>{user}</option>
                    )
                  }
                  )}
               </select>
            </div>
            <div className="home-sendFormDiv">
              <label className="home-sendLabel">送るポイントを入力してください</label>
              <input
              className="home-sendInput"
              type="number"
              value={point}
              onChange={(e) => onChangePoint(e)}/>
            </div>  
            <div className="home-sendFromDiv">
              <label className="home-sendLabel">メッセージを入力してください</label>
              <input
              className="home-sendInput"
              placeholder="メッセージを入力してください"
              type="text"
              value={message}
              onChange={(e) => onChangeText(e)}
              />
            </div>
            <div className="home-sendButtonDiv">
              <button
                className="home-sendButton"
                onClick={(e) => onClickForSend(e)}>送信</button>
            </div>     
          </form>
        </div>
    )
}

export default SendContribute