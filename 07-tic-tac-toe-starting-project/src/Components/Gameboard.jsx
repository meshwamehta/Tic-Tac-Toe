
{/*This is multidimensional array that represents game's box */}
const initialGameboard=[
    [null,null,null],
    [null,null,null],
    [null,null,null]
];
/*square and player information is fetched from handlesquare function in APP file */
export default function GameBoard({onSelectSquare,turns}){
    let gameBoard=initialGameboard;
    for(const turn of turns){
        const {square, player}=turn;
        const {row,col}=square;
        gameBoard[row][col]=player;
        
    }
    //const [gameBoard,setGameboard]=useState(initialGameboard);

    // ----------------
    // as usestate is an array we have to change it as immutabl way
    // so intead of just updating that array will make copy of array and 
    // make changes to that copy here we use map method to copy multi-dimension
    // array.here handleSelectSquare will assign playersymbol based on who activePlayer is
    //this activeplayer contains the symbol of player and after updating box I change the players'
    //turn by calling onSelectSquare fun
    // ---------------
    /*function handleSelectSquare(rowIndex,colIndex){
        setGameboard((prevGameBoard)=>{
            const updatedBoard=[...prevGameBoard.map(innerArray=>[...innerArray])];
            if(updatedBoard[rowIndex][colIndex]===null){
                updatedBoard[rowIndex][colIndex]=activePlayer;
                return updatedBoard;
            }
            else{
                alert("Can not change value you lost your chance");
                return(gameBoard);
            }

        })
        onSelectSquare();
    }*/
    return(
        <ol id="game-board">
            {/*here I fetched multi-dimensional array with the help of map
            row represnts individual arrays */}
            {gameBoard.map((row, rowIndex)=><li key={rowIndex}>
                <ol>
                    {row.map((playerMarks,colIndex)=> 
                    <li key={colIndex}>
                        {/*<button onClick={()=>handleSelectSquare(rowIndex,colIndex)}>{playerMarks}</button>*/}
                        {/*disabled is use to make sure that user cant click on button which is already selected by user */}
                        <button 
                            onClick={()=>onSelectSquare(rowIndex,colIndex)} 
                            disabled={playerMarks!==null}
                        >
                        {playerMarks}
                        </button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    )
}