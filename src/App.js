import React, { useState, useEffect } from 'react';
import fruitItems from './fruits.json';
import './App.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = () => {
    // For simplicity, let's assume any username/password is valid
    if (username === 'admin' && password === '1234') {
      onLogin(username);
    } else {
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

function Card({ fruit, flipped, chooseCard }) {
  const cardClickHandle = () => {
    chooseCard(fruit);
  };

  return (
    <div className={`card ${flipped ? 'matched' : ''}`} onClick={cardClickHandle}>
      <img style={{ transform: "rotateY(180deg)" }} src={fruit.src} alt={fruit.name} />
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4"></path>
        <line x1="12" y1="19" x2="12" y2="19.01"></line>
      </svg>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [fruits, setFruits] = useState([]);
  const [turns, setTurns] = useState(0);
  const [fruitOne, setFruitOne] = useState(null);
  const [fruitTwo, setFruitTwo] = useState(null);
  const [gameOver, setGameOver] = useState(false); // New state for tracking game over

  const chooseCard = (fruit) => {
    fruitOne ? setFruitTwo(fruit) : setFruitOne(fruit);
    setTurns((prevTurns) => prevTurns + 1);
  };

  const initGame = () => {
    const allFruits = [...fruitItems, ...fruitItems]
      .sort(() => Math.random() - .5)
      .map((item) => ({ ...item, id: Math.random() }))
    setFruits(allFruits);
    setGameOver(false); // Reset game over status when starting a new game
  };

  const resetGame = () => {
    setFruits(prevFruits => {
      return prevFruits.map(item => {
        if (item.matched) {
          return { ...item, matched: false }
        }

        return item
      })
    })

    setFruitOne(null)
    setFruitTwo(null)
    setTurns(0);

    setTimeout(() => {
      initGame()
    }, 500)
  }

  useEffect(() => {
    // Check if all fruits are matched to end the game
    // if (fruits.every((fruit) => fruit.matched) && !gameOver) {
    //   setGameOver(true); // Set game over status to true
    //   alert('Congratulations! You have matched all the cards! You can now reset your game by clicking on the reset button.');
    // }

    // Check if two fruits are chosen
    if (fruitOne && fruitTwo) {
      if (fruitOne.src === fruitTwo.src) {
        setFruits(prevFruits => {
          return prevFruits.map(item => {
            if (item.src === fruitOne.src) {
              return { ...item, matched: true }
            } else {
              return item
            }
          })
        })
      }

      setTimeout(() => {
        setFruitOne(null)
        setFruitTwo(null)
      }, 500)
    }
  }, [fruitTwo, fruitOne, fruits, gameOver])

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>Welcome, {username}</h1>
          <h3>Turns: {turns}</h3>
          {fruits.length ? (
            <>
              <button className='reset' onClick={resetGame}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1.002 7.935 1.007 9.425 4.747"></path>
                  <path d="M20 4v5h-5"></path>
                </svg>
              </button >
              <div className="game-block">
                {fruits.map((fruit, key) => (
                  <Card
                    key={key}
                    chooseCard={chooseCard}
                    flipped={fruit === fruitOne || fruit === fruitTwo || fruit.matched}
                    fruit={fruit}
                  />
                ))}
              </div>
            </>
          ) : (
            <button className='start-game' onClick={initGame}>
              Start Game
            </button>
          )}
        </>
      ) : (
        <div>
          <Login onLogin={setIsLoggedIn} />
        </div>
      )}
    </>
  );
}

export default App;
