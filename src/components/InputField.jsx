import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import openBook from "../../../untitled/src/assets/icons8-open-book-30.png"

function InputField () {
    return (
        <div className="input-wrapper">
            <input type="text" className="styled-input" placeholder=" " />
            <div className='icon-container'>
                <img src={openBook} alt ="book icon" />
            </div>
        </div>
    );
}

export default InputField