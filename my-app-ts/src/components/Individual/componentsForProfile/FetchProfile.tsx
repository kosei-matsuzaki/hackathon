import React, {useState, useEffect} from "react";
import EditProfile from "./EditProfile";
import LinkToChat from "../../Link/LinkToChat";
import LinkToHome from "../../Link/LinkToHome"
import LinkToLogin from "../../Link/LinkToLogin";
import LinkToRanking from "../../Link/LinkToRanking";
import "../../../css/Header.css";

type Props = {
  urlParams: {
    username: string;
  },
  query:{v:number}
}

type Profiling = {
    username : string,
    nickname : string,
    introduction : string
}

const FetchProfile : React.FC<Props> = ({urlParams, query}) => {

    const [status, setStatus] = useState(0)

    const onClick = (e:React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setStatus(1);
      fetchProfile();
    }

    //contribute定義
    const [profile, setProfile] = useState<Profiling>({username:"", nickname:"", introduction:""})

    //url作成
    const fetchUrlProfile :string = "http://localhost:8000/individual/profile?username=" + urlParams.username
    
    //GET profile
    const fetchProfile = async () => {
        try {
          const res = await fetch(fetchUrlProfile);
          if (!res.ok) {
            throw Error(`Failed to fetch profile: ${res.status}`);
          }
    
          const profileStatus = await res.json();
          setProfile(profileStatus);
          console.log(profile)
        } catch (err) {
          console.error(err);
        }
      };

    //一度だけ取得
    useEffect (() => {
      fetchProfile()
    },[])

      //for others
      if(query.v === 1){
        return(
          <div>
            <header>
                <h1 className="h1">Contribute</h1>
            </header>
            <body>
              <div className="profile-divAll">
                <div className="profile-divTitle">
                  プロフィール
                </div>
                <div className="div-box">
                  <ul className="profile-ulProfile">
                    <div className="profile-divComponent">ユーザー名: {profile.username}</div>
                    <div className="profile-divComponent">ニックネーム: {profile.nickname}</div>
                    <div className="profile-divComponent">自己紹介: {profile.introduction}</div>
                  </ul>
                </div>
              </div>
            </body>      
          </div>
        )}
      //edit
      else if(status===1){
        return(
          <EditProfile profile={profile}/>
        )
      } 
      //default
      else if(query.v === 0){
        return(
          <div>
            <header>
                <h1 className="h1">Contribute</h1>
                <div className="div">
                    <ul className="ul">
                       <LinkToHome/>
                       <LinkToChat/>
                       <LinkToRanking/>   
                       <LinkToLogin/>
                    </ul>
                </div>
            </header>
            <body>
              <div className="profile-divAll">
                <div className="profile-divTitle">
                  プロフィール
                  <div className="profile-divForButton">
                    <div
                    className="profile-button"
                    onClick={(e) => onClick(e)}>編集</div>
                  </div>
                </div>
                <div className="div-box">
                  <div className="profile-divProfile">
                    <div className="profile-divComponent">ユーザー名: {profile.username}</div>
                    <div className="profile-divComponent">ニックネーム: {profile.nickname}</div>
                    <div className="profile-divComponent">自己紹介: {profile.introduction}</div>
                  </div>
                </div>
              </div>
            </body>    
          </div>
        )}else{
          return(
            <div></div>
          )
        }
}

export default FetchProfile