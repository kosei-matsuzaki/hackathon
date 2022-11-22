import React, {useState, useEffect} from "react";
import { useParams, useHistory} from "react-router-dom";
import LinkToHome from "../Link/LinkToHome";
import LinkToLogin from "../Link/LinkToLogin";
import LinkToProfile from "../Link/LinkToProfile";
import LinkToRanking from "../Link/LinkToRanking";
import ChatList from "./componentsForChat/ChatList"
import SendChat from "./componentsForChat/SendChat"
import "../../css/Chat.css"

type chatLog = {
    id: string,
    username: string,
    textMessage: string
}

const Chat : React.FC = () => {

    //username取得
    const username = useParams<{username:string}>()

    console.log(username.username)
    
    const [text, setText] = useState<chatLog[]>([])

    const fetchUrl = "http://localhost:8000/global/chat"
    //chat取得
    const fetchChat = async () => {
        try {
          const res = await fetch(fetchUrl);
          if (!res.ok) {
            throw Error(`Failed to fetch users: ${res.status}`);
          }
    
          const message = await res.json();
          setText(message);
          console.log(text)
        } catch (err) {
          console.error(err);
        }
      };

    //一度だけ取得
    useEffect (() => {
      fetchChat()
    },[])

    //prevent from URL
    const history = useHistory();
    useEffect(() => {
      if (!history.location.state) history.replace('/login')
    }, [])

    return(
      <div>
        <div>
           <ChatList text={text} username={username.username} fetchChat={fetchChat}/>
           <SendChat fetchChat={fetchChat} username={username.username}/>
        </div>
        <LinkToHome/>
        <LinkToProfile/>
        <LinkToRanking/>
        <LinkToLogin/>
      </div>
    );
}

export default Chat