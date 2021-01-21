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
} from '../actions/question_types';

const defaultState = {
    questions : [],
    error : null,
    isLoading: false,
};

const questionReducer = (state = defaultState, action) =>{
    switch(action.type){

        case FETCH_QUESTIONS_SUCCESS:
            return{ ...state, questions : action.payload };
        case FETCH_QUESTIONS_LOADING:
            return{ ...state, isLoading : action.payload };
        case FETCH_QUESTIONS_ERROR:
            return{ ...state, error : action.payload };

        case ADD_QUESTION_SUCCESS:
            return{ ...state, questions : [...state.questions, action.payload] };
        case ADD_QUESTION_LOADING:
            return{ ...state, isLoading : action.payload };
        case ADD_QUESTION_ERROR:
            return{ ...state, error : action.payload };

        case DELETE_QUESTION_SUCCESS:
            const delQuestions = state.questions.filter(question => question.qid !== action.payload.qid);
            return{ ...state, questions : delQuestions };
        case DELETE_QUESTION_LOADING:
            return{ ...state, isLoading : action.payload };
        case DELETE_QUESTION_ERROR:
            return{ ...state, error : action.payload };

        case EDIT_QUESTION_SUCCESS:
            const updatedQuestions = state.questions.filter(question => question.qid !== action.payload.qid);
            return{ ...state, questions : [...updatedQuestions, action.payload] };
        case EDIT_QUESTION_LOADING:
            return{ ...state, isLoading : action.payload };
        case EDIT_QUESTION_ERROR:
            return{ ...state, error : action.payload };

        default:
            return state;
    }
}

export default questionReducer;
