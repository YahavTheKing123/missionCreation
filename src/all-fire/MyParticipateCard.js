import React, { Component } from 'react'
import './AllFire.css';
import Icon from './ui-component/Icon/Icon';

export default class MyParticipateCard extends Component {

    renderCardRightImages(selectedClass) {
        const externalClass = this.props.isExternal ? 'external' : '';
        const {data} = this.props;
        return (
            <div className={`my-participate-card-right ${externalClass} ${selectedClass}`}>
                <div className='right-images'>
                    <Icon className='top-image' iconUri={data.seconaryIconTop} style={{width: '2rem', height: '2rem'}}/>
                    <Icon className='bottom-image' iconUri={data.seconaryIconBottom} style={{width: '2rem', height: '2rem'}}/>
                </div>
                <Icon className='main-image' iconUri={data.mainIcon} style={{width: '4rem', height: '4rem'}}/>
            </div>
        )
    }

    // renderExpandButton() {
    //     return <Icon className='my-participate-card-expand-btn' iconUri={require('./assets/arrow-down.svg')} style={{width: '1.5rem', height: '1.5rem'}}/>
    // }

    render() {
        const selectedClass = this.props.isSelected ? 'selected' : '';
        const {data} = this.props;
        return (
            <div className={`my-participate-card ${selectedClass}`} onClick={() => this.props.onParticiapteClick(this.props.id)}>
                {this.renderCardRightImages(selectedClass)}                
                <div className='my-participate-card-center'>
                    <div className='my-participate-card-center-row'>
                        <span>{data.mainText}</span>
                        <span>{data.secondaryText}</span>
                    </div>
                </div>
                <div className='my-participate-card-left'>
                    {/*this.renderExpandButton()*/}
                </div>
            </div>
        )
    }
}
