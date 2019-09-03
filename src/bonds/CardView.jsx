import React from 'react';
import PropTypes from 'prop-types';
import * as ReactVis from 'react-vis';
import TinyDate from 'tinydate';
import './CardView.css';



const TYPES = ['price', 'spread', 'yield'];

const PERIODS = ['week', 'month', 'quarter', 'year', 'max'];

/**
 * Презентационный компонент для отображения карточки инструмента
 */
export default class CardView extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        unknownNumber1: PropTypes.number.isRequired,
        unknownNumber2: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        isin: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        type: PropTypes.oneOf(TYPES),
        period: PropTypes.oneOf(PERIODS),
        times: PropTypes.array.isRequired,
        values: PropTypes.array.isRequired,
        onChangeType: PropTypes.func.isRequired,
        onChangePeriod: PropTypes.func.isRequired
    };

    static defaultProps = {
        type: TYPES[0],
        period: PERIODS[0]
    };

    constructor(props) {
        super(props);
        this.onChangeType = (evt) => this.props.onChangeType(evt.target.value);
        this.onChangePeriod = (evt, ...args) => this.props.onChangePeriod(evt.target.value);
    }

    _getTimeAxesFormater() {
        const formats = {
            week: '{DD}.{MM}',
            month: '{DD}.{MM}',
            quarter: '{DD}.{MM}',
            year: '{DD}.{MM}.{YYYY}',
            max: '{DD}.{MM}.{YYYY}'
        };
        const formatter = TinyDate(formats[this.props.period]);
        return (time, index, scale, totalTicks) => formatter(new Date(time));
    }

    render() {
        const props = this.props;
        const {times, values} = props;
        const data = values.map((y, i) => ({x:times[i], y, label:y.toPrecision(4), yOffset:20}));
        return (
            <div className="bond-card-view">
                <header className="bond-card-view__head">
                    <h2 className="bond-card-view__title">{props.name} {props.unknownNumber1} {props.unknownNumber2}</h2>
                    <div className="bond-card-view__currency">{props.currency}</div>
                </header>
                <div className="bond-card-view__details">
                    <div className="bond-card-view__isin">{props.isin}</div>
                    <div className="bond-card-view__description">{props.description}</div>
                </div>
                <div className="bond-card-view__chart">
                    <div className="bond-card-view__periods">
                        {PERIODS.map((period) => (
                            <button
                                className={'bond-card-view__period bond-card-view__button' + (period === props.period ? ' bond-card-view__button_active' : '')}
                                key={period}
                                value={period}
                                onClick={this.onChangePeriod}
                                >{period}</button>
                        ))}
                    </div>
                    <ReactVis.XYPlot
                        className="bond-card-view__plot"
                        width={500}
                        height={300}
                        margin={{left:27, right:20}}
                        xPadding={5}
                        yPadding={25}>
                        <ReactVis.VerticalGridLines style={{stroke:'rgb(230, 230, 230)'}} />
                        <ReactVis.HorizontalGridLines style={{stroke:'rgb(230, 230, 230)'}} />
                        <ReactVis.XAxis
                            style={{
                                line: {stroke:'rgb(209, 209, 209)'},
                                ticks: {stroke:'rgb(230, 230, 230)'},
                                text: {stroke:'none', fill:'rgb(132, 132, 132)'}
                            }}
                            tickFormat={this._getTimeAxesFormater()}
                            tickTotal={5}
                        />
                        <ReactVis.YAxis
                            style={{
                                line: {stroke:'rgb(209, 209, 209)'},
                                ticks: {stroke:'rgb(230, 230, 230)'},
                                text: {stroke:'none', fill:'rgb(132, 132, 132)'}
                            }}
                            tickPadding={6}
                            tickSizeOuter={1}
                        />
                        <ReactVis.LineMarkSeries
                            style={{
                                strokeStyle: 'solid',
                                strokeWidth: 3,
                            }}
                            lineStyle={{fill:'none'}}
                            color="rgb(209, 209, 209)"
                            size={3}
                            markFill="rgb(209, 209, 209)"
                            data={data}
                        />
                        {<ReactVis.LabelSeries
                            labelAnchorX="middle"
                            allowOffsetToBeReversed
                            data={data}
                        />}
                    </ReactVis.XYPlot>
                    <select className="bond-card-view__type bond-card-view__button" value={props.type} onChange={this.onChangeType}>
                        <option value={'price'}>Price</option>
                        <option value={'spread'}>Spread</option>
                        <option value={'yield'}>Yield</option>
                    </select>
                </div>
            </div>
        );
    }
}
