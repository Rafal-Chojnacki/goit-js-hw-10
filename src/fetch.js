// fetchCountries.js

export function fetchCountries(name) {
  return new Promise((resolve, reject) => {
    const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    const request = new XMLHttpRequest();

    request.open('GET', url);
    request.onload = () => {
      if (request.status === 200) {
        const countries = JSON.parse(request.responseText);
        resolve(countries);
      } else {
        reject(new Error(request.statusText));
      }
    };

    request.onerror = () => {
      reject(new Error('An error occurred during the request'));
    };

    request.send();
  });
}
