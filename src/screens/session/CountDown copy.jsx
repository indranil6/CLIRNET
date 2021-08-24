import React from 'react'
import moment from 'moment';
import * as utils from './utils';

export default class Countdown extends React.Component {
    state = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const { timeTillDate, timeFormat } = this.props;
            // const then = new Date(timeTillDate); //moment(timeTillDate, timeFormat);
            // let now = new Date() ;
            // const date = new Date(); 

            let future = Date.parse(timeTillDate);  
            let now = new Date();
            let diff = future - now;
        
            let edays = Math.floor(diff / (1000 * 60 * 60 * 24));
            let eHours = Math.floor(diff / (1000 * 60 * 60));
            let eMins = Math.floor(diff / (1000 * 60));
            let eSecs = Math.floor(diff / 1000);
        
            let days = 1;
            let hours = 1//eHours - edays * 24;
            let minutes = eMins - eHours * 60;
            let seconds = eSecs - eMins * 60;
            console.log(days,'\n',hours)
            this.setState({ days, hours, minutes, seconds });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { days, hours, minutes, seconds } = this.state;
        const daysRadius = mapNumber(days, 30, 0, 0, 360);
        const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
        const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
        const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

        if (!seconds) {
            return null;
        }

        return (
            <div>
                {/* <h1>Countdown</h1> */}
                <div className='countdown-wrapper'>
                    {/* {days && (
                        <div className='countdown-item'>
                            <SVGCircle radius={daysRadius} />
                            {days}
                            <span>days</span>
                        </div>
                    )}
                    {hours && (
                        <div className='countdown-item'>
                            <SVGCircle radius={hoursRadius} />
                            {hours}
                            <span>hours</span>
                        </div>
                    )}*/} 
                    {minutes && (
                        <div className='countdown-item'>
                            <SVGCircle radius={minutesRadius} />
                            {minutes}
                            <span>minutes</span>
                        </div>
                    )}
                    {seconds && (
                        <div className='countdown-item'>
                            <SVGCircle radius={secondsRadius} />
                            {seconds}
                            <span>seconds</span>
                        </div>
                    )} 
                    
                </div>
            </div>
        );
    }
}

const SVGCircle = ({ radius }) => (
    <svg className='countdown-svg'>
        <path fill="none" stroke="#333" stroke-width="4" d={describeArc(50, 50, 48, 0, radius)} />
    </svg>
);

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}