import React, {useState} from "react";
import DeleteChat from "./DeleteChat";
import EditChat from "./EditChat";
import SendChat from "./SendChat"
import {useHistory} from "react-router-dom";

type chatLog = {
    id: string,
    username: string,
    textMessage: string
}

type Props = {
    text: chatLog[],
    username: string
    fetchChat : () => Promise<void>
}

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);


const ChatList : React.FC<Props> = ({text, username, fetchChat}) => {

    const [status, setStatus] = useState(0)
    const [id, setId] = useState("")

    const onClick = (e:React.MouseEvent<HTMLButtonElement>, logId:string) => {
        e.preventDefault();
        setStatus(1);
        setId(logId)
        fetchChat();
    }

    const history = useHistory();

    //onclick
    const onClickForProfile = (e:React.MouseEvent<HTMLDivElement>, username:string) => {
      e.preventDefault();
      history.push({
        pathname:"/profile/" + username,
        state:{v:1}
    })
    }

    //chat表示
    return(
        <div className="chat-divAll">
            <div className="chat-divTitle">チャット一覧</div>
            <div className="div-box">
              <div className="chat-divList">
              {text.map(log => {
                const logId = log.id
                //編集時
                if (status === 1 && logId === id) {
                    return(                     
                        <EditChat log={log}/>
                    )
                }
                //edit and delete
                else if(log.username===username){
                    return(
                        <div  
                        className = "chat-divComponent"
                        key={log.id}>
                           <div className="chat-divCombine">
                              <div
                              onClick={(e) => onClickForProfile(e, log.username)} 
                              className="chat-divUsername">{log.username}</div>
                              <div className="chat-divTextMessage">{log.textMessage}</div>
                           </div>
                           <div className="chat-divForButton">
                              <button 
                               className="chat-buttonEdit"
                               onClick={(e) => onClick(e,logId)}>編集</button>
                              <DeleteChat id={log.id} fetchChat={fetchChat}/> 
                           </div>
                               
                        </div>
                    )
                }
                //other chat
                else{
                    return(
                        <div
                        className="chat-divComponent" 
                        key={log.id}>
                           <div className="chat-divCombineForOthers">
                              <div
                              onClick={(e) => onClickForProfile(e, log.username)} 
                              className="chat-divUsername">{log.username}</div>
                              <div className="chat-divTextMessage">{log.textMessage}</div>
                           </div>     
                        </div>
                    )
                }
                })}
                </div>
                <SendChat fetchChat={fetchChat} username={username}/>
            </div>
        </div>
    );

}

export default ChatList