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
                <Link to="https://lclemente225.github.io/" className="portfolio-button-container" >
                    <button className="startButton">My Portfolio</button>
                </Link>  
                <Link to="https://opentdb.com/" className="api-link" >
                    <p>Trivia Questions provided by Open Trivia Database</p>
                </Link>               
        </div>
    )
}