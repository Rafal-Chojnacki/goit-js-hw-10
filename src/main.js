import Notiflix from 'notiflix';
import { fetchCountries } from './fetch';
import { debounce, functions } from 'lodash';

const nameInput = document.getElementById('search-box');

nameInput.addEventListener('input', debounce(inputHandler, 1000));

function inputHandler(e) {
  const name = e.target.value.trim();

  fetchCountries(name)
    .then(countries => {
      const countryList = countries.map(
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
      clearList();
      clearCountryInfo();
      if (countryList.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (countryList.length > 1) {
        updateCountryList(countryList);
        return;
      }

      updateOneCountry(countryList[0]);
    })
    .catch(error => {
      console.error(error);
      Notiflix.Notify.warning('Oops, there is no country with that name');
      clearList();
      clearCountryInfo();
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

function updateCountryList(countryList) {
  const ulCountry = document.querySelector('.country-list');
  ulCountry.style.listStyleType = 'none';
  for (const country of countryList) {
    const ulCountry = document.querySelector('.country-list');
    const countryName = country.name;
    const flagURL = country.flagFile;
    const flagAlt = country.alt;

    // Create the <li> element
    const liCountry = document.createElement('li');
    liCountry.style.fontSize = 20;
    liCountry.style.fontFamily = 'Arial, sans-serif';
    liCountry.style.fontWeight = 'bold';
    liCountry.style.padding = 2;

    // Create the <img> element and set its attributes
    const flagImage = document.createElement('img');
    flagImage.setAttribute("width", "40");
    flagImage.style.border = "1px solid black";
    flagImage.style.margin = 2;
    flagImage.src = flagURL;
    flagImage.alt = flagAlt;

    // Create the text node for the country name
    const textNode = document.createTextNode(countryName);

    // Append the <img> and text node to the <li> element
    liCountry.appendChild(flagImage);
    liCountry.appendChild(textNode);

    // Append the <li> element to the <ul> element
    ulCountry.appendChild(liCountry);
  }
}
function clearList() {
  const ulCountry = document.querySelector('.country-list');
  ulCountry.innerHTML = '';
}
function clearCountryInfo() {
  const countryInfo = document.querySelector('.country-info');
  countryInfo.innerHTML = '';
}
function updateOneCountry(country) {
  const ulCountry = document.querySelector('.country-list');
  const countryName = country.name;
  const flagURL = country.flagFile;
  const flagAlt = country.alt;

  // Create the <li> element
  const liCountry = document.createElement('li');

  // Create the <img> element and set its attributes
  const flagImage = document.createElement('img');
  flagImage.src = flagURL;
  flagImage.alt = flagAlt;

  // Create the text node for the country name
  const textNode = document.createTextNode(countryName);

  // Append the <img> and text node to the <li> element
  liCountry.appendChild(flagImage);
  liCountry.appendChild(textNode);

  // Append the <li> element to the <ul> element
  ulCountry.appendChild(liCountry);
}
