import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

// Component
import App from '../App';

const pokemon = 'pokemon-name';

describe('Casos de uso do componente Pokedex', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const encouteredHeading = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });

    expect(encouteredHeading).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const pokemonName = screen.getByTestId(pokemon);

    expect(nextBtn.innerHTML).toBe('Próximo Pokémon');

    userEvent.click(nextBtn);
    expect(pokemonName.innerHTML).toBe('Charmander');

    for (let i = 1; i <= 7; i += 1) {
      userEvent.click(nextBtn);
    }
    expect(pokemonName.innerHTML).toBe('Dragonair');

    userEvent.click(nextBtn);
    expect(pokemonName.innerHTML).toBe('Pikachu');
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId(pokemon);
    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(pokemonName[0].innerHTML).toBe('Pikachu');
    expect(pokemonName).toHaveLength(1);

    userEvent.click(nextBtn);

    const newPokemon = screen.getAllByTestId(pokemon);
    expect(newPokemon).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const allButton = screen.getByRole('button', { name: /all/i });
    const psychicButton = screen.getByRole('button', { name: /psychic/i });
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(typeButtons).toHaveLength(7);
    expect(allButton).toBeVisible();

    userEvent.click(psychicButton);

    const alakazam = screen.getByText('Alakazam');
    expect(alakazam).toBeInTheDocument();
    expect(allButton).toBeVisible();
    expect(psychicButton.innerHTML).toBe('Psychic');

    userEvent.click(nextButton);

    const mew = screen.getByText('Mew');
    expect(mew).toBeInTheDocument();
    expect(allButton).toBeVisible();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(allButton).toHaveTextContent('All');

    for (let i = 1; i <= 8; i += 1) {
      userEvent.click(nextBtn);
      const pokemonName = screen.getByTestId(pokemon);
      expect(pokemonName).toBeInTheDocument();
    }

    const poisonButton = screen.getByRole('button', {
      name: /poison/i,
    });

    userEvent.click(poisonButton);
    userEvent.click(allButton);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
