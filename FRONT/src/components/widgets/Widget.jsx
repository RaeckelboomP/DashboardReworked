import React from 'react';
import DeezerPlayer from './DeezerPlayer';
import Weather from './Weather';
import HourlyWeather from './HourlyWeather';
import {TiDeleteOutline} from 'react-icons/ti';
import { WidgetContext } from '../../WidgetContext';
import { useContext } from 'react';

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
    const { deleteWidget } = useContext(WidgetContext);

    return(
        <div className='widgetContainer'>
            <div className='deleteButtonContainer'>
                <TiDeleteOutline className='deleteWidgetButton' onClick={() => {
                    deleteWidget(props.widgetDatas.id)
                }} />
            </div>
            {selectWidgetToRender(props)}
        </div>
    )
};

export default Widget;