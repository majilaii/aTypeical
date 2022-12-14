import '../css/data.css';
import { useOutletContext } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import React from 'react';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export default function Data() {
    var _a = useOutletContext(), speed = _a.speed, prevInputLength = _a.prevInputLength;
    // TODO LOCAL STORAGE
    // useEffect(() => {
    //   console.log(prevInputLength, speed, 'hello')
    //   if(prevInputLength.length) {
    //     localStorage.setItem('arr', JSON.stringify(prevInputLength))
    //   }
    // }, [])
    // useEffect(() => {
    //   if(localStorage.getItem('arr') !== null && localStorage.getItem('speed') !== null) {
    //     const stats = JSON.parse(localStorage.getItem('arr'))
    //     setPrevInputLength(stats)
    //   }
    // }, [])
    var eachInterval = [];
    var finalDataArr = [];
    var lastVal = prevInputLength.pop();
    prevInputLength[prevInputLength.length - 1] = lastVal;
    if (prevInputLength.length > 1) {
        for (var i = 0; i < prevInputLength.length; i++) {
            if (i !== prevInputLength.length - 1) {
                eachInterval.push(i + 1);
            }
            else
                eachInterval.push(speed / 1000);
        }
    }
    for (var i = 0; i < prevInputLength.length; i++) {
        finalDataArr.push(Math.round(prevInputLength[i] / 5 / (eachInterval[i] / 60)));
    }
    var options = {
        layout: {
            padding: {
                right: 0,
            },
        },
        chartArea: {
            backgroundColor: 'rgba(0, 85, 85, 0.4)',
        },
        responsive: true,
        scales: {
            x: {
                grid: {
                    color: '#373639',
                },
                ticks: {
                    color: 'white',
                    font: {
                        family: 'Consolas',
                        size: 20,
                    },
                },
            },
            y: {
                grid: {
                    color: '#373639',
                },
                min: 0,
                title: {
                    color: 'white',
                    display: true,
                    text: 'Words Per Minute',
                    font: {
                        family: 'Consolas',
                        size: 20,
                    },
                },
                ticks: {
                    color: 'white',
                    font: {
                        size: 15,
                    },
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: 'font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;',
                        size: 20,
                    },
                },
            },
        },
    };
    var labels = eachInterval;
    var data = {
        labels: labels,
        datasets: [
            {
                label: 'RAW WPM',
                data: finalDataArr,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                lineTension: 0.4,
            },
        ],
    };
    return (React.createElement("div", { className: 'chartContainer' },
        React.createElement(Line, { className: 'chart', options: options, data: data, height: 30, width: 100 })));
}
