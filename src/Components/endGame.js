import React from "react"
import {Link} from "react-router-dom"

 export default function EndGame(props){
   
        return (
            <div id="endgame">
                <h1 id="endgameover" className="endgame-text">Game Over</h1>
                <p id="score" className="endgame-text">your score is :{props.score}</p>
                <Link to="/">
                <button onClick={props.resetQuiz} id="endgame-button" className="endgame-text">Start Quiz Again?</button>
                </Link>
            </div>
        )
    }