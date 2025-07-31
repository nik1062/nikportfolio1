(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();
function toggleChatbot() {
    const chatbot = document.getElementById("chatbot");
    chatbot.style.display = chatbot.style.display === "none" ? "block" : "none";
  }

  function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (message) {
      const chatBox = document.getElementById("chat-messages");
      chatBox.innerHTML += `<div style='margin-bottom: 10px;'><strong>You:</strong> ${message}</div>`;
      input.value = "";

      // Simulated Bot Response (you can replace with OpenAI API later)
      setTimeout(() => {
        let reply = "Thanks for your message! I'll get back to you soon.";
        if (message.toLowerCase().includes("project")) {
          reply = "You can view my projects in the Portfolio section above!";
        } else if (message.toLowerCase().includes("contact")) {
          reply = "You can contact me via the Contact section or this chat!";
        }
        chatBox.innerHTML += `<div style='margin-bottom: 10px;'><strong>Bot:</strong> ${reply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 500);
    }
  }