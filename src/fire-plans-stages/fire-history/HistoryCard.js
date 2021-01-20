import React, { Component } from 'react';
import './FireHistory.less';
import './FireHistory.css';

export default class PlanStage extends Component {

    renderRectangleWeights() {
        const weights = [];
        for (let i = 0; i < 4; i++) {
            weights.push(
                <span key={i} className='fire-history-card-rectangle-weight'></span>
            )
        }
        return weights;
    }
    
    renderUpperSection() {            
        return (
            <div className={`fire-history-card-upper-section`}>
                <span className='fire-history-card-item'>
                    <span className={`fire-history-card-icon-wrapper`}>
                        <span className={'fire-history-card-icon'}></span>
                    </span>
                </span>
                <span className='fire-history-card-item hour'>08:15:00</span>
                <span className='fire-history-card-item pagaz'>
                    <span className='top'>{this.renderRectangleWeights()}</span>
                    <span className='bottom'>M107</span>
                </span>
                <span className='fire-history-card-item marom'>
                    <span className='top'>קרקע</span>
                    <span className='bottom'>M739</span>
                </span>
                <span className='fire-history-card-item hana'>
                    <span className='top'>4/7</span>
                    <span className='bottom'>M4a2</span>                    
                </span>
                <span className='fire-history-card-item speed'>
                    <span className='top'>ms</span>
                    <span className='bottom'>359(+9)</span>                    
                </span>
            </div>
        )
    }
    render() {        
    
        return (
            <div className={`fire-history-card-wrapper`}>
                {this.renderUpperSection()}
            </div>
        )
    }
}