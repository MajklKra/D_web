

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


/* Aktuální selectBox1  */


document.addEventListener("click", function (e)
{
    const select = document.getElementById("list-patients-component-searching-bar-selectBox1");
    if (!select) return;

    const btn = e.target.closest("#list-patients-component-searching-bar-selectBox1-btn1");
    const option = e.target.closest(".list-patients-component-searching-bar-selectBox1-menu-options");

    if (btn)
    {
        select.classList.toggle("open");
        return;
    }

    if (option)
    {
        const valueText = document.getElementById("list-patients-component-searching-bar-selectBox1-sp2");
        const hiddenInput = document.getElementById("list-patients-component-searching-bar-selectBox1-filter");

        valueText.textContent = option.textContent;
        hiddenInput.value = option.dataset.value;

        console.log("Vybráno:", hiddenInput.value);

        select.classList.remove("open");
        return;
    }

    if (!select.contains(e.target)) {
        select.classList.remove("open");
    }
});



/* * * * * * * */
/* SELECTBOX2  */
/* * * * * * * */


document.addEventListener("click", function (e)
{
    const select = document.getElementById("list-patients-component-searching-bar-selectBox2");
    if (!select) return;

    const btn = e.target.closest("#list-patients-component-searching-bar-selectBox2-btn1");
    const option = e.target.closest(".list-patients-component-searching-bar-selectBox2-menu-options");

    if (btn)
    {
        select.classList.toggle("open");
        return;
    }

    if (option)
    {
        const valueText = document.getElementById("list-patients-component-searching-bar-selectBox2-sp2");
        const hiddenInput = document.getElementById("list-patients-component-searching-bar-selectBox2-filter");

        valueText.textContent = option.textContent;
        hiddenInput.value = option.dataset.value;

        console.log("%c🧪 Vybráno:",  "color: hotpink; font-weight: bold;",hiddenInput.value);

        select.classList.remove("open");
        return;
    }

    if (!select.contains(e.target)) {
        select.classList.remove("open");
    }
});



/* * * * * * * */
/* SELECTBOX3  */
/* * * * * * * */


document.addEventListener("click", function (e)
{
    const select = document.getElementById("list-patients-component-searching-bar-selectBox3");
    if (!select) return;

    const btn = e.target.closest("#list-patients-component-searching-bar-selectBox3-btn1");
    const option = e.target.closest(".list-patients-component-searching-bar-selectBox3-menu-options");

    if (btn)
    {
        select.classList.toggle("open");
        return;
    }

    if (option)
    {
        const valueText = document.getElementById("list-patients-component-searching-bar-selectBox3-sp2");
        const hiddenInput = document.getElementById("list-patients-component-searching-bar-selectBox3-filter");

        valueText.textContent = option.textContent;
        hiddenInput.value = option.dataset.value;

        console.log("%c🧪 Vybráno:",  "color: hotpink; font-weight: bold;",hiddenInput.value);

        select.classList.remove("open");
        return;
    }

    if (!select.contains(e.target)) {
        select.classList.remove("open");
    }
});

/* * * * * * * */
/* SELECTBOX4  */
/* * * * * * * */

document.addEventListener("click", function (e)
{
    const select = document.getElementById("list-patients-component-searching-bar-selectBox4");
    if (!select) return;

    const btn = e.target.closest("#list-patients-component-searching-bar-selectBox4-btn1");
    const option = e.target.closest(".list-patients-component-searching-bar-selectBox4-menu-options");

    if (btn)
    {
        select.classList.toggle("open");
        return;
    }

    if (option)
    {
        const valueText = document.getElementById("list-patients-component-searching-bar-selectBox4-sp2");
        const hiddenInput = document.getElementById("list-patients-component-searching-bar-selectBox4-filter");

        valueText.textContent = option.textContent;
        hiddenInput.value = option.dataset.value;

        console.log("%c🧪 Vybráno:",  "color: hotpink; font-weight: bold;",hiddenInput.value);

        select.classList.remove("open");
        return;
    }

    if (!select.contains(e.target)) {
        select.classList.remove("open");
    }
});


