import React from 'react';
import './css/countdown.css'

export default class Countdown extends React.Component {

    state = {
        display: false,
        dDays: 0,
        dHours: 0,
        dMins: 0,
        dSecs: 0
    }

    componentDidMount() {
        const { timeTillDate } = this.props;
        const context = this;
        this.interval = setInterval(() => {
            let future = Date.parse(timeTillDate);
            let now = new Date();
            let diff = future - now;

            let days = Math.floor(diff / (1000 * 60 * 60 * 24));
            let hours = Math.floor(diff / (1000 * 60 * 60));
            let mins = Math.floor(diff / (1000 * 60));
            let secs = Math.floor(diff / 1000);


            let dDays = days;
            let dHours = hours - days * 24;
            let dMins = mins - hours * 60;
            let dSecs = secs - mins * 60;
            console.log(dSecs)
            this.setState({ dDays, dHours, dMins, dSecs });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        return (
            <div >
                <div id="timer">
                    <div>{this.state.dDays}<span>days</span></div>
                    <div>{this.state.dHours}<span>hours</span></div>
                    <div>{this.state.dMins}<span>minutes</span></div>
                    <div>{this.state.dSecs}<span>seconds</span></div>
                </div>
            </div>
        );
    }
}