function onSubmit(e) {
  e.preventDefault();

  let tokens = 20;
  console.log("tokens:" + tokens);

  let token_count = document.getElementById("tokens");
  token_count.innerHTML = tokens;

  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";

  let prompt = document.querySelector("#prompt").value;
  let size = document.querySelector("#size").value;

  let medium = document.querySelector("#medium").value;
  let subject = document.querySelector("#subject").value;
  let frame = document.querySelector("#frame").value;

  // TODO: Change prompt for more refined results
  prompt += `${subject} in ${medium} with ${frame}`;

  if (frame == "no-frame") {
    prompt += `${subject} in ${medium} without a frame`;
  }
  if (frame == "wood-frame") {
    prompt += `${subject} in ${medium} with a wooden museum frame`;
  }
  if (frame == "metal-frame") {
    prompt += `${subject} in ${medium} with a metal museum frame`;
  }
  if (frame == "modern-frame") {
    prompt += `${subject} in ${medium} with a modern museum frame`;
  }

  tokens -= 1;
  console.log("tokens:" + tokens);
  token_count.innerHTML = tokens;

  document.querySelector("#prompt").value = prompt;

  /* if (prompt === '') {
		alert('Please add some text');
		return;
	} */

  if (subject === "none" && medium === "none") {
    alert("Please select a subject and medium to generate an image");
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error("That image could not be generated");
    }

    const data = await response.json();
    // console.log(data);

    const imageUrl = data.data;

    document.querySelector("#image").src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);
