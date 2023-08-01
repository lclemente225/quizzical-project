import React from "react"
import {Link} from "react-router-dom"
  
export default function EndGame(props){
   
        return (
            <div id="endgame">
               {props.score > 8 ? 
                <h1 id="endgameover" className="endgame-text">
                Congratulations!
                </h1> : 
                <h1 id="endgameover" className="endgame-text">
                      Better Luck Next Time!
                </h1>}
                  <p id="score" className="endgame-text">
                  Your score is : {props.score} out of 10
                 </p>
                <Link to="/">
                    <button onClick={props.resetQuiz} id="endgame-button" className="endgame-text">
                        Start Quiz Again?
                    </button>
                </Link>
            </div>
        )
    }
  