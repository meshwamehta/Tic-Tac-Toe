import { useState } from 'react';
import Player from './Components/Player';
import GameBoard from './Components/Gameboard';
import Log from './Components/Log';
import GameOver from './Components/Gameover';
import { WINNING_COMBINATIONS } from './winning-combinations';
const PLAYERS={
  X : "Player 1",
    O: "Player 2"
};
{/*This is multidimensional array that represents game's box */}
const initialGameboard=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
];
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
function deriveWinner(gameBoard,playerInfo){
  let winner;
  /* this for loop is use to identify the winner base on predefined combinations
  if the 3 squre in same line has similar symbol that player is winner*/
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner=playerInfo[firstSquareSymbol];
    }
  }
  return winner;
}
function deriveGameBoard(currentTurn){
  let gameBoard=[...initialGameboard.map((array)=>[...array])];
  for(const turn of currentTurn){
      const {square, player}=turn;
      const {row,col}=square;
      gameBoard[row][col]=player;
  }
  return gameBoard;
}
function App() {
  //const [presentPlayer,setSelectsquare]=useState('X');
  // const [playerInfo,setPlayerInfo]=useState(
  //   {X : "Player 1",
  //   O: "Player 2"}
  // );
  const [playerInfo,setPlayerInfo]=useState(PLAYERS);
  const [currentTurn,setGameTurn]=useState([]);
  const activePlayer=deriveActivePlayer(currentTurn);
 
  /*square and player information is fetched from handlesquare function in APP file */
 /*This gameboard operation is moved from gameboard file to here as we needed
 turn and player information to check for winner */
 /*initialGameboard.map((array) => [...array]): The map function is used to iterate over each sub-array (array) in initialGameboard.
  For each sub-array, [...array] is used to create a shallow copy. This spread syntax ... is used to clone the elements of the array.
   So, the result of this part is a new array where each sub-array is a shallow copy of the corresponding sub-array in initialGameboard.
[...initialGameboard.map((array) => [...array])]: The entire expression is using the spread syntax again [...] to create a new array. 
The elements of this array are the shallow copies of the sub-arrays from initialGameboard. Therefore, newGameboard is a new 2D array that is a shallow copy of initialGameboard. */
  // let gameBoard=[...initialGameboard.map((array)=>[...array])];
  //   for(const turn of currentTurn){
  //       const {square, player}=turn;
  //       const {row,col}=square;
  //       gameBoard[row][col]=player;
  //   }
 
  /*let winner;
  /* this for loop is use to identify the winner base on predefined combinations
  if the 3 squre in same line has similar symbol that player is winner
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner=playerInfo[firstSquareSymbol];
    }
  }*/
  const gameBoard=deriveGameBoard(currentTurn);
  const winner=deriveWinner(gameBoard,playerInfo);
  /*To check for draw if all nine boxes are filled and still no one won then its draw
  this currentTurn.lentgh represent how many turns competed */
  const hasDraw=currentTurn.length===9 && !winner;
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
  /*to reset the game and clear all squares */
  function handleRematch(){
    setGameTurn([]);
  }
  /*this []: is the way to show property in js as 
  at time only one name changed I used deep copy method to change player name*/
  function handlePlayer(symbol,newName){
    setPlayerInfo(prevPlayers => {
      return(
         { ...prevPlayers,
          [symbol]: newName}

        )
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
          <Player playerName={PLAYERS.X} playerSymbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayer}></Player>
          <Player playerName={PLAYERS.O} playerSymbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayer} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch}/>}
        {/*GameBoard component has 2 props one is onSelectSquare that 
          holds handleSquare func and activePlayer is use to mark square 
          with playerSymbol */}
        <GameBoard onSelectSquare={handleSquare} board={gameBoard}/>
        <Log turns={currentTurn}/>
      </div>
    </main>
  )
}


export default App
