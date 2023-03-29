import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../minigame/CalGame.css";

function CalculationGame() {
  const [currentMoney, setcurrentMoney] = useState(
    String(Math.floor(Math.random() * 100)) + "00"
  );
  const [currentFood, setcurrentFood] = useState(
    String(Math.floor(Math.random() * 100)) + "00"
  );
  const [score, setScore] = useState(0);
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const correctAnswer = parseInt(currentMoney) + parseInt(currentFood);
    if (parseInt(value) === correctAnswer) {
      setScore(score + 1);
      setcurrentMoney(value);
    }
    // setNum1(value);
    setcurrentFood(String(Math.floor(Math.random() * 100) + "00"));
    setValue("");
  }

  const [timeLeft, setTimeLeft] = useState(5000);
  const navigate = useNavigate();

  // 미니 게임끝났을 때, 결과 값 백한테 주기
  // const handleFinishGame = e => {
  //   const message = JSON.stringify(e);
  //   stompClient.send(
  //     "/stations/{station-id}/minigame/{game-id}/progress",
  //     {},
  //     message
  //   );
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (timeLeft === 0) {
      // handleFinishGame({result:'맞춘갯수'})
      navigate("/pvp/result");
    }
  }, [timeLeft, navigate]);

  return (
    <div className="minigame-cal">
      <h1 className="minigame-cal-Headline">회식비 정산하기!</h1>
      <div className="minigame-cal-timer">{timeLeft}</div>
      <div className="minigame-cal-score-board">
        <p>맞힌 갯수: {score}</p>
        <div className="minigame-cal-currentmoney">
          <div>현재 정산금:{currentMoney}원</div>

          <div className="minigame-cal-currentfood">
            + 짜장면: {currentFood}원
          </div>
        </div>
        <div className="minigame-cal-money-value">= {value}원</div>
      </div>
      {/* <p>You selected: {value}</p> */}
      <div className="minigame-cal-select">
        <div className="minigame-cal-select-number">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((a, i) => {
            return (
              <button
                className="minigame-cal-btn"
                key={a}
                onClick={() => setValue(value + a)}
              >
                {a}
              </button>
            );
          })}
        </div>
      </div>
      <div className="minigame-cal-select-submit">
        <button className="minigame-cal-clear-btn" onClick={() => setValue("")}>
          모두 지우기
        </button>
        <form onSubmit={handleSubmit} className="minigame-cal-submit">
          <button className="minigame-cal-submit-btn" type="submit">
            확인
          </button>
        </form>
      </div>
      {/* <div className="minigame-pixelart-crab"></div> */}
      <div className="minigame-cal-pixelart-metamong"></div>
    </div>
  );
}

export default CalculationGame;
