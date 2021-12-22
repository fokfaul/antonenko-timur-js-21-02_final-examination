import React from 'react';
import './Helper.css';

export const Helper = ({children, objId}) => {
    return (
      <div className="component-with-helper">
        {children}
        <div className="component-with-helper__helper">{objId}</div>
      </div>
    );
};