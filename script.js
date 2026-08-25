function openFilePicker() {
  const fileInput = document.getElementById("fileInput");

  if (fileInput) {
    fileInput.value = "";
    fileInput.click();
  }
}

function analyzeImage(event) {
}