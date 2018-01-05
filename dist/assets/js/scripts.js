document.addEventListener('DOMContentLoaded', _ => {
	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {
		// Add a click event on each of them
		$navbarBurgers.forEach( $el => {
			$el.addEventListener('click', _ => {
				// Get the target from the "data-target" attribute
				const target = $el.dataset.target;
				const $target = document.getElementById(target);
				// Toggle the class on both the "navbar-burger" and the "navbar-menu"
				$el.classList.toggle('is-active');
				$target.classList.toggle('is-active');
			});
		});
	}
});


//modal toggle
const button = [document.getElementById('modal-on'), document.getElementById('modal-off')];
button.forEach( btn => {
	btn.addEventListener('click', _ => {
		const modal = document.getElementById('modal');
		modal.classList.toggle('is-active');
	})
});

