import React, { Component } from 'react';
import Carpet from './Carpet';
import './FireHistory.less';
import './FireHistory.css';

export default class FireHistory extends Component {

    renderEmptyPage() {
        return (
            <div className='empty-history-wrapper'>
                <span className='empty-history-image'></span>
                <div className='empty-history-text-wrapper'>
                    <span className='empty-history-text-header'>היסטוריה ריקה</span>
                    <span className='empty-history-text-value'>המערכת לא זיהתה ביצוע ירי</span>
                </div>
            </div>
        )
    }

    renderFireHistory() {
        const carpets = [];
        for (let i = 0; i < 5; i++) {
            carpets.push(<Carpet/>);            
        }
        return carpets;
    }
    
    render() {
        return (
            <div className='fire-history-wrapper'>
                {true ? this.renderFireHistory() : this.renderEmptyPage()}
            </div>
        )
    }
}
