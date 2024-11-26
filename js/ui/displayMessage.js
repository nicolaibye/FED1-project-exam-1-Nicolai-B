export function displayMessage(container, messageType, message) {
  const parent = document.querySelector(container);
  parent.innerHTML = `<p class="message ${messageType}">${message}</p>`;
}
