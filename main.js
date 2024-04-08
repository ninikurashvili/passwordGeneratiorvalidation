const passwordInput = document.querySelector("#passwordInput");
const eyeBtn = document.querySelector("#eyeBtn");
const cleanBtn = document.querySelector("#cleanBtn");
const generateBtn = document.querySelector("#generateBtn");
const validators = document.querySelectorAll("span.validator");

const eyeIcons = {
  open: '<i class="bi bi-eye"></i>',
  closed: '<i class="bi bi-eye-slash"></i>',
};

const validatorIcons = {
  correct: '<i class="bi bi-check-lg"></i>',
  incorrect: '<i class="bi bi-x-lg"></i>',
  default: '<i class="bi bi-circle-fill"></i>',
};

cleanBtn.addEventListener("click", () => {
  passwordInput.value = "";
  validators.forEach((validator) => {
    validator.innerHTML = validatorIcons.default;
  });
});

eyeBtn.addEventListener("click", function () {
  const isPasswordType = passwordInput.type === "password";
  passwordInput.type = isPasswordType ? "text" : "password";
  this.innerHTML = isPasswordType ? eyeIcons.closed : eyeIcons.open;
});

generateBtn.addEventListener("click", () => {
  const validPassword = generatePassword();
  console.log(validPassword);
  passwordInput.value = validPassword;
  validations();
});

passwordInput.addEventListener("keyup", validations);

function getValidatorIcon(isCorrect) {
  return isCorrect ? validatorIcons.correct : validatorIcons.incorrect;
}

/*
  დავალება
  დაასრულეთ არსებული სალექციო კოდი, სადაც generateBtn-ზე დაკლიკების
  შემთხვევაში მოხდება პაროლის დაგენერირება, რომელიც გადის ყოველ check.
*/
function generatePassword() {
  const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
  const higherAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const number = "0123456789";
  const symbols = "!@#$%^&*";
  let randPassword = "";
  const allChar =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  randPassword += randChars(lowerAlphabet);
  randPassword += randChars(higherAlphabet);
  randPassword += randChars(number);
  randPassword += randChars(symbols);

  const passwordLen = Math.floor(Math.random() * (22 - 8 + 1)) + (8 - 4);
  for (let i = 0; i < passwordLen; i++) {
    const randnum = Math.floor(Math.random() * allChar.length);
    randPassword = randPassword + allChar[randnum];
  }

  randPassword = getShuffledChars(randPassword);
  return randPassword;
}

function randChars(stringi) {
  const randnum = Math.floor(Math.random() * stringi.length);
  return stringi[randnum];
}

function getShuffledChars(password) {
  const passwordArray = password.split("");
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }
  return passwordArray.join("");
}

function validations() {
  const password = passwordInput.value.trim();
  passwordInput.value = password;

  if (password === "") {
    validators.forEach((validator) => {
      validator.innerHTML = validatorIcons.default;
    });
    return;
  }
  validators[0].innerHTML = getValidatorIcon(password.length >= 8);
  validators[1].innerHTML = getValidatorIcon(password.length <= 22);
  validators[2].innerHTML = getValidatorIcon(/\w/.test(password));
  validators[3].innerHTML = getValidatorIcon(/[a-z]/.test(password));
  validators[4].innerHTML = getValidatorIcon(/[A-Z]/.test(password));
  validators[5].innerHTML = getValidatorIcon(/\d/.test(password));
  validators[6].innerHTML = getValidatorIcon(
    /!|@|#|\$|%|\^|&|\*/.test(password)
  );
}
