import { BsFillPlusSquareFill } from 'react-icons/bs';
import {useState} from 'react';
import { WidgetContext } from '../WidgetContext';
import Board from "../components/Board";
import Tab from '../components/Tab';
import NoBoard from '../components/NoBoard';
import NewTabModal from '../components/Modal/NewTabModal';

const Dashboard = () => {

    const [idTab, setIdTab] = useState(0);
    const [tabs, setTabs] = useState([{id:0, title:"First tab"}]);
    const [activeTab, setActiveTab] = useState(tabs[0] ? tabs[0].id : "");
    const [widgets, setWidgets] = useState([]);
    const [id, setId] = useState(0);
    const [modal, setModal] = useState(false);

    var toggleModal = () => {
        setModal(!modal)
    }
    
    var ajoutWidget = (tabId, column, data, type) => {
        setWidgets(widgets => [...widgets, {tabId:tabId, data:data, column:column, id:id, type:type}]);
        setId(id+1);
    }

    var deleteWidget = (id) => {
        setWidgets(widgets.filter(widget => widget.id !== id))
    }

    var ajoutTab = (tabName) => {
        setTabs(tabs => [...tabs, {id:idTab+1, title:tabName}]);
        setActiveTab(idTab +1);
        setIdTab(idTab + 1);
    }

    var deleteTab = (tabId) => {
        const BreakError = {}
        setTabs(tabs.filter(tab => tab.id !== tabId))
        if (activeTab === tabId) {
            try {
                tabs.sort((a, b) => a.id - b.id).forEach(tab => {
                    if (tab.id > tabId) {
                        setActiveTab(tab.id)
                        throw BreakError;
                    }
                });
                tabs.sort((a, b) => b.id - a.id).forEach(tab => {
                    if (tab.id < tabId) {
                        setActiveTab(tab.id)
                        throw BreakError;
                    }
                });
            }
            catch(error) {
            }
        }
    }
    return (
        <WidgetContext.Provider value={{ widgets, setWidgets, ajoutWidget, deleteWidget, deleteTab }} >
        <div>
            <div className = "tabs_container">
                <div id="current_tabs" className = "current_tabs">
                    {tabs.map((tab) => (
                        <Tab key={tab.id} tabId={tab.id} title={tab.title}
                        onClick={() => setActiveTab(tab.id)}
                        className={tab.id===activeTab ? "tab active-btn" : "tab"}/>
                    ))}
                </div>
                {tabs.length !== 0 &&
                <button onClick={toggleModal}><BsFillPlusSquareFill className="plus_btn" />New board</button>
            }
            </div>
            {modal && (<NewTabModal toggleModal={toggleModal} ajoutTab={ajoutTab}/>)}
            {tabs.length === 0 &&
                <NoBoard onClick={toggleModal}/>
            }
                {tabs.map((tab) => (
                    activeTab === tab.id 
                    ? <Board key={tab.id} idTab={tab.id} activeTab={activeTab} />
                    : null
                ))}
        </div>
        </WidgetContext.Provider>
    )
}

export default Dashboard;