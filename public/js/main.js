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
  // let frame = document.querySelector("#frame").value;

  // PERF: Change prompt for more refined results
  prompt += `Painting of ${subject} in top artist quality ${medium} style with a beautiful meuseum style frame around the painting`;

  tokens -= 1;
  console.log("tokens:" + tokens);
  token_count.innerHTML = tokens;

  document.querySelector("#prompt").value = prompt;

  /* if (prompt === '') {
		alert('Please add some text');
		return;
	} */

  if (tokens == 19) {
    // TODO: display a popup for name and email
  }

  if (subject === "none" && medium === "none") {
    alert("Please select a subject and medium to generate an image");
    return;
  }

  generateImageRequest(prompt, size);
}

function hideForm() {
  document.getElementById("image-form").style.display = "none";
  var modal = document.getElementById("modal");
  var closeModalButton = document.getElementById("close-modal-button");
  var closeBtn = document.getElementById("close-btn");
  // open the modal when the button is clicked
  modal.style.display = "block";

  // close the modal when the close button is clicked
  closeModalButton.addEventListener("click", function () {
    modal.style.display = "none";
  });
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    const response = await fetch(
      "https://ai-image-gen-git-main-rohankewal.vercel.app/openai/generateimage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          size,
        }),
      }
    );

    if (!response.ok) {
      removeSpinner();
      throw new Error("That image could not be generated");
    }

    const data = await response.json();
    // console.log(data);

    const imageUrl = data.data;

    document.querySelector("#image").src = imageUrl;

    var showcase = document.getElementById("showcase");
    showcase.style.backgroundImage = "url(" + imageUrl + ")";

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

function resetForm() {
  document.getElementById("image-form").reset();
  document.getElementById("image-form").style.display = "flex";
  document.getElementById("image-form").style.display = "flex";
  document.getElementById("image-form").style.backgroundColor =
    "rgba(255, 255, 255, 0.5)";
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);
