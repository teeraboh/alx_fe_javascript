// // Initialize quotes and categories
// let quotes = [
//   { text: "Be the change you wish to see in the world.", category: "Inspirational" },
//   { text: "The only way to do great work is to love what you do.", category: "Motivational" },
//   { text: "I have not failed. I've just found 10,000 ways that won't work.", category: "Perseverance" }
// ];

// let categories = [...new Set(quotes.map(quote => quote.category))]; // Unique categories

// // Function to display a random quote
// function showRandomQuote() {
//   const quoteDisplay = document.getElementById('quoteDisplay');
//   const categorySelect = document.getElementById('categorySelect');
//   const selectedCategory = categorySelect.value;

//   // Filter quotes based on selected category
//   const filteredQuotes = selectedCategory === 'all'
//     ? quotes
//     : quotes.filter(quote => quote.category === selectedCategory);

//   if (filteredQuotes.length === 0) {
//     quoteDisplay.innerHTML = "<p>No quotes in this category!</p>";
//     return;
//   }

//   const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
//   const quote = filteredQuotes[randomIndex];
//   quoteDisplay.innerHTML = `<p>"${quote.text}"</p><em>— ${quote.category}</em>`;
// }

// // Function to create the "Add Quote" form dynamically
// function createAddQuoteForm() {
//   const formContainer = document.createElement('div');

//   // Create input fields
//   const quoteInput = document.createElement('input');
//   quoteInput.type = 'text';
//   quoteInput.id = 'newQuoteText';
//   quoteInput.placeholder = 'Enter a new quote';

//   const categoryInput = document.createElement('input');
//   categoryInput.type = 'text';
//   categoryInput.id = 'newQuoteCategory';
//   categoryInput.placeholder = 'Enter category';

//   // Create add button
//   const addButton = document.createElement('button');
//   addButton.textContent = 'Add Quote';
//   addButton.addEventListener('click', addQuote);

//   // Append elements to form
//   formContainer.append(quoteInput, categoryInput, addButton);
//   document.body.appendChild(formContainer);
// }

// // Function to add a new quote
// function addQuote() {
//   const textInput = document.getElementById('newQuoteText');
//   const categoryInput = document.getElementById('newQuoteCategory');
//   const newText = textInput.value.trim();
//   const newCategory = categoryInput.value.trim();

//   if (!newText || !newCategory) {
//     alert('Please fill both fields!');
//     return;
//   }

//   // Add new quote to array
//   quotes.push({ text: newText, category: newCategory });

//   // Update categories if new
//   if (!categories.includes(newCategory)) {
//     categories.push(newCategory);
//     const categorySelect = document.getElementById('categorySelect');
//     const newOption = document.createElement('option');
//     newOption.value = newCategory;
//     newOption.textContent = newCategory;
//     categorySelect.appendChild(newOption);
//   }

//   // Clear inputs
//   textInput.value = '';
//   categoryInput.value = '';
// }

// // Function to create category dropdown
// function createCategorySelector() {
//   const selector = document.createElement('select');
//   selector.id = 'categorySelect';

//   // "All Categories" option
//   const allOption = document.createElement('option');
//   allOption.value = 'all';
//   allOption.textContent = 'All Categories';
//   selector.appendChild(allOption);

//   // Add category options
//   categories.forEach(category => {
//     const option = document.createElement('option');
//     option.value = category;
//     option.textContent = category;
//     selector.appendChild(option);
//   });

//   // Insert dropdown before the quote display
//   const quoteDisplay = document.getElementById('quoteDisplay');
//   document.body.insertBefore(selector, quoteDisplay);

//   // Update quotes when category changes
//   selector.addEventListener('change', showRandomQuote);
// }

// // Initialize the app
// function init() {
//   createCategorySelector();
//   createAddQuoteForm();
//   document.getElementById('newQuote').addEventListener('click', showRandomQuote);
//   showRandomQuote(); // Show initial quote
// }

// // Start when the page loads
// document.addEventListener('DOMContentLoaded', init);

// Load data from localStorage or initialize defaults
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "Be the change you wish to see in the world.", category: "Inspirational" },
  { text: "The only way to do great work is to love what you do.", category: "Motivational" }
];

// Function to populate the category dropdown
function populateCategories() {
  const selector = document.getElementById('categoryFilter');
  const categories = [...new Set(quotes.map(quote => quote.category))]; // Extract unique categories

  // Clear and repopulate options
  selector.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    selector.appendChild(option);
  });

  // Restore last selected filter from localStorage
  const savedFilter = localStorage.getItem('selectedCategory');
  if (savedFilter) selector.value = savedFilter;
}

// Function to display filtered quotes
function displayQuotes(filteredQuotes) {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  filteredQuotes.forEach(quote => {
    const quoteDiv = document.createElement('div');
    quoteDiv.className = 'quote';
    quoteDiv.innerHTML = `<p>"${quote.text}"</p><em>— ${quote.category}</em>`;
    quoteDisplay.appendChild(quoteDiv);
  });
}

// Filter quotes based on category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filtered = selectedCategory === 'all'
    ? quotes
    : quotes.filter(quote => quote.category === selectedCategory);

  // Save filter to localStorage and display quotes
  localStorage.setItem('selectedCategory', selectedCategory);
  displayQuotes(filtered);
}

// Function to add a new quote (updated for web storage)
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (!newText || !newCategory) {
    alert('Please fill both fields!');
    return;
  }

  // Add to quotes array and save to localStorage
  quotes.push({ text: newText, category: newCategory });
  localStorage.setItem('quotes', JSON.stringify(quotes));

  // Refresh UI
  populateCategories();
  filterQuotes(); // Show new quote if category matches
  textInput.value = categoryInput.value = ''; // Clear inputs
}

// Initialize the app
function init() {
  populateCategories();
  filterQuotes(); // Show initial quotes
  document.getElementById('categoryFilter').addEventListener('change', filterQuotes);
}

// Start when the page loads
document.addEventListener('DOMContentLoaded', init);