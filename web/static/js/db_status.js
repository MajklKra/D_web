
console.log (" Hello my friend you are located in the JS script db_status_js 𝓕𝓻𝓲𝓮𝓷𝓭𝓼")


// document.getElementById("loginForm").addEventListener("submit", (e) =>
// {
//     console.log (" 👂 Listener tlačítka submit aktivován !!!  ")

//     showSpinner();   // 🔵 zobraz kolečko

//     const btn = e.target.querySelector("button[type=submit]");
//     if (btn) btn.disabled = true;

// });

// function showSpinner()
// {

//   console.log (" 👂 Function spinner activated !!! 🔄 ")

//   document.getElementById("spinner").style.display = "block";

// }

/* Originální kód */

// let spinnerTimeout = null;

// function showSpinner()
// {
//   const spinner = document.getElementById("spinner");
//   if (spinner)
//   {
//     spinner.classList.remove("hideSpinner");
//   }
// }

// function hideSpinner()
// {
//   const spinner = document.getElementById("spinner");
//   if (spinner)
//   {
//     spinner.classList.add("hideSpinner");
//   }
// }

// // 🔵 při načtení stránky → schovej spinner
// document.addEventListener("DOMContentLoaded", () =>
// {
//   hideSpinner();
// });

// // 🔵 při návratu přes tlačítko ZPĚT → taky schovej spinner
// window.addEventListener("pageshow", () =>
// {
//   hideSpinner();
// });

// // 🔵 při odeslání loginu → zobraz spinner
// const loginForm = document.getElementById("loginForm");
// if (loginForm)
// {
//   loginForm.addEventListener("submit", () => {
//     showSpinner();
//   });
// }

let spinnerTimeout = null;

function showSpinner()
{
  const spinner = document.getElementById("spinner");
  if (spinner)
  {
    spinner.classList.remove("hideSpinner");
  }
}

function hideSpinner()
{
  const spinner = document.getElementById("spinner");
  if (spinner)
  {
    spinner.classList.add("hideSpinner");
  }

  if (spinnerTimeout)
  {
    clearTimeout(spinnerTimeout);
    spinnerTimeout = null;
  }
}

document.addEventListener("DOMContentLoaded", () =>
{
  hideSpinner();
});

window.addEventListener("pageshow", () =>
{
  hideSpinner();
});


const loginForm = document.getElementById("loginForm");
if (loginForm)
{
  loginForm.addEventListener("submit", () =>
  {
       spinnerTimeout = setTimeout(() => {
      showSpinner();
    }, 3000);
  });
}