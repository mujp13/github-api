'use strict';

function getRepo() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const url = `https://api.github.com/users/${searchTerm}/repos`; 
    
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
  });
}

function displayResults(responseJson, maxResults) {
  console.log(`length of responseJson: ${responseJson.length}`);
  console.log(`url: ${responseJson.html_url}`);
  console.log(`url: ${responseJson.name}`);
  console.log(responseJson);
  $('#results-list').empty();
  
  for (let i = 0; i < responseJson.length; i++) {
    console.log('before append');
    $('#results-list').append(`<li><h3><a href="${responseJson.html_url[i]}">${responseJson.name[i]}</a></h3></li>`);
    console.log('before append');
  }
  $('#results').removeClass('hidden');
  console.log('after showing');
};

function watchForm() {

  getRepo();
}

$(watchForm);