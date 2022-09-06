
export function fetchCountries(name) {
    const BASE_URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    //   const fetchParams = `fields=name,capital,population,flags,languages`

    return fetch(BASE_URL).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json()
    })
        // .catch(error => {
        //     console.log(error);
        // });
};

