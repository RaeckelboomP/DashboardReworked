import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';

const NewTabModal = (props) => {
    const [noNameErrorMessage, setNoNameErrorMessage] = useState("")

    var deleteErrorMessage = () => {
        setNoNameErrorMessage("")
    }

    var getName = () => {
        if(tabNameRef.current.value!==''){
        props.ajoutTab(tabNameRef.current.value)
        props.toggleModal()
        setNoNameErrorMessage("")
    } else {
        setNoNameErrorMessage('You must enter a name for your board')
    }
    }
    const tabNameRef = useRef(null)

    return (
        <div>
            <div 
                onClick={props.toggleModal}
                className="overlay">
            </div>
            <div className="modal_content">
                <h2>Enter a name for the board</h2>
                <input
                placeholder='Board name...'
                ref={tabNameRef}
                onChange={deleteErrorMessage}
                type="text" name="tabName" id="tabName" />
                <button onClick={getName}>OK</button>
                <p>{noNameErrorMessage}</p>
            </div>
        </div>
    );
};

export default NewTabModal;