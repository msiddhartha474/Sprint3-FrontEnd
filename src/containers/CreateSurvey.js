import { Button } from 'bootstrap';
import React, { Component } from 'react'
import { createSurvey } from '../actions/survey.actions';
import { connect } from 'react-redux';

import './CreateSurvey.css';

class CreateSurvey extends Component{
    constructor(props){
        super(props);

        this.state = {

            sid : 0,
            title : '',
            dueDate : '',
            status : '',
            feedback : 0,
            respondent: [
                {
                  respondentId: 5
                },
                {
                  respondentId: 6
                }
            ],
            surveyor: {
                surveyorId : 4
            }

        };
    }

    componentWillMount(){
        const props = this.props;
        if(props.location && props.location.state.survey){
            const survey = props.location.state.survey;

            this.setState({
                sid : survey.sid,
                title : survey.title,
                dueDate : survey.dueDate,
                status : survey.status,
                feedback : survey.feedback,
                respondent: [
                    {
                      respondentId: 5
                    },
                    {
                      respondentId: 6
                    }
                ],
                surveyor: {
                    surveyorId : 4
                }
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
            title : '',
            dueDate : '',
            status : '', 
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
                <div className="create-survey">
                    <form onSubmit = {this.handleSubmit.bind(this)}>
                        <div className = "form-group">
                            <input 
                                type = "text"
                                className = "form-control"
                                name = "title"
                                placeholder = "Enter Survey Title"
                                value = {this.state.title}
                                onChange = {this.handleOnValueChange.bind(this)}
                            />
                        </div>

                        <div className = "form-group">
                            <input 
                                type = "text"
                                className = "form-control"
                                name = "dueDate"
                                placeholder = "Enter Due Date in (DD/MM/YYYY) Format"
                                value = {this.state.dueDate}
                                onChange = {this.handleOnValueChange.bind(this)}
                            />
                        </div>

                        <div className = "form-group">
                            <input 
                                type = "text"
                                className = "form-control"
                                name = "status"
                                placeholder = "Enter Survey Status (Active/Passive)"
                                value = {this.state.status}
                                onChange = {this.handleOnValueChange.bind(this)}
                            />
                        </div>

                        <div className = "form-group">
                            <button type = "submit" className = "btn btn-primary">
                                Add
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
        surveys : state.surveyData.surveys || [],
        error : state.surveyData.error || null,
        isLoading : state.surveyData.isLoading,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return {
        onAdd : (survey) =>{
            dispatch(createSurvey(survey));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateSurvey);