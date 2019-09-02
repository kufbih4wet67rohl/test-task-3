import http from '../mocks/Http';



/**
 * Пространство имён в хранилище redux для храения состояния этого модуля
 * @public
 * @type {string}
 */
export const namespace = 'bondCard';

/**
 * Константы типов действий:
 * @private
 * @type {string}
 */
const FETCH_INFO_START  = `${namespace}/FETCH_INFO_START`;
const FETCH_INFO_END    = `${namespace}/FETCH_INFO_END`;
const FETCH_INFO_ERROR  = `${namespace}/FETCH_INFO_ERROR`;
const FETCH_CURVE_START = `${namespace}/FETCH_CURVE_START`;
const FETCH_CURVE_END   = `${namespace}/FETCH_CURVE_END`;
const FETCH_CURVE_ERROR = `${namespace}/FETCH_CURVE_ERROR`;
const CHANGE_TYPE       = `${namespace}/CHANGE_TYPE`;
const CHANGE_PERIOD     = `${namespace}/CHANGE_PERIOD`;

/**
 * Состояние по умолчанию
 * @private
 * @type {object}
 */
const _defaultSate = {
    isin: '',
    name: '',
    unknownNumber1: 0,
    unknownNumber2: 0,
    currency: '',
    description: '',
    times: [],
    values: []
};

/**
 * @private
 * Функция создания действий
 * @param {string} action Символическое имя действия
 * @param {object} options Параметры действия
 * @return {function(dispatch:function):Promise}
 */
const _actionCreator = (action, options) => {
    const {url} = options;
    switch (action) {
        case 'fetch-info':
            return (dispatch/*, getState()*/) => {
                const promise = http.get({url});
                dispatch({type:FETCH_INFO_START});
                return promise
                    .then((data) => {
                        dispatch({type:FETCH_INFO_END, data});
                    })
                    .catch((err) => {
                        console.log('CardRedux._actionCreator: Error retrieving data: ' + err.message);
                        dispatch({type:FETCH_INFO_ERROR, err});
                    });
            };

        case 'fetch-curve':
            return (dispatch/*, getState()*/) => {
                const promise = http.post({url, body:{period:options.period}});
                dispatch({type:FETCH_CURVE_START});
                return promise
                    .then((data) => {
                        dispatch({type:FETCH_CURVE_END, data});
                    })
                    .catch((err) => {
                        console.log('CardRedux._actionCreator: Error retrieving data: ' + err.message);
                        dispatch({type:FETCH_CURVE_ERROR, err});
                    });
            };

        case 'change-type':
            return {type:CHANGE_TYPE, curveType:options.type};

        case 'change-period':
            return {type:CHANGE_PERIOD, period:options.period};

        default:
            // Nothing...
    }
};

/**
 * @public
 * Редуктор состояния хранилища redux
 * @param {object} state Частичное состояние хранилища redux
 * @param {object} action Объект действия
 * @return {object}
 */
export const reducer = (state = _defaultSate, action) => {
    switch (action.type) {
        case FETCH_INFO_START:
            return {...state, isInfoLoading:true, infoErr:undefined};
        case FETCH_INFO_END:
            return {...state, isInfoLoading:false, infoErr:undefined, ...action.data};
        case FETCH_INFO_ERROR:
            return {...state, isInfoLoading:false, infoErr:action.err};
        case FETCH_CURVE_START:
            return {...state, isCurveLoading:true, curveErr:undefined};
        case FETCH_CURVE_END:
            return {...state, isCurveLoading:false, curveErr:undefined, ...action.data};
        case FETCH_CURVE_ERROR:
            return {...state, isCurveLoading:false, curveErr:action.err};
        case CHANGE_TYPE:
            return {...state, type:action.curveType};
        case CHANGE_PERIOD:
            return {...state, period:action.period};
        default:
            return state;
    }
};

/**
 * @public
 * Функция отображения состояния хранилища redux на свойства компонента
 * @param {object} state Полное состояние хранилища redux
 * @param {object} ownProps Собственные свойства компонента
 * @return {object}
 */
export const mapStateToProps = (state = _defaultSate/*, ownProps*/) => {
    const {isin, ...data} = state[namespace];
    return data;
};

/**
 * @public
 * Функция отображения функции dispatch на свойства компонента
 * @param {function} dispatch Функция распространения действия
 * @param {object} ownProps Собственные свойства компонента
 * @return {object}
 */
export const mapDispatchToProps = (dispatch/*, ownProps*/) => {
    return {
        //dispatch,
        dispatchAction:(...args) => {
            const action = _actionCreator(...args);
            action !== undefined && dispatch(action);
        }
    };
};
