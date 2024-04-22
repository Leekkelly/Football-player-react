import React, { useState } from 'react';
import './App.css';

function App() {
  const [playerName, setPlayerName] = useState('');
  const [playerData, setPlayerData] = useState(null);
  console.log(playerName);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`);
      const data = await response.json();
      setPlayerData(data.player);
      console.log(data.player);
    } catch (error) {
      console.error('Error fetching player data:', error); 
    }
  };

  return (
    <div className='page'>
      <h1>Football Player Search</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter player name:
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {playerData && (
        <div >
          <h2>Player Details</h2>
          <img src={playerData[0].strCutout} alt="Player" />
          <p>Name: {playerData[0].strPlayer}</p>
          <p>Position: {playerData[0].strPosition}</p>
          <p>Team: {playerData[0].strTeam}</p>
        </div>
      )}
    </div>
  );
}

export default App;
