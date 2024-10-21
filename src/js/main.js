const addToCartBtn = document.querySelectorAll(".main__box-container-btn");
const selectBtn = document.querySelectorAll(".main__box-container-select");
const cartItems = document.querySelector(".main__summary-title span");
const plusIcon = document.querySelectorAll(".plus");
const minusIcon = document.querySelectorAll(".minus");
const foodQuantity = document.querySelectorAll(".main__box-container-select-quanity");
const emptySummaryBox = document.querySelector(".main__summary-box");
const totalSummaryBox = document.querySelector(".main__summary-total");
const infoSummaryBox = document.querySelector(".main__summary-info");
const confirmBtn = document.querySelector(".main__summary-btn");
const totalPrice = document.querySelector(".main__summary-total-price");
const newOrderBtn = document.querySelector(".main__popup-box-item-btn");
const popup = document.querySelector(".main__popup");
const popupBox = document.querySelector(".main__popup-box");
const orderTotal = document.querySelector(".main__popup-box-item-total-num");
const shadow = document.querySelector(".shadow");
let cart = 0;
let id;
let newItemsSummaryBox = [];
let deleteBtns = [];
let total = [];
let totalSum;
let finalItems = [];

const updateItemsSummary = () => {
	newItemsSummaryBox = Array.from(document.querySelectorAll(".main__summary-items"));
	deleteBtns = Array.from(document.querySelectorAll(".main__summary-items-info-img"));
	finalItems = Array.from(document.querySelectorAll(".main__popup-box-item"));
};

fetch("./data.json")
	.then(response => response.json())
	.then(data => {
		addToCartBtn.forEach(btn => {
			btn.addEventListener("click", e => {
				const indexAddBtn = Array.from(addToCartBtn).indexOf(e.target);
				id = indexAddBtn;
				foodQuantity[indexAddBtn].textContent = 1;

				const orderDiv = document.createElement("div");
				orderDiv.classList.add("main__popup-box-item");
				orderDiv.setAttribute("id", id);

				const div = document.createElement("div");
				div.classList.add("main__summary-items");
				div.setAttribute("id", id);

				div.innerHTML = `<div class="main__summary-items-info">
						<h3 class="main__summary-items-info-title">${data[indexAddBtn].name}</h3>
						<div class="main__summary-items-info-prices">
							<p class="main__summary-items-info-prices-quantity">1x</p>
							<p class="main__summary-items-info-prices-one">@${data[indexAddBtn].price.toFixed(2)}</p>
							<p class="main__summary-items-info-prices-all">$${data[indexAddBtn].price.toFixed(2)}</p>
						</div>
					</div>
					<div class="main__summary-items-info-img" onclick="deleteItems(event)">
						<img src="./src/img/icon-remove-item.svg" alt="X icon" class="main__summary-items-info-img-x">
					</div>
					</div>`;

				emptySummaryBox.insertAdjacentElement("afterend", div);
				console.log(data[0].name);

				orderDiv.innerHTML = `<div class="main__popup-box-item-left">
				<img src="${data[indexAddBtn].image.thumbnail}" alt="${data[indexAddBtn].name}" class="main__popup-box-item-left-img" />
				<div class="main__popup-box-item-left-texts">
				<h3 class="main__popup-box-item-left-texts-title">${data[indexAddBtn].name}</h3>
				<p class="main__popup-box-item-left-texts-quantity">1x</p>
				<p class="main__popup-box-item-left-texts-one">@ <span>$${data[indexAddBtn].price.toFixed(2)}</span></p>
				</div>
				</div>
				<p class="main__popup-box-all">$${data[indexAddBtn].price.toFixed(2)}</p>`;

				popupBox.insertAdjacentElement("afterbegin", orderDiv);

				updateItemsSummary();

				total.push(data[indexAddBtn].price);

				totalSum = total.reduce((acc, value) => acc + value, 0);

				totalPrice.textContent = `$${totalSum.toFixed(2)}`;
				orderTotal.textContent = `$${totalSum.toFixed(2)}`;

				addToCartBtn[indexAddBtn].style.display = "none";
				selectBtn[indexAddBtn].style.display = "flex";
				cart++;
				cartItems.textContent = cart;

				emptySummaryBox.style.display = "none";
				totalSummaryBox.style.display = "flex";
				infoSummaryBox.style.display = "flex";
				confirmBtn.style.display = "block";
			});
		});

		minusIcon.forEach(icon => {
			icon.addEventListener("click", e => {
				const minusIconIndex = Array.from(minusIcon).indexOf(e.target);
				let numFoodQuantity = parseFloat(foodQuantity[minusIconIndex].textContent);
				numFoodQuantity--;
				foodQuantity[minusIconIndex].textContent = numFoodQuantity;

				const item = newItemsSummaryBox.find(div => div.id === `${minusIconIndex}`);
				const orderItem = finalItems.find(div => div.id === `${minusIconIndex}`);

				const orderQuantity = orderItem.querySelector(".main__popup-box-item-left-texts-quantity");
				const orderAll = orderItem.querySelector(".main__popup-box-all");

				const quantity = item.querySelector(".main__summary-items-info-prices-quantity");
				const all = item.querySelector(".main__summary-items-info-prices-all");

				let fixed = numFoodQuantity * data[minusIconIndex].price;
				let newFixed = fixed.toFixed(2);
				quantity.innerText = `${numFoodQuantity}x`;
				orderQuantity.innerText = `${numFoodQuantity}x`;
				all.innerText = `$${newFixed}`;
				orderAll.innerText = `$${newFixed}`;
				let newNumber = data[minusIconIndex].price;
				let negativeNumber = -newNumber;

				total.push(negativeNumber);
				totalSum = total.reduce((acc, value) => acc + value, 0);
				totalPrice.textContent = `$${totalSum.toFixed(2)}`;
				orderTotal.textContent = `$${totalSum.toFixed(2)}`;

				if (numFoodQuantity < 1) {
					addToCartBtn[minusIconIndex].style.display = "flex";
					selectBtn[minusIconIndex].style.display = "none";
					numFoodQuantity = 0;
					foodQuantity[minusIconIndex].textContent = numFoodQuantity;
					cart--;
					cartItems.textContent = cart;
				}

				if (foodQuantity[minusIconIndex].textContent === "0") {
					item.remove();
					orderItem.remove();
					updateItemsSummary();
				}

				if (totalPrice.textContent === "$0.00") {
					emptySummaryBox.style.display = "flex";
					totalSummaryBox.style.display = "none";
					infoSummaryBox.style.display = "none";
					confirmBtn.style.display = "none";
				}
			});
		});

		plusIcon.forEach(icon => {
			icon.addEventListener("click", e => {
				const plusIconIndex = Array.from(plusIcon).indexOf(e.target);
				const item = newItemsSummaryBox.find(div => div.id === `${plusIconIndex}`);
				const orderItem = finalItems.find(div => div.id === `${plusIconIndex}`);

				const quantity = item.querySelector(".main__summary-items-info-prices-quantity");
				const all = item.querySelector(".main__summary-items-info-prices-all");
				const orderQuantity = orderItem.querySelector(".main__popup-box-item-left-texts-quantity");
				const orderAll = orderItem.querySelector(".main__popup-box-all");

				let numFoodQuantity = parseFloat(foodQuantity[plusIconIndex].textContent);
				numFoodQuantity++;
				let fixed = numFoodQuantity * data[plusIconIndex].price;
				let newFixed = fixed.toFixed(2);

				foodQuantity[plusIconIndex].textContent = numFoodQuantity;
				quantity.innerText = `${numFoodQuantity}x`;
				orderQuantity.innerText = `${numFoodQuantity}x`;

				all.innerText = `$${newFixed}`;
				orderAll.innerText = `$${newFixed}`;
				total.push(data[plusIconIndex].price);
				totalSum = total.reduce((acc, value) => acc + value, 0);
				totalPrice.textContent = `$${totalSum.toFixed(2)}`;
				orderTotal.textContent = `$${totalSum.toFixed(2)}`;
			});
		});
	})
	.catch(error => console.error("Error:", error));

