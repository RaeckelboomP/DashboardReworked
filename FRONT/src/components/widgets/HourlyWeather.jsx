import React from 'react';
import { Carousel } from '@mantine/carousel';

const HourlyWeather = ( props ) => {
    console.log(props)
    return (
        <div>
            
            <Carousel
            withIndicators
            height={200}
            slideSize="33.333333%"
            slideGap="xs"
            align="start"
            slidesToScroll={1}
            >
                {/* Do some for each function here to display each iteration of hourly informations */}
                <Carousel.Slide>1</Carousel.Slide>
                <Carousel.Slide>2</Carousel.Slide>
                <Carousel.Slide>3</Carousel.Slide>
                <Carousel.Slide>1a</Carousel.Slide>
                <Carousel.Slide>2a</Carousel.Slide>
                <Carousel.Slide>3a</Carousel.Slide>
            </Carousel>
        </div>
    );
};

export default HourlyWeather;