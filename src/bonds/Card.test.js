import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from "redux";
import {Provider as ReduxProvider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Card from './Card';
import * as CardRedux from './CardRedux';



describe('Component Card', () => {
    it.each([
        [undefined, undefined],
        [undefined, 'week'],
        [undefined, 'month'],
        [undefined, 'quarter'],
        [undefined, 'year'],
        [undefined, 'max'],
        ['price', undefined],
        ['price', 'week'],
        ['price', 'month'],
        ['price', 'quarter'],
        ['price', 'year'],
        ['price', 'max'],

        ['spread', 'week'],
        ['spread', 'month'],
        ['spread', 'quarter'],
        ['spread', 'year'],
        ['spread', 'max'],

        ['yield', 'week'],
        ['yield', 'month'],
        ['yield', 'quarter'],
        ['yield', 'year'],
        ['yield', 'max']
    ])(`Renders without crashing (variant %#: %s, %s)`, (type, period) => {
        const store = Redux.createStore(
            Redux.combineReducers({[CardRedux.namespace]:CardRedux.reducer}),
            Redux.applyMiddleware(ReduxThunk)
        );
        const div = document.createElement('div');
        ReactDOM.render(<ReduxProvider store={store}><Card isin={'ABC000000777'} type={type} period={period} /></ReduxProvider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
