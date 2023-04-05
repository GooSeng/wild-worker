import * as React from "react";
import BattleCharLoser from "../components/battle/battleCharLoser";
import battleDialogImg from "../asset/image/battleTalk.png";
import { useNavigate } from "react-router-dom";
import BattleCharWinner from "../components/battle/battleCharWinner";
import "./ResultPage.css";
import BattleCharType from "../components/battle/battlecharacterType";

function ResultPage(props) {
  const matchingData = props.matchingData;
  const gameResultData = props.gameResultData;
  // console.log(gameResultData);
  const userData = props.userData;
  // console.log(userData);
  // console.log(userData);

  // const matchingData = {
  //   id: 1,
  //   cost: 20,
  //   runCost: 5,
  //   enemy: {
  //     name: "권태형",
  //     title: "신도림역의 지배자",
  //     characterType: 1,
  //     relativeStrength: 0,
  //   },
  //   timeLimit: 5,
  // };
  // const userData = {
  //   characterType: 0,
  //   coin: 0,
  //   collectedPapers: 0,
  //   name: "이름바꿔",
  //   title: { id: 1, name: "x" },
  //   titleType: 0,
  // };

  // const gameResultData = {
  //   winner: false,
  //   enemy: {
  //     name: "권태형",
  //     title: "신도림의 지배자",
  //     characterType: 1,
  //   },
  //   result: {
  //     me: 12,
  //     enemy: 11,
  //   },
  //   receipt: {
  //     cost: -20,
  //     runCost: 0,
  //     reward: 40,
  //     commission: -2,
  //     total: 18,
  //   },
  // };

  // const winner = gameResultData.winner;

  const navigate = useNavigate();

  function handleTouchStart(event) {
    // 다음 페이지로 이동하는 로직을 작성합니다.
    navigate("/pvp/receipt");
    console.log("go to receiptPage");
  }
  return (
    <div className="Pvp-Result">
      <div className="battle-result-1">
        {/* 본인 */}
        <p className="battle-result-p1">
          {userData.title.name === "x" ? "" : userData.title.name} <br />{" "}
          {userData.name}
        </p>
        <div className="battle-result-char">
          {/* 승리 패배시 컴포넌트 분리 */}
          {gameResultData ? (
            {
              true: <BattleCharWinner characterType={userData.characterType} />,
              false: <BattleCharLoser characterType={userData.characterType} />,
            }[gameResultData.winner]
          ) : (
            <BattleCharType characterType={userData.characterType} />
          )}
        </div>
        {/* 승리했을때 패배했을때 분리하기 */}
        {gameResultData ? (
          {
            true: <p className="battle-result-win-p2">승리</p>,
            false: <p className="battle-result-lose-p2">패배</p>,
          }[gameResultData.winner]
        ) : (
          <p className="battle-result-win-p2">대기</p>
        )}

        <div className="battle-result-p3">
          맞춘 개수: {gameResultData ? gameResultData.result.me : ""}개
        </div>
      </div>

      <div className="battle-result-2">
        {/* 적 */}
        <p className="battle-result2-p1">
          {matchingData.enemy.title === "x" ? "" : matchingData.enemy.title}
          <br /> {matchingData.enemy.name}
        </p>
        <div className="battle-result2-char">
          {/* 승리 패배시 분리 */}
          {gameResultData ? (
            {
              false: (
                <BattleCharWinner
                  characterType={matchingData.enemy.characterType}
                />
              ),
              true: (
                <BattleCharLoser
                  characterType={matchingData.enemy.characterType}
                />
              ),
            }[gameResultData.winner]
          ) : (
            <BattleCharType characterType={matchingData.enemy.characterType} />
          )}
        </div>

        {/* 승리 패배시 분리 */}
        {gameResultData ? (
          {
            false: <p className="battle-result2-win-p2">승리</p>,
            true: <p className="battle-result2-lose-p2">패배</p>,
          }[gameResultData.winner]
        ) : (
          <p className="battle-result2-lose-p2">대기</p>
        )}

        <div className="battle-result2-p3">
          맞춘 개수: {gameResultData ? gameResultData.result.enemy : ""}개
        </div>
      </div>

      <div className="battleResult-talk">
        <img
          onTouchStart={handleTouchStart}
          src={battleDialogImg}
          alt="battleDialogImg"
        />
        {/* 승리했을때 패배했을때 컴포넌트로 분리하기 */}
        {gameResultData ? (
          {
            true: <p className="battleResult-talk-p">결투에서 승리했다!!!!</p>,
            false: <p className="battleResult-talk-p">결투에서 패배했다...</p>,
          }[gameResultData.winner]
        ) : (
          <p className="battleResult-talk-p">...</p>
        )}
      </div>
    </div>
  );
}

export default ResultPage;
