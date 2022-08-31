import './css/styles.css';
import  fetchCountries from './js/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;


const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
}
// fetch('https://restcountries.com/v3.1/name/{name}');
refs.input.addEventListener('submit', onSearch);
refs.input.addEventListener('submit', debounce(onRequest, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();

    const  formTouch= e.currentTarget;
    const formSearch = formTouch.elements.name.value;

    fetchCountries(formSearch)
        .then(renderCountries)
        .catch(onFenchError)
        .finally(() => formTouch.reset());

}

function onRequest({seconds}) {
   localStorage.getItem('DEBOUNCE_DELAY', seconds)
}
function renderCountries(name) {
    const markup = import(name);
    refs.list.innerHTML = markup;
}
function onFenchError() {
    Notiflix.Notify.failure('Oops, there is no country with that name')
}