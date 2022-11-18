import { BsFillPlusSquareFill } from 'react-icons/bs';
import Board from "./Board";
import {useState} from 'react';

const Dashboard = () => {

    const [id, setId] = useState(0);
    const [tabs, setTabs] = useState([{id:0, title:"First tab"}]);
    const [activeTab, setActiveTab] = useState(tabs[0] ? tabs[0].id : "");

    var ajoutTab = () => {
        setTabs(tabs => [...tabs, {id:id+1, title:prompt("Enter tab's name :")}]);
        setActiveTab(id +1);
        setId(id + 1);
    }

    return (
        <div>
            <div className = "tabs_container">
                <div id="current_tabs" className = "current_tabs">
                    {tabs.map((tab) => (
                        <button key={"button"+tab.id} id={tab.id} className = "tab" onClick={() => setActiveTab(tab.id)} >
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
                    ? <Board idTab={tab.id} />
                    : null
                ))}
        </div>
    )
}

export default Dashboard;