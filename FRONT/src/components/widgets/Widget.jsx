import React from 'react';
import DeezerPlayer from './DeezerPlayer';
import Weather from './Weather';
import HourlyWeather from './HourlyWeather';

const selectWidgetToRender = ( props ) => {
    switch(props.widgetDatas.type) {
        case "DeezerPlayer":
            return <DeezerPlayer key={props.keyParams} classname="widget" widgetDatas={props.widgetDatas} />;
        case "Weather":
            return <Weather key={props.keyParams} classname="widget" widgetDatas={props.widgetDatas} />;
        case "HourlyWeather":
            return <HourlyWeather key={props.keyParams} classname="widget" widgetDatas={props.widgetDatas} />;
        default :
            return null;
    }

}

const Widget = ( props ) => {
    return selectWidgetToRender(props);
};

export default Widget;