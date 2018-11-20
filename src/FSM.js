import React, {Component} from 'react';
import {Machine} from 'xstate';

export const Context = React.createContext({});


const FSM = (stateConfig, options = {}) => ComponentToWrap => {
    class FSMComponent extends Component {
        constructor(props, context) {
            super(props, context);
            this.machine = Machine(stateConfig);
            this.transition = this.transition.bind(this);
            this.state = {
                currentState: this.machine.initialState.value
            }
        }

        getContext(context) {
            return {
                ...options.context,
                ...context,
                transition: this.transition,
                currentState: this.state.currentState
            }
        }

        transition(event) {
            const nextState = this.machine.transition(this.state.currentState, event).value;
            this.setState({currentState: nextState});
        }

        render() {
            return (
                <Context.Provider value={this.getContext(this.context)}>
                    <ComponentToWrap />
                </Context.Provider>
            );
        }
    }

    return FSMComponent;
} 

export default FSM;