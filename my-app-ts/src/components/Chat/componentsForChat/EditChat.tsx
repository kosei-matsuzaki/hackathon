import React, {useState} from "react"
import ts from "typescript"

type chatLog = {
  id: string,
  username: string,
  textMessage: string
}

type Props = {
    log: chatLog
}
const EditChat : React.FC<Props> = ({log}) => {

    const [message, setMessage] = useState(log.textMessage)

    const onChangeText = (e:React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const onClickForEdit = async(e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!message) {
          alert("メッセージを入力してください");
          return;
        }
        //@ts-ignore
        if ([...message].length > 200) {
          alert("メッセージは２００文字未満にしてください");
          return;
        }
        try{
            const result = await fetch("http://localhost:8000/edit/chat" ,{
              method: "POST",
              body: JSON.stringify({
                id: log.id,
                textMessage: message
              }),
            });
            if (!result.ok) {
              throw Error(`Failed to send chat`);
            }

            setMessage("")
            window.location.reload();
  
          } catch (err) {
            console.error(err);
        }
    }
    return(
      <div  
        className = "chat-divComponent"
        key={log.id}>
        <div className="chat-divCombine">
          <div className="chat-divUsername">{log.username}</div> 
          <div className="chat-divTextMessage">
            <input
            className="chat-inputEdit"
            type = "text"
            value = {message}
            onChange = {(e) => onChangeText(e)}
            />
          </div>
        </div>
        <div className="chat-divForButton">
              <button 
              className="chat-buttonEdit"
              onClick={(e) => onClickForEdit(e)}>編集完了</button>
        </div>    
      </div>
    )
}

export default EditChat