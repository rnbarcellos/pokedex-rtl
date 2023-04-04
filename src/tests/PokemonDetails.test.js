import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// *helpers
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';

// *components
import App from '../App';

// *auxiliary variables
const POKEMON_URL = '/pokemon/25';

describe('Casos de teste do componente `<PokemonDetails />`', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(POKEMON_URL);
    });
  });

  test('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const detailsHeading = screen.getByRole('heading', { name: /pikachu details/i });
    const detailsLink = screen.queryByRole('link', { name: /more details/i });
    const summaryHeading = screen.getByRole('heading', { name: /summary/i });
    const summaryText = screen.getByText(/electricity to make them tender/);

    expect(detailsHeading).toBeInTheDocument();
    expect(summaryHeading).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
  });

  test('Existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const locationHeading = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    const locationMaps = screen.getAllByAltText(/pikachu location/i);
    const forestMap = screen.getByText(/kanto viridian forest/i);
    const plantMap = screen.getByText(/kanto power plant/i);
    const [viridianForest, powerPlant] = locationMaps;

    expect(locationHeading).toBeInTheDocument();
    expect(locationMaps).toHaveLength(2);
    expect(forestMap).toBeInTheDocument();
    expect(plantMap).toBeInTheDocument();
    expect(viridianForest.alt).toBe('Pikachu location');
    expect(viridianForest.src).toBe(
      'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(powerPlant.src).toBe(
      'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });

  test('O visitante pode favoritar um Pokémon através da página de detalhes', () => {
    const favoriteCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    const favoriteLabel = screen.getByText(/pokémon favoritado\?/i);

    expect(favoriteLabel).toHaveTextContent('Pokémon favoritado?');
    expect(favoriteCheckbox.checked).toBeFalsy();

    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBeTruthy();

    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBeFalsy();
  });
});
