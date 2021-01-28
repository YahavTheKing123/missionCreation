import React, { Component } from 'react'
import {widgetSizes} from './AllFire';
import Icon from './ui-component/Icon/Icon';
import ContextMenu from './ui-component/ContextMenu/ContextMenu';

export default class HeaderCard extends Component {

    state = {
        isContextMenuOpen: false,        
    }

    moreActionBtnRef = React.createRef();

    renderContextMenu() {
        if (this.state.isContextMenuOpen) {
            const xy = this.moreActionBtnRef.current.getClientRects();
            return (
                <ContextMenu openVertical={false} top={xy[0].top} left={xy[0].left} onCloseContextMenu={()=>this.setState({isContextMenuOpen: false})}>
                    <div className={'all-fire-context-menu-item'} onClick={() => this.props.selectAllBranchesForTab('master')}>
                        <Icon className={'all-fire-context-menu-item-icon'} style={{height: '3rem', width: '3rem'}} iconUri={require('./assets/context-menu-test-icon.svg')}/>
                        <span className='all-fire-context-menu-item-text' title={'command title'} >{'command title'}</span>
                    </div>
                    <div className={'all-fire-context-menu-item'} onClick={() => this.props.selectAllBranchesForTab('develop')}>
                        <Icon className={'all-fire-context-menu-item-icon'} style={{height: '3rem', width: '3rem'}} iconUri={require('./assets/context-menu-test-icon.svg')}/>
                        <span className='all-fire-context-menu-item-text' title={'command title'}>{'command title'}</span>
                    </div>
                    <div className={'all-fire-context-menu-item'} onClick={() => this.props.selectAllBranchesForTab('develop')}>
                        <Icon className={'all-fire-context-menu-item-icon'} style={{height: '3rem', width: '3rem'}} iconUri={require('./assets/context-menu-test-icon.svg')}/>
                        <span className='all-fire-context-menu-item-text' title={'command title'}>{'command title'}</span>
                    </div>
                </ContextMenu>
            )
        }
    }

    renderHeaderRightImages(data) {
        const {headerCardRightSectionMainIcon, headerCardRightSectionSecondaryIcon, headerCardRightSectionSideIcon} = data;
        return (
            <div className='all-fire-header-right-icons-wrapper'>
                {headerCardRightSectionMainIcon ? <Icon iconUri={headerCardRightSectionMainIcon} className='all-fire-header-right-main-icon' style={{width: '5rem', height: '5rem'}} /> : null}
                {headerCardRightSectionSecondaryIcon ? <Icon iconUri={headerCardRightSectionSecondaryIcon} className='all-fire-header-right-main-icon' style={{width: '2rem', height: '2rem'}}/> : null}
                {headerCardRightSectionSideIcon ? <Icon iconUri={headerCardRightSectionSideIcon} className='all-fire-header-right-side-left-icon' style={{width: '2.5rem', height: '2.5rem'}}/> : null}
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

    render() {
        const data = this.props.entity && this.props.entity.CommonX && this.props.entity.CommonX.allFire;
        
        if (!data) {
            return null
        }

        return (
            <div className='all-fire-header'>
                {this.renderContextMenu()}
                <a className='all-fire-header-minimize-button' href='#' onClick={() => this.props.setWidgetSize(widgetSizes.minimized)}>
                    <div className='minimize-icon'></div>
                </a>
                <div className='all-fire-header-right'>
                    <span className='all-fire-header-right-top-text'>{data.headerCardRightSectionTopText}</span>
                    {this.renderHeaderRightImages(data)}
                    <span className='all-fire-header-buttom-top-text' style={{backgroundColor: data.headerCardRightSectionButtomTextBGColor}}>
                        {data.headerCardRightSectionButtomText}
                    </span>
                </div>
                <div className='all-fire-header-center'>
                    <div className='all-fire-header-center-row'>
                        <span className='main-text'>{data.headerCardMainSectionRow1Col1Text}</span>
                        <span>{data.headerCardMainSectionRow1Col2Text}</span>
                    </div>
                    <div className='all-fire-header-center-row'>
                        <span>{data.headerCardMainSectionRow2Col1Text}</span>
                        {
                            data.headerCardMainSectionRow2Col2Text ? 
                                <span className='timer-wrapper'>
                                    <span className='timer-icon-wrapper' style={{backgroundColor: data.headerCardMainSectionRow2Col2TextBGColor}}>
                                        <Icon className={'timer-icon'} iconUri={require('./assets/timer.svg')}/>
                                    </span>
                                    <span className='timer-text'>{data.headerCardMainSectionRow2Col2Text}</span>
                                </span> : 
                            null
                        }
                    </div>
                </div>
                <div className='all-fire-header-left'>
                    {this.renderActionsMenuButton()}
                </div>
            </div>
        )
    }
}
