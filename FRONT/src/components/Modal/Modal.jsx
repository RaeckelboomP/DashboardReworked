import { BsFillPlusSquareFill } from 'react-icons/bs';
import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';

export default function Modal(props) {

    const [modal, setModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState("weather");
    useEffect(() => {
        setSelectedValue(selectWidgetRef.current ? selectWidgetRef.current.value : "");
    }, [])
    const [weatherWidgetStatus, setWeatherWidgetStatus] = useState(false);
    const [hourlyWeatherWidgetStatus, setHourlyWeatherWidgetStatus] = useState(false);
    const [deezerWidgetStatus, setDeezerWidgetStatus] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState("");
    const [albums, setAlbums] = useState(null);
    const [deezerErrorMessage, setDeezerErrorMessage] = useState("");
    const [weatherErrorMessage, setWeatherErrorMessage] = useState("");
    const [id, setId] = useState(0);

    const toggleModal = () => {
        setModal(!modal)
        setSelectedArtist("");
        setAlbums(null);
        setDeezerWidgetStatus(false);
        setWeatherWidgetStatus(false);
        setHourlyWeatherWidgetStatus(false);
        setDeezerErrorMessage("");
        setWeatherErrorMessage("");
    }
    const deleteErrorMessage = () => {
        setWeatherErrorMessage("");
    }
    const searchAlbums = () => {
        if(selectedArtist === "") {
            setDeezerErrorMessage("Please type a group or an artist.");
            setAlbums(null);
        } else {
        axios.get('http://localhost:8080/albums_from_artist?artist=' + selectedArtist)
            .then((res) => {
                if(res.data.data === 'no data'){
                    setDeezerErrorMessage("This group or artist doesn't exist on Deezer's platform, please check the typing.");
                    setAlbums(null);
                }else
                    setAlbums(res.data.data);
            })
        }
    }
    const requestDeezerPlayer = () => {
        axios.get('http://localhost:8080/deezer_player?album=' + selectAlbumRef.current.value)
            .then((res) => {
                let modifiedHtml = res.data.html.replace("width=\"700\"", "");
                modifiedHtml = modifiedHtml.replace("id=\"deezer-widget\"", "id=\"deezer-widget"+id+"\"");
                setId(id + 1);
                props.ajoutWidget(props.activeTab, props.column, modifiedHtml, "DeezerPlayer");
                toggleModal();
            })
    }
    const createWeatherWidget = () => {
        axios.get(`http://localhost:8080/weather?city=${cityRef.current.value}`)
        .then((res) => {
            let data = res.data/* `
                <h2>${res.data.label}</h2>
                <p>${res.data.temperature}°C</p>
                <p>${res.data.temps}</p>
                <img src='${res.data.picture}'/>
            ` */;
            setId(id + 1);
            props.ajoutWidget(props.activeTab, props.column, data, "Weather");
            toggleModal();
        }).catch((error) => {
            setWeatherErrorMessage("No such city founded, please check your typing.");
        })
    }
    const createHourlyWeatherWidget = () => {
        axios.get(`http://localhost:8080/weatherHourly?city=${cityRef.current.value}`)
        .then((res) => {
            let data = `
                <h2>${res.data[0].label}</h2>
                <p>${res.data[0].temperature}°C</p>
                <p>${res.data[0].temps}</p>
                <img src='${res.data[0].picture}'/>
            `;
            setId(id + 1);
            props.ajoutWidget(props.activeTab, props.column, data, "HourlyWeather");
            toggleModal();
        }).catch((error) => {
            setWeatherErrorMessage("No such city founded, please check your typing.");
        })
    }

    const selectWidgetRef = useRef(null);
    const selectAlbumRef = useRef(null);
    const artistRef = useRef(null);
    const cityRef = useRef(null);

    return (
        <>
            <button id={props.id} className="new_widget" onClick={toggleModal}>
                    <BsFillPlusSquareFill /> 
                    <p>Add a new widget</p>
            </button>
            {modal && (
            <div className="modal">
                <div 
                onClick={toggleModal}
                className="overlay"></div>
                <div className="modal_content">
                    <h2>Wich widget do you want to add?</h2>
                    <select ref={selectWidgetRef} name="widget" id="widget"
                        onChange={e => {
                            setSelectedValue(e.target.value)
                            setDeezerWidgetStatus(false);
                            setWeatherWidgetStatus(false);
                            }}>
                        <option value="weather">Weather</option>
                        <option value="hourlyWeather">Forecast Weather</option>
                        <option value="deezer_player">Deezer player</option>
                    </select>
                    <p>{selectedValue}</p>
                    <button id="choice" onClick={() => {
                        if(selectWidgetRef.current.value === 'weather') {
                            setWeatherWidgetStatus(!weatherWidgetStatus)
                        } else if (selectWidgetRef.current.value === 'hourlyWeather') {
                            setHourlyWeatherWidgetStatus(!hourlyWeatherWidgetStatus)
                        } else {
                            setDeezerWidgetStatus(!deezerWidgetStatus)
                        }
                    }}>Ok</button>
                    {weatherWidgetStatus && (
                        <div className="weatherWidget">
                            <h3>Please type a city</h3>
                            <input ref={cityRef} type="text" placeholder='Bordeaux, Paris...'
                                onChange={deleteErrorMessage}/>
                            <button onClick={createWeatherWidget}>Create widget</button>
                            <p>{weatherErrorMessage}</p>
                        </div>
                    )}
                    {hourlyWeatherWidgetStatus && (
                        <div className="hourlyWeatherWidget">
                            <h3>Please type a city</h3>
                            <input ref={cityRef} type="text" placeholder='Bordeaux, Paris...'
                                onChange={deleteErrorMessage}/>
                            <button onClick={createHourlyWeatherWidget}>Create widget</button>
                            <p>{weatherErrorMessage}</p>
                        </div>
                    )}
                    {deezerWidgetStatus && (
                        <div className="deezerWidget">
                            <h3>Please type a group or an artist</h3>
                            <input ref={artistRef} type="text" placeholder='any_given_day, eluveitie, henri_dès...'
                                onChange={e => {
                                    setSelectedArtist(e.target.value);
                                    setDeezerErrorMessage("");
                                }}/>
                            <button onClick={searchAlbums}>Search albums</button>
                            <p>{deezerErrorMessage}</p>
                            {albums !== null && (
                                <>
                                    <h3>Please select an album to listen</h3>
                                    <select ref={selectAlbumRef} name="album" id="album">
                                        {albums.map((album) => (
                                            <option key={album.id} value={album.id}>{album.title}</option>
                                        ))}
                                    </select>
                                    <button onClick={requestDeezerPlayer}>Create a Deezer player</button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
            )}
        </>
    );
}