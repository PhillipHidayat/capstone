import React from 'react'
import './DiagnosisList.css'

function DiagnosisList() {
    const options = [
        {label: "item 0"},
        {label: "item 1"},
        {label: "item 2"},
        {label: "item 3"},
        {label: "item 4"},
        {label: "item 5"},
        {label: "item 6"},
        {label: "item 7"},
        {label: "item 8"},
        {label: "item 9"}
    ]
    
    return (
        <div className= "dropdown">
            <select className= "form-select">
                {options.map(option => (
                    <option value= {option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}

export default DiagnosisList
