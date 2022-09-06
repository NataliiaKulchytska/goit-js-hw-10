import './css/styles.css';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries';
import {markupCreation, markupCountryCard} from './markupCreation';
import {Notify} from 'notiflix';



const DEBOUNCE_DELAY = 300;


const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onRequest, DEBOUNCE_DELAY));

function onRequest(e) {
    e.preventDefault();
    
   let search = refs.input.value;

    if (search.trim() === '') {       
        clearInfo;
        return;
    }
    fetchCountries(search.trim())
        .then(countries => {
                if (countries.length > 10) {
         Notify.info('Too many matches found. Please enter a more specific name.');
                    clearInfo;
        return;
    }
    if (countries.length > 1  && countries.length <= 10) {
        const markup = countries.map(country => markupCreation(country));
        refs.list.innerHTML = markup.join('');
        refs.info.innerHTML = '';
    }
    
    if (countries.length === 1) {
         const cardMarcup = countries.map(country => markupCountryCard(country));
        refs.list.innerHTML = '';
        refs.info.innerHTML = cardMarcup.join('');
    }
        }
            // renderCountries()
        )
        .catch(error => {
            Notify.failure('Oops, there is no country with that name.');
            clearInfo;
    
 
    return error;
        }
            
        );

}

function clearInfo() {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
}