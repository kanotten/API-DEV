document
  .getElementById("guestbookForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const message = document.getElementById("message").value;

    if (username && message) {
      try {
        const response = await fetch("/api/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: `${username}: ${message}` }),
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.message);
          document.getElementById("guestbookForm").reset(); // Clear the form
          fetchMessages();
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    } else {
      alert("Both username and message are required.");
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
      li.textContent = msg.name;
      messagesList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}
