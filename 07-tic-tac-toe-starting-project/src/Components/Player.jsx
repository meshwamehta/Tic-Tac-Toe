import { useState } from "react";
export default function Player({playerName,playerSymbol}){
    {/*Here default editing stage is false it will only become true when
    user click on Edit button */}
    const [isEditing,setEditing]=useState(false);
    {/*below written useState to get edited player name from input  */}
    const [currentPlayerName,setPlayerName]=useState(playerName);

    function editclickHandler(e){
        {/*This is the best practise to change state with boolean opposite */}
        console.log(e.target.value);
        setEditing((isEditing)=>!isEditing);
    }
    {/**this handler will exucute when there is some change happenf in input value
    event parameter is an object */}
    function changeHandler(event){
        console.log(event);
        setPlayerName(event.target.value);
    }
    {/*This conditional statement to select what to show 
    editbutton will also change onclick event*/}
    let playerContent=<span className="player-name">{currentPlayerName}</span>;
    let editButton="Edit";
    if(isEditing){
        playerContent=<input type="text" value={currentPlayerName} onChange={changeHandler} required />;
        editButton="Save";

    }
    return(
        <li>
            <span className="player">
                {/*This is turnury operation to used for if else condition
                but here it doesnotmake code clean so will use another method
                !isEditing ? (<span className="player-name">{playerName}</span>) : (<input>Enter Name</input>)*/}
                {playerContent}
                <span className="player-symbol">{playerSymbol}</span>
            </span>
            <button onClick={editclickHandler}>{editButton}</button>
        </li>
    )
}