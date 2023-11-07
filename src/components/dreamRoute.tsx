import React, {useEffect, useState} from 'react';
import axios from "axios";
import {load} from "@2gis/mapgl";

const DreamRoute = () => {

    // load().then((mapglAPI) => {
    //     const map = new mapglAPI.Map('container', {
    //         center: [55.31878, 25.23584],
    //         zoom: 13,
    //         key: 'ed0e4750-b40a-4b50-8052-87e586e2f343',
    //     });
    // });


    const url = new URL(document.location.href);
    const lat = url.searchParams.get('lat')
    const lon = url.searchParams.get('lon')
    const rgid = url.searchParams.get('rdid')
    const key = "ed0e4750-b40a-4b50-8052-87e586e2f343"

    const [ILL, setILL] = useState(false)
    const [categories, setCategories] = useState([])


    const handleFilter = (cat, id) => {
        const element = document.getElementById(id);
        if (element.classList.contains("fiactive")) {
            element.classList.remove("fiactive");
            setCategories(categories.filter(x => x !== cat));
        } else {
            element.classList.add("fiactive");
            if (!categories.includes(cat)) {
                setCategories([...categories, cat]);
            }
        }
    }

    useEffect(() => {
console.log(categories)
    }, [categories])
    const [list, setList] = useState([])

    useEffect(() => {
        console.log(list)
    }, [list])
    const listHandle = () => {
        categories.map(cate => {
            axios.get(`https://catalog.api.2gis.com/3.0/items?q=${cate}&sort_point=${lat},${lon}&key=${key}`)
                .then(res => {
                    setList(res.data.result.items.filter(item => item.address_name && item.name !== null))
                    setILL(true)
                    document.getElementById("filters").classList.add("hidden")
                    document.getElementById("filters1").classList.add("hidden")
                    document.getElementById("filters2").classList.add("hidden")
                })
    })
    }

    return (
        <div className="main" >

            <h1 id="filters" className="filter-title">Выберите категории:</h1>
            <div id="filters1" className="filter-container">
                <div id={`1`} className="filter-item" onClick={() => handleFilter('кафе', "1")}>кафе 🍜</div>
                <div id={`2`} className="filter-item" onClick={() => handleFilter('бары', "2")}>бары 🍸</div>
                <div id={`3`} className="filter-item" onClick={() => handleFilter('развлечения', "3")}>развлечения 🥳</div>
                <div id={`4`} className="filter-item" onClick={() => handleFilter('пляж', "4")}>пляж 🏖</div>
                <div id={`5`} className="filter-item" onClick={() => handleFilter('активный отдых', "5")}>активный отдых 🏂</div>
                <div id={`6`} className="filter-item" onClick={() => handleFilter('достопримечательности', "6")}>достопримечательности 🗽</div>
            </div>
            <button id="filters2" className="filter-button" onClick={listHandle}>показать места!</button>

            <div id="filtered-list" className={`filtered-list ${ILL ? "" : "hidden"}`}>
                {ILL ? list.map(item =><div className={"listadr"}><span className={"listtext"}>{item.name}</span> <span className={"listtext"}>{item.address_name}</span></div> ) : ""}
                {list.length === 0 ? <span className={"listtext"}>Ничего не найденно!</span> : ""}
            </div>

            </div>
    );
};

export default DreamRoute;