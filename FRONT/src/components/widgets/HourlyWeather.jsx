import React from 'react';
import { Carousel } from '@mantine/carousel';

const HourlyWeather = ( props ) => {
    console.log(props)
    const hourData = props.widgetDatas.data[0];
    const weatherHourlyDataPath = props.widgetDatas.data[1];
    return (
        <div>
            <div className='hourlyWeatherWidgetHeader'>
                <h2 className='forecastCityName'>{hourData.label}</h2>
                <div className='hourlyWeatherWidgetHeaderContent'>
                    <p className='temperature' >{hourData.temperature}°C</p>
                    <p className='weatherIcon' dangerouslySetInnerHTML={{__html: hourData.picture}}></p>
                </div>
            </div>
            <Carousel
            height={200}
            slideSize="10%"
            slideGap="xs"
            align="center"
            slidesToScroll={1}
            dragFree
            >
                {weatherHourlyDataPath.map((hourData, index) => (<Carousel.Slide key={index}>
                    <p className='hourlyWeatherIcon' dangerouslySetInnerHTML={{__html: hourData.picture}}></p>
                    <p className='hourDataContent'>{hourData.temperature} °C</p>
                    <p className='hourDataContent'>{hourData.humidity}%</p>
                    <p className='hourDataContent'>{hourData.precipitation} mm</p>
                    <img 
                style={{'transform': `rotate(${hourData.windDirection}deg)`}} 
                className='hourlyWeatherWindIcon' alt='wind icon'
                src='\images\windDirection.png'></img>
                    <p className='hourDataContent'>{hourData.windSpeed}km/h</p>
                    <p className='hourDataContent'>{hourData.time.slice(11, 16)}</p>
                    {/*
                    time: "2022-12-13T00:00"
                    windDirection: "86"
                    windSpeed: "9.7"*/}
                    </Carousel.Slide>))
                
                }
            </Carousel>
        </div>
    );
};

export default HourlyWeather;