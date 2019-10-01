import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App.js';

let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('renders without crashing', () => {
    act(() => {
        ReactDOM.render(<App />, container);
    });
});

it('renders without error message', () => {
    act(() => {
        ReactDOM.render(<App />, container);
    });
    const errorMessage = container.querySelector('#errorMessage');
    expect(errorMessage).toBeNull();
});

it('can change currencies', () => {
    act(() => {
        ReactDOM.render(<App />, container);
    });

    const cad = container.querySelector('#usdcad');
    act(() => {
        cad.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
});