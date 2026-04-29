
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

document.getElementById("errorBtn").addEventListener("click", function ()
{
    console.log("Kliknuto na errorBtn2");

    console.log("Špatné heslo - zavírám chybovou hlášku");

    const errorC = document.getElementById("errorC");
    errorC.style.display = "none";

    document.getElementById("password").focus();   // <- id inputu kam chceš fokus
});

document.getElementById("errorBtn2").addEventListener("click", function ()
{
    console.log("Kliknuto na errorBtn2");

    console.log("Špatné jméno - zavírám chybovou hlášku");

    const errorC2 = document.getElementById("errorC2");
    errorC2.style.display = "none";

    document.getElementById("name").focus();   // <- id inputu kam chceš fokus

});

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


const languageSelect = document.getElementById("language");
const dropdownImg = document.getElementById("dropdownImg");

languageSelect.addEventListener("focus", function () {
  dropdownImg.classList.add("rotate");
});

languageSelect.addEventListener("change", function () {
  dropdownImg.classList.remove("rotate");
  languageSelect.blur(); // důležité
});

languageSelect.addEventListener("blur", function () {
  dropdownImg.classList.remove("rotate");
});