import logo from './logo.svg';
import './App.css';
import React from "react"
import Quiz from "./Components/quiz"
import Welcome from "./Components/welcome-page"

export default function App(){
  let [startPage, pageLoading] = React.useState(false);    
  const [quizData, setQuizData] = React.useState({});
  const [finalScore, setScore] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState([]);
  const answerArray = [];
      
React.useEffect(
  async function GetData(){
      //you don't need a json with the key like other apis or a method: GET
      //that is usually the second parameter to the fetch method
      //{method: GET, xtml: key}
      const quizInfo = [];
      let quizQ = await fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => response.json())        
      .then((obj) => {
           let objArr = obj.results;   
                   
              for(let x in objArr){
                  let quizCategory = objArr[x].category;
                  let rawQuestion = objArr[x].question;
                  let rawCorrect = objArr[x].correct_answer;
                  let rawWrong = objArr[x].incorrect_answers;  
                  
                 //  ou.edu/research/electron/internet/special.shtml character codes 
      ///////////////////JUST SYMBOLS AND ODD CHARACTERS BEING COVERED////////////////////////////
                  let newQuestion = rawQuestion.replace(/(&quot;)/g, "'")
                  .replace(/(&#039;)/g,"'").replace(/(&amp)/g, "&").replace(/(&shy;)/g, "-").replace(/(&rsquo;)/g, "'").replace(/&uuml;/g,"ü").replace(/(&ldquo;)/g,'"').replace(/(&lsquo;)/g,"'").replace(/(&rdquo;)/g,'"').replace(/(&eacute;)(&euml;)?/g, "e").replace(/&deg;/g, "°").replace(/&sup2;/g,"²")
                  
                  let newCorrect = rawCorrect.replace(/(&quot;)/g, "'").replace(/(&#039;)/g,"'").replace(/(&amp;)/g, "&").replace(/(&eacute;)/g, "é").replace(/&uuml;/gi,"ü").replace(/&omicron;/gi,"Ο").replace(/&ouml;/gi,"ö").replace(/(&oacute;)/g,"ó").replace(/&ntilde;/gi,"ñ").replace(/&aacute;/gi,"á")

                  let newWrong = rawWrong.map((ans) => {
                      return ans.replace(/(&quot;)/g, "'").replace(/(&#039;)/g,"'").replace(/(&amp;)/g, "&").replace(/(&eacute;)(&euml;)?/g, "e").replace(/(&oacute;)/g,"ó").replace(/(&iacute;)/g,"í").replace(/(&ldquo;)/g,"'").replace(/(&hellip;)/g,"...").replace(/&sigma;/gi,"Σ").replace(/&pi;/gi,"Π").replace(/&nu;/gi,"Ν").replace(/&aring;/gi,"å").replace(/&auml;/gi,"ä").replace(/&uuml;/gi,"ü")
                            })
                                      
    ///////////////////JUST SYMBOLS AND ODD CHARACTERS BEING COVERED/////////////////////////////                                  
                  //making an array
                  quizInfo.push({
                              category:quizCategory,
                              question: newQuestion,
                              answers:[
                      { key: 1121, isCorrect: true, text: newCorrect, value: 'correct' },
                      { key: 1122,isCorrect: false, text: newWrong[0], value: 'wrong1' },
                      { key: 1123,isCorrect: false, text: newWrong[1], value: 'wrong2' },
                      { key: 1124,isCorrect: false, text: newWrong[2], value: 'wrong3' }
                 ]
                              });
                             
                  //Goal: to set these variables as props to be passed onto quiz component
                  
              }
              
 //****************************************************************************** */
         function swap(arr, i, j) {
                  const temp = arr[i];
                  arr[i] = arr[j];
                  arr[j] = temp;
              }   
         
          quizInfo.map((object) => {
              let answers = object.answers;
              
              function test(){ 
                  const randomNumber = Math.floor(Math.random() * 4);
                  const randomNumber2 = Math.floor(Math.random() * 4);
                 
                  
                  if(randomNumber !== randomNumber2){
                  return swap(answers, randomNumber, randomNumber2)
                  }else{
                  return test()
              }}
              test()
          })
/********************************************************************************** */
         //end then method here
         return setQuizData(quizInfo)  
              
              }).catch((error) => {
      console.error('Error fetching quiz data', error);
    });        
  }, [])
  
  /********************************************************************************/
  function handleClick(e){
      //this is to start the rendering of the quiz
      //can be replaced by a router
      e.preventDefault()
      console.log("clicked")
       setTimeout(() => pageLoading(true),3000)
  }

function handleScore(isCorrect) {
  event.preventDefault();
  answerArray.map(() => {
  isCorrect === "correct" ? setScore((x) => x+1) : score
  })
  console.log("handleScore fn",finalScore)
  setSelectedAnswer([])
  // check if selectedAnswer is correct and update score accordingly
  // reset selectedAnswer to an empty string
}

function handleSubmit(e){
    e.preventDefault();
    console.log("submitting", answerArray)
    setSelectedAnswer(() => answerArray)
  //  console.log("handleSubmit", finalScore)
    handleScore(selectedAnswer);
}
    
    let SelectAns = () => quizData.map((questionInfo) => {
        let index = quizData.indexOf(questionInfo);
      return ( 
           <Quiz 
              key = {index + 10}
              index = {index}
              data = {questionInfo} 
              word= "dada" 
              onAnswer={handleScore}
              answerArray={answerArray}
          />                     
              
      )
             
    })
  
    
return (
  <div className="start">
      {startPage && <h3>Test your mettle!</h3>}
      <form>
      {startPage ? <SelectAns /> : 
              <
              Welcome 
                  handleClick={handleClick}
                  />}
      {startPage && <button onClick={handleSubmit}>Submit Answers</button>}
      </form>
      
  </div>
  )
}

