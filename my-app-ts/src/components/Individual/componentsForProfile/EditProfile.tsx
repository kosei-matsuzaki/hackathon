import React, {useState} from "react";

type Props = {
    profile:{
      username : string,
      nickname : string,
      introduction : string
    }
}

const EditProfile : React.FC<Props> = ({profile}) => {

    const [nickname, setNickname] = useState(profile.nickname)
    const [introduction, setIntroduction] = useState(profile.introduction)

    //onChange関数
    const onChangeNickname = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value)
    }
    const onChangeIntroduction = (e:React.ChangeEvent<HTMLInputElement>) => {
        setIntroduction(e.target.value)
    }

    //onClick関数
    const onClick = async(e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        
        //@ts-ignore
        if ([...nickname].length > 50) {
          alert("ニックネームは５０文字未満にしてください");
          return;
        }
        //@ts-ignore
        if ([...introduction].length > 200) {
          alert("自己紹介文は２００文字未満にしてください");
          return;
        }
        try{
            const result = await fetch("https://hackathon-vfujicgnka-uc.a.run.app/edit/profile?username=" + profile.username ,{
              method: "POST",
              body: JSON.stringify({
                nickname: nickname,
                introduction: introduction
              }),
            });
            if (!result.ok) {
              throw Error(`Failed to send chat`);
            }
            setNickname("")
            setIntroduction("")
            window.location.reload();
  
          } catch (err) {
            console.error(err);
        }
    }

    return(
    <div>
      <header>
        <h1 className="h1">Contribute</h1>
      </header>
      <body>
      <div className="profile-divAll">
        <div className="profile-divTitle">
          プロフィール
            <div className="profile-divForButton">
              <div 
              className="profile-button"
              onClick={(e) => onClick(e)}>編集完了
              </div>
            </div>
        </div>
          <div className="div-box">
            <div className = "profile-divProfile">
              <div className="profile-divComponent">
                <div className="profile-divName">ユーザー名</div>
                <div className="profile-divText">{profile.username}</div>
              </div>
              <div className="profile-divComponent">
                      <div className="profile-divName">ニックネーム</div>
                      <div className="profile-divText">
                        <input
                        className="profile-input"
                        placeholder="ニックネームを入力してください"
                        type="text"
                        value={nickname}
                        onChange={(e) => onChangeNickname(e)}
                        />
                      </div>
              </div>
              <div className="profile-divComponent">
                      <div className="profile-divName">自己紹介</div>
                      <div className="profile-divText">
                        <input
                        className="profile-input"
                        placeholder="自己紹介文を入力してください"
                        type="text"
                        value={introduction}
                        onChange={(e) => onChangeIntroduction(e)}
                        />
                      </div>
              </div>
            </div>    
          </div>       
        </div>
        </body>
      </div>
    )
}

export default EditProfile