
import './App.css';
import React from "react"
import QuizForm from "./Components/quiz-form"
import Welcome from "./Components/welcome-page"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


export default function App(){
  
  let [startPage, pageLoading] = React.useState(false); 
  let [score, finalScore] = React.useState(0);    
  const [quizOver, isQuizFinished] = React.useState(false);
  let testScore = 0;
  
  function handleClick(e){
     setTimeout(() => pageLoading(true),3000)
}

function handleScore(answerobject) { 
  for(let key in answerobject) {
    answerobject[key] === "correct" ? testScore += 1 : testScore += 0
  }
  //console.log(`handleScore ${JSON.stringify(answerobject)}`)
  finalScore(testScore);
 return score
}


function handleSubmit(answerobject){
  //console.log(`handleSubmit ${JSON.stringify(answerobject)}`)
  handleScore(answerobject);
  isQuizFinished(true); 
}


function resetQuiz(e){
  console.log("quizSTATUS",quizOver)
  pageLoading(false);
  console.log("resetting", startPage)
}


return (
  <div>
      <Router>
          <Routes>
            <Route exact path='/' element={<Welcome handleClick={handleClick} score={score} />}/>
            <Route path='/quiz' element={<QuizForm 
                                    startPage={startPage} 
                                    score={score} 
                                    finalScore={finalScore}
                                    handleSubmit={handleSubmit}
                                    quizOver={quizOver}
                                    resetQuiz={resetQuiz}
                                    isQuizFinished={isQuizFinished}                            
                                    />}
            />
          </Routes>
      </Router>
      
  </div>
  )
}

