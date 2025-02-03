document
  .getElementById("messageForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    if (name && message) {
      try {
        const response = await fetch("/api/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: `${name}: ${message}` }),
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.message);
          document.getElementById("messageForm").reset(); // Clear the form
          fetchMessages(); // Refresh messages list
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    } else {
      alert("Both name and message are required.");
    }
  });

async function fetchMessages() {
  try {
    const response = await fetch("/api/messages");
    const messages = await response.json();

    const messagesList = document.getElementById("messagesList");
    messagesList.innerHTML = "";

    messages.forEach((msg) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${msg.name}</strong><br><small>${msg.timestamp}</small>`;
      messagesList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

// Fetch messages on page load
fetchMessages();
