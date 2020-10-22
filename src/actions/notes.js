export const loadNotes = (notes) => {
    return {
        type: 'LOAD_NOTES',
        notes: notes
    }
}

export const deleteNote = (id) => {
    return {
        type: 'DELETE_NOTE',
        id: id
    }
}

export const updateNotes = (note) => {
    return {
        type: 'UPDATE_NOTES',
        note: note
    }
}

export const createNote = (note) => {
    return {
        type: 'CREATE_NOTE',
        note: note
    }
}