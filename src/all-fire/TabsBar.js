import React, { Component } from 'react'
import ContextMenu from './ui-component/ContextMenu/ContextMenu';
import Icon from './ui-component/Icon/Icon';

export default class TabsBar extends Component {

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

    render() {
        return (
            <div className='tabs-bar'>
                {this.renderContextMenu()}
                <span className='tab-item safety'></span>
                <span className='tab-item chat'></span>
                <span className='tab-item more-commands' 
                    ref={this.moreActionBtnRef}
                    onClick={()=>this.setState({isContextMenuOpen: !this.state.isContextMenuOpen})}>
                </span>
            </div>
        )
    }
}
