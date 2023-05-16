import { fetchCountries } from './fetch';
import { debounce } from 'lodash';

const nameInput = document.getElementById('search-box');
let countryList = [];

nameInput.addEventListener('input', debounce(inputHandler, 300));

function inputHandler(e) {
  const name = e.target.value;

  fetchCountries(name)
    .then(countries => {
      countryList = countries.map(
        country =>
          new Country(
            country.name.official,
            country.population,
            country.capital,
            country.languages,
            country.flags.svg,
            country.flags.alt
          )
      );

      console.log(countryList);
    })
    .catch(error => {
      console.error(error);
      // obsłuż błąd żądania
    });
}

class Country {
  constructor(name, population, capital, languages, flagFile, alt) {
    this.name = name;
    this.population = population;
    this.capital = capital;
    this.languages = languages;
    this.flagFile = flagFile;
    this.alt = alt;
  }
}
