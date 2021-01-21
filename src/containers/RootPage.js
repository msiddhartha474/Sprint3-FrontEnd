import React, {Component} from 'react';
import { history } from '../index'


class RootPage extends Component{


    surveyorActivities(){
        history.push({
            pathname : `/surveyorActivity/`,
        })
    }

    RespondentActivities(){
        history.push({
            pathname : `/respondentActivity/`,
        })
    }
  
    render(){
      return(

        <div>
            <div>
                <h1>Welcome to Online Survey Builder Application...</h1>
            </div>
            <br/><br/>
            <div>
                    <button style={{marginLeft: "10px", padding :"10px"}} className="btn btn-info"
                                onClick = {() => this.surveyorActivities().bind(this)}>
                    Surveyor Activities
                    </button>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button style={{marginLeft: "10px", padding :"10px"}} className="btn btn-info"
                                onClick = {() => this.RespondentActivities().bind(this)}>
                    Respondent Activities
                    </button>
            </div>
        </div>
      ) 
    }
  }
  
  export default RootPage;
  