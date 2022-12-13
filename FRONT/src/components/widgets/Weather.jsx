import React from 'react';

const Weather = (props) => {
    return (
        <div className='widget'>
            <h2>{props.widgetDatas.data.label}</h2>
                <p>{props.widgetDatas.data.temperature}°C</p>
                <p>{props.widgetDatas.data.temps}</p>
                <img alt="weather" src={props.widgetDatas.data.picture}/>
        </div>
    );
};

export default Weather;