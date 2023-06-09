import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk'
import { SET_BOARD, SET_BOARDPROBLEM } from "./actionTypes";

const initialState = {
    board: [],
    boardProblem: []
}

function reducer(state = initialState, action) {
    if(action.type === SET_BOARD) {
        return  {...state, board: action.payload} 
    } else if(action.type === SET_BOARDPROBLEM) {
        return  {...state, boardProblem: action.payload} 
    }
    return state
}

const middlewares = applyMiddleware(ReduxThunk)
const store = createStore(reducer, middlewares)

export default store