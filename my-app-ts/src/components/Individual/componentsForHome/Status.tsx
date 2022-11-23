import "../../../css/Home.css";
import React, {useState, useEffect} from "react";

type Points = {
    contributeSent : number,
    contributeReceived : number
}

type Props = {
    urlParams: {
        username: string;
    }
}

const Status : React.FC<Props> = ({urlParams}) => {

    //contribute定義
    const [contribute, setContribute] = useState<Points>({contributeSent: 0, contributeReceived: 0})

    //url作成
    const fetchUrl :string = "http://localhost:8000/individual/status?username=" + urlParams.username

    //GET status
    const fetchContribute = async () => {
        try {
          const res = await fetch(fetchUrl);
          if (!res.ok) {
            throw Error(`Failed to fetch users: ${res.status}`);
          }
    
          const contributeStatus = await res.json();
          setContribute(contributeStatus);
          console.log(contribute)
        } catch (err) {
          console.error(err);
        }
       };

    //一度だけ取得
    useEffect (() => {
      fetchContribute()
    },[])

    return(
      <div className="div-box">   
        <div className="home-statusDiv">
            <div>あなたの送った合計ポイントは {contribute.contributeSent} ptです。</div>
            <div>あなたの受け取った合計ポイントは {contribute.contributeReceived} ptです。</div>
        </div>
      </div>
    )
}

export default Status