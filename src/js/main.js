const addToCartBtn = document.querySelectorAll(".main__box-container-btn");
const selectBtn = document.querySelectorAll(".main__box-container-select");
const cartItems = document.querySelector(".main__summary-title span");
const plusIcon = document.querySelectorAll(".plus");
const minusIcon = document.querySelectorAll(".minus");
const foodQuantity = document.querySelectorAll(".main__box-container-select-quanity");
const emptySummaryBox = document.querySelector(".main__summary-box");
const itemsSummaryBox = document.querySelector(".main__summary-items");
const totalSummaryBox = document.querySelector(".main__summary-total");
const infoSummaryBox = document.querySelector(".main__summary-info");
const mainSummary = document.querySelector(".main__summary");
const totalPrice = document.querySelector(".main__summary-total-price");
let cart = 0;
let id;
let newItemsSummaryBox = [];
let total = [];
let totalSum;

const updateItemsSummary = () => {
	newItemsSummaryBox = Array.from(document.querySelectorAll(".main__summary-items"));
};

fetch("./data.json")
	.then(response => response.json())
	.then(data => {
		addToCartBtn.forEach(btn => {
			btn.addEventListener("click", e => {
				const indexAddBtn = Array.from(addToCartBtn).indexOf(e.target);
				id = indexAddBtn;
				foodQuantity[indexAddBtn].textContent = 1;

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
					<div class="main__summary-items-info-img">
						<img src="./src/img/icon-remove-item.svg" alt="X icon" class="main__summary-items-info-img-x">
					</div>`;

				emptySummaryBox.insertAdjacentElement("afterend", div);

				updateItemsSummary();

				total.push(data[indexAddBtn].price);

				total.forEach(value => {
					totalSum += value;
				});
				totalSum = total.reduce((acc, value) => acc + value, 0);

				totalPrice.textContent = `$${totalSum.toFixed(2)}`

				addToCartBtn[indexAddBtn].style.display = "none";
				selectBtn[indexAddBtn].style.display = "flex";
				cart++;
				cartItems.textContent = cart;

				emptySummaryBox.style.display = "none";
				totalSummaryBox.style.display = "flex";
				infoSummaryBox.style.display = "flex";
			});
		});

		minusIcon.forEach(icon => {
			icon.addEventListener("click", e => {
				const minusIconIndex = Array.from(minusIcon).indexOf(e.target);
				let numFoodQuantity = parseFloat(foodQuantity[minusIconIndex].textContent);
				numFoodQuantity--;
				foodQuantity[minusIconIndex].textContent = numFoodQuantity;

				const item = newItemsSummaryBox.find(div => div.id === `${minusIconIndex}`);

				const quantity = item.querySelector(".main__summary-items-info-prices-quantity");
				const all = item.querySelector(".main__summary-items-info-prices-all");

				let fixed = numFoodQuantity * data[minusIconIndex].price;
				quantity.innerText = `${numFoodQuantity}x`;
				all.innerText = `$${fixed.toFixed(2)}`;

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
					updateItemsSummary();
				}
			});
		});

		plusIcon.forEach(icon => {
			icon.addEventListener("click", e => {
				const plusIconIndex = Array.from(plusIcon).indexOf(e.target);
				const item = newItemsSummaryBox.find(div => div.id === `${plusIconIndex}`);

				const quantity = item.querySelector(".main__summary-items-info-prices-quantity");
				const all = item.querySelector(".main__summary-items-info-prices-all");

				let numFoodQuantity = parseFloat(foodQuantity[plusIconIndex].textContent);
				numFoodQuantity++;
				let fixed = numFoodQuantity * data[plusIconIndex].price;
				foodQuantity[plusIconIndex].textContent = numFoodQuantity;
				quantity.innerText = `${numFoodQuantity}x`;
				all.innerText = `$${fixed.toFixed(2)}`;
			});
		});
	})
	.catch(error => console.error("Error:", error));
