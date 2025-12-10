// js/ordersPage.js



let ORDERS = [];

let orderToDeleteId = null;



document.addEventListener("DOMContentLoaded", async () => {

    const listEl = document.getElementById("orders-list");

    if (!listEl) return;



    try {

        const data = await getOrders();

        ORDERS = (data || []).sort((a, b) => {

            const da = new Date(a.created_at || 0);

            const db = new Date(b.created_at || 0);

            return db - da;

        });



        if (!ORDERS.length) {

            listEl.textContent = "У вас ещё нет заказов.";

            return;

        }



        const table = document.createElement("table");

        table.className = "tours-table";

        table.innerHTML = `

            <thead>

                <tr>

                    <th>#</th>

                    <th>Дата</th>

                    <th>Состав</th>

                    <th>Стоимость</th>

                    <th>Время доставки</th>

                    <th></th>

                </tr>

            </thead>

            <tbody></tbody>

        `;

        const tbody = table.querySelector("tbody");



        ORDERS.forEach((order, index) => {

            const tr = document.createElement("tr");



            const dishesNames = (order.dishes_names || order.dishes || [])

                .join(", ");



            const deliveryTime = order.delivery_time || "Как можно скорее (с 7:00 до 23:00)";



            tr.innerHTML = `

                <td>${index + 1}</td>

                <td>${order.created_at || "-"}</td>

                <td>${dishesNames}</td>

                <td>${order.total_price || "-"}</td>

                <td>${deliveryTime}</td>

                <td>

                    <button class="btn-small" data-action="details" data-id="${order.id}">Подробнее</button>

                    <button class="btn-small" data-action="edit" data-id="${order.id}">Редактировать</button>

                    <button class="btn-small" data-action="delete" data-id="${order.id}">Удалить</button>

                </td>

            `;

            tbody.appendChild(tr);

        });



        listEl.appendChild(table);

    } catch (err) {

        console.error(err);

        listEl.textContent = "Ошибка при загрузке заказов.";

    }



    listEl.addEventListener("click", (e) => {

        if (!e.target.classList.contains("btn-small")) return;



        const id = e.target.dataset.id;

        const action = e.target.dataset.action;

        const order = ORDERS.find(o => String(o.id) === String(id));

        if (!order) return;



        if (action === "details") {

            openDetailsModal(order);

        } else if (action === "edit") {

            openEditModal(order);

        } else if (action === "delete") {

            openDeleteModal(order);

        }

    });



    initOrdersModals();

});



function openDetailsModal(order) {

    const modal = document.getElementById("order-modal");

    const content = document.getElementById("order-modal-content");

    content.innerHTML = `

        <p><b>ФИО:</b> ${order.full_name || ""}</p>

        <p><b>Email:</b> ${order.email || ""}</p>

        <p><b>Телефон:</b> ${order.phone || ""}</p>

        <p><b>Адрес:</b> ${order.delivery_address || ""}</p>

        <p><b>Тип доставки:</b> ${order.delivery_type || ""}</p>

        <p><b>Время:</b> ${order.delivery_time || "Как можно скорее"}</p>

        <p><b>Комментарий:</b> ${order.comment || "Нет"}</p>

        <p><b>Туры:</b> ${(order.dishes_names || order.dishes || []).join(", ")}</p>

        <p><b>Стоимость:</b> ${order.total_price || "-"} ₽</p>

    `;

    modal.hidden = false;

}



function openEditModal(order) {

    const modal = document.getElementById("order-edit-modal");

    document.getElementById("edit-id").value = order.id;

    document.getElementById("edit-full_name").value = order.full_name || "";

    document.getElementById("edit-email").value = order.email || "";

    document.getElementById("edit-phone").value = order.phone || "";

    document.getElementById("edit-address").value = order.delivery_address || "";

    document.getElementById("edit-type").value = order.delivery_type || "office";

    document.getElementById("edit-time").value = order.delivery_time || "";

    document.getElementById("edit-comment").value = order.comment || "";



    modal.hidden = false;

}



function openDeleteModal(order) {

    const modal = document.getElementById("order-delete-modal");

    orderToDeleteId = order.id;

    modal.hidden = false;

}



function initOrdersModals() {

    const modals = document.querySelectorAll(".combo-modal");

    modals.forEach(modal => {

        modal.addEventListener("click", (e) => {

            if (e.target.classList.contains("combo-modal") ||

                e.target.classList.contains("combo-modal__close") ||

                e.target.classList.contains("combo-modal__ok")) {

                modal.hidden = true;

            }

        });

    });



    const deleteConfirm = document.getElementById("delete-confirm");

    if (deleteConfirm) {

        deleteConfirm.addEventListener("click", async () => {

            if (!orderToDeleteId) return;

            try {

                await deleteOrder(orderToDeleteId);

                alert("Заказ удалён");

                location.reload();

            } catch (err) {

                console.error(err);

                alert("Ошибка при удалении заказа");

            }

        });

    }



    const editForm = document.getElementById("order-edit-form");

    if (editForm) {

        editForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            const formData = new FormData(editForm);

            const id = formData.get("id");

            formData.delete("id");

            const payload = Object.fromEntries(formData.entries());

            try {

                await updateOrder(id, payload);

                alert("Заказ успешно изменён");

                location.reload();

            } catch (err) {

                console.error(err);

                alert("Ошибка при изменении заказа");

            }

        });

    }

}

