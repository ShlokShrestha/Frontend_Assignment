const nextBtn = document.querySelectorAll(".nextbtn");
const preBtn = document.querySelectorAll(".prebtn");
const formSteps = document.querySelectorAll(".form-step");
const progress = document.getElementById("progress");
const progressBars = document.querySelectorAll(".progress-step");

let formStepsNum = 0;
//Next button functionality
nextBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const currentStep = document.querySelector(".form-step-active");
    if (!validateStep(currentStep)) {
      return;
    } else {
      formStepsNum++;
      updateFormSteps();
      updateProgressBar();
    }
  })
);
//Pre button functionality
preBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    formStepsNum--;
    updateFormSteps();
    updateProgressBar();
  });
});

//Form update functionality
function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

//progressBar  functionality
function updateProgressBar() {
  progressBars.forEach((progressBar, index) => {
    if (index < formStepsNum + 1) {
      progressBar.classList.add("progress-step-active");
    } else {
      progressBar.classList.remove("progress-step-active");
    }
  });
  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressBars.length - 1)) * 100 + "%";
}

//Form validation / Input Tage
function validateStep(step) {
  const inputs = step.querySelectorAll("input, textarea");
  for (const input of inputs) {
    if (input.type === "checkbox" || input.type === "radio") {
      const isChecked = document.querySelector(
        `input[name="${input.name}"]:checked`
      );
      if (!isChecked) {
        alert(`Please select a value for ${input.name}.`);
        return false;
      }
    } else if (!input.checkValidity()) {
      alert(
        `Invalid ${input.labels[0].textContent}. Please correct and try again.`
      );
      return false;
    } else if (input.id === "password" && !isValidPassword(input.value)) {
      alert("Password must be strong: at least 8 characters with uppercase.");
      return false;
    } else if (input.id === "phoneno" && !isValidPhoneNumber(input.value)) {
      alert("Please enter a 10-digit phone number.");
      return false;
    }
  }
  return true;
}

//form-validation for password
function isValidPassword(password) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  return password.length >= minLength && hasUppercase;
}
//Form-validation for Phone Number
function isValidPhoneNumber(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

function handleSubmitForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const phoneno = document.getElementById("phoneno").value;
  const address = document.getElementById("address").value;
  const aboutme = document.getElementById("textarea").value;
  const gender = document.getElementsByName("gender");
  let selectedGender = "";

  for (const option of gender) {
    if (option.checked) {
      selectedGender = option.value;
      break;
    }
  }

  const hobby = document.getElementsByName("hobbie");
  const selectedHobbie = [];

  for (const checkbox of hobby) {
    if (checkbox.checked) {
      selectedHobbie.push(checkbox.value);
    }
  }
  const formData = {
    name: name,
    email: email,
    password: password,
    phoneno: phoneno,
    address: address,
    gender: selectedGender,
    hobbie: selectedHobbie,
    aboutme: aboutme,
  };

  localStorage.setItem("FormData", JSON.stringify(formData));
  alert("Form data submitted successfully!");
}
