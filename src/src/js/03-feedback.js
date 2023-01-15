import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

onReload();

form.addEventListener('input', throttle(onFormInput, 500));

let data = {};
function onFormInput() {
    data.email = input.value;
    data.message = textarea.value;

    localStorage.setItem("feedback-form-state", JSON.stringify(data));

}

function onReload() {
    const savedData = JSON.parse(localStorage.getItem("feedback-form-state"));
    if (savedData) {
        input.value = savedData.email;
        textarea.value = savedData.message;
    } 
}



form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault;
    checkFormCompleteness();
    // event.currentTarget.reset();
    localStorage.removeItem("feedback-form-state");
    console.log(data);
    data = {};

}

function checkFormCompleteness() {
    if (!input.value || !textarea.value) {
        alert ("Fill in all the fields, please!");
        event.preventDefault();
    }
}