import React from "react"
import { Link } from "react-router-dom";

export default function Welcome(props){
    //console.log("welcome",props.score)
    return (
        <div className="welcomePage">
                <h1 className="welcomeTitle">Lawrence's Riddle me Diddle</h1>
                <Link to="/quiz"  className="startButton-container" >
                <button className="startButton" onClick={props.handleClick}>Start Quiz</button>
                </Link>        
        </div>
    )
}