import { useState } from 'react';
import Modal from './Modal/Modal';

const Board = (props) => {

    const [widgets, setWidgets] = useState([]);
    const [id, setId] = useState(0);

    var getWeather = async (ville) => {
        var data;
        fetch('http://localhost:8080/weather?city='+ville)
        .then(response => response.json())
        .then(data);
        /*const response = await fetch('http://localhost:8080/weather?city='+ville);
        const data = await response.json();
        this.setState({ totalReactPackages: data })*/
        return data;
    }
    var ajoutWidget = (column, data) => {
        setWidgets(widgets => [...widgets, {data:data, column:column, id:id}]);
        setId(id+1);
    }

    return (<>
        <div className = "board" id = {props.idTab}>
            <div id={"board_"+props.idTab+"_column_1"}>
                {widgets.map((widget) => (
                    widget.column === 1 && (
                        <div key={props.idTab + "column1" + widget.id}
                        className = "widget"
                        dangerouslySetInnerHTML={{__html: widget.data}} />
                    )
                ))}
                <Modal column={1} ajoutWidget={ajoutWidget} id={"ajoutWidgetBoard"+props.idTab+"_1"}/>
            </div>
            <div id={"board_"+props.idTab+"_column_2"}>
                {widgets.map((widget) => (
                    widget.column === 2 && (
                        <div key={props.idTab + "column2" + widget.id}
                        className = "widget"
                        dangerouslySetInnerHTML={{__html: widget.data}} />
                    )
                ))}
                <Modal column={2} ajoutWidget={ajoutWidget} id={"ajoutWidgetBoard"+props.idTab+"_2"}/>
            </div>
            <div id={"board_"+props.idTab+"_column_3"}>
                {widgets.map((widget) => (
                    widget.column === 3 && (
                        <div key={props.idTab + "column3" + widget.id}
                        className = "widget"
                        dangerouslySetInnerHTML={{__html: widget.data}} />
                    )
                ))}
                <Modal column={3} ajoutWidget={ajoutWidget} id={"ajoutWidgetBoard"+props.idTab+"_3"}/>
            </div>
        </div>
        </>)
}

export default Board;