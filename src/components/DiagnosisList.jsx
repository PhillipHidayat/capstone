import React from 'react'
import './DiagnosisList.css'
import { useState } from 'react'

function DiagnosisList(props) {
    const options = [
        {label: "item 0", value: 0},
        {label: "item 1", value: 1},
        {label: "item 2", value: 2},
        {label: "item 3", value: 3},
        {label: "item 4", value: 4},
        {label: "item 5", value: 5},
        {label: "item 6", value: 6},
        {label: "item 7", value: 7},
        {label: "item 8", value: 8},
        {label: "item 9", value: 9}
    ]

    const [diagnosis, setDiagnosis] = useState(1)
    
    return (
        <div className= "dropdown">
            <select className= "form-select" value = {props.display/*diagnosis*/} onChange={e => setDiagnosis(e.target.value)}>
                {options.map(option => (
                    <option value= {option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}

export default DiagnosisList
