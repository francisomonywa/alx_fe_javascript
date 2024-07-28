const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteButton = document.getElementById("newQuote");
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" }
]

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.textContent = randomQuote.text;
}

function createAddQuoteForm() {
    const quoteForm = document.createElement("div");
    quoteForm.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `
    document.body.appendChild(quoteForm);
}

function addQuote() {
    const quote = document.getElementById("newQuoteText").value.trim();
    const category = document.getElementById("newQuoteCategory").value.trim();
    if (quote && category) {
        const quoteObject = {
            text: quote,
            category: category
        }
        quotes.push(quoteObject);
        document.getElementById("newQuoteText").value = ""
        document.getElementById("newQuoteCategory").value = ""
    } else {
        alert("Please enter both quote and category")
    }
}

function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
    syncWithServer();
}

function exportToJsonFile() {
    const dataString = JSON.stringify(quotes);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataString);
    const exportFileDefaultName = 'quotes.json';
    const dataBlob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', 'quotes.json');
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}
async function syncWithServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverQuotes = await response.json();
        quotes = serverQuotes;
        saveQuotes();
        showNotification('Quotes synced with server');
    } catch (error) {
        console.error('Error syncing with server:', error);
    }
}

function startPeriodicSync() {
    setInterval(syncWithServer, 60000);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'notification';
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
showQuoteButton.addEventListener("click", showRandomQuote);
createAddQuoteForm();
const exportButton = document.getElementById("exportQuotes");
exportButton.onclick = exportToJsonFile;
document.body.appendChild(exportButton);
const importInput = document.createElement('input');
importInput.type = 'file';
importInput.id = 'importFile';
importInput.accept = '.json';
importInput.onchange = importFromJsonFile;
document.body.appendChild(importInput);
startPeriodicSync();