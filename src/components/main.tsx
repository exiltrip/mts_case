import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";

const Main: React.FC = () => {
    const key = "ed0e4750-b40a-4b50-8052-87e586e2f343"
    const [hotel, setHotel] = useState("")
    const [suggestions, setSuggestions] = useState([])

    const suggestHandle = (e) => {
        setHotel( e.target.value )
        axios.get(`https://catalog.api.2gis.com/3.0/suggests?q=${e.target.value}&fields=items.point,items.region_id&key=${key}`)
            .then(res => {
                if(res.data && res.data.result) {
                    // Ensure item.point exists and item.point.lat is not undefined
                    setSuggestions(res.data.result.items.filter(item => item.point && item.point.lat !== undefined))
                }
                else if(e.target.value === ""){
                    setSuggestions([])
                }
            })
            .catch(err => {
                console.error(err);
            });
    }


    return (
        <div className="main">
            <div id="container"></div>
            <div className="main-block">
                <div className="sugg-container">
                <input
                    type="text"
                    value={hotel}
                    onChange={suggestHandle}
                    placeholder={"Название отеля"}
                    className="main-block__input"
                />
                <div className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <NavLink to={`/route?rdid=${suggestion.region_id}&lat=${suggestion.point.lat}&lon=${suggestion.point.lon}`} className="suggestions-item" key={index}>{suggestion.name}</NavLink>
                    ))}
                </div>

                </div>
                {/*<NavLink to={`/route?qu=${hotel}`} className="main-block__button">Найти места</NavLink>*/}
            </div>
        </div>
    );
};

export default Main;
