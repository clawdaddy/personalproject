const initialState = {
    username:"",
    userID:'',
    selectedResidentID:0,
    shift:"",
    facility: {
        id: 0,
        name:'',
        caregroups:[]
    },
    group: '',
    residentList:[],
    showResident:false,
    showadl: false,
    choiceObjects:[],
    currentADLID:-1
}
//declare names of action variables//
const CURRENT_SHIFT = 'CURRENT_SHIFT';
const CURRENT_USER = 'CURRENT_USER';
const CURRENT_RESIDENT = 'CURRENT_RESIDENT';
const GROUP_NAME = 'GROUP_NAME';
const FACILITY = 'FACILITY';
const RESIDENT_LIST = 'RESIDENT_LIST';
const SHOW_RESIDENT = 'SHOW_RESIDENT';
const SHOW_ADL = 'SHOW_ADL';
const SAVE_CHOICE_OBJECT = 'SAVE_CHOICE_OBJECT';
const CURRENT_ADL = 'CURRENT_ADL';

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

export function selectResident (selectedResidentID){
    return {
        type: CURRENT_RESIDENT,
        payload: selectedResidentID
    }
}

export function selectGroup ( groupName ){
    return {
        type: GROUP_NAME,
        payload: groupName
    }
}

export function selectFacility ( facilityp ){
    return {
        type: FACILITY,
        payload: facilityp
    }
}

export function updateResidentList ( list ){
    return {
        type: RESIDENT_LIST,
        payload: list
    }
}
export function showResidentCard ( boolean ){
    return {
        type:SHOW_RESIDENT,
        payload: boolean
    }
}
export function showadllist ( boolean ){
    return {
        type:SHOW_ADL,
        payload:boolean
    }
}

export function saveChoiceObject ( choiceObjectArray ){
    return {
        type:SAVE_CHOICE_OBJECT,
        payload:choiceObjectArray
    }
}

export function updateADL ( ADL ){
    return {
        type: CURRENT_ADL,
        payload: ADL
    }
}

export default function reducer ( state = initialState, action) {
    switch (action.type){
        case CURRENT_SHIFT:
            return Object.assign( {}, state, { shift: action.payload })

        case CURRENT_USER:
            return Object.assign( {}, state, { userID: action.payload })

        case CURRENT_RESIDENT:
            return Object.assign( {}, state, { selectedResidentID: action.payload })

        case GROUP_NAME:
            return Object.assign( {}, state, { group: action.payload })

        case FACILITY:
            return Object.assign( {}, state, { facility: action.payload })
        
        case RESIDENT_LIST:
            return Object.assign( {}, state, { residentList: action.payload })
        
        case SHOW_RESIDENT:
            return Object.assign( {}, state, { showResident: action.payload })

        case SHOW_ADL:
            return Object.assign( {}, state, { showadl: action.payload})

        case SAVE_CHOICE_OBJECT:
            return Object.assign( {}, state, { choiceObjects:action.payload })

        case CURRENT_ADL:
            return Object.assign( {}, state, { currentADLID: action.payload})
            
        default: return state;
    }
}