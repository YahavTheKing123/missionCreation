import React, { Component } from 'react';
import './AllFire.css';
import ContextMenu from './ui-component/ContextMenu/ContextMenu';
import MyParticipateCard from './MyParticipateCard';

const widgetSizes = {
    default: 'default',
    minimized: 'minimized'
}   

const paticipatesOptions = {
    my: 'my',
    other: 'other'
}   

export default class AllFire extends Component {

    state = {
        widgetSize: widgetSizes.default,
        isContextMenuOpen: false,
        openParticipates: paticipatesOptions.me
    }

    moreActionBtnRef = React.createRef()

    renderHeaderRightImages() {
        return (
            <div className='all-fire-header-right-icons-wrapper'>
                <img className='all-fire-header-right-main-icon' src={require('./assets/mission.svg')} style={{width: '5rem', height: '5rem'}}/>
                <img className='all-fire-header-right-main-icon' src={require('./assets/missionType.svg')} style={{width: '2rem', height: '2rem'}}/>
            </div>
        )
    }

    renderActionsMenuButton() {
        return (
            <span className='more-actions-btn-wrapper' ref={this.moreActionBtnRef} onClick={()=>this.setState({isContextMenuOpen: !this.state.isContextMenuOpen})}>
                <span className={'more-actions-btn-ball'}></span>
                <span className={'more-actions-btn-ball'}></span>
                <span className={'more-actions-btn-ball'}></span>
            </span>
        )
    }

    renderHeader() {
        return (
            <div className='all-fire-header'>
                <a className='all-fire-header-minimize-button' href='#' onClick={() => this.setState({widgetSize: widgetSizes.minimized})}>
                    <div className='minimize-icon'></div>
                </a>
                <div className='all-fire-header-right'>
                    <span className='all-fire-header-right-top-text'>{'רטוב'}</span>
                    {this.renderHeaderRightImages()}
                    <span className='all-fire-header-buttom-top-text' style={{backgroundColor: '#102235'}}>{'חדשה'}</span>
                </div>
                <div className='all-fire-header-center'>
                    <div className='all-fire-header-center-row'>
                        <span>{'גונזו 123א'}</span>
                        <span>{'תקיפה'}</span>
                    </div>
                    <div className='all-fire-header-center-row'>
                        <span>{'שטח פתוח'}</span>
                    </div>
                </div>
                <div className='all-fire-header-left'>
                    {this.renderActionsMenuButton()}
                </div>
            </div>
        )
    }

    renderMySuggestedParticipatesList() {
        const myParticipates = [];
        for (let index = 0; index < 10; index++) {
            myParticipates.push(
                <MyParticipateCard />
            );
            
        }

        return <div className='all-fire-my-particiaptes-wrapper'>{myParticipates}</div>;
    }

    OtherSuggestedParticipatesClick = () => {
        /*
            1. clear selected my particiate
            2. close my particiates card list and open group it to one card
            3. open buttons
        */
    }

    renderOtherSuggestedParticipatesButton() {
        return (
            <div className='all-fire-other-particiaptes-button' onClick={this.OtherSuggestedParticipatesClick}>
                <img className='all-fire-other-particiaptes-logo' src={require('./assets/mission.svg')}/>
                <span className={'label'}>{'סיוע חיצוני'}</span>
                <img className='all-fire-other-particiaptes-expand-btn' src={require('./assets/arrow-down.svg')}/>
            </div>
        );
    }

    renderFooter() {
        return (
            <div className='all-fire-footer-wrapper'>
                <button className='all-fire-button'>{'בטל משימה'}</button>
                <button className='all-fire-button primary'>{'אשר'}</button>
            </div>
        );
    }

    renderContextMenu() {
        if (this.state.isContextMenuOpen) {
            const xy = this.moreActionBtnRef.current.getClientRects();
            return (
                <ContextMenu top={xy[0].top} left={xy[0].left} onCloseContextMenu={()=>this.setState({isContextMenuOpen: false})}>
                    <div className={'all-fire-context-menu-item'} onClick={() => this.props.selectAllBranchesForTab('master')}>
                        <img className={'all-fire-context-menu-item-icon'} style={{height: '3rem', width: '3rem'}} src={require('./assets/context-menu-test-icon.svg')}/>
                        <span className='all-fire-context-menu-item-text' title={'command title'} >{'command title'}</span>
                    </div>
                    <div className={'all-fire-context-menu-item'} onClick={() => this.props.selectAllBranchesForTab('develop')}>
                        <img className={'all-fire-context-menu-item-icon'} style={{height: '3rem', width: '3rem'}} src={require('./assets/context-menu-test-icon.svg')}/>
                        <span className='all-fire-context-menu-item-text' title={'command title'}>{'command title'}</span>
                    </div>
                    <div className={'all-fire-context-menu-item'} onClick={() => this.props.selectAllBranchesForTab('develop')}>
                        <img className={'all-fire-context-menu-item-icon'} style={{height: '3rem', width: '3rem'}} src={require('./assets/context-menu-test-icon.svg')}/>
                        <span className='all-fire-context-menu-item-text' title={'command title'}>{'command title'}</span>
                    </div>
                </ContextMenu>
            )
        }
    }

    render() {
        return (
            <div className='all-fire-wrapper'>
                {this.renderHeader()}
                {this.renderMySuggestedParticipatesList()}
                {this.renderOtherSuggestedParticipatesButton()}
                {this.MySuggestedParticipatesButton()}
                {this.renderFooter()}
                {this.renderContextMenu()}
            </div>
        )
    }
}
