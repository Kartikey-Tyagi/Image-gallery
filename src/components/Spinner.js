import React from 'react'
import loader from '../images/loader.gif'

export default function Spinner() {
    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', margin:'20px'}}>
            <img src={loader} alt="loading" />
        </div>
    )
}
