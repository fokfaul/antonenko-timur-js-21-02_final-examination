import React from 'react';
import './WinLoader.css';
import {Window} from '../../wrappers/window/Window';

export const WinLoader = () => {
    return (
      <Window>
          <div className="win-loader">
              <span className="win-loader__1lvl">
                <span className="win-loader__2lvl">
                    <span className="win-loader__3lvl"/>
                </span>
              </span>
          </div>
      </Window>
    );
};