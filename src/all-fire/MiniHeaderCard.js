import React, { Component } from 'react'
import Icon from './ui-component/Icon/Icon';
import { ValueSet } from './mock/Mock';

export default class HeaderCard extends Component {


    getButtonText() {        
        const missionType = ValueSet.getValue({sname: this.props.entity.CommonX.allFire.missionTypeValueSetSname}, this.props.missionType);
        if (missionType) {
            return missionType.dispName;
        }
        return '';
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
                <button className='all-fire-mini-header-button' onClick={this.props.onButtonClick.bind(this, this.props.missionType)}>{this.getButtonText()}</button>
            </div>
        )
    }
}
