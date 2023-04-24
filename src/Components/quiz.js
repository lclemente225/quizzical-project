import React from "react"
 
export default function Quiz(props){  
    const QuizChoice = `QuizChoice${props.index}`;
    const [formData, setFormData] = React.useState({[QuizChoice]:""});

    function objectInsert(x, y){
        let obj = props.answerArray;
        return obj[x] = y
    }


    function handleChange(event) {
        const {name, value, className} = event.target;  
        objectInsert(name, value)
        console.log("CLASSNAME",className);
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
      
    }
 
/*************************************************************************/
//console.log(`"choices", ${JSON.stringify(formData)}`)
//WORKING ON HOW TO HIGHLIGHT ANSWERS
//steps
//1. quizOver === true
//2. add className if value is "correct"
//how to do it? maybe when quiz is over add a class
//

 
   
  let AnswerChoices = (x) => { 
    return props.data.answers.map((answerChoice) => { 
         let containerClassNames = "";
        if(props.quizOver === true){
           answerChoice.value === "correct" ? containerClassNames += "highlight" :
           containerClassNames += "wrong"
        } 
        
     if (!answerChoice.text){
         return null
     }
     return (
          <div className="choices">
             
                        <input 
                            key={answerChoice.key}                        
                            type="radio"
                            className="question"
                            onChange={handleChange}
                            name={`QuizChoice${x}`}
                            id={`question${x}${answerChoice.value}`}
                            value={answerChoice.value}
                            checked={answerChoice.value === formData[`QuizChoice${x}`]}
                            /> &nbsp;
                            <span className={containerClassNames}>
                           <label htmlFor={`question${x}${answerChoice.value}`}>
                            {answerChoice.text}
                                  </label>
                                  </span>
                    </div> 
              )     
     })} 
   

     
    return (
        <div className="quizBox">
            <h2>Question {props.index+1}</h2>
               <h3 className="title">{props.data.question}</h3>
               <div className="quizQuestions">
                        {AnswerChoices(props.index)}      
               </div>
        </div>
    )
}