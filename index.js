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
          body: JSON.stringify({ name, message }),
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.message);
          document.getElementById("messageForm").reset();
          fetchMessages();
        } else {
          console.error("POST Error:", result);
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
  const messagesList = document.getElementById("messagesList");
  messagesList.innerHTML = "<li>Loading messages...</li>";

  try {
    const response = await fetch("/api/messages");
    const messages = await response.json();

    console.log("Fetched messages:", messages);

    messagesList.innerHTML = "";

    if (Array.isArray(messages)) {
      messages.forEach((msg) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${msg.name}</strong>: ${msg.message}<br><small>${
          msg.timestamp
            ? new Date(msg.timestamp).toLocaleString()
            : "No timestamp available"
        }</small>`;
        messagesList.appendChild(li);
      });
    } else {
      console.error("Expected an array, got:", messages);
      messagesList.innerHTML =
        "<li>Unexpected data format. Please try again later.</li>";
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    messagesList.innerHTML =
      "<li>Error loading messages. Please try again later.</li>";
  }
}

fetchMessages();
