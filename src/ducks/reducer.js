const initialState = {
    username:"",
    userID:0,
    residentID:0,
    shift:"",
    
}
//declare names of action variables//
const CURRENT_SHIFT = 'CURRENT_SHIFT'
const CURRENT_USER = 'CURRENT_USER'
const CURRENT_RESIDENT = 'CURRENT_RESIDENT'


export function selectShift (shift){
    return {
        type: CURRENT_SHIFT,
        payload: shift
    }
}

export function loginUser (userID){
    return { 
        type: CURRENT_USER,
        payload: userID
    }
}

export function selectResident (residentID){
    return {
        type: CURRENT_RESIDENT,
        payload: residentID
    }
}

export default function reducer ( state = initialState, action) {
    switch (action.type){
        case CURRENT_SHIFT:
            return Object.assign( {}, state, { residentID:action.payload })

        case CURRENT_USER:
            return Object.assign( {}, state, { userID: action.payload })

        case CURRENT_RESIDENT:
            return Object.assign( {}, state, { residentID:action.payload })

        default: return state;
    }
}