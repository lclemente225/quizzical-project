import React from "react"
 
export default function Quiz(props){
    let QuizChoice = `QuizChoice ${props.index}`;
    const [score, changeScore] = React.useState(0);
    const [formData, setFormData] = React.useState({
         [QuizChoice] : ""
     })
    
       function handleChange(event) {
        console.log("this is handlechange event",event.target)
        const {name, value, type, checked} = event.target;  
        props.answerArray.pop();    
        props.answerArray.push(value); 
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
 console.log("choices",formData)
    //EACAH OF THE PROPS ARE SEPARATE FOR EACH QUESTION
    //AKA 
    //EACH QUESTION HAS INDIVIDUAL PROPS AND STATE
    


   
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