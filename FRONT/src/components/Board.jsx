import { useContext } from 'react';
import { WidgetContext } from '../WidgetContext';
import Widget from './widgets/Widget';
import Modal from './Modal/Modal';


const Board = (props) => {
    const { widgets, ajoutWidget } = useContext(WidgetContext);

    return (<>
        <div className = "board" id = {props.idTab}>
            <div key={"board_"+props.idTab+"_column_1"} id={"board_"+props.idTab+"_column_1"}>
                {widgets
                .filter((widget) => widget.tabId === props.activeTab)
                .map((widget) => (
                    widget.column === 1 && (
                        <Widget key={props.idTab + "column1" + widget.id}
                        className="widget" widgetDatas={widget} />
                    )
                ))}
                <Modal activeTab={props.activeTab} column={1} ajoutWidget={ajoutWidget} id={"ajoutWidgetBoard"+props.idTab+"_1"}/>
            </div>

            <div key={"board_"+props.idTab+"_column_2"} id={"board_"+props.idTab+"_column_2"}>
                {widgets
                .filter((widget) => widget.tabId === props.activeTab)
                .map((widget) => (
                    widget.column === 2 && (
                        <Widget key={props.idTab + "column2" + widget.id}
                        className="widget" widgetDatas={widget} />
                    )
                ))}
                <Modal activeTab={props.activeTab} column={2} ajoutWidget={ajoutWidget} id={"ajoutWidgetBoard"+props.idTab+"_2"}/>
            </div>
            
            <div key={"board_"+props.idTab+"_column_3"} id={"board_"+props.idTab+"_column_3"}>
                {widgets
                .filter((widget) => widget.tabId === props.activeTab)
                .map((widget) => (
                    widget.column === 3 && (
                        <Widget key={props.idTab + "column3" + widget.id}
                        className="widget" widgetDatas={widget} />
                    )
                ))}
                <Modal activeTab={props.activeTab} column={3} ajoutWidget={ajoutWidget} id={"ajoutWidgetBoard"+props.idTab+"_3"}/>
            </div>
        </div>
        </>)
}

export default Board;