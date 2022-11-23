import React, {useState, useEffect} from "react";
import { useParams, useHistory} from "react-router-dom";
import LinkToHome from "../Link/LinkToHome";
import LinkToLogin from "../Link/LinkToLogin";
import LinkToChat from "../Link/LinkToChat";
import LinkToProfile from "../Link/LinkToProfile";
import LinkToRanking from "../Link/LinkToRanking";
import ChatList from "./componentsForChat/ChatList"
import "../../css/Chat.css"
import "../../css/Header.css"

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

    const fetchUrl = "https://hackathon-vfujicgnka-uc.a.run.app//global/chat"
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
        <header>
                <h1 className="h1">Contribute</h1>
                <div className="div">
                    <ul className="ul">
                       <LinkToHome/>
                       <LinkToRanking/>
                       <LinkToChat/>
                       <LinkToProfile/> 
                       <LinkToLogin/>
                    </ul>
                </div>
        </header>
        <body>
        <div>
           <ChatList text={text} username={username.username} fetchChat={fetchChat}/>
        </div>
        </body>
      </div>
    );
}

export default Chat