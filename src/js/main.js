const addToCartBtn = document.querySelectorAll(".main__box-container-btn");
const selectContainer = document.querySelectorAll(".main__box-container-select");
const foodImage = document.querySelectorAll(".main__box-container-picture-img");
const minusIcon = document.querySelectorAll(".minus");
const plusIcon = document.querySelectorAll(".plus");
const quanityNumber = document.querySelectorAll(".main__box-container-select-quanity");
let quanity;

const selectQuanity = e => {
	const index = Array.from(addToCartBtn).indexOf(e.target);
	selectContainer[index].style.display = "flex";
	addToCartBtn[index].style.display = "none";
	foodImage[index].style.border = "2.2px solid hsl(14, 86%, 42%)";
	quanity = 1;
	quanityNumber[index].textContent = quanity;
};

const decreaseQuanity = e => {
	const index = Array.from(minusIcon).indexOf(e.target);
	console.log(index);
	quanity--;
	quanityNumber[index].textContent = quanity;
	if (quanity === 0) {
		selectContainer[index].style.display = "none";
		addToCartBtn[index].style.display = "flex";
		foodImage[index].style.border = "2.2px solid transparent";
	}
};

const increaseQuanity = e => {
	const index = Array.from(plusIcon).indexOf(e.target);

	quanity++;
	quanityNumber[index].textContent = quanity;
};

addToCartBtn.forEach(btn => {
	btn.addEventListener("click", selectQuanity);
});

minusIcon.forEach(btn => {
	btn.addEventListener("click", decreaseQuanity);
});

plusIcon.forEach(btn => {
	btn.addEventListener("click", increaseQuanity);
});
