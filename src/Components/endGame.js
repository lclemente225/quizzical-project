import React from "react"
import {Link} from "react-router-dom"

 export default function EndGame(props){
   
        return (
            <div>
                <h1>Game Over</h1>
                <p>your score is :{props.score}</p>
                <Link to="/">
                <button onClick={props.resetQuiz}>Start Quiz Again?</button>
                </Link>
            </div>
        )
    }