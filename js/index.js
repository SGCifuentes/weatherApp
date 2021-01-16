const inputText = document.getElementById("city-name"),
  btn = document.getElementById("btn-add-city"),
  form = document.querySelector(".add-city--form"),
  siteCards = document.querySelector(".site__cards"),
  apiKey = "6e27421993a4ce79495c7afe6cdbec86",
  msg = document.createTextNode("Please write a valid city 😩");

const addCity = function () {
  const city = this.previousElementSibling.value;
  form.reset();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  async function fetchData() {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      createCard(data);
    } else {
      if (form.lastElementChild.tagName !== "P") {
        const p = document.createElement("p");
        p.classList.add("error");
        p.appendChild(msg);
        form.append(p);
      }
    }
  }
  fetchData();
};

function newCard(weather, main, sys, name) {
  const card = document.createElement("div"),
    city = document.createElement("p"),
    cityText = document.createTextNode(`${name} `),
    country = document.createElement("span"),
    countryText = document.createTextNode(sys["country"]),
    tempContent = document.createElement("div"),
    temp = document.createElement("p"),
    tempValue = Math.round(main["temp"]),
    tempText = document.createTextNode(tempValue),
    celsius = document.createElement("sup"),
    celsiusText = document.createTextNode("°C"),
    img = document.createElement("img"),
    description = document.createElement("p"),
    descriptionText = document.createTextNode(weather[0]["description"]);

  card.classList.add("card");
  city.classList.add("city");
  country.classList.add("country");
  tempContent.classList.add("temp");
  img.setAttribute(
    "src",
    `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
  );
  img.setAttribute("alt", "icon");

  temp.appendChild(tempText);
  celsius.appendChild(celsiusText);
  temp.append(celsius);
  description.appendChild(descriptionText);
  tempContent.append(temp);
  tempContent.append(img);
  tempContent.append(description);
  city.appendChild(cityText);
  country.appendChild(countryText);
  city.append(country);
  card.append(city);
  card.append(tempContent);

  siteCards.append(card);
}

const createCard = function (data) {
  const { main, name, sys, weather } = data;

  newCard(weather, main, sys, name);

  msg.textContent = "";
  if (form.length > 2) {
  form.removeChild(msg);
  }
  form.reset();
  inputText.focus();
};

//Event
btn.addEventListener("click", addCity);
inputText.addEventListener("submit", addCity);
