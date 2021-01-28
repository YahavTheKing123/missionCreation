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

        const {mainHeaderTextRow1Col1, mainHeaderTextRow1Col2, mainHeaderTextRow1Col3} = data;

        return (
            <div className='all-fire-mini-header'>
                <div className='all-fire-mini-header-data'>
                    <Icon className='mission-icon' iconUri={require('./assets/mission1.svg')}/>
                    <span className='main-text' title={mainHeaderTextRow1Col1}>{mainHeaderTextRow1Col1}</span>
                    {mainHeaderTextRow1Col2 ? <span className='info-text1' title={mainHeaderTextRow1Col2}>{mainHeaderTextRow1Col2}</span> : null}
                    {mainHeaderTextRow1Col3 ? <span className='info-text2' title={mainHeaderTextRow1Col3}>
                        <Icon iconUri={require('./assets/timer.svg')}/>
                        {mainHeaderTextRow1Col3}
                    </span> : null }
                </div>
                <button className='all-fire-mini-header-button' onClick={this.props.onButtonClick.bind(this, this.props.missionType)}>{this.getButtonText()}</button>
            </div>
        )
    }
}
