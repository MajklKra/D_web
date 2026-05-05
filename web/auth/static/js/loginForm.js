
console.log(' Suc♥️cess welcome to the login form. ')

function updateSize()
{
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;

  console.log('Vieport');
  console.log(`↔️ šířka okna: ${w}, ↕️ výška okna: ${h}`);
  console.log('🔥 šířka okna je:' + window.outerWidth);

  // const el = document.getElementById("loginForm");
  // const rect = el.getBoundingClientRect();
  // console.log(`loginForm: ${rect.width}px × ${rect.height}px`);

  if (window.outerWidth < 992)
  {
    // alert("Přechod na tablet");
    // console.log("🔲 Přechod na tablet");
    const body = document.body;
    document.body.classList.remove("pc-mode");
    document.body.classList.add("table-mode");

    const loginForm = document.getElementById("loginForm");
    loginForm.style.display="none";

    const prohibitonC = document.getElementById("prohibitonC");
    prohibitonC.style.display = "flex";

    const codacoC = document.getElementById("codacoC");
    codacoC.style.display="none";

  }


  if (window.outerWidth >= 992)
  {

    const body = document.body;

    document.body.classList.remove("table-mode");
    document.body.classList.add("pc-mode");

    const loginForm = document.getElementById("loginForm");
    loginForm.style.display="flex";

    const prohibitonC = document.getElementById("prohibitonC");
    prohibitonC.style.display = "none";

    const codacoC = document.getElementById("codacoC");
    codacoC.style.display="flex";

  }
}

// místo okamžitého volání:
requestAnimationFrame(() =>
{
  requestAnimationFrame(updateSize); // dvojitý RAF = po layoutu i po emulaci
});

window.addEventListener("resize", updateSize);
// bonus: emulace často mění visualViewport
window.visualViewport?.addEventListener("resize", updateSize);

// console.log
// ({
//   body_client: document.body.clientHeight,                         // viditelná výška
//   body_scroll: document.body.scrollHeight,                         // celková výška obsahu
//   html_client: document.documentElement.clientHeight,              // výška viewportu
//   html_scroll: document.documentElement.scrollHeight,              // celková výška celé stránky
// });


/* Dnešní experimenty 29.4.2026 */

function togglePassword()
{
  const input = document.getElementById("password");
  const eyeClosed = document.getElementById("eyeImg");
  const eyeOpen = document.getElementById("eyeImg2");

  if (input.type === "password")
  {

    input.type = "text";

    eyeClosed.style.display = "none";
    eyeOpen.style.display = "inline";
  }
  else
  {
    input.type = "password";

    eyeClosed.style.display = "inline";
    eyeOpen.style.display = "none";
  }


  // 👉 tady přidej:
  input.style.paddingRight = "55px";
}


/* Otáčení šipky při výběru jazyků */

// const languageSelect = document.getElementById("language");
// const dropdownImg = document.getElementById("dropdownImg");

// languageSelect.addEventListener("focus", function ()
// {
//   dropdownImg.classList.add("rotate");
// });

// languageSelect.addEventListener("change", function ()
// {
//   dropdownImg.classList.remove("rotate");
//   languageSelect.blur(); // důležité
// });

// languageSelect.addEventListener("blur", function ()
// {
//   dropdownImg.classList.remove("rotate");
// });

/* Obarvení error Error-boxů*/

window.addEventListener("DOMContentLoaded", function ()
{
  const nameInput = document.getElementById("name");
  const passwordInput = document.getElementById("password");

  const nameError = document.getElementById("errorC2");
  const passwordError = document.getElementById("errorC");

  if (nameError && getComputedStyle(nameError).display !== "none")
  {
    nameInput.classList.add("input-error");
  }

  if (passwordError && getComputedStyle(passwordError).display !== "none")
  {
    passwordInput.classList.add("input-error");
  }
});


/* Nový language select-box */

const languageSelect = document.getElementById("language");
const dropdownImg = document.getElementById("dropdownImg");

const languageBtn = document.getElementById("languageBtn");
const languageText = document.getElementById("languageText");
const languageMenu = document.getElementById("languageMenu");
const languageOptions = document.querySelectorAll(".language-option");

function openLanguageMenu()
{
  languageMenu.classList.add("open");
  languageBtn.classList.add("open");
  dropdownImg.classList.add("rotate");
}

function closeLanguageMenu()
{
  languageMenu.classList.remove("open");
  languageBtn.classList.remove("open");
  dropdownImg.classList.remove("rotate");
}

function toggleLanguageMenu()
{
  if (languageMenu.classList.contains("open"))
  {
    closeLanguageMenu();
  }
  else
  {
    openLanguageMenu();
  }
}

function syncLanguageText()
{
  const selectedOption = languageSelect.options[languageSelect.selectedIndex];

  if (selectedOption && selectedOption.value)
  {
    languageText.textContent = selectedOption.textContent.trim();
  }
  else
  {
    languageText.textContent = "Jazyk";
  }

  languageOptions.forEach(function(option)
  {
    option.classList.toggle("selected", option.dataset.value === languageSelect.value);
  });
}

languageBtn.addEventListener("click", function(event)
{
  event.stopPropagation();
  toggleLanguageMenu();
});

languageOptions.forEach(function(option)
{
  option.addEventListener("click", function()
  {
    languageSelect.value = option.dataset.value;

    languageSelect.dispatchEvent(new Event("change",
    {
      bubbles: true
    }));

    syncLanguageText();
    closeLanguageMenu();
  });
});

document.addEventListener("click", function(event)
{
  if (!event.target.closest(".custom-language-select"))
  {
    closeLanguageMenu();
  }
});

document.addEventListener("keydown", function(event)
{
  if (event.key === "Escape")
  {
    closeLanguageMenu();
  }
});

syncLanguageText();