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
} from '../actions/surveyor_types';

const defaultState = {
    surveyor : [],
    error : null,
    isLoading: false,
};

const surveyorReducer = (state = defaultState, action) =>{
    switch(action.type){

        case FETCH_SURVEYOR_SUCCESS:
            return{ ...state, surveyor : action.payload };
        case FETCH_SURVEYOR_LOADING:
            return{ ...state, isLoading : action.payload };
        case FETCH_SURVEYOR_ERROR:
            return{ ...state, error : action.payload };

        default:
            return state;
    }
}

export default surveyorReducer;
