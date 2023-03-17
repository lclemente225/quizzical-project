
import './App.css';
import React from "react"
import QuizForm from "./Components/quiz-form"
import Welcome from "./Components/welcome-page"
import EndGame from "./Components/endGame"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


export default function App(){
  
  let [startPage, pageLoading] = React.useState(false); 
  let [score, finalScore] = React.useState(0);
  
  function handleClick(e){
     setTimeout(() => pageLoading(true),3000)
}

function resetQuiz(e){
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
                                    finalScore={finalScore}/>}
            />
            <Route path='/quizComplete' element={<EndGame score={score} resetQuiz={resetQuiz}/>}/>
          </Routes>
      </Router>
      
  </div>
  )
}

