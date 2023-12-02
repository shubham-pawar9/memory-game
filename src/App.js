import logo from "./logo.svg";
import "./App.css";
import Main from "./component/Main";
import { useEffect, useState } from "react";
function App() {
  const [jsonData, setJsonData] = useState([]);
  const [count, setCount] = useState(10);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("start");
  const [numbers, setNumbers] = useState(
    Array.from({ length: 8 }, (_, index) => index + 1)
  );
  const handlePlayGame = () => {
    const newArray = [...numbers];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    setNumbers(newArray);
    setGameStatus("playing");
  };
  useEffect(() => {
    setNumbers(() => numbers.concat(numbers));
  }, []);

  const handleCloseGame = () => {
    setGameStatus("start");
    setScore(0);
    setCount(10);
  };
  useEffect(() => {
    console.log(gameStatus);
  }, [gameStatus]);
  return (
    <div className="App">
      <div className="game-div">
        {gameStatus == "start" && (
          <div className="play-div">
            <button className="play-btn" onClick={handlePlayGame}>
              Play Game
            </button>
          </div>
        )}

        {gameStatus == "playing" && (
          <>
            <div className="heading-div">
              <span className="game-score">Score- {score}</span>
              <span className="game-limit">Play Limits- {count}</span>
            </div>
            <Main
              numbers={numbers}
              score={score}
              setScore={setScore}
              count={count}
              setCount={setCount}
              setGameStatus={setGameStatus}
              gameStatus={gameStatus}
            />
          </>
        )}
        {gameStatus == "over" && (
          <div className="game-status">
            <img
              className="close-status"
              src={process.env.PUBLIC_URL + "/images/close.png"}
              alt="close"
              onClick={handleCloseGame}
            />
            <img
              className="game-status-img"
              src={process.env.PUBLIC_URL + "/images/game-over.png"}
              alt="game-over"
            />
          </div>
        )}
        {gameStatus == "win" && (
          <div className="game-status">
            <img
              className="close-status"
              src={process.env.PUBLIC_URL + "/images/close.png"}
              alt="close"
              onClick={handleCloseGame}
            />
            <div>
              <span className="game-score">Score -{score}</span>
            </div>
            <div className="stars-div">
              <img
                className="star-img"
                src={process.env.PUBLIC_URL + "/images/star.gif"}
                alt="game-over"
              />
              <img
                className="star-img"
                src={process.env.PUBLIC_URL + "/images/star.gif"}
                alt="game-over"
              />
              <img
                className="star-img"
                src={process.env.PUBLIC_URL + "/images/star.gif"}
                alt="game-over"
              />
            </div>
            <img
              className="game-status-img"
              src={process.env.PUBLIC_URL + "/images/trophy.gif"}
              alt="game-over"
            />

            <div>
              <span className="game-win">You Win</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
