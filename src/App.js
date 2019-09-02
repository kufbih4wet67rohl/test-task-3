import React from 'react';
import * as Redux from 'redux';
import {Provider as ReduxProvider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import BondCard from './bonds/Card';
import * as BondCardRedux from './bonds/CardRedux';
import './App.css';



const store = Redux.createStore(
    Redux.combineReducers({
        [BondCardRedux.namespace]: BondCardRedux.reducer
    }),
    {},
    Redux.applyMiddleware(ReduxThunk)
);

const App = () => {
    return (
        <div className="bonds-app">
            <ReduxProvider store={store}>
                <BondCard
                    isin={'US67021BAE92'}
                    type={'spread'}
                    period={'month'}
                />
            </ReduxProvider>
        </div>
    );
};

export default App;
