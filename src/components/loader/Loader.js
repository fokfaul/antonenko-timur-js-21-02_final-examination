import React from 'react';
import './Loader.css';

export const Loader = () => {
    return (
      <div className="loader">
          <div className="loader__body">
              <span className="loader__1lvl">
                <span className="loader__2lvl">
                    <span className="loader__3lvl"/>
                </span>
              </span>
          </div>
      </div>
    );
};