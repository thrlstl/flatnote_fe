// import note from "../components/note"

const initialState = []

const notesReducer = (state=initialState, action) => {
    let updatedNotes
    switch(action.type){
        case 'LOAD_NOTES':
            const notes = [...action.notes]
            return notes.reverse()
        case 'DELETE_NOTE':
            updatedNotes = state.filter(note =>
                note.id !== action.id)
            return updatedNotes
        case 'UPDATE_NOTES':
            updatedNotes = state.map(note => {
                if (note.id === action.note.id) {
                    return action.note
                }
                else {
                    return note
                }
            })
            return updatedNotes
        case 'CREATE_NOTE':
            return [action.note, ...state]
        default:
            return state;
    }
}

export default notesReducer;