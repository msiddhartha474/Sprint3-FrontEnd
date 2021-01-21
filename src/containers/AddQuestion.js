import { Button } from 'bootstrap';
import React, { Component } from 'react'
import { createQuestion } from '../actions/question.actions';
import { connect } from 'react-redux';

import './AddQuestion.css';

class AddQuestion extends Component{
    constructor(props){
        super(props);

        this.state = {
                qid: 0,
                question: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '', 
                survey: {
                    sid: 7
                }
        };
    }


    componentWillMount(){
        const props = this.props;
        console.log(props);
        if(props.location.state.sid){
            const sid2= props.location.state.sid;

            this.setState({
                qid : 0,
                question : '',
                option1 : '',
                option2 : '',
                option3 : '',
                option4 : '',
                survey: {
                    sid: sid2
                }
            })
        }
        if(props.location.state.question){
            const question = props.location.state.question;
            const sid2= props.location.state.sid;
            console.log(sid2);
            this.setState({
                qid : question.qid,
                question : question.question,
                option1 : question.option1,
                option2 : question.option2,
                option3 : question.option3,
                option4 : question.option4,
                survey: {
                    sid: sid2,
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
            question : '',
            option1 : '',
            option2 : '',
            option3 : '',
            option4 : '',
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
                <div className="add-question">
                    <form onSubmit = {this.handleSubmit.bind(this)}>
                        <div>
                           <b> Current Survey ID:</b> &nbsp;&nbsp; {this.state.survey.sid}
                        </div>
                        <br/>
                        <div className = "form-group">
                            <input 
                                type = "text"
                                className = "form-control"
                                name = "question"
                                placeholder = "Enter Question "
                                value = {this.state.question}
                                onChange = {this.handleOnValueChange.bind(this)}
                            />
                        </div>

                        <div className = "form-group">
                            <input 
                                type = "text"
                                className = "form-control"
                                name = "option1"
                                placeholder = "Enter Option 1"
                                value = {this.state.option1}
                                onChange = {this.handleOnValueChange.bind(this)}
                            />
                        </div>

                        <div className = "form-group">
                            <input 
                                type = "text"
                                className = "form-control"
                                name = "option2"
                                placeholder = "Enter Option 2"
                                value = {this.state.option2}
                                onChange = {this.handleOnValueChange.bind(this)}
                            />
                        </div>

                        <div className = "form-group">
                            <input 
                                type = "text"
                                className = "form-control"
                                name = "option3"
                                placeholder = "Enter Option 3"
                                value = {this.state.option3}
                                onChange = {this.handleOnValueChange.bind(this)}
                            />
                        </div>

                        <div className = "form-group">
                            <input 
                                type = "text"
                                className = "form-control"
                                name = "option4"
                                placeholder = "Enter Option 4"
                                value = {this.state.option4}
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
        questions : state.questionData.questions || [],
        error : state.questionData.error || null,
        isLoading : state.questionData.isLoading,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return {
        onAdd : (question) =>{
            dispatch(createQuestion(question));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);