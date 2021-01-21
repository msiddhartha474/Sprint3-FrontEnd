import { Button } from 'bootstrap';
import React, { Component } from 'react';
import Survey from '../components/Survey';
import { connect } from 'react-redux';
import { surveys } from '../data';
import { fetchSurveys } from '../actions/survey.actions.js'
import { deleteSurvey } from '../actions/survey.actions.js'
import { history } from '../index'



class Surveys extends Component{
    constructor(props){
        super(props);

        this.state = {
            surveyorId : 0,
        };
    }

    addSurvey(surveyorId){
        history.push({
            pathname : `/createSurvey`,
            state : {
                surveyorId : surveyorId,
            }
        })
    }

    componentWillMount(){
        this.props.onFetch();
    }

    handleEdit(survey){
        history.push({
            pathname : `/edit/${survey.sid}`,
            state : {
                survey : survey,
            }
        })
    }

    handleView(survey){
        history.push({
            pathname : `/viewSurvey/${survey.sid}`,
            state : {
                survey : survey,
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
                
                <div>
                    <div>
                    <button style={{marginLeft: "10px"}} className="btn btn-info"
                            onClick = {() => this.addSurvey(this.state.surveyorId).bind(this)}>
                            Add New Survey
                    </button> 

                    </div>
                    <br/>
                    <table className="table table-striped" >
                        <thead>
                            <tr>
                                <th>SId</th>
                                <th>Due Date</th>
                                <th>Feedback</th>
                                <th>Status</th>
                                <th>Title</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.surveys.map(survey =>{
                                    return(
                                        <Survey 
                                        key = {survey.sid} 
                                        survey = {survey} 
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
    return{
        onFetch : () =>{
            dispatch(fetchSurveys());
        },
        onDelete : (sid) =>{
            dispatch(deleteSurvey(sid));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Surveys);