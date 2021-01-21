import React from 'react';


const RespQuestion = ({question, onSave}) =>{
    
    return(   
    <div>
        <div className = "resp-ques" >
            <h6>{question.qid}) {question.question}</h6><br/>
            <div >
                <input 
                    type="radio" 
                    id="option1" 
                    name={question.qid} 
                    value="A" 
                    />
                <label for="opt1">&nbsp;&nbsp;{question.option1}</label><br/>

                <input 
                    type="radio" 
                    id="option2" 
                    name={question.qid}  
                    value="B"
                   />
                <label for="opt2">&nbsp;&nbsp;{question.option2}</label><br/>

                <input 
                    type="radio" 
                    id="option3" 
                    name={question.qid}  
                    value="C"
                   />
                <label for="opt3">&nbsp;&nbsp;{question.option3}</label><br/>

                <input 
                    type="radio" 
                    id="option4" 
                    name={question.qid}  
                    value="D"
                   />
                <label for="opt4">&nbsp;&nbsp;{question.option4}</label><br/>
            </div>
     
            <br/>

            <div className = "resp-button">
            <button style={{marginLeft: "10px"}} className="btn btn-info"
                 onClick = {() => onSave(question.qid,)}>
                    save
            </button>
        </div>

        </div>
        
    </div>


    )
}


export default RespQuestion;