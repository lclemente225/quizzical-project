import React from "react"
import {Link} from "react-router-dom"
  
export default function EndGame({score, resetQuiz}){

    const handlePortfolioButtonClick = (event) => {
        event.preventDefault();
        window.location.href = 'https://lclemente225.github.io/';
    };
   
        return (
            <div id="endgame">

               {score > 8 ? 
                <h1 className="endgame-text">
                Congratulations!
                </h1> : 
                <h1 className="endgame-text">
                      Better Luck Next Time!
                </h1>}

                  <p id="score" className="endgame-text">
                  Your score is : {score} out of 10
                 </p>
                <Link to="/" className="endgame-button-container">
                    <button onClick={resetQuiz} id="endgame-button" className="endgame-button">
                        Start Quiz Again?
                    </button>
                </Link>
                <button onClick={handlePortfolioButtonClick} className="endgame-portfolio-button">
                    My Portfolio
                </button>
                  
            </div>
        )
    }
  