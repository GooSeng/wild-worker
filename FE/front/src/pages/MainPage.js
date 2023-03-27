import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainPage.css";

import SubwayBoard from "../components/mainpage/SubwayBoard";
import GetCoinItem from "../components/mainpage/GetCoinItem";
import Modal from "../components/mainpage/Modal";
import MenuBar from "../components/mainpage/MenuBar";

import character_man from "../asset/image/moving_man.gif";
import character_woman from "../asset/image/moving_woman1.gif";
import goMap from "../asset/image/goMap.png";
import getCoinImage from "../asset/image/get_coin_btn.png";
import getCoinFullImage from "../asset/image/Full_Charge_Btn.png";
import LoadingEffect from "../asset/image/pvpPageLoading.gif";
import morningBackgroundImg from "../asset/image/test_morning.png";

function MainPage(props) {
  // socket 인스턴스 상속
  const stompClient = props.stompClient;
  const navigate = useNavigate();

  const dominatorComeData = props.dominatorComeData;
  const dominatorMessageData = props.dominatorMessageData;
  const locationData = props.locationData;
  const manualMiningData = props.manualMiningData;
  const autoCoinData = props.autoCoinData;
  const manualCoinData = props.manualCoinData;
  const gameCostData = props.gameCostData;
  const runCostData = props.runCostData;
  const gameRewardData = props.gameRewardData;
  const investCostData = props.investCoFstData;
  const investRewardData = props.investRewardData;
  const changeTitleData = props.changeTitleData;

  // 수동 채굴한 갯수 데이터 받아서 coinCntData에 넣으면 됨
  let coinCntData = props.manualMiningData;

  const [isReady, setIsReady] = React.useState(false); // 비동기 오류 방지
  const [isEnough, setIsEnough] = React.useState(false); // 수동채굴 수집량 달성 여부 확인
  const [coinCnt, setCoinCnt] = React.useState(coinCntData); // 수동채굴 아이템 수집량
  const [getCoinClick, setGetCoinClick] = React.useState(false); // 수집량 만족 후 클릭 여부
  const [modalClick, setModalClick] = React.useState(false); // 메인페이지의 메뉴 클릭 여부
  const [selectIdx, setSelectIdx] = React.useState(0); // 모달창에 띄울 컨텐츠 인덱스
  const [isToggled, setIsToggled] = React.useState(false);
  const [pvpRouterClick, setPvpRouterClick] = React.useState(false); // pvp 로딩 테스트 버튼

  // 유저 관련 정보
  const [badge, setBadge] = React.useState("쫄보");
  const [nickname, setNickname] = React.useState("우주최강원석");
  const [coin, setCoin] = React.useState(1500);
  const [gender, setGender] = React.useState(1);
  const genderList = [character_man, character_woman];

  // 매칭 잡혔을 때의 로딩 이펙트 테스트용 함수
  function pvpRouterClickHandler() {
    setPvpRouterClick(true);
    const targetTag = document.getElementsByClassName("subway-background")[0];
    const blackBackgroundTag = document.createElement("div");
    setTimeout(() => {
      setPvpRouterClick(false);
      blackBackgroundTag.classList.add("black-background");
      targetTag.appendChild(blackBackgroundTag);
    }, 700);
    setTimeout(() => {
      navigate("/pvp");
    }, 1200);
  }

  // socket : 서류 수집량 조건 만족 -> 제출
  const handleGetCoin = () => {
    const message = "가방 - back요청대로 보내야함";
    stompClient.send("/pub/system/mining/sell", {}, message);
  };

  // socket : 서류클릭 신호 송신
  const handleGetCnt = () => {
    const message = "서류 - back요청대로 보내야함";
    stompClient.send("/pub/system/mining/collect", {}, message);
  };

  // GetCoinItem.js에 props로 내리는 함수
  // 서류를 클릭할때마다 이 함수를 실행함
  function setCoinCntHandler() {
    setCoinCnt((prevCnt) => {
      if (prevCnt < 384) {
        setIsEnough(false);
        handleGetCnt();
      } else if (prevCnt === 384) {
        setIsEnough(true);
        handleGetCnt();
      } else if (prevCnt > 384) {
        setIsEnough(true);
      }
      return prevCnt;
    });
  }

  // app.js에서 수동채굴 최신 데이터의 변화가 감지되었을 때
  // coinCnt(화면에 렌더링되는 수집량)을 최신값으로 갱신
  React.useEffect(() => {
    setCoinCnt(manualMiningData);
  }, [manualMiningData]);

  // 수동 채굴 아이템 수집량에 따른 버튼 이미지 변환
  React.useEffect(() => {
    // 수동채굴 아이템 수집량 조건을 만족하고, 바뀐 버튼을 클릭했을 때
    function clickEventHandler(event) {
      if (event.target.style.animationName === "click") {
        event.target.style.animationPlayState = "paused";
        event.target.style.animationName = "none";
        setTimeout(() => {
          event.target.style.animationName = "click";
          event.target.style.animationPlayState = "running";
        }, 10);
      } else {
        event.target.style.animation = "click 1s ease-out";
      }
      event.target.removeEventListener("click", clickEventHandler);
      setTimeout(() => {
        setIsEnough(false); // 수집 버튼 되돌리기
        setCoinCnt(0); // dummy data 나중에 소켓으로 0 돌려줌
        setGetCoinClick(true); // 전광판에 돈 갱신 이펙트 발생시키는 트리거
        handleGetCoin(); // 소켓으로 수집량 달성 신호 송신
      }, 1000);
    }

    const getCoinBtnTag = document.getElementsByClassName("get-coin-btn")[0];
    if (isEnough) {
      getCoinBtnTag.style.backgroundImage = `url(${getCoinFullImage})`;
      getCoinBtnTag.addEventListener("click", clickEventHandler);
    } else {
      getCoinBtnTag.style.backgroundImage = `url(${getCoinImage})`;
    }
  }, [isEnough]);

  React.useEffect(() => {
    setIsReady(true);

    // 06 ~ 16시는 아침 이미지
    // 17 ~ 05시는 밤 이미지
    let today = new Date();
    let hours = today.getHours();
    if (5 < hours && hours < 17) {
      const backgroundTag = document.querySelector(".subway-background");
      backgroundTag.style.backgroundImage = `url(${morningBackgroundImg})`;
    }
  }, []);
  return (
    <div className="subway-background">
      <SubwayBoard
        getCoinClick={getCoinClick}
        setGetCoinClick={setGetCoinClick}
        badge={badge}
        setBadge={setBadge}
        nickname={nickname}
        coin={coin}
        setCoin={setCoin}
        station={locationData.current ? locationData.current.name : "역이 아님"}
        dominator={
          locationData.current ? locationData.current.dominator : "없음"
        }
      />
      <div className="subway">
        {modalClick && (
          <Modal
            modalWidth={85}
            modalHeight={75}
            selectModalIdx={selectIdx}
            setModalClick={setModalClick}
            nickname={nickname}
            setNickname={setNickname}
            badge={badge}
            setBadge={setBadge}
            isToggled={isToggled}
            setIsToggled={setIsToggled}
            gender={gender}
            setGender={setGender}
          />
        )}
        {pvpRouterClick && (
          <img
            className="test-loading-effect"
            src={LoadingEffect}
            alt="Loading Effect"
          />
        )}
        <div className="character-nickname-title">
          <div className="character-nickname">{nickname}</div>
          <img
            className="character"
            src={genderList[gender - 1]}
            alt="character"
            onClick={() => {
              const titleTag = document.querySelector(".character-title");
              if (titleTag.style.visibility === "visible") {
                titleTag.style.visibility = "hidden";
              } else {
                titleTag.style.visibility = "visible";
              }
            }}
          />
          <div className="character-title">{badge}</div>
        </div>
        {!pvpRouterClick && (
          <MenuBar setModalClick={setModalClick} setSelectIdx={setSelectIdx} />
        )}
        <div className="get-coin-btn">
          {!isEnough && <div className="get-coin-cnt">{coinCnt}</div>}
        </div>
        <Link className="main-router-map-btn" to="/map">
          <img src={goMap} alt="goMap" />
        </Link>
      </div>
      {isReady && (
        <GetCoinItem isEnough={isEnough} getCoinCnt={setCoinCntHandler} />
      )}
      <div className="main-router-pvp" onClick={pvpRouterClickHandler}>
        pvp
      </div>
    </div>
  );
}

export default MainPage;
