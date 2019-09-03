
/**
 * Мок для модуля http
 * Отвечает на запросы:
 *     get  /bonds/:isin/info - для запроса информации об эмитенте
 *     post /bonds/:isin/:type - для запроса котировок с параметром period
 * где:
 *     :isin - идентификатор интструмента, соответствующий маске: [A-Z0-9]{12}
 *     :type - тип котировок, принимающий значения: price, spread, yield
 *     period - необязательный период, принимающий значения: week, month, quarter, year, max (по умолчанию)
 *
 * Результат отправляется с демонстрационной задаержкой, 500 мс для get 1000 мс для post
 */

const http = {
    get({url}) {
        const match = url.match(/\/bonds\/([A-Z0-9]{12})\/info/);
        if (match === null) {
            return Promise.reject(`Wrong url supplied: ${url}`);
        }
        const isin = match[1].toUpperCase();
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(_makeInfo(isin));
            }, 500);// Использована демонстрационная задаержка
        });
    },

    post({url, body}) {
        const match = url.match(/\/bonds\/([A-Z0-9]{12})\/(price|spread|yield)/);
        if (match === null) {
            return Promise.reject(`Wrong url supplied: ${url}`);
        }
        const isin = match[1].toUpperCase();
        const type = match[2];
        const {period} = body;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const {times, values} = _makeCurve(type, period);
                const result = {isin, type, period, times, values};
                resolve(result);
            }, 1000);// Использована демонстрационная задаержка
        });
    }
};

/**
 * Параметры конфигурирования для формирования кривых котировок
 * @type {object}
 */
const CURVE_CONFIG = {
    week: {count:7*2, step:12*3600000},
    month: {count:15, step:2*24*3600000},
    quarter: {count:13, step:7*24*3600000},
    year: {count:12, step:30.5*24*3600000},
    max: {count:12, step:91*24*3600000}
};

/**
 * Сформировать информацию об эмитенте
 * @private
 * @param {string} isin Идентификатор инструмента
 */
const _makeInfo = (isin) => {
    return {
        isin: isin,
        name: 'NII CAPITAL',
        unknownNumber1: 7.625,
        unknownNumber2: 21,
        currency: 'USD',
        description: `NII CAPITAL CORP, Telecommunications, NR, till ${(new Date()).toLocaleTimeString()}`
    };
};

/**
 * Сформировать тестовые данные для кривой котировок
 * @private
 * @param {string} type Тип коивой (price|spread|yield)
 * @param {string} period Период данных (week|month|quarter|year|max)
 */
const _makeCurve = (type, period) => {
    if (['week', 'month', 'quarter', 'year', 'max'].indexOf(period) === -1) {
        period = 'week';
    }
    const config = CURVE_CONFIG[period];
    let today = new Date();
    today = (new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)).getTime();
    const times = [...Array(config.count)].map((item, i) => (today - config.step*(config.count - i - 1)));
    const avgGrow = 1;
    const maxAmpl = 3;
    let curValue = 30;
    const values = times.map((item, i) => (curValue = curValue + avgGrow + (2*Math.random() - 1)*maxAmpl));
    return {times, values};
};

export default http;
