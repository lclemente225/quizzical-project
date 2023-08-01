import React from "react"
import {Link} from "react-router-dom"
  
export default function EndGame({score, resetQuiz}){
   
        return (
            <div id="endgame">
               {score > 8 ? 
                <h1 id="endgameover" className="endgame-text">
                Congratulations!
                </h1> : 
                <h1 id="endgameover" className="endgame-text">
                      Better Luck Next Time!
                </h1>}
                  <p id="score" className="endgame-text">
                  Your score is : {score} out of 10
                 </p>
                <Link to="/">
                    <button onClick={resetQuiz} id="endgame-button" className="endgame-text">
                        Start Quiz Again?
                    </button>
                </Link>
            </div>
        )
    }
  