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
} from '../actions/types';

const defaultState = {
    surveys : [],
    error : null,
    isLoading: false,
};

const surveyReducer = (state = defaultState, action) =>{
    switch(action.type){
        case ADD_SURVEY_SUCCESS:
            return{ ...state, surveys : [...state.surveys, action.payload] };
        case ADD_SURVEY_LOADING:
            return{ ...state, isLoading : action.payload };
        case ADD_SURVEY_ERROR:
            return{ ...state, error : action.payload };

        case DELETE_SURVEY_SUCCESS:
            const delSurveys = state.surveys.filter(survey => survey.sid !== action.payload.sid);
            return{ ...state, surveys : delSurveys };
        case DELETE_SURVEY_LOADING:
            return{ ...state, isLoading : action.payload };
        case DELETE_SURVEY_ERROR:
            return{ ...state, error : action.payload };

        case EDIT_SURVEY_SUCCESS:
            const updatedSurveys = state.surveys.filter(survey => survey.sid !== action.payload.sid);
            return{ ...state, surveys : [...updatedSurveys, action.payload] };
        case EDIT_SURVEY_LOADING:
            return{ ...state, isLoading : action.payload };
        case EDIT_SURVEY_ERROR:
            return{ ...state, error : action.payload };

        case FETCH_SURVEYS_SUCCESS:
            return{ ...state, surveys : action.payload };
        case FETCH_SURVEYS_LOADING:
            return{ ...state, isLoading : action.payload };
        case FETCH_SURVEYS_ERROR:
            return{ ...state, error : action.payload };
        default:
            return state;
    }
}

export default surveyReducer;
