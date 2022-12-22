import { useContext } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { WidgetContext } from "../WidgetContext";

const Tab = (props) => {
    const { deleteTab } = useContext(WidgetContext)
    return (
        <div className={props.className} onClick={props.onClick}>
                <TiDeleteOutline className='deleteTabButton' onClick={(e) => {
                    e.stopPropagation()
                    deleteTab(props.tabId)
                }} />
            {props.title}
        </div>   
    )
}

export default Tab;