// Get references to necessary DOM elements
const mainArea = document.querySelector('.main-area');  // Area where text will be displayed
const writeButton = document.querySelector('.btn');    // The 'Write' button
const clearButton = document.querySelector('#clear-btn'); // 'Clear' button
const orderButton = document.querySelector('#order-btn'); // 'Order' button
const breakButton = document.querySelector('#break-btn'); // 'Break' button
const downloadButton = document.querySelector('#download-btn'); // 'Download' button

let entries = [];  // Array to hold the added text entries

// When the Write button is clicked, display the input field and Add button
writeButton.addEventListener('click', () => {
  const inputField = document.createElement('div');
  inputField.innerHTML = `
    <input type="text" id="new-entry" placeholder="Write here...">
    <button id="add-btn">Add</button>
  `;
  mainArea.appendChild(inputField);

  const addButton = document.getElementById('add-btn');
  const userInput = document.getElementById('new-entry');

  // Function to handle adding the text
  function addText() {
    const userText = userInput.value;
    if (userText) {
      const newEntry = document.createElement('div');
      newEntry.textContent = userText;

      // Apply inline styles to make the text bold and larger
      newEntry.style.fontSize = '1.5rem';  // Larger font size
      newEntry.style.fontWeight = 'bold';  // Bold text

      mainArea.appendChild(newEntry);  // Add the new text to the display area
      entries.push({ text: userText, timestamp: Date.now() });  // Store the text entry with timestamp

      inputField.remove();  // Remove the input field after adding text
    }
  }

  // When the Add button is clicked, add the text
  addButton.addEventListener('click', addText);

  // When the Enter key is pressed in the input field, add the text
  userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addText();  // Call the function to add text when Enter is pressed
    }
  });
});

// Clear all entries when the Clear button is clicked
clearButton.addEventListener('click', () => {
  mainArea.innerHTML = '';  // Clear the main area
  entries = [];  // Reset the entries array
});

// Order the entries by the time they were added when the Order button is clicked
orderButton.addEventListener('click', () => {
  mainArea.innerHTML = '';  // Clear the main area
  entries.sort((a, b) => a.timestamp - b.timestamp);  // Sort entries by timestamp
  entries.forEach(entry => {
    const newEntry = document.createElement('div');
    newEntry.textContent = entry.text;

    // Apply the same styles to all text entries
    newEntry.style.fontSize = '1.5rem';  // Larger font size
    newEntry.style.fontWeight = 'bold';  // Bold text

    mainArea.appendChild(newEntry);
  });
});

// Break button to randomly change text colors, fonts, and sizes
breakButton.addEventListener('click', () => {
  const children = mainArea.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    
    // Randomly change the font, color, and size
    child.style.fontFamily = Math.random() < 0.25 
      ? 'Courier New' 
      : Math.random() < 0.5 
      ? 'Arial' 
      : Math.random() < 0.75 
      ? 'Times New Roman' 
      : 'Montserrat';

    child.style.fontSize = `${Math.random() * 2 + 1}rem`;  // Random font size between 1rem and 3rem
    child.style.color = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;  // Random color
  }
});

// Download all entries as a PDF
downloadButton.addEventListener('click', () => {
  const { jsPDF } = window.jspdf; // Ensure jsPDF is available in the window
  const doc = new jsPDF();
  let y = 10;

  entries.forEach(entry => {
    doc.setFontSize(12);
    doc.text(entry.text, 10, y);
    y += 10;  // Increase vertical position for each new line
  });

  doc.save('entries.pdf');  // Save the PDF as 'entries.pdf'
});
