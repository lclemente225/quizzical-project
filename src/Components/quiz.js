import React from "react"
 
export default function Quiz(props){
    let QuizChoice = `QuizChoice ${props.index}`;
    const [formData, setFormData] = React.useState({
         [QuizChoice] : ""
     })
    
    function objectInsert(x, y){
        let obj = props.answerArray;
        return obj[x] = y
    }
    
       function handleChange(event) {
        const {name, value, checked} = event.target;  
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
 
    
   
 let AnswerChoices = () => { 
    return props.data.answers.map((answerChoice) => { 
        
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
                            name={`QuizChoice ${props.index}`}
                            id={answerChoice.value}
                            value={answerChoice.value}
                            checked={answerChoice.value === formData[QuizChoice]}
                            /> &nbsp;
                            <label htmlFor={answerChoice.value}>
                            {answerChoice.text}
                                  </label>
                    </div> 
              )     
     })}
     
     
    return (
        <div className="quizBox">
               <h3 className="title">{props.data.question}</h3>
               <div className="quizQuestions">
                        <AnswerChoices />       
               </div>
        </div>
    )
}