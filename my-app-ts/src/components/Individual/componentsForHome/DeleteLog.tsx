import React from "react";

type Props = {
    id : string,
}

const DeleteLog : React.FC<Props> = ({id}) => {

    //delete関数
    const onClickDelete = async(e:React.MouseEvent<HTMLButtonElement>) => {

        try {
            const result = await fetch("https://hackathon-vfujicgnka-uc.a.run.app/remove/contribute", {
              method: "POST",
              body: JSON.stringify({
                id: id
              }),
            });
            if (!result.ok) {
              throw Error(`Failed to delete chat`);
            }

            window.location.reload();
  
          } catch (err) {
            console.error(err);
          }
      }
    

    return(
      <div>
        <button
          className="home-logButton"
          onClick={(e) => onClickDelete(e)}>取消</button>
      </div>
        
    )
}

export default DeleteLog