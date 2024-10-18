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
let cart = 0;

fetch("./data.json")
	.then(response => response.json())
	.then(data => {
		console.log(data[0]);

		addToCartBtn.forEach(btn => {
			btn.addEventListener("click", e => {
				const indexAddBtn = Array.from(addToCartBtn).indexOf(e.target);
				const div = document.createElement('div')

				addToCartBtn[indexAddBtn].style.display = "none";
				selectBtn[indexAddBtn].style.display = "flex";
				cart++;
				cartItems.textContent = cart;

				emptySummaryBox.style.display = "none";
				itemsSummaryBox.style.display = "inline-flex";
				totalSummaryBox.style.display = 'flex'
				infoSummaryBox.style.display = 'flex'
			});
		});

		minusIcon.forEach(icon => {
			icon.addEventListener("click", e => {
				const minusIconIndex = Array.from(minusIcon).indexOf(e.target);
				let numFoodQuantity = parseFloat(foodQuantity[minusIconIndex].textContent);
				numFoodQuantity--;
				foodQuantity[minusIconIndex].textContent = numFoodQuantity
				
				if(numFoodQuantity < 1) {
					addToCartBtn[minusIconIndex].style.display = "flex";
					selectBtn[minusIconIndex].style.display = "none";
					numFoodQuantity = 1
					foodQuantity[minusIconIndex].textContent = numFoodQuantity;
					cart--
					cartItems.textContent = cart;

					if(cart === 0) {
						emptySummaryBox.style.display = "flex";
						itemsSummaryBox.style.display = "none";
						totalSummaryBox.style.display = "none";
						infoSummaryBox.style.display = "none";
					}

				}

			});
		});

		plusIcon.forEach(icon => {
			icon.addEventListener('click', (e) => {
				const plusIconIndex = Array.from(plusIcon).indexOf(e.target);
					let numFoodQuantity = parseFloat(foodQuantity[plusIconIndex].textContent);
					numFoodQuantity++;
					foodQuantity[plusIconIndex].textContent = numFoodQuantity;

					
			})
		})
	})
	.catch(error => console.error("Error:", error));
