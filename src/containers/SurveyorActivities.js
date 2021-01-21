import React, {Component} from 'react';
import { history } from '../index'


class RootPage extends Component{


    loginSurveyor(){
        history.push({
            pathname : `/SurveyorLogin`,
        })
    }

    registerSurveyor(){
        history.push({
            pathname : `/SurveyorRegister`,
        })
    }
  
    render(){
      return(

        <div>
            <div>
                <h1>Online Survey Builder Application...</h1>
            </div>
            <br/><br/>
            <div>
                    <button style={{marginLeft: "10px", padding :"10px"}} className="btn btn-info"
                                onClick = {() => this.loginSurveyor().bind(this)}>
                    Log in
                    </button>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button style={{marginLeft: "10px", padding :"10px"}} className="btn btn-info"
                                onClick = {() => this.registerSurveyor().bind(this)}>
                    Create New Account
                    </button>
            </div>
        </div>
      ) 
    }
  }
  
  export default RootPage;
  