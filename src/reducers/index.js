import { combineReducers } from 'redux';
import { FETCH_QUESTIONS_ERROR } from '../actions/question_types';
import surveys from './surveyReducer'
import questions from './questionReducer'
import surveyor from './surveyorReducer'
import respondent from './respondentReducer'

export default combineReducers({
    surveyData : surveys,
    questionData: questions,
    surveyorData : surveyor,
    respondentData : respondent,
});