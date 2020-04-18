const countriesList = document.querySelector('.countries');
let countries;
const otherCountiesSameLang = [];
countriesList.addEventListener('change', newCountrySelection);

function newCountrySelection(event) {
	displayCountryInfo(event.target.value);
}
const url =
	'https://restcountries.eu/rest/v2/all?fields=name;capital;languages;area;population;region;subregion;alpha3Code;currencies;translations;';

fetch(url)
	.then(function (res) {
		return res.json();
	})
	.then(function (data) {
		initialize(data);
	})
	.catch(function (err) {
		console.log('Error:', err);
	});

function initialize(countriesData) {
	countries = countriesData;
	let options = '';
	countries.forEach(
		(country) =>
			(options += `<option value="${country.alpha3Code}">${country.name}</option>`)
	);
	countriesList.innerHTML = options;
	displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

function displayCountryInfo(countryByAlpha3Code) {
	const countryData = countries.find(
		(country) => country.alpha3Code === countryByAlpha3Code
	);
	document.querySelector('.capital').innerHTML = countryData.capital;
	document.querySelector(
		'.population'
	).innerHTML = countryData.population.toLocaleString('en-US');
	document.querySelector('.currency').innerHTML = countryData.currencies
		.filter((c) => c.name)
		.map((c) => `${c.name} (${c.code})`)
		.join(', ');
	document.querySelector('.region').innerHTML = countryData.region;
	document.querySelector('.subregion').innerHTML = countryData.subregion;
	document.querySelector('.area').innerHTML = `${countryData.area} m²`;
	const lang = countryData.languages
		.filter((c) => c.name)
		.map((c) => ` ${c.name}`);
	const langSpan = document.querySelector('.sameLanguage');
	langSpan.innerHTML = '';
	for (i = 0; i < lang.length; i++) {
		everyLang = lang[i];
		everyLang = document.createElement('span');
		everyLang.classList.add('lang');
		everyLang.innerText = lang[i];
		langSpan.appendChild(everyLang);
		everyLang.addEventListener('click', (e) => {
			otherCountiesSameLang.length = 0;
			countries.forEach((country) => {
				country.languages.forEach((lang) => {
					if (lang.name === e.target.innerText.trim()) {
						otherCountiesSameLang.push(country.name);
					}
				});
			});
		});
	}
}