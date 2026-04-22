
console.log (" Hello my friend you are located in the JS script db_status_js 𝓕𝓻𝓲𝓮𝓷𝓭𝓼")

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