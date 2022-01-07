import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const formData = document.querySelector('.feedback-form');

formData.addEventListener('submit', onSubmit);
formData.addEventListener('input', throttle(onInput, 500));

function onSubmit(e) {
  e.preventDefault();
  const newEmail = e.currentTarget.elements.email.value.trim();
  const newMessage = e.currentTarget.elements.message.value.trim();
  const newFormData = {
    email: newEmail,
    message: newMessage,
  };

  if (!newEmail || !newMessage) return alert('Fill in all fields of the form');

  console.log(newFormData);
  formData.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onInput(e) {
  const newEmail = formData.elements.email.value.trim();
  const newMessage = formData.elements.message.value.trim();
  const newFormData = {
    email: newEmail,
    message: newMessage,
  };
  newFormData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newFormData));
}

function populateMessageOutput() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    formData.email.value = JSON.parse(savedMessage).email;
    formData.message.value = JSON.parse(savedMessage).message;
  }
}
populateMessageOutput();
