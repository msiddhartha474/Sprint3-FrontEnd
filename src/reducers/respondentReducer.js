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
} from '../actions/respondent_types';

const defaultState = {
    respondent : [],
    error : null,
    isLoading: false,
};

const respondentReducer = (state = defaultState, action) =>{
    switch(action.type){

        case FETCH_RESPONDENT_SUCCESS:
            return{ ...state, respondent : action.payload };
        case FETCH_RESPONDENT_LOADING:
            return{ ...state, isLoading : action.payload };
        case FETCH_RESPONDENT_ERROR:
            return{ ...state, error : action.payload };

        default:
            return state;
    }
}

export default respondentReducer;
