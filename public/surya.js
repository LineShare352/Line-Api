function goToHome() {
  window.location.href = 'index.html';
}

function checkInput() {
  const input = document.getElementById('userInput').value;
  const button = document.querySelector('.chat-input button');
  button.disabled = input.trim() === '';
}

// Function to simulate typing effect
function typeMessage(container, message, callback) {
  let i = 0;
  function type() {
    if (i < message.length) {
      container.innerHTML += message.charAt(i);
      i++;
      setTimeout(type, 50); // Adjust typing speed here (in milliseconds)
    } else if (callback) {
      callback(); // Call the callback after typing is done
    }
  }
  type();
}

let isDarkMode = false;

// Toggle between dark and light mode
function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  const modeIcon = document.querySelector('.mode-toggle');
  modeIcon.classList.toggle('fa-sun');
  modeIcon.classList.toggle('fa-moon');
}

// Toggle Emoji Picker visibility
function toggleEmojiPicker() {
  const emojiPicker = document.getElementById('emojiPicker');
  emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'flex' : 'none';
}

// Add emoji to input field
function addEmoji(emoji) {
  const input = document.getElementById('userInput');
  input.value += emoji;
  toggleEmojiPicker();
}

// Handle sending images
function sendImage(event) {
  const file = event.target.files[0];
  if (file) {
    const messagesContainer = document.getElementById('chatboxMessages');
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const imgMessage = document.createElement('div');
    imgMessage.classList.add('message', 'user-message');

    const imgElement = document.createElement('img');
    imgElement.src = URL.createObjectURL(file);
    imgElement.style.maxWidth = '100%';
    imgElement.style.borderRadius = '12px';

    imgMessage.appendChild(imgElement);
    imgMessage.innerHTML += `<div class="message-time">${currentTime}</div>`;
    messagesContainer.appendChild(imgMessage);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

// Function to handle sending messages
async function sendMessage() {
  const input = document.getElementById('userInput').value;
  if (input.trim() === '') return;

  const messagesContainer = document.getElementById('chatboxMessages');
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Add user's message
  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user-message');
  userMessage.innerHTML = `${input}<div class="message-time">${currentTime}</div>`;
  messagesContainer.appendChild(userMessage);

  document.getElementById('userInput').value = '';

  // Display typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('typing-indicator');
  typingIndicator.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
  messagesContainer.appendChild(typingIndicator);

  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  try {
    const baseURL = 'https://btch.us.kg/prompt/gpt':
    const prompt = encodeURIComponent('Saya adalah Line, sebuah asisten virtual yang diciptakan oleh Wira. Saya di sini untuk membantu menjawab pertanyaan dan memberikan informasi yang Anda butuhkan. Ada yang bisa saya bantu hari ini?');
    const text = encodeURIComponent(input);
    const response = await axios.get(`${baseURL}?prompt=${prompt}&text=${text}`);

    // Remove typing indicator
    typingIndicator.remove();

    if (response.data && response.data.result) {
      // Add AI's response with typing effect
      const aiMessage = document.createElement('div');
      aiMessage.classList.add('message', 'ai-message');

      const messageTime = `<div class="message-time">${currentTime}</div>`;
      messagesContainer.appendChild(aiMessage);

      typeMessage(aiMessage, response.data.result, () => {
        aiMessage.innerHTML += messageTime; // Append time after typing finishes
      });
    } else {
      throw new Error('Respons tidak valid dari server.');
    }
  } catch (error) {
    typingIndicator.remove();
    // Display error message
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('message', 'ai-message');
    errorMessage.innerHTML = `Error. Silakan coba lagi.<div class="message-time">${currentTime}</div>`;
    messagesContainer.appendChild(errorMessage);
  }

  // Scroll to the latest message
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}