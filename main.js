const langs = ["en", "de", "es", "fr", "ja", "pt"];
const fallbackLang = "en";

function setLang() {
  const langParams = new URL(window.location.href).searchParams.get("lang");
  const osLang = navigator.language.slice(0, 2);

  let lang;
  if (langParams && langs.includes(langParams)) {
    lang = langParams;
  } else if (langs.includes(osLang)) {
    lang = osLang;
  } else {
    lang = fallbackLang;
  }
  return lang;
}

function changeFontSize(lang) {
  document.querySelector(`.footer`).classList.add(`footer_text-${lang}`);
  document.querySelectorAll(`.action-content`).forEach((elem) => {
    elem.classList.add(`offer_text-${lang}`);
  });
}

async function loadTranslations(lang) {
  try {
    const response = await fetch("./i18n/" + lang + ".json");
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

function setTranslations(translateData) {
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
}

const dynamicFontSizeElems = document.querySelectorAll(".dynamic_text");
const footerItems = document.querySelectorAll(".footer_item");

function adjustFontSize(elems) {
  elems.forEach((elem) => {
    let currentFontSize = parseFloat(
      window.getComputedStyle(elem).getPropertyValue("font-size")
    );
    while (elem.offsetWidth > elem.parentNode.offsetWidth) {
      currentFontSize -= 0.5;
      elem.style.fontSize = currentFontSize + "px";
    }
  });
}

function setAvgValidFontSize(elems) {
  const validWidth =
    elems[0].parentNode.parentNode.offsetWidth - 0.5 * (elems.length - 1);
  let currentFontSize = parseFloat(
    window.getComputedStyle(elems[0].parentNode).getPropertyValue("font-size")
  );

  let elemsSumWidth = 0;
  elems.forEach((elem) => {
    elemsSumWidth += elem.offsetWidth;
  });

  while (elemsSumWidth > validWidth) {
    currentFontSize -= 0.5;
    elemsSumWidth = 0;
    elems.forEach((elem) => {
      elem.style.fontSize = currentFontSize + "px";
      elemsSumWidth += elem.offsetWidth;
    });
    if (currentFontSize <= 8) break;
  }
}

const offers = document.querySelectorAll(".offer");
let currentOffer = "https://apple.com/";
document.querySelector(".button-continue").addEventListener("click", () => {
  location.href = currentOffer;
});

function removeClassActive() {
  offers.forEach((offer) => {
    offer.classList.remove("isActive");
  });
}

function setClassActive() {
  offers.forEach((elem) => {
    elem.addEventListener("click", () => {
      removeClassActive();
      elem.classList.add("isActive");
      currentOffer = elem.dataset.set;
    });
  });
}
setClassActive();

(async () => {
  const lang = setLang();
  changeFontSize(lang);

  const translations = await loadTranslations(lang);

  if (!translations) {
    console.log("Translations not found");
    return;
  }
  setTranslations(translations);
  adjustFontSize(dynamicFontSizeElems);
  setAvgValidFontSize(footerItems);
})();
