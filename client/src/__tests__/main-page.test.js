import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import App from '../App'
import MainPage from '../components/main-page'
import {createMemoryHistory} from 'history';
import { Outlet, MemoryRouter } from 'react-router-dom';
import NavBar from '../components/nav-bar';

// jest.mock('setWordAmount', () => ({

// }))

const myContextData = {
  setWordAmount: () => console.log('test'),
  text: [],
  setReset: () => console.log('setReset')
}


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: () => myContextData
  })
);

const TestComp = () => <p>Welcome to the afterlife.</p>


test('renders the aTYPEical link', () => {
  const history = createMemoryHistory();

  render(
    <MemoryRouter >
      <MainPage />
    </MemoryRouter>
  );

  screen.debug()

  // render(<TestComp />)

  const linkElement = screen.getByText(/Hello/)
  expect(linkElement).toBeInTheDocument();
});

