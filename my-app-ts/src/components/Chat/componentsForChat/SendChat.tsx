import React, {useState} from "react";

type Props = {
    username: string
    fetchChat : () => Promise<void>
}

const SendChat : React.FC<Props> = ({fetchChat, username}) => {

    //message
    const [message, setMessage] = useState("")

    const onChangeText = (e:React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    //onClick関数
    const onClickSend = async(e:React.MouseEvent<HTMLButtonElement>) => {
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
      
      try {
            const result = await fetch("http://localhost:8000/send/chat?username=" + username, {
              method: "POST",
              body: JSON.stringify({
                textMessage: message
              }),
            });
            if (!result.ok) {
              throw Error(`Failed to send chat`);
            }

            setMessage("")
            fetchChat();
  
          } catch (err) {
            console.error(err);
          }
    }

    return(
      
        <div className="chat-divSend">
          <div className="chat-divInput">
            <input 
              className="chat-inputSend"
              placeholder="メッセージを入力してください"
              type = "text"
              value={message}
              onChange={onChangeText}/>
          </div>
          <div className="chat-divForButtonSend">
            <button
              className="chat-buttonSend"
              onClick={(e) => onClickSend(e)}>送信</button>
          </div>           
        </div>
    )
}

export default SendChat