import React from "react"
import {Link} from "react-router-dom"

 export default function EndGame(props){
   
        return (
            <div id="endgame">
                <h1 id="endgameover" className="endgame-text">Congratulations</h1>
                <p id="score" className="endgame-text">Your score is :{props.score}/10</p>
                <Link to="/">
                <button onClick={props.resetQuiz} id="endgame-button" className="endgame-text">Start Quiz Again?</button>
                </Link>
            </div>
        )
    }