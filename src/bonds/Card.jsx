import React from 'react';
import PropTypes from "prop-types";
import {connect as reduxConnect} from 'react-redux';
import * as CardRedux from './CardRedux';
import CardView from './CardView';



/**
 * Класс-контенер, оборачивающий презентационный компонент CardView и предоставляющий ему данные
 */
class Card extends React.Component {
    static propTypes = {
        isin: PropTypes.string.isRequired,
        type: CardView.propTypes.type,
        period: CardView.propTypes.period
    };

    static defaultProps = {
        type: CardView.defaultProps.type,
        period: CardView.defaultProps.period
    };

    constructor(props) {
        super(props);
        this.onChangeType = (type) => {
            this.props.dispatchAction('change-type', {type});
            this.loadCurve(this.props.isin, type, this.props.period);
        };
        this.onChangePeriod = (period) => {
            this.props.dispatchAction('change-period', {period});
            this.loadCurve(this.props.isin, this.props.type, period);
        };
    }

    componentDidMount() {
        const props = this.props;
        this.loadInfo(props.isin);
        this.loadCurve(props.isin, props.type, props.period);
    }

    loadInfo(isin) {
        this.props.dispatchAction('fetch-info', {url:`/bonds/${isin}/info`});
    }

    loadCurve(isin, type, period) {
        this.props.dispatchAction('fetch-curve', {url:`/bonds/${isin}/${type}`, period});
    }

    render() {
        const {dispatchAction, ...props} = this.props;
        return (
            <CardView {...props} onChangeType={this.onChangeType} onChangePeriod={this.onChangePeriod} />
        );
    }
}

export default reduxConnect(CardRedux.mapStateToProps, CardRedux.mapDispatchToProps)(Card);
