const fireXhrRequest = () => {
  const progressEl = document.getElementById('progress');
  const statusEl = document.getElementById('status');
  const response1El = document.getElementById('response1');
  const response2El = document.getElementById('response2');
  // Clear stuff
  progressEl.innerHTML = '';
  statusEl.innerHTML = '';
  response1El.innerHTML = '';
  response2El.innerHTML = '';

  const xhr = new XMLHttpRequest(),
    method = 'GET',
    url = document.getElementById('url').value;

  xhr.open(method, url, true);

  xhr.onprogress = () => {
    progressEl.innerHTML = 'in flight';
  };

  xhr.onload = () => {
    // Check for http success status code
    if (xhr.status === 200) {
      statusEl.innerHTML = xhr.status;
      const _response = JSON.parse(xhr.responseText);
      // Check that we received a shape and response we expected
      if (_response.length) {
        const {orderId, variants} = _response[0];
        response1El.innerHTML = `OrderId : ${orderId}`;
        response2El.innerHTML = `Variants : ${JSON.stringify(variants)}`;
      }
    }
    // if not found
    if (xhr.status.toString().startsWith('4')) {
      response1El.innerHTML = `Error ${xhr.status}`;
    }
  };
  // handle xhr error
  xhr.onerror = e => {
    statusEl.innerHTML = `An Error Occured ${JSON.stringify(e)}`;
  };
  xhr.send();
};


const getWeatherByZip = () => {
  console.log('hit')
  const zip = document.getElementById('zip').value;
  const xhr = new XMLHttpRequest(),
    method = 'GET'
  url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=85e130f983934be5b7f31ce087ae76fa`

  xhr.open(method, url, true);

  xhr.onload = () => {
    console.log('load',xhr)
    // Check for http success status code
    if (xhr.status === 200) {

      const _response = JSON.parse(xhr.responseText);
      // Check that we received a shape and response we expected
      if (_response.weather) {
        console.log({_response})
        const { name, main, weather, wind } = _response
        document.getElementById('locality').innerHTML = name;
        document.getElementById('temp').innerHTML = `${main.temp} &deg;F`;
        document.getElementById('description').innerHTML = weather[0].description;
        document.getElementById('wind').innerHTML = `${wind.speed} mph`;
      }
    }
    // if not found
    if (xhr.status.toString().startsWith('4')) {
      response1El.innerHTML = `Error ${xhr.status}`;
    }
  };
  // handle xhr error
  xhr.onerror = e => {
    statusEl.innerHTML = `An Error Occured ${JSON.stringify(e)}`;
  };
  xhr.send();
};

