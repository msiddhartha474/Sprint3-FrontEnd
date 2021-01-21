import React from 'react';


const RespSurvey = ({survey, onView}) =>{
    
    return(   
        <tr key = {survey.sid}>
            <td>{survey.sid}</td>
            <td>{survey.dueDate}</td>
            <td>{survey.feedback}</td>
            <td>{survey.status}</td>
            <td>{survey.title}</td>
            
            <td>

        
            <button style={{marginLeft: "10px"}} className="btn btn-info"
                 onClick = {() => onView(survey)}>
                    Fill Survey
            </button>
    
            </td>
        </tr>

    )
}


export default RespSurvey;