 // Function to fetch weather data from the API
 function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=863242cfb2b1d357e6093d9a4df19a4b`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Extract the required information from the response
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;

        // Display the weather information on the page
        const weatherInfoElement = document.getElementById("weather-info");
        weatherInfoElement.innerHTML = `<strong>${city}</strong><br>Temperature: ${temperature}°C<br>Weather: ${weatherDescription}`;
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  }

  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    const cityInput = document.getElementById("city-input");
    const city = cityInput.value.trim();
    if (city !== "") {
      fetchWeatherData(city);
      cityInput.value = "";
    }
  }

  // Add form submit event listener
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", handleFormSubmit);

  // Function to refresh weather data every 5 minutes
  function refreshWeatherData(city) {
    fetchWeatherData(city);
    setInterval(() => {
      fetchWeatherData(city);
    }, 5 * 60 * 1000); // 5 minutes
  }

  // Initial call to fetch weather data for Delhi
  fetchWeatherData("delhi");

  // Call to refresh weather data every 5 minutes for Delhi
  refreshWeatherData("delhi");