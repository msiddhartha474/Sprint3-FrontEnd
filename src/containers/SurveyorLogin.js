import React, {Component} from 'react';
import { history } from '../index'
import {fetchSurveyor} from '../actions/surveyor.actions'
import { connect } from 'react-redux';

class SurveyorLogin extends Component{

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


    surveyorActivities(){
        history.push({
            pathname : `/surveyorActivity/`,
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
        surveyor : state.surveyorData.surveyor || [],
        error : state.surveyorData.error || null,
        isLoading : state.surveyorData.isLoading,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return {
        onAdd : (surveyor) =>{
            dispatch(fetchSurveyor(surveyor));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SurveyorLogin);
  