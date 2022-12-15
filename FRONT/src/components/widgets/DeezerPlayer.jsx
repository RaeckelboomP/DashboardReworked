import React from 'react';

const DeezerPlayer = (props) => {
    let htmlData = props.widgetDatas.data;
    htmlData = htmlData.replace("height=\"300\"", "class=\"deezerPlayer\"");

    return (
        <div className="deezerPlayer" key={props.widgetDatas.idTab + "column1" + props.widgetDatas.id}
                        dangerouslySetInnerHTML={{__html: htmlData}} />                      
    );
};

export default DeezerPlayer;