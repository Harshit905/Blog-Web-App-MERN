import React, { useContext } from 'react'
import Notes from './Notes'
const NotesDashboard = (props) => {
    const { showAlert } = props;
    return (
        <>
            <Notes showAlert={showAlert} />
        </>
    )
}

export default NotesDashboard
