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
        const {data: {seconaryIconBottom, mainIcon, seconaryIconTop, rightSectionBottomIcon, rightSectionBottomText, rightSectionBottomTextColor}} = this.props;

        return (
            <div className={`my-participate-card-right ${sizeClass} ${selectedClass}`}>
                <div className='right-images'>
                    {seconaryIconTop ? <Icon className='top-image' iconUri={seconaryIconTop} style={{width: '2rem', height: '2rem'}}/> : null}
                    {seconaryIconBottom ? <Icon className='bottom-image' iconUri={seconaryIconBottom} style={{width: '2rem', height: '2rem'}}/> : null}
                </div>
                <span className='main-image-wrapper'>
                    <Icon className='main-image' iconUri={mainIcon} style={{width: '4rem', height: '4rem'}}/>
                    {rightSectionBottomText ? 
                        <span className='bottom-text' style={{color: rightSectionBottomTextColor}}>
                            <Icon className='bottom-icon' iconUri={rightSectionBottomIcon}/>
                            {rightSectionBottomText}
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
                        <span className='card-row-item main-text' title={data.mainText}>
                            {data.mainText}
                        </span>                        
                        <span className='card-row-item secondary-text' title={data.secondaryText}>{data.secondaryText}</span>
                        <span className='card-row-item info-text1' 
                            title={data.infoText1}
                            style={{backgroundColor: data.infoText1BgColor, color: data.infoText1Color}}>
                                {data.infoText1}
                        </span>
                        <span className='card-row-item info-text2' 
                            title={data.infoText2}
                            style={{color: data.infoText2Color}}>
                                {data.infoText2}
                        </span>
                    </div>
                    {data.row2text1 ? 
                        <div className='my-participate-card-center-row'>
                            <div className='second-row-wrapper'>
                                <Icon iconUri={require('./assets/rocket.svg')} className='rocket-icon'/>
                                <span className='card-row-item'>{data.row2text1}</span>
                                <span className='card-row-item'>{data.row2text2}</span>
                                <span className='card-row-item'>{data.row2text3}</span>
                                <span className='card-row-item'>{data.row2text4}</span>
                                <span className='card-row-item'>{data.row2text5}</span>
                            </div>
                        </div> :
                    null}
                </div>
                <div className='my-participate-card-left'>
                    {this.renderExpandButton()}
                </div>
            </div>
        )
    }
}
