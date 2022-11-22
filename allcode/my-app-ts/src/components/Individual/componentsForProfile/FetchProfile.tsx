import React, {useState, useEffect} from "react";
import EditProfile from "./EditProfile"

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

    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
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
          <div className="profile-divAll">
            <div className="profile-divTitle">
                プロフィール
            </div>
            <ul className="profile-ulProfile">
              <div className="profile-divComponent">ユーザー名: {profile.username}</div>
              <div className="profile-divComponent">ニックネーム: {profile.nickname}</div>
              <div className="profile-divComponent">自己紹介: {profile.introduction}</div>
            </ul>    
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
          <div className="profile-divAll">
            <div className="profile-divTitle">
                プロフィール
            </div>
            <ul className="profile-ulProfile">
              <div className="profile-divComponent">ユーザー名: {profile.username}</div>
              <div className="profile-divComponent">ニックネーム: {profile.nickname}</div>
              <div className="profile-divComponent">自己紹介: {profile.introduction}</div>
            </ul>
            <div className="profile-divButton">
              <button 
              className="profile-button"
              onClick={(e) => onClick(e)}>編集</button>
            </div>    
          </div>
        )}else{
          return(
            <div></div>
          )
        }
}

export default FetchProfile