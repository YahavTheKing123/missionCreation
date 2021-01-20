import React, { Component } from 'react';
import './Input.less';
import './Input.css';


export default class Counter extends Component {

    state = {
        value: ''
    }


    render() {
        return (
            <div className='input-wrapper'>                
                <input
                    ref={this.fileInputRef}
                    className='input-value'                    
                    onChange={this.onFolderSelected}
                />
            </div>
        )
    }
}
