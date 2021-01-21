import React, {Component} from 'react';
import { history } from '../index'
import {fetchRespondent} from '../actions/respondent.actions'
import { connect } from 'react-redux';

class RespondentLogin extends Component{

    constructor(props){
        super(props);

        this.state = {

            emailId : '',
            password : '',

        };
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.onAdd(this.state);
    }

    handleOnValueChange(e){
        this.setState({
            [e.target.name] : e.target.value,
        })
    }


    handleReset(e){
        e.preventDefault();
        this.setState({
            emailId : '',
            password : '',
        });
    }


    respondentActivities(){
        history.push({
            pathname : `/respondentActivity/`,
        })
    }

   
  
    render(){

        if(this.props.isLoading){
            return(
                <p>Loading....</p>
            )
        }
        else if(this.props.error){
            return(
                <div className = "alert alert-danger" role = "alert">]
                    {this.props.error.message}
                </div>
            )
        }
        else{
      return(

        

        <div className="add-question">
                    <form onSubmit = {this.handleSubmit.bind(this)}>
    
                        <div className = "form-group">
                            <input 
                                type = "text"
                                className = "form-control"
                                name = "emailId"
                                placeholder = "Enter Email ID "
                                onChange = {this.handleOnValueChange.bind(this)}
                            />
                        </div>

                        <div className = "form-group">
                            <input 
                                type = "text"
                                className = "form-control"
                                name = "password"
                                placeholder = "Enter Password"
                                onChange = {this.handleOnValueChange.bind(this)}
                            />
                        </div>

                        
                        <div className = "form-group">
                            <button type = "submit" className = "btn btn-primary">
                                Login
                            </button>
                            <button type = "button" className = "btn btn-default" >
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
      ) 
        }
    }
  }
  

const mapStateToProps = (state) =>{
    return {
        respondent : state.respondentData.respondent || [],
        error : state.respondentData.error || null,
        isLoading : state.respondentData.isLoading,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return {
        onAdd : (respondent) =>{
            dispatch(fetchRespondent(respondent));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(RespondentLogin);
  