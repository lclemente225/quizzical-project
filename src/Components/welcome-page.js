import React from "react"
//make sure in css that this is absolute
//make background color solid so it can overlay over the questions
//use && and state to toggle this page
export default function Welcome(props){
    return (
        <div className="welcomePage">
                <h1 className="welcomeTitle">Quizzical</h1>
                <button className="startButton" onClick={props.handleClick}>Start Quiz</button>
        </div>
    )
}