// js/filters.js



function applyFilter(category, kind) {

    const cards = document.querySelectorAll(

        `.dish-card[data-category="${category}"]`

    );



    cards.forEach(card => {

        if (!kind) {

            card.style.display = "";

        } else {

            card.style.display = card.dataset.kind === kind ? "" : "none";

        }

    });

}



function attachFilters() {

    const filterContainers = document.querySelectorAll("[data-category-filters]");



    filterContainers.forEach(container => {

        const category = container.getAttribute("data-category-filters");

        const buttons = container.querySelectorAll(".filter-btn");



        buttons.forEach(btn => {

            btn.addEventListener("click", () => {

                const isActive = btn.classList.contains("active");

                buttons.forEach(b => b.classList.remove("active"));



                if (isActive) {

                    applyFilter(category, null);

                } else {

                    btn.classList.add("active");

                    const kind = btn.dataset.kind;

                    applyFilter(category, kind);

                }

            });

        });

    });

}



document.addEventListener("DOMContentLoaded", () => {

    if (document.querySelector(".dishes-grid")) {

        attachFilters();

    }

});

