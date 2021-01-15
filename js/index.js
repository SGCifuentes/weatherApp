const inputText = document.getElementById("city-name"),
  btn = document.getElementById("btn-add-city"),
  form = document.querySelector(".add-city--form"),
  siteCards = document.querySelector(".site__cards"),
  apiKey = "6e27421993a4ce79495c7afe6cdbec86";

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
        const msg = document.createTextNode("Please write a valid city 😩");
        p.appendChild(msg);
        form.append(p);
      }
    }
  }
  fetchData();
};

const createCard = function (data) {
  console.log(`data => ${data.name}`);
  console.log(data);
  const msg = document.querySelector('.error');

  msg.textContent = "";
  form.removeChild(msg);
  form.reset();
  inputText.focus();
}

//Event
btn.addEventListener("click", addCity);
inputText.addEventListener("submit", addCity);