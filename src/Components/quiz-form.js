import React from "react"
import Quiz from "./quiz"
import EndGame from "./endGame";

export default function QuizForm(props){
   console.log("quizOVER",props.quizOver)
    const [quizData, setQuizData] = React.useState({});
    const answerArray = {};
    
  //test
  React.useEffect(() =>{ 
  async function GetData(){

    props.isQuizFinished(false);
    const quizInfo = [];

        await fetch("https://opentdb.com/api.php?amount=10")
        .then((response) => {
          //console.log("response.json api loaded", response.json)
          return response.json()
        })        
        .then((obj) => {
             let objArr = obj.results;   
               //console.log("object of json loaded", obj)
                for(let x in objArr){
                    let quizCategory = objArr[x].category;
                    let rawQuestion = objArr[x].question;
                    let rawCorrect = objArr[x].correct_answer;
                    let rawWrong = objArr[x].incorrect_answers;  
                    
                   //  ou.edu/research/electron/internet/special.shtml character codes 
                   //JUST SYMBOLS AND ODD CHARACTERS BEING COVERED
                    let newQuestion = rawQuestion.replace(/(&quot;)/g, "'").replace(/(&#039;)/g,"'").replace(/(&amp)/g, "&").replace(/(&shy;)/g, "-").replace(/&uuml;/gi,"ü").replace(/(&rsquo;)/g, "'").replace(/&uuml;/g,"ü").replace(/(&ldquo;)/g,'"').replace(/(&lsquo;)/g,"'").replace(/(&rdquo;)/g,'"').replace(/(&eacute;)(&euml;)?/g, "e").replace(/&deg;/g, "°").replace(/&sup2;/g,"²").replace(/&;/g, "&").replace(/&uacute;/gi, "u")
                    
                    let newCorrect = rawCorrect.replace(/(&quot;)/g, "'").replace(/(&#039;)/g,"'").replace(/(&amp;)/g, "&").replace(/(&eacute;)/g, "é").replace(/&uuml;/gi,"ü").replace(/&omicron;/gi,"Ο").replace(/&ouml;/gi,"ö").replace(/(&oacute;)/g,"ó").replace(/&ntilde;/gi,"ñ").replace(/&aacute;/gi,"á").replace(/&Delta;/g,'Δ').replace(/&prime;/, "'").replace(/&Prime;/, '"').replace(/&divide;/g, "/").replace(/&uacute;/gi, "u")
  
                    let newWrong = rawWrong.map((ans) => {
                        return ans.replace(/(&quot;)/g, "'").replace(/(&#039;)/g,"'").replace(/(&amp;)/g, "&").replace(/(&eacute;)(&euml;)?/g, "e").replace(/(&oacute;)/g,"ó").replace(/(&iacute;)/g,"í").replace(/(&ldquo;)/g,"'").replace(/(&hellip;)/g,"...").replace(/&ntilde;/gi,"ñ").replace(/&aacute;/gi,"á").replace(/&sigma;/gi,"Σ").replace(/&pi;/gi,"Π").replace(/&nu;/gi,"Ν").replace(/&aring;/gi,"å").replace(/&auml;/gi,"ä").replace(/&uuml;/gi,"ü").replace(/&Delta;/g, 'Δ').replace(/&lrm;/g, "<>").replace(/(&rsquo;)/g, "'").replace(/&prime;/, "'").replace(/&Prime;/, '"').replace(/&divide;/g, "/").replace(/&uacute;/gi, "u")
                              })
                                        
       
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
            quizInfo.forEach((object) => {
              const answers = object.answers;
              const randomNumber = Math.floor(Math.random() * 4);
              const randomNumber2 = Math.floor(Math.random() * 4);
    
              // Perform the swap
              const temp = answers[randomNumber];
              answers[randomNumber] = answers[randomNumber2];
              answers[randomNumber2] = temp;
            });
    
  /***********************************END OF THEN METHOD******************************* */
         //return object of quiz data
           return setQuizData(quizInfo)  
                
                }).catch((error) => {
        console.error('Error fetching quiz data', error);
      });
    }
      //call the above function
      GetData();
      //cleanup function
      return () => {
      console.log("Component unmounted or request canceled");
    };       
    
  }, [props.startPage])
    
    /*****************************SUBMITTING QUIZ***************************************/


 /***********************************************************************************/    

      let SelectAns = () => {
        if(quizData.length > 4){
       return quizData.map((questionInfo) => {
         let index = quizData.indexOf(questionInfo);
        
        return ( 
             <Quiz 
                key = {index + 10}
                index = {index}
                data = {questionInfo} 
                answerArray={answerArray}
                quizOver={props.quizOver}
            />                     
                
        )               
      })
    }}
  
      function QuizPage(){

        function handleSubmit(){
          props.handleSubmit(answerArray)
        }

        return (
          <div className="quiz-container">
          <h3>Test your mettle!</h3>
            <form>
                {SelectAns()} 
                <div className="submit-button-container">
                {props.quizOver ?
                 <EndGame
                 score={props.score}
                 resetQuiz={props.resetQuiz}
                 /> : 
                 <button onClick={handleSubmit} className="submit-button">Submit Answers</button>
               }
                </div>
            </form>
            </div>
        )
      }

    function Loading(){
      return(
        <div id="loading-container">
           <p id="loading" className="loading-text">Loading...</p>
           <img src="https://www.dictionary.com/e/wp-content/uploads/2020/02/uwu_1000x700.jpg"
           alt="uwu" id="loading-image"></img>
           <p id="loading-desc" className="loading-text">if page doesn't load in 15 seconds, please go back</p>
        </div>
      )
    }



    return (
        <div className="go">
           {props.startPage ? QuizPage() : <Loading />}
            
        </div>
        )
}