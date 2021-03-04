import React, { Component } from 'react'
import Icon from './ui-component/Icon/Icon';
import { ValueSet } from './mock/Mock';

export default class HeaderCard extends Component {

    renderButton() {
        const missionType = ValueSet.getValue({sname: this.props.entity.CommonX.allFire.missionTypeValueSetSname}, this.props.missionType);

        let btnText = '';
        let btnTextColor = null;
        let btnTextBGColor = null;

        if (missionType) {
            btnText = missionType.dispName;
            btnTextColor = missionType.textColor;
            btnTextBGColor = missionType.backgroundColor;
        }
        

        return (
                <button 
                    className='all-fire-mini-header-button'
                    style={{backgroundColor: btnTextBGColor, color: btnTextColor}}
                    onClick={this.props.onButtonClick.bind(this, this.props.missionType)}>{btnText}
                </button>
        )
    }

    render() {
        const data = this.props.entity && this.props.entity.CommonX && this.props.entity.CommonX.allFire;
        
        if (!data) {
            return null
        }

        const {headerCardMainSectionRow1Col1Text, headerCardMainSectionRow1Col2Text, headerCardMainSectionRow1Col3Text} = data;

        return (
            <div className='all-fire-mini-header'>
                <div className='all-fire-mini-header-data'>
                    <Icon className='mission-icon' iconUri={require('./assets/mission1.svg')}/>
                    <span className='main-text' title={headerCardMainSectionRow1Col1Text}>{headerCardMainSectionRow1Col1Text}</span>
                    {headerCardMainSectionRow1Col2Text ? <span className='info-text1' title={headerCardMainSectionRow1Col2Text}>{headerCardMainSectionRow1Col2Text}</span> : null}
                    {headerCardMainSectionRow1Col3Text ? <span className='info-text2' title={headerCardMainSectionRow1Col3Text}>
                        <Icon iconUri={require('./assets/timer.svg')}/>
                        {headerCardMainSectionRow1Col3Text}
                    </span> : null }
                </div>
                {this.renderButton()}
            </div>
        )
    }
}
