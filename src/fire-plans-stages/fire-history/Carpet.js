import React, { Component } from 'react';
import HistoryCard from './HistoryCard';
import './FireHistory.less';
import './FireHistory.css';

export default class Carpet extends Component {

    state = {
        isOpen: this.props.isOpen
    }

    renderHeader() {
        return (            
            <div className={'carpet-history-header'}>
                <span className='carpet-history-header-item'>סוג</span>
                <span className='carpet-history-header-item'>שעה</span>
                <span className='carpet-history-header-item'>פגז</span>
                <span className='carpet-history-header-item'>מרעום</span>
                <span className='carpet-history-header-item'>חנ"ה</span>
                <span className='carpet-history-header-item'>מהירות</span>
            </div>
        )
    }

    renderCards() {
        const cards = [];
        for (let i = 0; i < 10; i++) {            
            cards.push(<HistoryCard key={i}/>)
        }        
        return (
            <div className={'carpet-history-cards'}>
                {cards}
            </div>
        )
    }

    renderHistoryCards() {
        return (
            <React.Fragment>
                {this.renderHeader()}
                {this.renderCards()}
            </React.Fragment>
        );
    }

    render() {
        const isOpenClass = this.state.isOpen ? 'open' : '';
        const isCurrentClass = this.props.isCurrent ? 'current' : '';

        return (
            <div className={`carpet-wrapper`}>
                <div className={`carpet-header ${isCurrentClass}`}>
                    <div className={'carpet-header-details'}>                        
                        <span className={`carpet-name ${isCurrentClass}`}>וילון 1</span>
                    </div>
                    <span className={`carpet-extender ${isOpenClass}`} onClick={() => this.setState({isOpen: !this.state.isOpen})}></span>
                </div>
                <div className={`history-cards-container ${isOpenClass}`}>
                    {this.renderHistoryCards()}
                </div>
            </div>
        )
    }
}
