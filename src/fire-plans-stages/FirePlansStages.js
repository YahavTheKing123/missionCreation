import React, { Component } from 'react';
import './FirePlansStages.less';
import './FirePlansStages.css';
import FirePlanes from './fire-plans/FirePlans';
import FireHistory from './fire-history/FireHistory';

const tabs = {
    firePlans: 'firePlans',
    history: 'history',
}

export default class FirePlansStages extends Component {

    state = {
        selectedTab: tabs.firePlans
    }

    onTabClicked = tab => {
        this.setState({selectedTab: tab});
    }

    renderMainContent() {
        if (this.state.selectedTab === tabs.firePlans) {
            return <FirePlanes/>
        } else {
            return <FireHistory/>
        }
    }

    renderHeader() {
        return (
            <div className='header-wrapper'>
                <span className='header-element bold'>{'אלמו 078'}</span>
                <span className='header-seperator'></span>            
                <span className='header-element'>{'רטוב'}</span>
                <span className='close-btn'></span>
            </div>
        )
    }

    selectedTabClass(tab) {
        return tab === this.state.selectedTab ? 'selected' : '';
    }

    renderTabButtons() {        
        return (
            <div className='tab-buttons-wrapper'>
                <div className='tab-container'>
                    <span className={`tab ${this.selectedTabClass(tabs.firePlans)}`} onClick={this.onTabClicked.bind(this, tabs.firePlans)}>תוכניות אש</span>
                    <span className={`tab ${this.selectedTabClass(tabs.history)}`} onClick={this.onTabClicked.bind(this, tabs.history)}>היסטוריית ירי</span>
                </div>
            </div>
        )
    }

    renderFooter() {
        let footer = null;
        if (this.state.selectedTab === tabs.firePlans) {
            // render save/cancel buttons for fire plans
            footer = (
                <div className='footer-wrapper'>
                    <button className={'button'}>בטל</button>
                    <button className={'button primary'}>עדכן</button>
                </div>
            );
            
        } else {
            // render summary for fire history
            footer = (
                <div className='footer-wrapper fire'>
                    <div className='footer-header'>
                        <span className='footer-header-item'>משימה</span>
                        <span className='footer-header-item'>קצב אש</span>
                        <span className='footer-header-item'>זמן תגובה</span>
                        <span className='footer-header-item'>כמות פגזים</span>
                        <span className='footer-header-item'>מהירות לוע</span>
                    </div>
                    <div className='footer-values'>
                        <span className='footer-value-item mission'>אלמו 074</span>
                        <span className='footer-value-item'>2 לדקה</span>
                        <span className='footer-value-item'>00:20</span>
                        <span className='footer-value-item'><span className='fire-icon'></span>10</span>
                        <span className='footer-value-item'>359(+9)ms</span>
                    </div>
                </div>
            );            
        }
        return footer;

    }

    render() {
        return (
            <div className='wrapper'>
                {this.renderHeader()}
                {this.renderTabButtons()}
                {this.renderMainContent()}
                {this.renderFooter()}
            </div>
        )
    }
}
