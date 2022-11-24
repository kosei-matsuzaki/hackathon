import React from "react";

type Props = {
    id : string,
    fetchChat : () => Promise<void>
}

const DeleteChat : React.FC<Props> = ({id, fetchChat}) => {

    //delete関数
    const onClickDelete = async(e:React.MouseEvent<HTMLButtonElement>) => {
      
        if(!window.confirm("削除しますか？")){
        return;
        }

        try {
            const result = await fetch("https://hackathon-vfujicgnka-uc.a.run.app/remove/chat", {
              method: "POST",
              body: JSON.stringify({
                id: id
              }),
            });
            if (!result.ok) {
              throw Error(`Failed to delete chat`);
            }

            fetchChat();
  
          } catch (err) {
            console.error(err);
          }
      }
    

    return(
        <button 
          className="chat-buttonDelete"
          onClick={(e) => onClickDelete(e)}>削除</button>
    )
}

export default DeleteChat