import { useEffect, useRef, useState } from "react";

const Main = ({
  numbers,
  count,
  setCount,
  score,
  setScore,
  setGameStatus,
  gameStatus,
}) => {
  const [activeCard, setActiveAcrd] = useState([]);
  const clickAudioRef = useRef();

  const handleCard = (e, items) => {
    setActiveAcrd(() => [...activeCard, items]);
    e.target.parentElement.classList.add("active");
    clickAudioRef.current.play();
  };
  useEffect(() => {
    if (activeCard.length != 0 && activeCard[0] == activeCard[1]) {
      setActiveAcrd([]);
      setScore(() => score + 1);
      score == 7
        ? setTimeout(() => {
            setGameStatus("win");
          }, 1000)
        : setGameStatus("playing");
    } else if (activeCard.length >= 2 && activeCard[0] != activeCard[1]) {
      for (let i = 0; i < activeCard.length; i++) {
        setTimeout(() => {
          console.log(i);
          document
            .querySelector(`.card${activeCard[i]}.active`)
            ?.classList.remove("active");
          setActiveAcrd([]);
          console.log("check false", `.card${activeCard[i]}`);
          setCount(() => count - 1);
          count <= 0 ? setGameStatus("over") : setGameStatus("playing");
        }, 800);
        console.log(gameStatus);
      }
    }
  }, [activeCard]);

  return (
    <>
      <div className="game-cards">
        {numbers &&
          numbers.map((items, index) => {
            return (
              <div
                key={index}
                className={`card card${items}`}
                onClick={(e) => handleCard(e, items)}
              >
                <img
                  className="initial"
                  src={process.env.PUBLIC_URL + "/images/initial.png"}
                  alt="question mark"
                />
                <img
                  className="rotate"
                  src={process.env.PUBLIC_URL + `/images/${items}.png`}
                  alt="image"
                />
              </div>
            );
          })}
        <audio
          id="audio1"
          ref={clickAudioRef}
          src={process.env.PUBLIC_URL + "/audio/click.mp3"}
        ></audio>
      </div>
    </>
  );
};
export default Main;
