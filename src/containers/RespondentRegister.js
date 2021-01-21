import { Button } from 'bootstrap';
import React, { Component } from 'react'
import { createRespondent } from '../actions/respondent.actions';
import { connect } from 'react-redux';

import './CreateSurvey.css';

class RespondentRegistration extends Component{
    constructor(props){
        super(props);

        this.state = {

            respondent_id : 0,
            name : '',
            emailId : '',
            password : '',

        };
    }

    componentWillMount(){
        const props = this.props;
        if(props.location && props.location.state.respondent){
            const respondent = props.location.state.respondent;

            this.setState({
                respondent_id : respondent.respondent_id,
                name : respondent.name,
                emailId : respondent.emailId,
                password : respondent.password,
                
            })
        }
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
            name : '',
            emailId : '',
            password : '',
        });
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
                <div className="create-respondent">
                    <form onSubmit = {this.handleSubmit.bind(this)}>
                        <div className = "form-group">
                            <input 
                                type = "text"
                                className = "form-control"
                                name = "name"
                                placeholder = "Enter Name"
                                value = {this.state.name}
                                onChange = {this.handleOnValueChange.bind(this)}
                            />
                        </div>

                        <div className = "form-group">
                            <input 
                                type = "text"
                                className = "form-control"
                                name = "emailId"
                                placeholder = "Enter Email Id"
                                value = {this.state.emailId}
                                onChange = {this.handleOnValueChange.bind(this)}
                            />
                        </div>

                        <div className = "form-group">
                            <input 
                                type = "text"
                                className = "form-control"
                                name = "password"
                                placeholder = "Enter password"
                                value = {this.state.password}
                                onChange = {this.handleOnValueChange.bind(this)}
                            />
                        </div>

                        <div className = "form-group">
                            <button type = "submit" className = "btn btn-primary">
                                Register
                            </button>
                            <button type = "button" className = "btn btn-default" onClick = {this.handleReset.bind(this)}>
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
            dispatch(createRespondent(respondent));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(RespondentRegistration);