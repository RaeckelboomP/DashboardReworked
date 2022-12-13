import React from 'react';
import { Carousel } from '@mantine/carousel';

const HourlyWeather = ( props ) => {
    console.log(props)
    const hourData = props.widgetDatas.data[0];
    const weatherHourlyDataPath = props.widgetDatas.data[1];
    return (
        <div>
            <div className='hourlyWeatherWidgetHeader'>
                <h2>{hourData.label}</h2>
                <div className='hourlyWeatherWidgetHeaderContent'>
                    <p>{hourData.temperature}°C</p>
                    <img alt="weather" src={hourData.picture}/>
                </div>
            </div>
            <Carousel
            withIndicators
            height={200}
            slideSize="33.333333%"
            slideGap="xs"
            align="start"
            slidesToScroll={1}
            dragFree
            >
                {weatherHourlyDataPath.map((hourData, index) => (<Carousel.Slide key={index}>
                    <img alt="weather" src={hourData.picture}/>
                    <p className='hourDataContent'>{hourData.temperature}°C</p>
                    <p className='hourDataContent'>{hourData.humidity}%</p>
                    <p className='hourDataContent'>{hourData.precipitation}mm</p>
                    <p className='hourDataContent'>{hourData.windDirection}°</p>
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