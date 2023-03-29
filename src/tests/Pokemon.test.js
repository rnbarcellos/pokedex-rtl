import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Helpers
import renderWithRouter from '../renderWithRouter';

// Components
import App from '../App';

describe('Casos de uso do componente `<Pokemon />`', () => {
  test('É renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText(/average weight: 6\.0 kg/i);
    const pokemonSprite = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('6.0 kg');
    expect(pokemonSprite.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonSprite.alt).toBe('Pikachu sprite');
  });

  test('O card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(detailsLink.href).toBe('http://localhost/pokemon/25');
  });

  test('Ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);

    const detailsHeading = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(detailsHeading).toBeInTheDocument();
  });

  test('A URL exibida no navegador muda para `/pokemon/<id>`', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  test('Existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);

    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favoriteCheckbox);

    const favoriteIcon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoriteIcon).toBeVisible();
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
