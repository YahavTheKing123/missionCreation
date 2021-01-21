import React, { Component } from 'react'
import './AllFire.css';

export default class MyParticipateCard extends Component {

    renderCardRightImages(selectedClass) {
        const externalClass = this.props.isExternal ? 'external' : '';
        return (
            <div className={`my-participate-card-right ${externalClass} ${selectedClass}`}>
                <div className='right-images'>
                    <img className='top-image' src={require('./assets/wifi.svg')} style={{width: '2rem', height: '2rem'}}/>
                    <img className='bottom-image' src={require('./assets/shield.svg')} style={{width: '2rem', height: '2rem'}}/>
                </div>
                <img className='main-image' src={require('./assets/missionType.svg')} style={{width: '4rem', height: '4rem'}}/>
            </div>
        )
    }

    renderExpandButton() {
        return <img className='my-participate-card-expand-btn' src={require('./assets/arrow-down.svg')} style={{width: '1.5rem', height: '1.5rem'}}/>
    }

    render() {
        const selectedClass = this.props.isSelected ? 'selected' : '';
        return (
            <div className={`my-participate-card ${selectedClass}`} onClick={() => this.props.onParticiapteClick(this.props.participateId)}>
                {this.renderCardRightImages(selectedClass)}                
                <div className='my-participate-card-center'>
                    <div className='my-participate-card-center-row'>
                        <span>{'xcxc cxcx xcxc'}</span>
                        <span>{'גגג גגג גגגג'}</span>
                    </div>
                </div>
                <div className='my-participate-card-left'>
                    {/*this.renderExpandButton()*/}
                </div>
            </div>
        )
    }
}
