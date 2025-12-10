// js/checkout.js



document.addEventListener("DOMContentLoaded", async () => {

    if (!document.getElementById("order-form")) return;



    await loadDishes();

    selectedKeywords = getStoredSelection();

    const cardsContainer = document.getElementById("checkout-cards");

    const emptyBlock = document.getElementById("checkout-empty");



    const selectedDishes = TOURS.filter(d => selectedKeywords.includes(d.keyword));



    if (!selectedDishes.length) {

        emptyBlock.style.display = "block";

        cardsContainer.style.display = "none";

    } else {

        emptyBlock.style.display = "none";

        cardsContainer.style.display = "grid";



        cardsContainer.innerHTML = "";

        let total = 0;



        selectedDishes.forEach(d => {

            total += Number(d.price) || 0;



            const card = document.createElement("div");

            card.className = "dish-card";

            card.dataset.dish = d.keyword;

            card.dataset.category = d.category;

            card.innerHTML = `

                <img src="${d.image}" alt="${d.name}">

                <p class="dish-price">${d.price} ₽</p>

                <p class="dish-name">${d.name}</p>

                <p class="dish-count">${d.count}</p>

                <button type="button" class="dish-remove-btn">Удалить</button>

            `;

            cardsContainer.appendChild(card);

        });



        fillSummary(selectedDishes, total);

    }



    cardsContainer.addEventListener("click", (e) => {

        if (!e.target.classList.contains("dish-remove-btn")) return;

        const card = e.target.closest(".dish-card");

        const keyword = card.dataset.dish;

        selectedKeywords = selectedKeywords.filter(k => k !== keyword);

        saveSelection(selectedKeywords);

        location.reload();

    });



    const form = document.getElementById("order-form");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();



        const selected = TOURS.filter(d => selectedKeywords.includes(d.keyword));



        if (!checkCombo(selected)) {

            showComboModal(selected);

            return;

        }



        const formData = new FormData(form);

        const clientData = Object.fromEntries(formData.entries());



        const payload = {

            ...clientData,

            dishes: selectedKeywords

        };



        try {

            await createOrder(payload);

            alert("Заказ успешно оформлен!");



            saveSelection([]);

            window.location.href = "orders.html";

        } catch (err) {

            console.error(err);

            alert("Ошибка при оформлении заказа.");

        }

    });



    initComboModal();

});



function fillSummary(dishes, total) {

    const map = { "main": [], "starter": [], "drink": [], "dessert": [] };



    dishes.forEach(d => {

        map[d.category].push(d);

    });



    document.getElementById("summary-main").textContent = map.main[0]?.name || "Не выбран";

    document.getElementById("summary-starter").textContent = map.starter[0]?.name || "Не выбран";

    document.getElementById("summary-drink").textContent = map.drink[0]?.name || "Не выбран";

    document.getElementById("summary-dessert").textContent =

        map.dessert.length ? map.dessert.map(d => d.name).join(", ") : "Не выбрано";



    document.getElementById("summary-total").textContent = `${total} ₽`;

}



// --- модалка для неправильного комбо ---



function initComboModal() {

    const modal = document.getElementById("combo-modal");

    if (!modal) return;



    // Функция для закрытия модального окна

    function closeModal() {

        modal.setAttribute('hidden', 'true');

        modal.style.display = 'none';

    }



    // Удаляем старые обработчики, если они есть

    const okButton = modal.querySelector(".combo-modal__ok");

    const closeButton = modal.querySelector(".combo-modal__close");



    // Закрытие при клике на фон модального окна

    modal.onclick = function(e) {

        if (e.target === modal) {

            closeModal();

        }

    };



    // Закрытие при клике на кнопку "Окей"

    if (okButton) {

        okButton.onclick = function(e) {

            e.preventDefault();

            e.stopPropagation();

            closeModal();

            return false;

        };

    }



    // Закрытие при клике на крестик

    if (closeButton) {

        closeButton.onclick = function(e) {

            e.preventDefault();

            e.stopPropagation();

            closeModal();

            return false;

        };

    }

}



function showComboModal(dishes) {

    const modal = document.getElementById("combo-modal");

    if (!modal) return;

    const text = document.getElementById("combo-modal-text");



    const hasMain = dishes.some(d => d.category === "main");

    const hasDrink = dishes.some(d => d.category === "drink");



    const missing = [];

    if (!hasMain) missing.push("основной тур");

    if (!hasDrink) missing.push("транспорт");



    if (missing.length) {

        text.textContent = "Добавьте в заказ: " + missing.join(", ") + ".";

    } else {

        text.textContent = "Состав тура не соответствует ни одному из доступных вариантов.";

    }



    modal.removeAttribute('hidden');

    modal.style.display = 'flex';

}