/* * * * * * * */
/* Scroll-bar  */
/* * * * * * * */

// function initScrollBar()
// {
//     const content = document.getElementById("list-patients-component-listC-listC2-content");
//     const track = document.getElementById("list-patients-component-listC-listC2-scrollC");
//     const thumb = document.getElementById("list-patients-component-listC-listC2-scrollC-thumb");

//     if (!content || !track || !thumb)
//     {
//         console.error("ScrollBar: některý prvek nebyl nalezen.");
//         return;
//     }

//     content.addEventListener("scroll", () =>
//     {
//         const maxScroll = content.scrollHeight - content.clientHeight;
//         const maxThumb = track.clientHeight - thumb.clientHeight;

//         thumb.style.top =
//             (content.scrollTop / maxScroll) * maxThumb + "px";
//     });

//     let isDragging = false;
//     let startY = 0;
//     let startTop = 0;

//     thumb.addEventListener("mousedown", e =>
//     {
//         isDragging = true;
//         startY = e.clientY;
//         startTop = thumb.offsetTop;

//         thumb.style.cursor = "grabbing";
//         document.body.style.userSelect = "none";
//     });

//     document.addEventListener("mousemove", e =>
//     {
//         if (!isDragging) return;

//         const deltaY = e.clientY - startY;

//         const maxThumb =
//             track.clientHeight - thumb.clientHeight;

//         let newTop = startTop + deltaY;

//         if (newTop < 0) newTop = 0;
//         if (newTop > maxThumb) newTop = maxThumb;

//         thumb.style.top = newTop + "px";

//         const maxScroll =
//             content.scrollHeight - content.clientHeight;

//         content.scrollTop =
//             (newTop / maxThumb) * maxScroll;
//     });

//     document.addEventListener("mouseup", () =>
//     {
//         if (!isDragging) return;

//         isDragging = false;
//         thumb.style.cursor = "grab";
//         document.body.style.userSelect = "";
//     });


// }

// initScrollBar();


function initCustomScrollbar()
{
    const content = document.getElementById("list-patients-component-listC-listC2-content");
    const track = document.getElementById("list-patients-component-listC-listC2-scrollC");
    const thumb = document.getElementById("list-patients-component-listC-listC2-scrollC-thumb");

    if (!content || !track || !thumb) return;

    if (content.dataset.scrollbarReady === "1") return;
    content.dataset.scrollbarReady = "1";

    content.addEventListener("scroll", () =>
    {
        const maxScroll = content.scrollHeight - content.clientHeight;
        const maxThumb = track.clientHeight - thumb.clientHeight;

        if (maxScroll <= 0 || maxThumb <= 0) return;

        thumb.style.top = (content.scrollTop / maxScroll) * maxThumb + "px";
    });

    let isDragging = false;
    let startY = 0;
    let startTop = 0;

    thumb.addEventListener("mousedown", e =>
    {
        isDragging = true;
        startY = e.clientY;
        startTop = thumb.offsetTop;

        thumb.style.cursor = "grabbing";
        document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", e =>
    {
        if (!isDragging) return;

        const maxThumb = track.clientHeight - thumb.clientHeight;
        const maxScroll = content.scrollHeight - content.clientHeight;

        let newTop = startTop + (e.clientY - startY);

        if (newTop < 0) newTop = 0;
        if (newTop > maxThumb) newTop = maxThumb;

        thumb.style.top = newTop + "px";
        content.scrollTop = (newTop / maxThumb) * maxScroll;
    });

    document.addEventListener("mouseup", () =>
    {
        if (!isDragging) return;

        isDragging = false;
        thumb.style.cursor = "grab";
        document.body.style.userSelect = "";
    });
}


document.addEventListener("DOMContentLoaded", initCustomScrollbar);
document.addEventListener("htmx:afterSwap", initCustomScrollbar);
document.addEventListener("htmx:historyRestore", initCustomScrollbar);
window.addEventListener("pageshow", initCustomScrollbar);