

console.log(" %c𝐖𝐄𝐋𝐂𝐎𝐌𝐄 TO client´s page !!! ", "color:yellow");

/* Změna padding pro list-patients-component-searching-bar-searchInput */


document.addEventListener("focusin", e =>
{
    if (e.target.id === "list-patients-component-searching-bar-searchInput")
    {
        document
            .getElementById("list-patients-component-searchLabel")
            .classList.add("hidden");
    }
});

document.addEventListener("focusout", e =>
{
    if (
        e.target.id === "list-patients-component-searching-bar-searchInput" &&
        e.target.value === ""
    )
    {
        document
            .getElementById("list-patients-component-searchLabel")
            .classList.remove("hidden");
    }
});


/* Pokusy SelectBox 1 */


const select = document.getElementById("clientSelect");
const btn = select.querySelector(".custom-select-btn");
const options = select.querySelectorAll(".custom-select-options div");
const valueText = document.getElementById("clientSelectValue");
const hiddenInput = document.getElementById("clientFilter");

btn.addEventListener("click", () => {
  select.classList.toggle("open");
});

options.forEach(option => {
  option.addEventListener("click", () => {
    valueText.textContent = option.textContent;
    hiddenInput.value = option.dataset.value;

    select.classList.remove("open");

    console.log("Vybráno:", hiddenInput.value);

    // tady můžeš potom spustit filtrování tabulky
    // například:
    // filterClients(hiddenInput.value);
  });
});

document.addEventListener("click", e => {
  if (!select.contains(e.target)) {
    select.classList.remove("open");
  }
});