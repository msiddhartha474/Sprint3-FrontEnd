import { Button } from 'bootstrap';
import React, { Component } from 'react'
import RespQuestion from '../components/RespQuestion'
import { fetchQuestions } from '../actions/question.actions.js'
import { deleteQuestion } from '../actions/question.actions.js'
import { createSurvey } from '../actions/survey.actions';
import { connect } from 'react-redux';
import { history } from '../index'

import './CreateSurvey.css';

class ViewRespSurvey extends Component{
    constructor(props){
        super(props);

        this.state = {

            sid : 0,
            title : '',
            dueDate : '',
            status : '',
            feedback : 0,

            rating : 5,

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




    handleSubmit(question){
        history.push( `/respondentDashboard/`);
    }

    handleSaveAnswer(question){
        history.push({
            pathname : `/fillQuestion/${question.qid}`,
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

                            <h1>{this.state.title}</h1>
                            <br/>
                    
                    <div>
                        <p><b>Survey ID:</b> &nbsp; {this.state.sid}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <b>Due Date: </b> {this.state.dueDate}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <b>Status:</b>  {this.state.status}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <b>Rating:</b>  {this.state.feedback}</p> 
                    </div>
                    <br/>
                    <div>
                    <table className="table table-striped" >
                        <tbody>
                            {
                                this.props.questions.map(question =>{
                                   
                                    
                                    return(
                                    <div >
                                            <RespQuestion
                                            key = {question.qid} 
                                            question = {question} 
                                            onSave = {this.handleSaveAnswer.bind(this)}
                                            />
                                            <br/>

                                            
                                    </div> 
                                    )
                                })
             
                            }
                            
                        </tbody>
                    </table>
                    <br/>
                                <label><h6>Rate the Survey:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6></label>
                                <input type="radio" id="1" name="Rating" value="1"/>

                                <label for="opt1">&nbsp;&nbsp;Very Bad&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input type="radio" id="2" name="Rating" value="2"/>

                                <label for="opt1">&nbsp;&nbsp;Bad&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input type="radio" id="3" name="Rating" value="3" />

                                <label for="opt1">&nbsp;&nbsp;Good&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input type="radio" id="4" name="Rating" value="4"/>

                                <label for="opt1">&nbsp;&nbsp;Very Good&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input type="radio" id="5" name="Rating" value="5"/>
                                <label for="opt1">&nbsp;&nbsp;Excellent&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><br/><br/>
                                
                </div>
                            
                            <button type = "submit" className = "btn btn-primary" onClick = {this.handleSubmit.bind(this)}>
                                Submit
                            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewRespSurvey);