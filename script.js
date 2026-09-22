const beforeTextInput = document.querySelector("#before-text");
const beforeNewlineCheckbox = document.querySelector("#before-newline");
const afterTextInput = document.querySelector("#after-text");
const afterNewlineCheckbox = document.querySelector("#after-newline");

const replaceButton = document.querySelector("#replace-button");
const inputTextArea = document.querySelector("#input-text");
const resultTextArea = document.querySelector("#result-text");

const STORAGE_KEYS = {
  beforeText: "before_text",
  beforeNewline: "before_newline",
  afterText: "after_text",
  afterNewline: "after_newline",
  inputText: "input_text",
  resultText: "result_text"
};

function saveData() {
  const dataToSave = {
    [STORAGE_KEYS.beforeText]: beforeTextInput.value,
    [STORAGE_KEYS.beforeNewline]: beforeNewlineCheckbox.checked,
    [STORAGE_KEYS.afterText]: afterTextInput.value,
    [STORAGE_KEYS.afterNewline]: afterNewlineCheckbox.checked,
    [STORAGE_KEYS.inputText]: inputTextArea.value,
    [STORAGE_KEYS.resultText]: resultTextArea.value
  };

  chrome.storage.local.set(dataToSave);
}

function loadSavedData() {
  chrome.storage.local.get(Object.values(STORAGE_KEYS), (savedData) => {
    if (savedData[STORAGE_KEYS.beforeText] !== undefined) {
      beforeTextInput.value = savedData[STORAGE_KEYS.beforeText];
    }

    if (savedData[STORAGE_KEYS.beforeNewline] !== undefined) {
      beforeNewlineCheckbox.checked = savedData[STORAGE_KEYS.beforeNewline];
    }

    if (savedData[STORAGE_KEYS.afterText] !== undefined) {
      afterTextInput.value = savedData[STORAGE_KEYS.afterText];
    }

    if (savedData[STORAGE_KEYS.afterNewline] !== undefined) {
      afterNewlineCheckbox.checked = savedData[STORAGE_KEYS.afterNewline];
    }

    if (savedData[STORAGE_KEYS.inputText] !== undefined) {
      inputTextArea.value = savedData[STORAGE_KEYS.inputText];
    }

    if (savedData[STORAGE_KEYS.resultText] !== undefined) {
      resultTextArea.value = savedData[STORAGE_KEYS.resultText];
    }
  });
}

function getReplacementText(textInput, newlineCheckbox) {
  return newlineCheckbox.checked ? "\n" : textInput.value;
}

function replaceText() {
  const beforeText = getReplacementText(
    beforeTextInput,
    beforeNewlineCheckbox
  );

  const afterText = getReplacementText(
    afterTextInput,
    afterNewlineCheckbox
  );

  if (beforeText === "") {
    resultTextArea.value = inputTextArea.value;
  } else {
    resultTextArea.value = inputTextArea.value.replaceAll(
      beforeText,
      afterText
    );
  }

  saveData();
}

window.addEventListener("DOMContentLoaded", loadSavedData);

beforeTextInput.addEventListener("input", saveData);
beforeNewlineCheckbox.addEventListener("change", saveData);
afterTextInput.addEventListener("input", saveData);
afterNewlineCheckbox.addEventListener("change", saveData);
inputTextArea.addEventListener("input", saveData);

replaceButton.addEventListener("click", replaceText);
