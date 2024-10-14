const addToCartBtn = document.querySelectorAll(".main__box-container-btn");
const selectContainer = document.querySelectorAll(".main__box-container-select");
const foodImage = document.querySelectorAll(".main__box-container-picture-img");
const minusIcon = document.querySelectorAll(".minus");
const plusIcon = document.querySelectorAll(".plus");
const quanityNumber = document.querySelectorAll('[data-setting="quanity"]');
const cartBox = document.querySelector(".main__summary");
const cartQuanity = document.querySelector(".main__summary-title span");
const summaryImg = document.querySelector(".main__summary-img");
const summaryText = document.querySelector(".main__summary-text");
const netPrice = document.querySelectorAll(".main__box-text-price");
const foodName = document.querySelectorAll(".main__box-text-name");
const foodOnePrice = document.querySelectorAll(".main__summary-item-amount-one");



const food = [0, 0];

const selectQuanity = e => {
	const index = Array.from(addToCartBtn).indexOf(e.target);
	const div = document.createElement("div");
	div.classList.add("main__summary-item");
	selectContainer[index].style.display = "flex";
	addToCartBtn[index].style.display = "none";
	foodImage[index].style.border = "2.2px solid hsl(14, 86%, 42%)";
	food[index] = 1;
	quanityNumber[index].textContent = food[index];

	div.innerHTML = `<h3 class="main__summary-item-title">${foodName[index].textContent}</h3>
					<div class="main__summary-item-amount">
						<p class="main__summary-item-amount-quantity">${food[index]}x</p>
						<p class="main__summary-item-amount-one">@${netPrice[index].textContent}</p>
						<p class="main__summary-item-amount-bulk">$1.11</p>
					</div>
					<button class="main__summary-item-btn">
						<img src="../src/img/icon-remove-item.svg" alt="X icon" class="main__summary-item-btn-img" />
					</button>`;

	cartBox.append(div);
	checkCartQuanity();
	refreshItems()
};

const decreaseQuanity = e => {
	const index = Array.from(minusIcon).indexOf(e.target);
	food[index]--;
	quanityNumber[index].textContent = food[index];
	checkCartQuanity();
	if (food[index] === 0) {
		selectContainer[index].style.display = "none";
		addToCartBtn[index].style.display = "flex";
		foodImage[index].style.border = "2.2px solid transparent";
	}
};

const increaseQuanity = (e) => {
	const index = Array.from(plusIcon).indexOf(e.target);
	food[index]++;
	quanityNumber[index].textContent = food[index];
	checkCartQuanity();

};

const checkCartQuanity = () => {
	const sum = food.reduce((acc, value) => acc + value, 0);
	cartQuanity.textContent = sum;
};

const handleOrder = () => {
	if (cartQuanity >= 1) {
		summaryImg.style.display = "none";
		summaryText.style.display = "none";
	}
};

const checkCartName = e => {
	const index = Array.from(food).indexOf(e.target);
};

const refreshItems = () => {
	const foodOneQuantity = document.querySelectorAll(".main__summary-item-amount-quantity");
	const foodOnePrice = document.querySelectorAll(".main__summary-item-amount-one");

	
}

addToCartBtn.forEach(btn => {
	btn.addEventListener("click", selectQuanity);
});

minusIcon.forEach(btn => {
	btn.addEventListener("click", decreaseQuanity);
});

plusIcon.forEach(btn => {
	btn.addEventListener("click", increaseQuanity);
});
