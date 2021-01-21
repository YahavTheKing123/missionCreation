import React, { Component } from 'react';
import './AllFire.css';
import ParticipateCard from './MyParticipateCard';
import Icon from './ui-component/Icon/Icon';
import HeaderCard from './HeaderCard';

export const widgetSizes = {
    default: 'default',
    minimized: 'minimized'
}   

const paticipatesOptions = {
    my: 'my',
    other: 'other'
}   

export default class AllFire extends Component {

    state = {
        isAppLoading: true,
        mainEnt: null,
        widgetSize: widgetSizes.default,        
        openParticipates: paticipatesOptions.my,
        selectedParticipate: null,
        participatesInterval: null,
        participates: null
    }
    
    componentDidMount() {
        fetch('./data/MissionEntity.json')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    mainEnt: data,
                    isAppLoading: false
                });
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.mainEnt && this.state.mainEnt) {
            const intervalInMilliSeconds = 
                this.state.mainEnt.CommonX && 
                    this.state.mainEnt.CommonX.allFire && 
                        this.state.mainEnt.CommonX.allFire.participatesRestIntervalInMilliSeconds;

            const restUrl = 
                this.state.mainEnt.CommonX && 
                    this.state.mainEnt.CommonX.allFire && 
                        this.state.mainEnt.CommonX.allFire.participatesRestQuerySname;
            
            if (intervalInMilliSeconds && restUrl) {  
                this.fetchParticipates();
                this.setState({
                    participatesInterval: setInterval(this.fetchParticipates, intervalInMilliSeconds)
                })
            }
        }
    }

    fetchParticipates = () => {
        const {participatesRestQuerySname} = this.state.mainEnt.CommonX.allFire;
        const option = this.state.openParticipates === paticipatesOptions.my ? 1 : 2;
        const url = `${participatesRestQuerySname}${option}`;
        //Globals.get().clientFacade.exeRestQuary(participatesRestQuerySname, params);
        console.log('Fetching from URL', url)
        //fetch(url)
        fetch('./data/participates.json')
            .then(response => response.json())
            .then(data => {
                this.setState({participates: data.participates}, this.removeSelectionForNonExistingParticipate);
                console.log(data);
            });
    }

    removeSelectionForNonExistingParticipate = () => {
        if (!this.state.selectedParticipate) return;

        const isSelectedInLatestResponse = this.state.participates.some(item => item.entityId === this.state.selectedParticipate); 
        if (!isSelectedInLatestResponse) {
            this.setState({selectParticipate: null})
        }
    }

    setWidgetSize = widgetSize => {
        this.setState({widgetSize})
    }

    renderHeader() {
        return (
            <HeaderCard 
                entity={this.state.mainEnt}
                setWidgetSize={this.setWidgetSize}/>
        )
    }
    
    switchOpenParticipates = newparticipates => {
        this.setState({
            openParticipates: newparticipates,
            selectedParticipate: null
        })
    }

    renderMySuggestedParticipatesButton() {
        if (this.state.openParticipates === paticipatesOptions.my) {
            return null;
        }
        return (
            <div className='all-fire-participates-button' onClick={() => this.switchOpenParticipates(paticipatesOptions.my)}>
                <Icon className='all-fire-my-participates-expand-btn' iconUri={require('./assets/arrow-down.svg')}/>
                <Icon className='all-fire-participates-logo' iconUri={require('./assets/tank.svg')}/>
                <span className={'label'}>{'שלי'}</span>
            </div>
        )
    }

    renderOtherSuggestedParticipatesButton() {
        if (this.state.openParticipates === paticipatesOptions.other) {
            return null;
        }
        return (
            <div className='all-fire-participates-button' onClick={()=>this.switchOpenParticipates(paticipatesOptions.other)}>
                <Icon className='all-fire-participates-logo' iconUri={require('./assets/mission.svg')}/>
                <span className={'label'}>{'סיוע אש'}</span>
                <Icon className='all-fire-other-participates-expand-btn' iconUri={require('./assets/arrow-down.svg')}/>
            </div>
        );
    }

    selectParticipate = (participateId) => {
        if (participateId === this.state.selectedParticipate) {
            this.setState({selectedParticipate: null})    
        } else {
            this.setState({selectedParticipate: participateId})
        }
    }

    renderSuggestedParticipatesList() {
        //const closedClass = this.state.openParticipates === paticipatesOptions.other ? 'closed' : ''
        const {participates} = this.state;
        let res = [];

        if (participates) {
            res = participates.map( item => 
                <ParticipateCard
                    key={item.entityId}
                    isExternal={this.state.openParticipates === paticipatesOptions.other}
                    isSelected={item.entityId === this.state.selectedParticipate}
                    onParticiapteClick={this.selectParticipate}
                    participateId={item.entityId}
                />
            );
        }        

        return <div className={`all-fire-my-participates-wrapper`}>{res}</div>;
    }

    otherSuggestedParticipatesClick = () => {
        
        /*
            1. clear selected my particiate
            2. close my particiates card list and open group it to one card
            3. open buttons
        */
    }

    renderFooter() {
        return (
            <div className='all-fire-footer-wrapper'>
                <button className='all-fire-button'>{'בטל משימה'}</button>
                <button className='all-fire-button primary disabled'>{'אשר'}</button>
            </div>
        );
    }

    renderComponentBodyDraft() {
        return(
            <>
                {this.renderSuggestedParticipatesList()}
                {this.renderOtherSuggestedParticipatesButton()}
                {this.renderMySuggestedParticipatesButton()}
            </>
        )
    }

    renderComponentBodyAccordingToStatus() {
        const missionState = this.state.mainEnt.CommonX.allFire.entityStateValue;
        switch (missionState) {
            case 1:
                // initial
                return this.renderComponentBodyDraft();
            case 2:
                return null;
            case 3:
                return null;
            default:
                break;
        }
    }

    render() {
        if (this.state.isAppLoading) {
            return null;
        }
        
        return (
            <div className='all-fire-wrapper'>                      
                {this.renderHeader()}
                {this.renderComponentBodyAccordingToStatus()}
                {this.renderFooter()}
            </div>
        )
    }
}
