const BASE_URL =
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_hCgBc3bB1heCzOJSUjCdSFrL6wfKhlwpkb0Mitid&currencies=";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
//   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  const URL = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_hCgBc3bB1heCzOJSUjCdSFrL6wfKhlwpkb0Mitid&currencies=${toCurr.value}&base_currency=${fromCurr.value}`;
  let response = await fetch(URL);
  let data1 = await response.json();
  let rate = toCurr.value
  let data3 = data1.data
  let exchaneValue = data3[rate]
  

  let finalAmount = amtVal * exchaneValue;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  // msg.innerText = `${amtVal} ${fromCurr.value} = ${toCurr.value}`;
  // msg.innerText = `${amtVal} ${fromCurr.value} = ${data3}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
  // console.log(rate)
});

window.addEventListener("load", () => {
  updateExchangeRate();
});