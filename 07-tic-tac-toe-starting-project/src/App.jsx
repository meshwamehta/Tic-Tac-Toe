import Player from './Components/Player';
function App() {
  

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          {/*As here li was repeatative element with span and button
          I have created component for that named Player in which I have 
          passed player Name and symbol as prop */}
          <Player playerName="Player 1" playerSymbol="X"></Player>
          <Player playerName="Player 2" playerSymbol="O" />
        </ol>
      </div>
    </main>
  )
}

export default App
