const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteButton = document.getElementById("newQuote");


const quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" }
]


function showRandomnQuotes() {
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
    console.log(quote)
    const category = document.getElementById("newQuoteCategory").value.trim();
    console.log(category)

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

showQuoteButton.addEventListener("click", showRandomnQuotes);
createAddQuoteForm();