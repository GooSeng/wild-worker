import * as React from "react";
import "./LoginPage.css";
import loginTitle from "../asset/image/intro_title.png";
import loginKakao from "../asset/image/kakao_login.png";
import http from "../api/Http.js";
import { useNavigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate();
  function loginClickHandler() {
    // 로그인 버튼 클릭시 이벤트
    http
      .get("/auth/login", {
        headers: {
          "Access-Control-Allow-Origin": "https://j8a304.p.ssafy.io/api",
        },
        withCredentials: true,
      })
      .then(res => {
        console.log(res);
      });
    console.log("kakao login btn clicked!");
    // navigate("/main");
  }
  return (
    <div className="login-background">
      <img className="login-title-img" src={loginTitle} alt="loginTitle" />
      <img
        className="login-kakao-img"
        onClick={loginClickHandler}
        src={loginKakao}
        alt="loginKakao"
      />
    </div>
  );
}
export default LoginPage;