const deleteItems = e => {
	const itemToDelete = e.target.parentElement;
	const itemId = itemToDelete.getAttribute("id");
	const numId = parseFloat(itemId);

	const price = itemToDelete.querySelector(".main__summary-items-info-prices-all");
	const priceNum = price.textContent.replace(/\$/g, "");
	const priceNumParse = parseFloat(priceNum);
	const minusNum = -priceNumParse;

	total.push(minusNum);
	totalSum = total.reduce((acc, value) => acc + value, 0);
	totalPrice.textContent = `$${totalSum.toFixed(2)}`;

	cart--;
	cartItems.textContent = cart;

	addToCartBtn[numId].style.display = "flex";
	selectBtn[numId].style.display = "none";
	itemToDelete.remove();

	if (cartItems.textContent === "0") {
		emptySummaryBox.style.display = "flex";
		totalSummaryBox.style.display = "none";
		confirmBtn.style.display = "none";
		infoSummaryBox.style.display = "none";
	}
};

const showOrder = e => {
	popup.style.display = "block";
	shadow.style.display = "block";
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
	document.body.style.overflow = "hidden";
};

const newOrder = () => {
	popup.style.display = "none";
	shadow.style.display = "none";
	document.body.style.overflow = "visible";

	addToCartBtn.forEach(btn => {
		btn.style.display = "flex";
	});

	selectBtn.forEach(btn => {
		btn.style.display = "none";
	});

	cart = 0;
	cartItems.textContent = cart;

	emptySummaryBox.style.display = "flex";
	totalSummaryBox.style.display = "none";
	infoSummaryBox.style.display = "none";
	confirmBtn.style.display = "none";

	newItemsSummaryBox.forEach(item => {
		item.remove();
	});
	deleteBtns.forEach(item => {
		item.remove();
	});
	finalItems.forEach(item => {
		item.remove();
	});

	total = [];
};

confirmBtn.addEventListener("click", showOrder);
newOrderBtn.addEventListener("click", newOrder);
