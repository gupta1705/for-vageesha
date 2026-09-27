const letterDialog = document.getElementById('letter-dialog');
const openLetterButtons = [
  document.getElementById('open-letter'),
  document.getElementById('open-letter-again'),
];

openLetterButtons.forEach((button) => {
  button.addEventListener('click', () => letterDialog.showModal());
});

document.getElementById('close-letter').addEventListener('click', () => {
  letterDialog.close();
});

letterDialog.addEventListener('click', (event) => {
  if (event.target === letterDialog) letterDialog.close();
});

const comfortMessage = document.getElementById('comfort-message');
const comfortButtons = [...document.querySelectorAll('.comfort-item')];

comfortButtons.forEach((button) => {
  button.addEventListener('click', () => {
    comfortButtons.forEach((item) => item.setAttribute('aria-pressed', 'false'));
    button.setAttribute('aria-pressed', 'true');
    comfortMessage.textContent = button.dataset.message;
  });
});
