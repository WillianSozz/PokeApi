import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import { Skeletons } from '../components/Skeletons';

export const Home = () => {
  const [originalPokemons, setOriginalPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    var endpoints = [];
    for (var i = 1; i < 1000; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => {
      setOriginalPokemons(res);
      setFilteredPokemons(res);
    });
  };

  const pokemonFilter = (name) => {
    if (name === '') {
      setFilteredPokemons(originalPokemons);
    } else {
      const filtered = originalPokemons.filter((pokemon) =>
        pokemon.data.name.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  };

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {filteredPokemons.length === 0 ? (
            <Skeletons />
          ) : (
            filteredPokemons.map((pokemon, key) => (
              <Grid item xs={12} sm={6} md={2} key={key}>
                <PokemonCard
                  name={pokemon.data.name}
                  image={pokemon.data.sprites.front_default}
                  types={pokemon.data.types}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
};
