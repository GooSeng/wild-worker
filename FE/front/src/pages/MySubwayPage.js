import * as React from "react"
import { Link } from "react-router-dom"
import "./MySubwayPage.css"
import goMap from "../asset/image/goMap.png";
import myMap from "../asset/image/myMap.png";
import hotMap from "../asset/image/hotMap.png";

function MySubwayPage() {
  return (
    <nav>
      <div>여긴 My 역</div>
      <Link to="/map/mine"><img src={myMap} alt="myMap" /></Link>
      <Link to="/"><img src={goMap} alt="goMap" /></Link>
      <Link to="/map/hot"><img src={hotMap} alt="hotMap" /></Link>
    </nav>
  )
}

export default MySubwayPage
