import React, { Component } from 'react'
import './AllFire.css';
import Icon from './ui-component/Icon/Icon';

export const participatesCardSize = {
    large: 'large',
    medium: 'medium',
    small: 'small',
}
export default class MyParticipateCard extends Component {

    renderCardRightImages(selectedClass) {

        const sizeClass = this.props.cardSize ? this.props.cardSize : participatesCardSize.small;
        const {
            data: {
                bodyCardRightSectionMiddleRightIcon, 
                bodyCardRightSectionMainIcon, 
                bodyCardRightSectionTopRightIcon,
                bodyCardRightSectionBottomIcon, 
                bodyCardRightSectionBottomText, 
                bodyCardRightSectionBottomTextColor
            }
        } = this.props;

        return (
            <div className={`my-participate-card-right ${sizeClass} ${selectedClass}`}>
                <div className='right-images'>
                    {bodyCardRightSectionTopRightIcon ? <Icon className='top-image' iconUri={bodyCardRightSectionTopRightIcon} style={{width: '2rem', height: '2rem'}}/> : null}
                    {bodyCardRightSectionMiddleRightIcon ? <Icon className='bottom-image' iconUri={bodyCardRightSectionMiddleRightIcon} style={{width: '2rem', height: '2rem'}}/> : null}
                </div>
                <span className='main-image-wrapper'>
                    <Icon className='main-image' iconUri={bodyCardRightSectionMainIcon} style={{width: '4rem', height: '4rem'}}/>
                    {bodyCardRightSectionBottomText ? 
                        <span className='bottom-text' style={{color: bodyCardRightSectionBottomTextColor}}>
                            <Icon className='bottom-icon' iconUri={bodyCardRightSectionBottomIcon}/>
                            {bodyCardRightSectionBottomText}
                        </span> 
                        : null
                    }
                </span>
            </div>
        )
    }

    renderExpandButton() {
        return <Icon className='my-participate-card-expand-btn' iconUri={require('./assets/edit.svg')} style={{width: '2.5rem', height: '2.5rem'}}/>
    }

    onParticiapteClick = () => {
        if (this.props.onParticiapteClick) {
            this.props.onParticiapteClick(this.props.id)
        }
    }

    render() {
        const selectedClass = this.props.isSelected ? 'selected' : '';
        const canBeSelectedClass = this.props.isCanBeSelected ? 'cursor-pointer' : '';

        const {data} = this.props;
        return (
            <div className={`my-participate-card ${selectedClass} ${canBeSelectedClass}`} onClick={this.onParticiapteClick}>
                {this.renderCardRightImages(selectedClass)}                
                <div className='my-participate-card-center'>
                    <div className='my-participate-card-center-row'>
                        <span className='card-row-item main-text' title={data.bodyCardMainSectionRow1Col1Text}>
                            {data.bodyCardMainSectionRow1Col1Text}
                        </span>                        
                        <span className='card-row-item secondary-text' title={data.bodyCardMainSectionRow1Col2Text}>{data.bodyCardMainSectionRow1Col2Text}</span>
                        <span className='card-row-item info-text1' 
                            title={data.bodyCardMainSectionRow1Col3Text}
                            style={{backgroundColor: data.bodyCardMainSectionRow1Col3TextBGColor, color: data.bodyCardMainSectionRow1Col3TextColor}}>
                                {data.bodyCardMainSectionRow1Col3Text}
                        </span>
                        <span className='card-row-item info-text2' 
                            title={data.bodyCardMainSectionRow1Col4Text}
                            style={{color: data.bodyCardMainSectionRow1Col4TextColor}}>
                                {data.bodyCardMainSectionRow1Col4Text}
                        </span>
                    </div>
                    {data.bodyCardMainSectionRow2Col1Text ? 
                        <div className='my-participate-card-center-row'>
                            <div className='second-row-wrapper'>
                                <Icon iconUri={require('./assets/rocket.svg')} className='rocket-icon'/>
                                <span className='card-row-item'>{data.bodyCardMainSectionRow2Col1Text}</span>
                                <span className='card-row-item'>{data.bodyCardMainSectionRow2Col2Text}</span>
                                <span className='card-row-item'>{data.bodyCardMainSectionRow2Col3Text}</span>
                                <span className='card-row-item'>{data.bodyCardMainSectionRow2Col4Text}</span>
                                <span className='card-row-item'>{data.bodyCardMainSectionRow2Col5Text}</span>
                            </div>
                        </div> :
                    null}
                </div>
                {
                    this.props.isEditable ? 
                        <div className='my-participate-card-left'>
                            {this.renderExpandButton()}
                        </div> : null
                }
            </div>
        )
    }
}
