import { BsFillPlusSquareFill } from 'react-icons/bs';
import Board from "../components/Board";
import {useState} from 'react';
import { WidgetContext } from '../WidgetContext';

const Dashboard = () => {

    const [idTab, setIdTab] = useState(0);
    const [tabs, setTabs] = useState([{id:0, title:"First tab"}]);
    const [activeTab, setActiveTab] = useState(tabs[0] ? tabs[0].id : "");
    const [widgets, setWidgets] = useState([]);
    const [id, setId] = useState(0);

    var ajoutWidget = (column, data) => {
        setWidgets(widgets => [...widgets, {data:data, column:column, id:id}]);
        setId(id+1);
    }

    var ajoutTab = () => {
        setTabs(tabs => [...tabs, {id:idTab+1, title:prompt("Enter tab's name :")}]);
        setActiveTab(idTab +1);
        setIdTab(idTab + 1);
    }

    return (
        <WidgetContext.Provider value={{ widgets, setWidgets, ajoutWidget }} >
        <div>
            <div className = "tabs_container">
                <div id="current_tabs" className = "current_tabs">
                    {tabs.map((tab) => (
                        <button key={tab.id} id={tab.id} 
                        className = {tab.id===activeTab ? "tab active-btn" : "tab"} 
                        onClick={() => setActiveTab(tab.id)}>
                            {tab.title}
                        </button>
                    ))}
                </div>
                <button onClick={ajoutTab}><BsFillPlusSquareFill className="plus_btn" />New tab</button>
            </div>
            {tabs.length === 0 &&
                <p>Hello!</p>
            }
                {tabs.map((tab) => (
                    activeTab === tab.id 
                    ? <Board key={tab.id} idTab={tab.id} />
                    : null
                ))}
        </div>
        </WidgetContext.Provider>
    )
}

export default Dashboard;