const socket = new WebSocket("ws://localhost:8080");

socket.onmessage = function (event) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = event.data;
};

function sendEmail() {
  const emailInput = document.getElementById("email");
  const email = emailInput.value;
  socket.send(email);
}
