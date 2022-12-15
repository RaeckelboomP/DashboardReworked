import React from 'react';

const Weather = (props) => {
    console.log(props.widgetDatas.data)
    return (
        <div className='widget'>
            <h2 className='forecastCityName'>{props.widgetDatas.data.label}</h2>
            <div className='hourlyWeatherWidgetHeaderContent'>
                <p className='temperature' >{props.widgetDatas.data.temperature}°C</p>
                <p className='weatherIcon' dangerouslySetInnerHTML={{__html: props.widgetDatas.data.picture}}></p>
            </div>
            <div className='hourlyWeatherWidgetHeaderContent'>
                <img 
                style={{'transform': `rotate(${props.widgetDatas.data.winddirection}deg)`}} 
                className='weatherWindIcon' alt='wind icon'
                src='\images\windDirection_white.png'></img>
                <p className='temperature' >{props.widgetDatas.data.windspeed} km/h</p>
            </div>
        </div>
    );
};

export default Weather;