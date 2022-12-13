import React from 'react';

const DeezerPlayer = (props) => {
    let htmlData = props.widgetDatas.data;
    htmlData = htmlData.replace("height=\"300\"", "class=\"deezerPlayer\"");
    /*
    <iframe id="deezer-widget0" src="https://widget.deezer.com/widget/dark/album/9410100?app_id=457142&
    autoplay=false&radius=true&tracklist=true"  height="300" allowtransparency="true" 
    allowfullscreen="true" allow="encrypted-media">
    </iframe>
    */

    return (
        <div className="deezerPlayer" key={props.widgetDatas.idTab + "column1" + props.widgetDatas.id}
                        dangerouslySetInnerHTML={{__html: htmlData}} />                      
    );
};

export default DeezerPlayer;