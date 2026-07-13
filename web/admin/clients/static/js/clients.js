

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


/* * * * * * * */
/* SELECTBOX1  */
/* * * * * * * */

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


function initCustomScrollbar()
{
    const content = document.getElementById(
        "list-patients-component-listC-listC2-content"
    );

    const track = document.getElementById(
        "list-patients-component-listC-listC2-scrollC"
    );

    const thumb = document.getElementById(
        "list-patients-component-listC-listC2-scrollC-thumb"
    );

    if (!content || !track || !thumb)
    {
        return;
    }

    /*
     * Nepoužívat dataset.
     * Dataset se může uložit do HTMX history cache,
     * ale event listenery se s HTML neukládají.
     */
    if (content._customScrollbarReady === true)
    {
        return;
    }

    content._customScrollbarReady = true;

    function updateThumbPosition()
    {
        const maxScroll =
            content.scrollHeight - content.clientHeight;

        const maxThumb =
            track.clientHeight - thumb.clientHeight;

        if (maxScroll <= 0 || maxThumb <= 0)
        {
            thumb.style.top = "0px";
            return;
        }

        const newTop =
            (content.scrollTop / maxScroll) * maxThumb;

        thumb.style.top = `${newTop}px`;
    }

    content.addEventListener("scroll", updateThumbPosition);

    let isDragging = false;
    let startY = 0;
    let startTop = 0;

    thumb.addEventListener("mousedown", event =>
    {
        event.preventDefault();

        isDragging = true;
        startY = event.clientY;
        startTop = thumb.offsetTop;

        thumb.style.cursor = "grabbing";
        document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", event =>
    {
        if (!isDragging)
        {
            return;
        }

        const maxThumb =
            track.clientHeight - thumb.clientHeight;

        const maxScroll =
            content.scrollHeight - content.clientHeight;

        if (maxThumb <= 0 || maxScroll <= 0)
        {
            return;
        }

        let newTop =
            startTop + (event.clientY - startY);

        newTop = Math.max(0, Math.min(newTop, maxThumb));

        thumb.style.top = `${newTop}px`;

        content.scrollTop =
            (newTop / maxThumb) * maxScroll;
    });

    document.addEventListener("mouseup", () =>
    {
        if (!isDragging)
        {
            return;
        }

        isDragging = false;
        thumb.style.cursor = "grab";
        document.body.style.userSelect = "";
    });

    updateThumbPosition();
}

// document.addEventListener("DOMContentLoaded", () =>
// {
//     initCustomScrollbar();
// });

document.addEventListener("htmx:afterSwap", event =>
{
    const target = event.detail.target;

    if (
        target.id ===
        "list-patients-component-listC-listC2-content-table-box"
    )
    {
        const content = document.getElementById(
            "list-patients-component-listC-listC2-content"
        );

        const thumb = document.getElementById(
            "list-patients-component-listC-listC2-scrollC-thumb"
        );

        if (content)
        {
            content.scrollTop = 0;
        }

        if (thumb)
        {
            thumb.style.top = "0px";
        }
    }

    requestAnimationFrame(initCustomScrollbar);
});

document.addEventListener("htmx:historyRestore", () =>
{
    requestAnimationFrame(initCustomScrollbar);
});

window.addEventListener("pageshow", () =>
{
    requestAnimationFrame(initCustomScrollbar);
});

/* Testování tlačítka */

document.addEventListener("click", function (e)
{
    const btn = e.target.closest(
        ".list-patients-component-listC-listC2-content-table-box-t1-col8-btn1"
    );

    if (!btn) return;

    const row = btn.closest("tr");

    const patientId = row.dataset.patientId;

    console.log(
        "%c🧪 ID klienta:",
        "color:hotpink; font-weight:bold;",
        patientId
    );

    alert("ID klienta: " + patientId);
});


/* * * * * * * * * * * */
/*  SELECTION MANAGER  */
/* * * * * * * * * * * */

const SelectionManager =
{
    storageKey: "selectedPatientIds",

    selected: new Set(),

    init()
    {
        try
        {
            const saved = sessionStorage.getItem(this.storageKey);

            this.selected = saved
                ? new Set(JSON.parse(saved).map(String))
                : new Set();
        }
        catch (error)
        {
            console.error("Chyba při načítání výběru klientů:", error);

            this.selected = new Set();
            sessionStorage.removeItem(this.storageKey);
        }
    },

    save()
    {
        sessionStorage.setItem(
            this.storageKey,
            JSON.stringify([...this.selected])
        );
    },

    add(patientId)
    {
        this.selected.add(String(patientId));
        this.save();
    },

    remove(patientId)
    {
        this.selected.delete(String(patientId));
        this.save();
    },

    setAll(patientIds)
    {
        this.selected = new Set(
            patientIds.map(String)
        );

        this.save();
        this.restore();
    },

    has(patientId)
    {
        return this.selected.has(String(patientId));
    },

    clear()
    {
        this.selected.clear();
        this.save();
        this.restore();
    },

    count()
    {
        return this.selected.size;
    },

    getAll()
    {
        return [...this.selected];
    },

    restore()
    {
        const rows = document.querySelectorAll(
            "#list-patients-component-listC-listC2-content-table-box-t1 tbody tr"
        );

        rows.forEach(row =>
        {
            const patientId = row.dataset.patientId;

            const checkbox = row.querySelector(
                ".list-patients-component-listC-listC2-content-table-box-t1-col1-checkbox"
            );

            if (!checkbox || !patientId)
            {
                return;
            }

            const isSelected = this.has(patientId);

            checkbox.checked = isSelected;
            row.classList.toggle("selected", isSelected);
        });


        /* Experiment */

        updateSelectionControls();

        /* Experiment */
    }
};

document.addEventListener("change", function (e)
{
    if (!e.target.matches(
        ".list-patients-component-listC-listC2-content-table-box-t1-col1-checkbox"
    ))
    {
        return;
    }

    const row = e.target.closest("tr");

    if (!row)
    {
        return;
    }

    const patientId = row.dataset.patientId;

    if (!patientId)
    {
        return;
    }

    if (e.target.checked)
    {
        SelectionManager.add(patientId);
    }
    else
    {
        SelectionManager.remove(patientId);
    }

    row.classList.toggle("selected", e.target.checked);

    /* Experiment */
    updateSelectionControls();
    /* Experiment */

    console.log(
        "%cVybraní klienti:",
        "color:hotpink; font-weight:bold;",
        SelectionManager.getAll()
    );
});

// document.addEventListener("DOMContentLoaded", () =>
// {
//     SelectionManager.init();
//     SelectionManager.restore();

//     initCustomScrollbar();
// });

document.addEventListener("DOMContentLoaded", () =>
{
    const navigation = performance.getEntriesByType("navigation")[0];

    if (navigation && navigation.type === "reload")
    {
        sessionStorage.removeItem(SelectionManager.storageKey);
    }

    SelectionManager.init();
    SelectionManager.restore();

    initCustomScrollbar();
});

document.addEventListener("htmx:afterSwap", event =>
{
    const target = event.detail.target;

    if (
        target.id ===
        "list-patients-component-listC-listC2-content-table-box"
    )
    {
        const content = document.getElementById(
            "list-patients-component-listC-listC2-content"
        );

        const thumb = document.getElementById(
            "list-patients-component-listC-listC2-scrollC-thumb"
        );

        if (content)
        {
            content.scrollTop = 0;
        }

        if (thumb)
        {
            thumb.style.top = "0px";
        }

        SelectionManager.restore();
    }

    requestAnimationFrame(initCustomScrollbar);
});

document.addEventListener("htmx:historyRestore", () =>
{
    SelectionManager.restore();
    requestAnimationFrame(initCustomScrollbar);
});

window.addEventListener("pageshow", () =>
{
    SelectionManager.restore();
    requestAnimationFrame(initCustomScrollbar);
});


/* Další experimenty */

function updateSelectionControls()
{
    const button = document.getElementById(
        "list-patients-component-searching-bar-btn2"
    );

    const countSpan = document.getElementById(
        "list-patients-component-searching-bar-count"
    );

    const headCheckbox = document.getElementById(
        "list-patients-component-listC-head-c1-checkbox"
    );

    const selectedCount = SelectionManager.count();

    if (button && countSpan)
    {
        const isActive = selectedCount >= 2;

        button.classList.toggle("active", isActive);
        button.disabled = !isActive;

        if (isActive)
        {
            countSpan.textContent = selectedCount + " klientů";
            countSpan.style.display = "flex";
        }
        else
        {
            countSpan.textContent = "";
            countSpan.style.display = "none";
        }
    }

    if (headCheckbox)
    {
        const totalRecords = Number(
            headCheckbox.dataset.totalRecords || 0
        );

        headCheckbox.checked =
            totalRecords > 0 &&
            selectedCount === totalRecords;

        headCheckbox.indeterminate =
            selectedCount > 0 &&
            selectedCount < totalRecords;
    }
}

document.addEventListener("change", async function (event)
{
    if (
        event.target.id !==
        "list-patients-component-listC-head-c1-checkbox"
    )
    {
        return;
    }

    const headCheckbox = event.target;

    /*
     * Po kliknutí odstraníme indeterminate stav.
     * Checkbox je nyní buď plně zapnutý, nebo vypnutý.
     */

    headCheckbox.indeterminate = false;

    if (!headCheckbox.checked)
    {
        SelectionManager.clear();

        console.log(
            "%cVšichni klienti byli odznačeni.",
            "color:hotpink; font-weight:bold;"
        );

        return;
    }

    try
    {
        headCheckbox.disabled = true;

        const response = await fetch(
            "/administration/clients/api/all-patient-ids",
            {
                method: "GET",
                headers:
                {
                    "Accept": "application/json"
                }
            }
        );

        if (!response.ok)
        {
            throw new Error(
                `Server odpověděl stavem ${response.status}`
            );
        }

        const data = await response.json();

        if (!Array.isArray(data.patient_ids))
        {
            throw new Error(
                "Server nevrátil platný seznam klientů."
            );
        }

        SelectionManager.setAll(data.patient_ids);

        console.log(
            "%cOznačeni všichni klienti:",
            "color:hotpink; font-weight:bold;",
            SelectionManager.getAll()
        );
    }
    catch (error)
    {
        console.error(
            "Nepodařilo se označit všechny klienty:",
            error
        );

        headCheckbox.checked = false;
        headCheckbox.indeterminate = false;

        alert("Nepodařilo se označit všechny klienty.");
    }
    finally
    {
        headCheckbox.disabled = false;
        updateSelectionControls();
    }

});