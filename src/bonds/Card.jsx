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
            this.loadCurve({type});
        };
        this.onChangePeriod = (period) => {
            this.props.dispatchAction('change-period', {period});
            this.loadCurve({period});
        };
    }

    componentDidMount() {
        this.loadInfo();
        this.loadCurve();
    }

    componentDidUpdate() {
        this.loadInfo();
        this.loadCurve();
    }

    loadInfo(options) {
        const props = this.props;
        if (!props.isInfoLoading) {
            const {isin = props.isin} = options || {};
            if (isin !== props.loaded.isin) {
                props.dispatchAction('fetch-info', {url:`/bonds/${isin}/info`});
            }
        }
    }

    loadCurve(options) {
        const props = this.props;
        if (!props.isCurveLoading) {
            const {isin = props.isin, type = props.type, period = props.period} = options || {};
            const loaded = props.loaded;
            if (isin !== loaded.isin || type !== loaded.type || period !== loaded.period) {
                props.dispatchAction('fetch-curve', {url:`/bonds/${isin}/${type}`, period});
            }
        }
    }

    render() {
        const {dispatchAction, ...props} = this.props;
        return (
            <CardView {...props} onChangeType={this.onChangeType} onChangePeriod={this.onChangePeriod} />
        );
    }
}

export default reduxConnect(CardRedux.mapStateToProps, CardRedux.mapDispatchToProps)(Card);
