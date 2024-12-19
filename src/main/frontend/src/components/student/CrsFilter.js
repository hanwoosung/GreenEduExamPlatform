import React from "react";

const CrsFilter = ({filter, item, setFilter}) => (

    <button
        key={item.value}
        className={`filter-btn ${filter === item.value ? 'active' : ''}`}
        onClick={() => setFilter(item.value)}
    >
        {item.title}
    </button>

)

export default CrsFilter