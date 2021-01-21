import {
    ADD_RESPONDENT_ERROR,
    ADD_RESPONDENT_LOADING,
    ADD_RESPONDENT_SUCCESS,
    DELETE_RESPONDENT_ERROR,
    DELETE_RESPONDENT_LOADING,
    DELETE_RESPONDENT_SUCCESS,
    EDIT_RESPONDENT_ERROR,
    EDIT_RESPONDENT_LOADING,
    EDIT_RESPONDENT_SUCCESS,
    FETCH_RESPONDENT_ERROR,
    FETCH_RESPONDENT_LOADING,
    FETCH_RESPONDENT_SUCCESS,
    VIEW_RESPONDENT_ERROR,
    VIEW_RESPONDENT_LOADING,
    VIEW_RESPONDENT_SUCCESS
} from './respondent_types';

import axios from 'axios';
import { history } from '../index';

//---------------------------------------------------------FETCH-------------------------------------------
export const fetchRespondentSuccess = (data) =>{
    return{
        type : FETCH_RESPONDENT_SUCCESS,
        payload : data, 
    }
}

export const fetchRespondentLoading = (data) =>{
    return{
        type : FETCH_RESPONDENT_LOADING,
        payload : data, 
    };
};

export const fetchRespondentError = (data) =>{
    return{
        type : FETCH_RESPONDENT_ERROR,
        payload : data, 
    };
};



export const fetchRespondent = (respondent) =>{
    let isLoading = true;

    return (dispatch) =>{
        dispatch(fetchRespondentLoading(isLoading));

        return axios.get(`http://localhost:6789/authRespondent/${respondent.emailId}/${respondent.password}`).then( response =>{

            dispatch(fetchRespondentSuccess(response.data));

            if(response.data != ""){
                console.log(response.data);
                history.push(`/RespondentDashboard/${response.data.respondentId}`);
            }
           

            isLoading = false;
            dispatch(fetchRespondentLoading(isLoading));

        }).catch( error =>{
            console.log("inside error")
            const errorPayload = {};
            errorPayload['message'] = 'Invalid Username or Password';
            errorPayload['status'] = '404';

            dispatch(fetchRespondentError(errorPayload));

            isLoading = false;
            dispatch(fetchRespondentLoading(isLoading));
        }); 
    };
}


//-----------------------------------------------CREATE---------------------------------------------------

export const createRespondentSuccess = (data) =>{
    return{
        type : ADD_RESPONDENT_SUCCESS,
        payload : data, 
    }
}

export const createRespondentLoading = (data) =>{
    return{
        type : ADD_RESPONDENT_LOADING,
        payload : data, 
    };
};

export const createRespondentError = (data) =>{
    return{
        type : ADD_RESPONDENT_ERROR,
        payload : data, 
    };
};



export const createRespondent = (respondent) =>{

    if(respondent.respondent_id !== 0){
        const data = {
            respondent_id : respondent.respondent_id,
            name : respondent.name,
            emailId : respondent.emailId,
            password : respondent.password,
        };

        return(dispatch) => {
            dispatch(editRespondent(data));
        }
    }
    else{
        let isLoading = true;

        const data = {
            respondent_id : respondent.respondent_id,
            name : respondent.name,
            emailId : respondent.emailId,
            password : respondent.password,

        };

        return(dispatch) =>{
            return axios.post('http://localhost:6789/createRespondent', data)
            .then(response =>{
                
                dispatch(createRespondentSuccess(response.data));
                history.push('/respondentActivity');

                isLoading = false;
                dispatch(createRespondentLoading(isLoading));

            }).catch( error =>{
                
                const errorPayload = {};
                errorPayload['message'] = 'Can not create Respondent';
                errorPayload['status'] = '404';

                dispatch(createRespondentError(errorPayload));

                isLoading = false;
                dispatch(createRespondentLoading(isLoading));
            });
        }
    }
}

//-----------------------------------------------EDIT---------------------------------------------------


export const editRespondentSuccess = (data) =>{
    return{
        type : EDIT_RESPONDENT_SUCCESS,
        payload : data, 
    }
}

export const editRespondentError = (data) =>{
    return{
        type : EDIT_RESPONDENT_ERROR,
        payload : data, 
    };
};



export const editRespondent = (data) =>{
    const sid = data.sid;

    return(dispatch) =>{
        return axios.post('http://localhost:6789/createRespondent', data)
            .then(response =>{
                dispatch(editRespondentSuccess(response.data));
                history.push('/')
            }).catch( error =>{
                const errorPayload = {};

                errorPayload['message'] = 'Can not create Respondent';
                errorPayload['status'] = '404';

                dispatch(editRespondentError(errorPayload));
            })
    }
}

//-----------------------------------------------DELETE---------------------------------------------------


export const deleteRespondentSuccess = (sid) =>{
    return{
        type : DELETE_RESPONDENT_SUCCESS,
        payload : {
            sid : sid,
        }
    }
}

export const deleteRespondentError = (data) =>{
    return{
        type : DELETE_RESPONDENT_ERROR,
        payload : data, 
    };
};


export const deleteRespondent = (qid) =>{
    const url = 'http://localhost:6789/deleteRespondentById';
    return(dispatch) =>{
        return axios.delete(`${url}/${qid}`)
            .then(response =>{
                dispatch(deleteRespondentSuccess(qid));
                history.push(`/`);
            }).catch( error =>{
                const errorPayload = {};

                errorPayload['message'] = 'Can not delete Respondent';
                errorPayload['status'] = '404';

                dispatch(deleteRespondentError(errorPayload));
            })
    }
}
