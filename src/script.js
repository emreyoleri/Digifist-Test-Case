// Get relevant elements
const arrowRightButton = document.getElementById('arrow-right');
const productCarousel = document.getElementById('product-carousel');
const colorOptions = document.querySelectorAll('#product__color-option');

// Add event listeners to color options
colorOptions.forEach((option) => {
	option.addEventListener('click', ({ target }) => {
		const relatedOptions = target.parentElement.children;
		for (let option of relatedOptions) {
			if (option.classList.contains('product__selected')) {
				option.classList.remove('product__selected');
			}
		}
		target.classList.add('product__selected');
	});
});

// Add click event listener to the right arrow button
arrowRightButton.addEventListener('click', () => {
	// Scroll to the next element
	const items = document.querySelectorAll('#product-carousel li');
	if (items.length > 1) {
		const diff =
			items[1].getBoundingClientRect().left -
			items[0].getBoundingClientRect().left;
		// We need to remove smooth scrolling for drag-scroll to work seamlessly
		productCarousel.style.scrollBehavior = 'smooth';
		productCarousel.scrollLeft += diff;
		productCarousel.style.scrollBehavior = 'auto';
	}
});

let startX = 0;
let scrollLeft; // Initial scroll position
let isMouseDown = false;
// Add event listeners for drag-to-scroll functionality
productCarousel.addEventListener('mousedown', (event) => {
	startX = event.pageX;
	isMouseDown = true;
	scrollLeft = productCarousel.scrollLeft;
});
productCarousel.addEventListener('mouseup', () => {
	isMouseDown = false;
});
productCarousel.addEventListener('mouseleave', () => {
	isMouseDown = false;
	event.preventDefault();
});
productCarousel.addEventListener('mousemove', (event) => {
	if (!isMouseDown) {
		return;
	}
	event.preventDefault();
	const currentX = event.pageX;
	const diff = startX - currentX;
	productCarousel.scrollLeft = scrollLeft + diff;
});