import { useState } from 'react';
import Player from './Components/Player';
import GameBoard from './Components/Gameboard';
import Log from './Components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
/* --------------------
 in this game whenewhere user click square we dont want only player symbol but
 I also want to show which user is clickimg it by adding css in playerjsx file
 as we have to change 2 different component same time we have to define useState in APP component 
 ---------------------------------------------------------
 this deriveactiveplayer function is helper function that is used to reduce use of useState here instead of using
 usestate for changing symbols X and O  */
function deriveActivePlayer(currentTurn){
  let currentPlayer='X';
  if(currentTurn.length>0 && currentTurn[0].player==='X'){
    currentPlayer='O';
  }
  return currentPlayer;
}
function App() {
  //const [presentPlayer,setSelectsquare]=useState('X');
  const [currentTurn,setGameTurn]=useState([]);
  const activePlayer=deriveActivePlayer(currentTurn);
  console.log(activePlayer);
  /*here I am changing intialSelectedSquare symbols */
  function handleSquare(rowIndex,colIndex){
    //setSelectsquare((initialSquare)=>(initialSquare==='X' ? 'O' :'X'));
    /*in updatedTurn I am storing the array of turns with other values like which player clicked on which square
      which can be find by knowing row and col , ...prevTurn is use to concate arrays */
    setGameTurn((prevTurn)=>{
      const presentPlayer=deriveActivePlayer(prevTurn);
      //this code is used when this [presentPlayer,setSelectsquare]=useState('X') was used as we can not derived active player from 
      //turn state I used if statement
      // let presentPlayer='X';
      // if(currentTurn.length>0 && currentTurn[0].player==='X'){
      //   presentPlayer='O';
      // }
        const updatedTurn=[{square : {row:rowIndex,col:colIndex},player:presentPlayer},...prevTurn];
      return updatedTurn;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          {/*As here li was repeatative element with span and button
          I have created component for that named Player in which I have 
          passed player Name and symbol as prop
          isActive prop is used to place className active in player.jsx file
           in order to highlight which player is clicking button */}
          <Player playerName="Player 1" playerSymbol="X" isActive={activePlayer==='X'}></Player>
          <Player playerName="Player 2" playerSymbol="O" isActive={activePlayer==='O'}/>
        </ol>
        {/*GameBoard component has 2 props one is onSelectSquare that 
          holds handleSquare func and activePlayer is use to mark square 
          with playerSymbol */}
        <GameBoard onSelectSquare={handleSquare} turns={currentTurn}/>
        <Log turns={currentTurn}/>
      </div>
    </main>
  )
}


export default App
