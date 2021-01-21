import React from 'react';


const Survey = ({survey, onDelete, onView, onEdit}) =>{
    
    return(   
        <tr key = {survey.sid}>
            <td>{survey.sid}</td>
            <td>{survey.dueDate}</td>
            <td>{survey.feedback}</td>
            <td>{survey.status}</td>
            <td>{survey.title}</td>
            
            <td>

            <button className="btn btn-info" 
                onClick = {() => onEdit(survey)}>
                Update 
            </button>
            <button style={{marginLeft: "10px"}} className="btn btn-danger"
                onClick = {() => onDelete(survey.sid)}>
                    Delete 
            </button>
            <button style={{marginLeft: "10px"}} className="btn btn-info"
                 onClick = {() => onView(survey)}>
                    View 
            </button>
    
            </td>
        </tr>

    )
}


export default Survey;