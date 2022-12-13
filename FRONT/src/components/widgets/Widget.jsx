import React from 'react';
import DeezerPlayer from './DeezerPlayer';
import Weather from './Weather';
import HourlyWeather from './HourlyWeather';

const selectWidgetToRender = ( props ) => {
    switch(props.widgetDatas.type) {
        case "DeezerPlayer":
            return <DeezerPlayer classname="widget" widgetDatas={props.widgetDatas} />;
        case "Weather":
            return <Weather classname="widget" widgetDatas={props.widgetDatas} />;
        case "HourlyWeather":
            return <HourlyWeather classname="widget" widgetDatas={props.widgetDatas} />;
        default :
            return null;
    }

}

const Widget = ( props ) => {
    return selectWidgetToRender(props);
};

export default Widget;