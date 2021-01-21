import React from 'react';
import './RespQuestion.css'


const Question = ({question, onDelete, onView, onEdit}) =>{
    
    return(   
        <tr key = {question.qid}>
            <td>{question.qid}</td>
            <td>{question.question}</td>
            <td>{question.option1}</td>
            <td>{question.option2}</td>
            <td>{question.option3}</td>
            <td>{question.option4}</td>
            <td>

            <button className="btn btn-info" 
                onClick = {() => onEdit(question)}>
                Update 
            </button>
            <button style={{marginLeft: "10px"}} className="btn btn-danger"
                onClick = {() => onDelete(question)}>
                    Delete 
            </button>
            <button style={{marginLeft: "10px"}} className="btn btn-info"
                 onClick = {() => onView(question)}>
                    View 
            </button>
    
            </td>
        </tr>

    )
}


export default Question;