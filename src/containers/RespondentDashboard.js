import { Button } from 'bootstrap';
import React, { Component } from 'react';
import Survey from '../components/Survey';
import RespSurvey from '../components/RespSurvey'
import { connect } from 'react-redux';
import { surveys } from '../data';
import { fetchSurveys } from '../actions/survey.actions.js'
import { deleteSurvey } from '../actions/survey.actions.js'
import { history } from '../index'



class RespondentDashBoard extends Component{
    constructor(props){
        super(props);

        this.state = {
            respondentId : 0,
        };
    }

    componentWillMount(){
        this.props.onFetch();
    }

    handleView(survey){
        history.push({
            pathname : `/viewRespSurvey/${survey.sid}`,
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
                    
                    <br/>
                    <table className="table table-striped" >
                        <thead>
                            <tr>
                                <th>SId</th>
                                <th>Due Date</th>
                                <th>Rating</th>
                                <th>Status</th>
                                <th>Title</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.surveys.map(survey =>{
                                    return(
                                        <RespSurvey 
                                        key = {survey.sid} 
                                        survey = {survey} 
                                        onView = {this.handleView.bind(this)}
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
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RespondentDashBoard);