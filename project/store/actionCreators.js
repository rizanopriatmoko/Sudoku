import { SET_BOARD, SET_BOARDPROBLEM } from "./actionTypes";

export function setBoard(payload) {
    return {type: SET_BOARD, payload}
}

export function setBoardProblem(payload) {
    return {type: SET_BOARDPROBLEM, payload}
}

export function fetchBoard(param) {
    return (dispatch) => {
        fetch(`https://sugoku.herokuapp.com/board?difficulty=${param}`)
            .then(response => response.json())
            .then(response => {
                // console.log(response.board);
                dispatch(setBoard(response.board))
                dispatch(setBoardProblem(response.board))
            })
            .catch(console.warn)
    }
    
}

export function solveBoard(param) {
    return (dispatch) => {
        const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
        const encodeParams = (params) =>
            Object.keys(params)
                .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
                .join('&');
        fetch('https://sugoku.herokuapp.com/solve', {
            method: 'POST',
            body: encodeParams(param),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(response => {
                // console.log(data);
                dispatch(setBoard(response.solution))
            })
            .catch(console.warn)
    }
}
