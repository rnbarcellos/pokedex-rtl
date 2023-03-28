import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do component `<App.js />`', () => {
  test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeBtn = screen.getByRole('link', { name: /home/i });
    const aboutBtn = screen.getByRole('link', { name: /about/i });
    const favBtn = screen.getByRole('link', { name: /favorite pokémon/i });

    expect(homeBtn).toBeInTheDocument();
    expect(aboutBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
  });

  test('A aplicação é redirecionada para a página inicial ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeBtn = screen.getByRole('link', { name: /home/i });

    userEvent.click(homeBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutBtn = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const favBtn = screen.getByRole('link', { name: /favorite pokémon/i });

    userEvent.click(favBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    const INEXISTING_URL = '/page/not/found';

    act(() => {
      history.push(INEXISTING_URL);
    });

    const headingEl = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    expect(headingEl).toBeInTheDocument();
  });
});
