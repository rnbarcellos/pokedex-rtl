import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

// Components
import App from '../App';

describe('Casos de uso do componente `<FavoritePokemon />`', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');

    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    const favoriteBtn = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    expect(favoriteCheckbox.checked).toBeFalsy();

    userEvent.click(favoriteBtn);

    const favoriteList = screen.getByText(/no favorite pokémon found/i);
    expect(favoriteList).toBeInTheDocument();
  });

  test('Teste se apenas são exibidos os Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');

    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    const favoriteBtn = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBeTruthy();

    userEvent.click(favoriteBtn);

    const favoritePkmn = screen.getByText(/pikachu/i);
    expect(favoritePkmn).toBeInTheDocument();
  });
});
