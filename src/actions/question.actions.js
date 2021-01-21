    import {
        ADD_QUESTION_ERROR,
        ADD_QUESTION_LOADING,
        ADD_QUESTION_SUCCESS,
        DELETE_QUESTION_ERROR,
        DELETE_QUESTION_LOADING,
        DELETE_QUESTION_SUCCESS,
        EDIT_QUESTION_ERROR,
        EDIT_QUESTION_LOADING,
        EDIT_QUESTION_SUCCESS,
        FETCH_QUESTIONS_ERROR,
        FETCH_QUESTIONS_LOADING,
        FETCH_QUESTIONS_SUCCESS,
        VIEW_QUESTION_ERROR,
        VIEW_QUESTION_LOADING,
        VIEW_QUESTION_SUCCESS
    } from './question_types';

    import axios from 'axios';
    import { history } from '../index';

    //---------------------------------------------------------FETCH-------------------------------------------
    export const fetchQuestionsSuccess = (data) =>{
        return{
            type : FETCH_QUESTIONS_SUCCESS,
            payload : data, 
        }
    }

    export const fetchQuestionsLoading = (data) =>{
        return{
            type : FETCH_QUESTIONS_LOADING,
            payload : data, 
        };
    };

    export const fetchQuestionsError = (data) =>{
        return{
            type : FETCH_QUESTIONS_ERROR,
            payload : data, 
        };
    };



    export const fetchQuestions = (id) =>{
        let isLoading = true;

        return (dispatch) =>{
            dispatch(fetchQuestionsLoading(isLoading));

            return axios.get(`http://localhost:6789/getQuestionBySurveyId/${id}`).then( response =>{

                dispatch(fetchQuestionsSuccess(response.data));

                isLoading = false;
                dispatch(fetchQuestionsLoading(isLoading));

            }).catch( error =>{
            
                
                const errorPayload = {};
                errorPayload['message'] = 'Not Found';
                errorPayload['status'] = '404';

                dispatch(fetchQuestionsError(errorPayload));

                isLoading = false;
                dispatch(fetchQuestionsLoading(isLoading));
            }); 
        };
    }


    //-----------------------------------------------CREATE---------------------------------------------------

    export const createQuestionSuccess = (data) =>{
        return{
            type : ADD_QUESTION_SUCCESS,
            payload : data, 
        }
    }

    export const createQuestionLoading = (data) =>{
        return{
            type : ADD_QUESTION_LOADING,
            payload : data, 
        };
    };

    export const createQuestionError = (data) =>{
        return{
            type : ADD_QUESTION_ERROR,
            payload : data, 
        };
    };



    export const createQuestion = (question) =>{

        if(question.qid !== 0){
            const data = {
                qid : question.qid,
                question : question.question,
                option1 : question.option1,
                option2 : question.option2,
                option3 : question.option3,
                option4 : question.option4,
                survey : question.survey
            };

            return(dispatch) => {
                dispatch(editQuestion(data));
            }
        }
        else{
            let isLoading = true;

            const data = {
                qid : question.qid,
                question : question.question,
                option1 : question.option1,
                option2 : question.option2,
                option3 : question.option3,
                option4: question.option4,
                survey: question.survey
            };

            return(dispatch) =>{
                return axios.post('http://localhost:6789/createQuestion', data)
                .then(response =>{
                    
                    dispatch(createQuestionSuccess(response.data));
                    history.push({
                        pathname : `/viewSurvey/${data.survey.sid}`,
                        state : {
                            survey : data.survey,
                        }
                    })

                    isLoading = false;
                    dispatch(createQuestionLoading(isLoading));

                }).catch( error =>{
                    
                    const errorPayload = {};
                    errorPayload['message'] = 'Can not create Question';
                    errorPayload['status'] = '404';

                    dispatch(createQuestionError(errorPayload));

                    isLoading = false;
                    dispatch(createQuestionLoading(isLoading));
                });
            }
        }
    }

    //-----------------------------------------------EDIT---------------------------------------------------


    export const editQuestionSuccess = (data) =>{
        return{
            type : EDIT_QUESTION_SUCCESS,
            payload : data, 
        }
    }

    export const editQuestionError = (data) =>{
        return{
            type : EDIT_QUESTION_ERROR,
            payload : data, 
        };
    };



    export const editQuestion = (data) =>{
        const sid = data.sid;

        return(dispatch) =>{
            return axios.post('http://localhost:6789/createQuestion', data)
                .then(response =>{
                    dispatch(editQuestionSuccess(response.data));
                    history.push({
                        pathname : `/viewSurvey/${data.survey.sid}`,
                        state : {
                            survey : data.survey,
                        }
                    })
                }).catch( error =>{
                    const errorPayload = {};

                    errorPayload['message'] = 'Can not create Question';
                    errorPayload['status'] = '404';

                    dispatch(editQuestionError(errorPayload));
                })
        }
    }

    //-----------------------------------------------DELETE---------------------------------------------------


    export const deleteQuestionSuccess = (data) =>{
        return{
            type : DELETE_QUESTION_SUCCESS,
            payload : {
                payload : data,
            }
        }
    }

    export const deleteQuestionError = (data) =>{
        return{
            type : DELETE_QUESTION_ERROR,
            payload : data, 
        };
    };


    export const deleteQuestion = (data) =>{
        const url = 'http://localhost:6789/deleteQuestionById';
        return(dispatch) =>{
            return axios.delete(`${url}/${data.qid}`)
                .then(response =>{
                    dispatch(deleteQuestionSuccess(data));
                    history.push(`/SurveyorDashboard/8`);
                }).catch( error =>{
                    const errorPayload = {};

                    errorPayload['message'] = 'Can not delete Question';
                    errorPayload['status'] = '404';

                    dispatch(deleteQuestionError(errorPayload));
                })
        }
    }
