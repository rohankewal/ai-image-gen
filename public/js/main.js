function onSubmit(e) {
	e.preventDefault();

	document.querySelector('.msg').textContent = '';
	document.querySelector('#image').src = '';

	let prompt = document.querySelector('#prompt').value;
	let size = document.querySelector('#size').value;

	let subject = document.querySelector('input[name=subject]:checked').value;
	let medium = document.querySelector('input[name=medium]:checked').value;

	// make a prompt text based on the user's input of the subject and medium(a painting of a waterfall in watercolor) and add it to the prompt field in the form
	prompt += `A ${subject} in ${medium}`;

	// add the prompt text to the prompt field in the form so the user can see it
	document.querySelector('#prompt').value = prompt;

	/* if (prompt === '') {
		alert('Please add some text');
		return;
	} */

	// if both the subject and medium are not selected, then the user will be alerted to select one
	if (subject === 'none' && medium === 'none') {
		alert('Please select a subject and medium to generate an image');
		return;
	}

	generateImageRequest(prompt, size);
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
