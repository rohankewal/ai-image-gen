function onSubmit(e) {
	e.preventDefault();

	document.querySelector('.msg').textContent = '';
	document.querySelector('#image').src = '';

	const tokenDisplay = document.querySelector('#token-display');
	const generateBtn = document.querySelector('#generate-btn');

	let tokens = 20;

	let prompt = document.querySelector('#prompt').value;
	let size = document.querySelector('#size').value;

	let medium = document.querySelector('#medium').value;
	let subject = document.querySelector('#subject').value;
	let frame = document.querySelector('#frame').value;

	prompt += `A ${subject} in ${medium} with a ${frame}`;

	document.querySelector('#prompt').value = prompt;

	/* if (prompt === '') {
		alert('Please add some text');
		return;
	} */

	if (subject === 'none' && medium === 'none') {
		alert('Please select a subject and medium to generate an image');
		return;
	}

	generateBtn.addEventListener('click', () => {
		tokens--;

		tokenDisplay.innerHTML = `Tokens: ${tokens}`;

		if (tokens > 0) {
			generateImageRequest(prompt, size);
		} else {
			generateBtn.disabled = true;
		}
	});

	// generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
	try {
		showSpinner();

		const response = await fetch('/openai/generateimage', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prompt,
				size,
			}),
		});

		if (!response.ok) {
			removeSpinner();
			throw new Error('That image could not be generated');
		}

		const data = await response.json();
		// console.log(data);

		const imageUrl = data.data;

		document.querySelector('#image').src = imageUrl;

		removeSpinner();
	} catch (error) {
		document.querySelector('.msg').textContent = error;
	}
}

function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
	document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
