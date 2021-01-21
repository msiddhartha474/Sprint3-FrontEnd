import { Button } from 'bootstrap';
import React, { Component } from 'react'
import Question from '../components/Question'
import { fetchQuestions } from '../actions/question.actions.js'
import { deleteQuestion } from '../actions/question.actions.js'
import { createSurvey } from '../actions/survey.actions';
import { connect } from 'react-redux';
import { history } from '../index'

import './CreateSurvey.css';

class ViewSurvey extends Component{
    constructor(props){
        super(props);

        this.state = {

            sid : 0,
            title : '',
            dueDate : '',
            status : '',
            feedback : 0,

            

        };
    }

    componentWillMount(){
        const props = this.props;
        if(props.location && props.location.state){
            const survey = props.location.state.survey;

            this.setState({
                sid : survey.sid,
                title : survey.title,
                dueDate : survey.dueDate,
                status : survey.status,
                feedback : survey.feedback,
               
            })
            this.props.onFetch(survey.sid);
        }

        
    }

    addQuestion(sid){
        history.push({
            pathname : `/addQuestion/${sid}`,
            state : {
                sid : sid,
            }
        })
    }



    handleEdit(question){
        history.push({
            pathname : `/editQuestion/${this.state.sid}`,
            state : {
                question : question,
                sid : this.state.sid,
            }
        })
    }

    handleView(question){
        history.push({
            pathname : `/viewQuestion/${question.qid}`,
            state : {
                question : question,
            }
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
                <div className="view-survey">
                    
                    <div>
                        <p><b>Survey ID:</b> &nbsp; {this.state.sid}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <b>Title:</b> &nbsp; {this.state.title}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <b>Due Date: </b> {this.state.dueDate}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <b>Status:</b>  {this.state.status}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <b>Feedback:</b>  {this.state.feedback}</p> 
                    </div>
                    
                    <div>
                    <button style={{marginLeft: "10px"}} className="btn btn-info"
                            onClick = {() => this.addQuestion(this.state.sid).bind(this)}>
                            Add 
                    </button> 

                    </div>
                    <br/>
                    <div>
                    <table className="table table-striped" >
                        <thead>
                            <tr>
                                <th>QId</th>
                                <th>Question</th>
                                <th>Option 1</th>
                                <th>Option 2</th>
                                <th>Option 3</th>
                                <th>Option 4</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.questions.map(question =>{
                                    return(
                                        <Question
                                        key = {question.qid} 
                                        question = {question} 
                                        onDelete = {this.props.onDelete}
                                        onView = {this.handleView.bind(this)}
                                        onEdit = {this.handleEdit.bind(this)}
                                        />
                                    )
                                })
                            }
                            
                        </tbody>
                    </table>
                </div>
                   
                </div>
            )
        }
    }
}

const mapStateToProps = (state) =>{
    return {
        questions : state.questionData.questions || [],
        error : state.questionData.error || null,
        isLoading : state.questionData.isLoading,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
        onFetch : (sid) =>{
            dispatch(fetchQuestions(sid));
        },
        onDelete : (question) =>{
            dispatch(deleteQuestion(question));
        }
    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSurvey);