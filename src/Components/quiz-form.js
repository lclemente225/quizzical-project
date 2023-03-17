import React from "react"
import Quiz from "./quiz"
import { Link } from "react-router-dom";

export default function QuizForm(props){
   
    const [quizData, setQuizData] = React.useState({});    
    const answerArray = {};
        
  React.useEffect(() =>{ 
  async function GetData(){
      
        const quizInfo = [];
        await fetch("https://opentdb.com/api.php?amount=10")
        .then((response) => {
          console.log("response.json api loaded", response.json)
          return response.json()
        })        
        .then((obj) => {
             let objArr = obj.results;   
                     console.log("object of json loaded", obj)
                for(let x in objArr){
                    let quizCategory = objArr[x].category;
                    let rawQuestion = objArr[x].question;
                    let rawCorrect = objArr[x].correct_answer;
                    let rawWrong = objArr[x].incorrect_answers;  
                    
                   //  ou.edu/research/electron/internet/special.shtml character codes 
        ///////////////////JUST SYMBOLS AND ODD CHARACTERS BEING COVERED////////////////////////////
                    let newQuestion = rawQuestion.replace(/(&quot;)/g, "'").replace(/(&#039;)/g,"'").replace(/(&amp)/g, "&").replace(/(&shy;)/g, "-").replace(/(&rsquo;)/g, "'").replace(/&uuml;/g,"ü").replace(/(&ldquo;)/g,'"').replace(/(&lsquo;)/g,"'").replace(/(&rdquo;)/g,'"').replace(/(&eacute;)(&euml;)?/g, "e").replace(/&deg;/g, "°").replace(/&sup2;/g,"²")
                    
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
                               
                    
                }
                
   //*******************************RANDOMIZE QUESTION PLACEMENT*********************************************** */
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
  /***********************************END OF THEN METHOD******************************* */
         
           return setQuizData(quizInfo)  
                
                }).catch((error) => {
        console.error('Error fetching quiz data', error);
      });
    }
      GetData()
      return () => {
      console.log("Component unmounted or request canceled");
    };       
    
  }, [props.startPage])
    
    /*****************************SUBMITTING QUIZ***************************************/

  function handleScore() {
      let testScore = 0;
      for(let key in answerArray) {
      if(answerArray[key] === "correct"){ 
         testScore += 1 
        }}
      props.finalScore(testScore);
     return props.score
    }

  function handleSubmit(e){
      console.log("submitting")
      handleScore();
  }

 /***********************************************************************************/     
      let SelectAns = () => {
        console.log("Rendering Quiz Questions")
        if(quizData.length > 4){
       return quizData.map((questionInfo) => {
          let index = quizData.indexOf(questionInfo);
        return ( 
             <Quiz 
                key = {index + 10}
                index = {index}
                data = {questionInfo} 
                onAnswer={handleScore}
                answerArray={answerArray}
            />                     
                
        )               
      })
    }}
    
      function QuizPage(){
        return (
          <div className="quiz-container">
          <h3>Test your mettle!</h3>
            <form>
                <SelectAns /> 
                <div className="submit-button-container" >
                <Link to="/quizComplete" >
                <button onClick={handleSubmit} className="submit-button">Submit Answers</button>
                </Link>
                </div>
            </form>
            </div>
        )
      }

    function Loading(){
      return(
        <div id="loading-container">
           <p id="loading">Loading...</p>
           <img src="https://www.dictionary.com/e/wp-content/uploads/2020/02/uwu_1000x700.jpg"
           alt="uwu" id="loading-image"></img>
           <p id="loading-desc">if page doesn't load in 15 seconds, please go back</p>
        </div>
      )
    }
    

    return (
        <div className="go">
           {props.startPage ? <QuizPage  /> : <Loading />}
            
        </div>
        )
}