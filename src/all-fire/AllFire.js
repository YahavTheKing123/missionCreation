import React, { Component } from 'react';
import './AllFire.css';
import ParticipateCard from './MyParticipateCard';
import Icon from './ui-component/Icon/Icon';
import HeaderCard from './HeaderCard';
import {ValueSet} from './mock/Mock';
import {EntitiesMngr} from './mock/Mock';

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
        participates: null,
        attackTypeDetailsModelResponse: null,
        selectedAttackType: null,
        selectedAttackTypeDetails: null
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

    componentWillUnmount() {
        if (this.state.participatesInterval) {
            clearInterval(this.state.participatesInterval);
        }
    }

    handleParticipates() {
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

    isSelectedAttackTypeCodeChanged(prevState) {
        return (!prevState.selectedAttackType && this.state.selectedAttackType) || 
                    (prevState.selectedAttackType && this.state.selectedAttackType && prevState.selectedAttackType.code !== this.state.selectedAttackType.code)
    }

    async componentDidUpdate(prevProps, prevState) {
        if (!prevState.mainEnt && this.state.mainEnt) {
            this.handleParticipates();
        }

        if (this.isSelectedAttackTypeCodeChanged(prevState)) {
            if (this.state.selectedAttackType && 
                    this.state.selectedAttackType.allowedValues && 
                        this.state.selectedAttackType.allowedValues.length > 0) {

                let modelResponse = 
                    await EntitiesMngr.getModelByVal(this.state.selectedAttackType.allowedValues,
                                                        this.state.mainEnt.CommonX.allFire.attackTypesDetailsModelSname);

                    if (modelResponse && !Array.isArray(modelResponse)) {
                        modelResponse = [modelResponse];
                    }

                    this.setState({attackTypeDetailsModelResponse: modelResponse})
            } else {
                this.setState({
                    selectedAttackTypeDetails: null,
                    attackTypeDetailsModelResponse: null
                });
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
            selectedParticipate: null,            
            participates: null,
            attackTypeDetailsModelResponse: null,
            selectedAttackType: null,
            selectedAttackTypeDetails: null            
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
                    data={item}
                    id={item.entityId}
                />
            );
        }        

        return <div className={`all-fire-my-participates-wrapper`}>{res}</div>;
    }

    renderFooter() {
        return (
            <div className='all-fire-footer-wrapper'>
                <button className='all-fire-button'>{'בטל משימה'}</button>
                <button className='all-fire-button primary disabled'>{'אשר'}</button>
            </div>
        );
    }

    onAttackTypeClick = selectedAttackType => {
        let attackType = null;
        if (!this.state.selectedAttackType || (this.state.selectedAttackType.code !== selectedAttackType.code) ) {
            attackType = selectedAttackType
        }
        this.setState({selectedAttackType: attackType})
    }

    onAttackTypeDetailsClick = selectedAttackTypeDetails => {
        let attackTypeDetails = null;
        if (!this.state.selectedAttackTypeDetails || (this.state.selectedAttackTypeDetails.appX.model.value !== selectedAttackTypeDetails.appX.model.value) ) {
            attackTypeDetails = selectedAttackTypeDetails
        }
        this.setState({selectedAttackTypeDetails: attackTypeDetails})
    }

    renderAttackDetailsFirstRow() {
        const buttons = [];
        const valueSetLiterals = ValueSet.getLiterals({sname: this.state.mainEnt.CommonX.allFire.attackTypesValueSetSname});
        
        for (const literal in valueSetLiterals) {       
            const {code, icon, dispName} = valueSetLiterals[literal];
            buttons.push(
                <div 
                     title={dispName}
                     className={`attack-type-button ${this.state.selectedAttackType && this.state.selectedAttackType.code ===  code ? 'selected' : ''}`} 
                     onClick={() => this.onAttackTypeClick(valueSetLiterals[literal])}
                     key={code}>
                        <Icon className='attack-icon' iconUri={icon}/>
                        <span className='attack-description'>{dispName}</span>
                </div>
            )
        }
        return (
            <div className='external-assist-attack-first-row-wrapper'>
                {buttons}
            </div>
        )
    }

    renderAttackDetailsSecondRow() {
        const buttons = [];
        const {attackTypeDetailsModelResponse} = this.state;
        attackTypeDetailsModelResponse && attackTypeDetailsModelResponse.forEach(item => {
            buttons.push(
                <div 
                     title={item.appX.base.dispName}
                     className={`attack-type-details-button ${this.state.selectedAttackTypeDetails && this.state.selectedAttackTypeDetails.appX.model.value ===  item.appX.model.value ? 'selected' : ''}`} 
                     onClick={() => this.onAttackTypeDetailsClick(item)}
                     key={item.appX.model.value}>
                        <Icon className='attack-icon' iconUri={item.appX.base.icons && item.appX.base.icons[0]}/>
                        <span className='attack-description'>{item.appX.base.dispName}</span>
                </div>
            )
        })                 
        
        if (buttons.length === 0) return null;

        return (
            <div className='external-assist-attack-second-row-wrapper'>
                {buttons}
            </div>
        )
    }

    renderAttackDetails() {
        if (this.state.openParticipates === paticipatesOptions.other) {
            return (
                <>
                    {this.renderAttackDetailsFirstRow()}
                    {this.renderAttackDetailsSecondRow()}
                </>
            )
        }
        return null;
    }

    renderComponentBodyDraft() {
        return(
            <>
                {this.renderAttackDetails()}
                {this.renderSuggestedParticipatesList()}
                {this.render}
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
