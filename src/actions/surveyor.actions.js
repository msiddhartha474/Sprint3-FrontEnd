import {
    ADD_SURVEYOR_ERROR,
    ADD_SURVEYOR_LOADING,
    ADD_SURVEYOR_SUCCESS,
    DELETE_SURVEYOR_ERROR,
    DELETE_SURVEYOR_LOADING,
    DELETE_SURVEYOR_SUCCESS,
    EDIT_SURVEYOR_ERROR,
    EDIT_SURVEYOR_LOADING,
    EDIT_SURVEYOR_SUCCESS,
    FETCH_SURVEYOR_ERROR,
    FETCH_SURVEYOR_LOADING,
    FETCH_SURVEYOR_SUCCESS,
    VIEW_SURVEYOR_ERROR,
    VIEW_SURVEYOR_LOADING,
    VIEW_SURVEYOR_SUCCESS
} from './surveyor_types';

import axios from 'axios';
import { history } from '../index';

//---------------------------------------------------------FETCH-------------------------------------------
export const fetchSurveyorSuccess = (data) =>{
    return{
        type : FETCH_SURVEYOR_SUCCESS,
        payload : data, 
    }
}

export const fetchSurveyorLoading = (data) =>{
    return{
        type : FETCH_SURVEYOR_LOADING,
        payload : data, 
    };
};

export const fetchSurveyorError = (errorPayload) =>{
    console.log("error");
    return{
        type : FETCH_SURVEYOR_ERROR,
        payload : errorPayload, 
    };
};



export const fetchSurveyor = (surveyor) =>{
    let isLoading = true;

    return (dispatch) =>{
        dispatch(fetchSurveyorLoading(isLoading));

        return axios.get(`http://localhost:6789/authSurveyor/${surveyor.emailId}/${surveyor.password}`).then( response =>{

            dispatch(fetchSurveyorSuccess(response.data));

            if(response.data != null){
                console.log(response.data);
                history.push(`/SurveyorDashboard/${response.data.surveyorId}`);
            }
           

            isLoading = false;
            dispatch(fetchSurveyorLoading(isLoading));

        }).catch( error =>{
        
            console.log("inside error")
            const errorPayload = {};
            errorPayload['message'] = 'Invalid Email Or Password';
            errorPayload['status'] = '404';

            dispatch(fetchSurveyorError(errorPayload));

            isLoading = false;
            dispatch(fetchSurveyorLoading(isLoading));
        }); 
    };
}


//-----------------------------------------------CREATE---------------------------------------------------

export const createSurveyorSuccess = (data) =>{
    return{
        type : ADD_SURVEYOR_SUCCESS,
        payload : data, 
    }
}

export const createSurveyorLoading = (data) =>{
    return{
        type : ADD_SURVEYOR_LOADING,
        payload : data, 
    };
};

export const createSurveyorError = (data) =>{
    return{
        type : ADD_SURVEYOR_ERROR,
        payload : data, 
    };
};



export const createSurveyor = (surveyor) =>{

    if(surveyor.surveyor_id !== 0){
        const data = {
            surveyor_id : surveyor.surveyor_id,
            name : surveyor.name,
            emailId : surveyor.emailId,
            password : surveyor.password,
        };

        return(dispatch) => {
            dispatch(editSurveyor(data));
        }
    }
    else{
        let isLoading = true;

        const data = {
            surveyor_id : surveyor.surveyor_id,
            name : surveyor.name,
            emailId : surveyor.emailId,
            password : surveyor.password,

        };

        return(dispatch) =>{
            return axios.post('http://localhost:6789/createSurveyor', data)
            .then(response =>{
                
                dispatch(createSurveyorSuccess(response.data));
                history.push('/surveyorActivity');

                isLoading = false;
                dispatch(createSurveyorLoading(isLoading));

            }).catch( error =>{
                
                const errorPayload = {};
                errorPayload['message'] = 'Can not create Surveyor';
                errorPayload['status'] = '404';

                dispatch(createSurveyorError(errorPayload));

                isLoading = false;
                dispatch(createSurveyorLoading(isLoading));
            });
        }
    }
}

//-----------------------------------------------EDIT---------------------------------------------------


export const editSurveyorSuccess = (data) =>{
    return{
        type : EDIT_SURVEYOR_SUCCESS,
        payload : data, 
    }
}

export const editSurveyorError = (data) =>{
    return{
        type : EDIT_SURVEYOR_ERROR,
        payload : data, 
    };
};



export const editSurveyor = (data) =>{
    const sid = data.sid;

    return(dispatch) =>{
        return axios.post('http://localhost:6789/createSurveyor', data)
            .then(response =>{
                dispatch(editSurveyorSuccess(response.data));
                history.push('/')
            }).catch( error =>{
                const errorPayload = {};

                errorPayload['message'] = 'Can not create Surveyor';
                errorPayload['status'] = '404';

                dispatch(editSurveyorError(errorPayload));
            })
    }
}

//-----------------------------------------------DELETE---------------------------------------------------


export const deleteSurveyorSuccess = (sid) =>{
    return{
        type : DELETE_SURVEYOR_SUCCESS,
        payload : {
            sid : sid,
        }
    }
}

export const deleteSurveyorError = (data) =>{
    return{
        type : DELETE_SURVEYOR_ERROR,
        payload : data, 
    };
};


export const deleteSurveyor = (qid) =>{
    const url = 'http://localhost:6789/deleteSurveyorById';
    return(dispatch) =>{
        return axios.delete(`${url}/${qid}`)
            .then(response =>{
                dispatch(deleteSurveyorSuccess(qid));
                history.push(`/`);
            }).catch( error =>{
                const errorPayload = {};

                errorPayload['message'] = 'Can not delete Surveyor';
                errorPayload['status'] = '404';

                dispatch(deleteSurveyorError(errorPayload));
            })
    }
}
