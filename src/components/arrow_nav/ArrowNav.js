import React from 'react';
import './ArrowNav.css';

export const ArrowNav = ({mode, moveToPage}) => {
    return (
        <div className={"arrow"+(mode==="reverse"? " reverse" : "")} onClick={moveToPage}>
            <div className="arrow-top"></div>
            <div className="arrow-bottom"></div>
        </div>
    );
};