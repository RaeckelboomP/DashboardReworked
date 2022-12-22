import React from 'react';

const ModalTemplate = (props) => {
    return (
        <div>
            <div 
                onClick={props.toggleModal}
                className="overlay">
            </div>
            <div className="modal_content">
                <h2>Hello! I'm the modalTemplate!</h2>
            </div>
        </div>
    );
};

export default ModalTemplate;