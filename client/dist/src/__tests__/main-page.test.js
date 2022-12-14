var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { render, screen } from '@testing-library/react';
import MainPage from '../components/main-page';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
// jest.mock('setWordAmount', () => ({
// }))
var myContextData = {
    setWordAmount: function () { return console.log('test'); },
    text: [],
    setReset: function () { return console.log('setReset'); }
};
jest.mock("react-router-dom", function () { return (__assign(__assign({}, jest.requireActual("react-router-dom")), { useOutletContext: function () { return myContextData; } })); });
var TestComp = function () { return React.createElement("p", null, "Welcome to the afterlife."); };
test('renders the aTYPEical link', function () {
    var history = createMemoryHistory();
    render(React.createElement(MemoryRouter, null,
        React.createElement(MainPage, null)));
    screen.debug();
    // render(<TestComp />)
    var linkElement = screen.getByText(/Hello/);
    expect(linkElement).toBeInTheDocument();
});
