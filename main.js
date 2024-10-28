const langs = ["en", "de", "es", "fr", "ja", "pt"];
const langParams = new URL(window.location.href).searchParams.get("lang");
// let lang = document.querySelector("html").getAttribute("lang");
let lang = navigator.language || navigator.userLanguage || "en";

(function setLang() {
  if (langParams && langs.includes(langParams)) {
    lang = langParams;
    changeFontSize(lang);
  } else {
    lang = "en";
  }
})();

function changeFontSize(lang) {
  document.querySelector(`.footer`).classList.add(`footer_text-${lang}`);
  document.querySelectorAll(`.action-content`).forEach((elem) => {
    elem.classList.add(`offer_text-${lang}`);
  });
}

const response = await fetch("./i18n/" + lang + ".json");
const translateData = await response.json();

document.querySelector("[data-lang=title]").innerHTML =
  translateData["Get Unlimited <br>Access"];
document.querySelector("[data-lang=img-1]").innerHTML =
  translateData["Unlimited Art <br>Creation"];
document.querySelector("[data-lang=img-2]").innerHTML =
  translateData["Exclusive <br>Styles"];
document.querySelector("[data-lang=img-3]").innerHTML =
  translateData["Magic Avatars <br>With 20% Off"];
document.querySelector("[data-lang=action_title-1]").innerHTML =
  translateData["YEARLY ACCESS"];
document.querySelector("[data-lang=action_title-2]").innerHTML =
  translateData["WEEKLY ACCESS"];
document.querySelector("[data-lang=label]").innerHTML =
  translateData["BEST OFFER"];
document.querySelector("[data-lang=action_description-1]").innerHTML =
  translateData["Just {{price}} per year"].replace("{{price}}", "$39.99");
document.querySelector("[data-lang=price-1]").innerHTML = translateData[
  "{{price}} <br>per week"
].replace("{{price}}", "$0.48");
document.querySelector("[data-lang=price-2]").innerHTML = translateData[
  "{{price}} <br>per week"
].replace("{{price}}", "$6.99");
document.querySelector("[data-lang=button]").innerHTML =
  translateData["Continue"];
document.querySelector("[data-lang=link-1]").innerHTML =
  translateData["Terms of Use"];
document.querySelector("[data-lang=link-2]").innerHTML =
  translateData["Privacy Policy"];
document.querySelector("[data-lang=link-3]").innerHTML =
  translateData["Restore"];

const offers = document.querySelectorAll(".offer");
let currentOffer = "https://apple.com/";

function removeClassActive() {
  offers.forEach((offer) => {
    offer.classList.remove("isActive");
  });
}

function transitionToLink() {
  location.href = currentOffer;
}

offers.forEach((elem) => {
  elem.addEventListener("click", () => {
    removeClassActive();
    elem.classList.add("isActive");
    switch (elem.id) {
      case "action-1":
        currentOffer = "https://apple.com/";
        break;
      case "action-2":
        currentOffer = "https://google.com/";
        break;
    }
  });
});

document.querySelector("#action-3").addEventListener("click", transitionToLink);
