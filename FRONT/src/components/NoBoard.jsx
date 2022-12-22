import React from 'react';

const NoBoard = (props) => {
    console.log(props)
    return (
        <>    
            <h1>
                You don't have board anymore!
            </h1>
            <h3>Let's create a new one!</h3>
            <div onClick={props.onClick} className='firstBoardButton'> Create a board </div>
        </>
    );
};

export default NoBoard;