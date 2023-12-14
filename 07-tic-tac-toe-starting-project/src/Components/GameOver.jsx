export default function GameOver({winner,onRematch}){
    return(
        <div id='game-over'>
            <h2>Game Over!</h2>
            {winner && <p>{winner} Won!</p>}
            {!winner && <p>It's Draw</p>}
            {/*<p><button onClick={()=>window.location.reload(false)}>Rematch!</button></p>*/}
            <p><button onClick={onRematch}>Rematch!</button></p>
        </div>
    );
}