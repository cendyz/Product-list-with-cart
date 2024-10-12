const addBtn = document.querySelectorAll(".main__box-btn");
const quanityBtn = document.querySelectorAll(".main__box-select");
const quanityNumber = document.querySelectorAll(".quanity-number");
const plusIcon = document.querySelectorAll(".plus-icon");
const minusIcon = document.querySelectorAll(".minus-icon");
const emptyCart = document.querySelector(".empty-cart");
const cartQuanity = document.querySelector(".main__cart-title");
const cartBox = document.querySelector(".cart-box");
const cartNumber = document.querySelector(".main__cart-title span");
const deleteItem = document.querySelector(".main__cart-box-btn");
const productTitle = document.querySelectorAll(".main__box-name");
// const food = ["waffle", "creme", "macaron", "tiramisu", "baklava", "pie", "cake", "brownie", "panna"];
let food = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let foodId = 0
let num;

const handleCart = e => {
	const index = Array.from(addBtn).indexOf(e.target);
	if (e.target.classList.contains("main__box-btn") && index !== -1) {
		e.target.style.display = "none";
		num = 1;
		quanityNumber[index].textContent = num;
		quanityBtn[index].style.display = "flex";
		food[index] = num;
	}
};

const decreaseQuanity = e => {
	const index = Array.from(minusIcon).indexOf(e.target);
	num = parseFloat(quanityNumber[index].textContent);
	if (num !== 0) {
		num--;
		quanityNumber[index].textContent = num;
		food[index] = num;
		checkCart()
	}

	if (num === 0) {
		addBtn[index].style.display = "flex";
		quanityBtn[index].style.display = "none";
	}
};

const increaseQuanity = e => {
	const index = Array.from(plusIcon).indexOf(e.target);
	num = parseFloat(quanityNumber[index].textContent);
	if (num >= 1) {
		num++;
		quanityNumber[index].textContent = num;
		food[index] = num;

		const div = document.createElement('div')
		div.classList.add("main__cart-box");
		div.innerHTML = `<h3 class="main__cart-box-product">${productTitle[index].innerText}</h3>
						<p class="main__cart-box-quanity">1x</p>
						<p class="main__cart-box-price">@$5.50</p>
						<p class="main__cart-box-bundled">$5.50</p>
						<div class="main__cart-box-btn">
							<button><img src="../src/img/icon-remove-item.svg" alt="X icon" /></button>
						</div>`;


		cartBox.append(div)

		checkCart();
	}
};

const checkCart = () => {
	const numCartQuanity = Number(cartQuanity.textContent);
	const total = food.reduce((acc, value) => acc + value, 0)
	cartNumber.textContent = total

	if (total >= 1) {
		emptyCart.style.display = "none";
		cartBox.style.display = "block";
	} else {
		emptyCart.style.display = "block";
		cartBox.style.display = "none";
	}
};

const deleteOneFood = () => {
	const deleteFood = id => {
		const foodToDelete = document.getElementById(id);
		cartBox.removeChild(foodToDelete);
	};
}

addBtn.forEach(btn => {
	btn.addEventListener("click", handleCart);
	btn.addEventListener("click", checkCart);
});

plusIcon.forEach(plus => {
	plus.addEventListener("click", increaseQuanity);
});

minusIcon.forEach(minus => {
	minus.addEventListener("click", decreaseQuanity);
});
