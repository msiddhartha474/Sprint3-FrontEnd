import {
    ADD_SURVEY_ERROR,
    ADD_SURVEY_LOADING,
    ADD_SURVEY_SUCCESS,
    DELETE_SURVEY_ERROR,
    DELETE_SURVEY_LOADING,
    DELETE_SURVEY_SUCCESS,
    EDIT_SURVEY_ERROR,
    EDIT_SURVEY_LOADING,
    EDIT_SURVEY_SUCCESS,
    FETCH_SURVEYS_ERROR,
    FETCH_SURVEYS_LOADING,
    FETCH_SURVEYS_SUCCESS,
    VIEW_SURVEY_ERROR,
    VIEW_SURVEY_LOADING,
    VIEW_SURVEY_SUCCESS
} from './types';

import { surveys } from '../data';
import axios from 'axios';
import { history } from '../index';

const url = 'http://localhost:6789/';



//-----------------------------------------------FETCH---------------------------------------------------
export const fetchSurveysSuccess = (data) =>{
    return{
        type : FETCH_SURVEYS_SUCCESS,
        payload : data, 
    }
}

export const fetchSurveysLoading = (data) =>{
    return{
        type : FETCH_SURVEYS_LOADING,
        payload : data, 
    };
};

export const fetchSurveysError = (data) =>{
    return{
        type : FETCH_SURVEYS_ERROR,
        payload : data, 
    };
};



export const fetchSurveys = () =>{
    let isLoading = true;

    return (dispatch) =>{
        dispatch(fetchSurveysLoading(isLoading));

        return axios.get('http://localhost:6789/listAllSurvey').then( response =>{

            dispatch(fetchSurveysSuccess(response.data));

            isLoading = false;
            dispatch(fetchSurveysLoading(isLoading));

        }).catch( error =>{
           
            
            const errorPayload = {};
            errorPayload['message'] = 'Not Found';
            errorPayload['status'] = '404';

            dispatch(fetchSurveysError(errorPayload));

            isLoading = false;
            dispatch(fetchSurveysLoading(isLoading));
        }); 
    };
}



//-----------------------------------------------CREATE---------------------------------------------------

export const createSurveySuccess = (data) =>{
    return{
        type : ADD_SURVEY_SUCCESS,
        payload : data, 
    }
}

export const createSurveyLoading = (data) =>{
    return{
        type : ADD_SURVEY_LOADING,
        payload : data, 
    };
};

export const createSurveyError = (data) =>{
    return{
        type : ADD_SURVEY_ERROR,
        payload : data, 
    };
};



export const createSurvey = (survey) =>{

    if(survey.sid !== 0){
        const data = {
            sid : survey.sid,
            title : survey.title,
            dueDate : survey.dueDate,
            status : survey.status,
            feedback : survey.feedback,
            respondent: survey.respondent,
            surveyor: survey.surveyor
        };

        return(dispatch) => {
            dispatch(editSurvey(data));
        }
    }
    else{
        let isLoading = true;

        const data = {
            sid : survey.sid,
            title : survey.title,
            dueDate : survey.dueDate,
            status : survey.status,
            feedback : survey.feedback,
            respondent: survey.respondent,
            surveyor: survey.surveyor
        };

        return(dispatch) =>{
            return axios.post('http://localhost:6789/createSurvey', data)
            .then(response =>{
                
                dispatch(createSurveySuccess(response.data));
                history.push(`/SurveyorDashboard/8`);

                isLoading = false;
                dispatch(createSurveyLoading(isLoading));

            }).catch( error =>{
                
                const errorPayload = {};
                errorPayload['message'] = 'Can not create Survey';
                errorPayload['status'] = '404';

                dispatch(createSurveyError(errorPayload));

                isLoading = false;
                dispatch(createSurveyLoading(isLoading));
            });
        }
    }
}

//-----------------------------------------------EDIT---------------------------------------------------


export const editSurveySuccess = (data) =>{
    return{
        type : EDIT_SURVEY_SUCCESS,
        payload : data, 
    }
}

export const editSurveyError = (data) =>{
    return{
        type : EDIT_SURVEY_ERROR,
        payload : data, 
    };
};



export const editSurvey = (data) =>{
    const sid = data.sid;

    return(dispatch) =>{
        return axios.post('http://localhost:6789/createSurvey', data)
            .then(response =>{
                dispatch(editSurveySuccess(response.data));
                history.push(`/SurveyorDashboard/8`);
            }).catch( error =>{
                const errorPayload = {};

                errorPayload['message'] = 'Can not create Survey';
                errorPayload['status'] = '404';

                dispatch(editSurveyError(errorPayload));
            })
    }
}

//-----------------------------------------------DELETE---------------------------------------------------


export const deleteSurveySuccess = (sid) =>{
    return{
        type : DELETE_SURVEY_SUCCESS,
        payload : {
            sid : sid,
        }
    }
}

export const deleteSurveyError = (data) =>{
    return{
        type : DELETE_SURVEY_ERROR,
        payload : data, 
    };
};


export const deleteSurvey = (sid) =>{
    const url = 'http://localhost:6789/deleteSurveyById';
    return(dispatch) =>{
        return axios.delete(`${url}/${sid}`)
            .then(response =>{
                dispatch(deleteSurveySuccess(sid));
                history.push(`/SurveyorDashboard/8`);
            }).catch( error =>{
                const errorPayload = {};

                errorPayload['message'] = 'Can not delete Survey';
                errorPayload['status'] = '404';

                dispatch(deleteSurveyError(errorPayload));
            })
    }
}
