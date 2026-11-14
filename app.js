let booksData;
const booksSlots = document.getElementById('books-container')
fetch('http://127.0.0.1:8000/api/v1/exchange-requests?status=open')
  .then((response) => response.json())
  .then((data) => {
    booksData = data.data
    affichageDesLivres(booksData)
  })
  .catch((error) => console.log(error))


function affichageDesLivres(data) {
  booksSlots.innerHTML = ``
  data.forEach(bookData => {
    booksSlots.innerHTML += `
            <article class="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col flex-1 basis-64 max-w-sm">

              <!-- Status and exchange type -->
              <div class="flex items-center justify-between mb-4">
                <span class="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                  ${bookData.status}
                </span>

                <span class="${bookstatus(bookData.exchange_type)}">
                  ${bookData.exchange_type}
                </span>
              </div>

              <!-- Book information -->
              <div class="flex gap-4 flex-1">

                <img
                  src="http://127.0.0.1:8000${bookData.book.image_url}"
                  alt="Book cover"
                  class="w-24 h-32 object-cover rounded-lg shrink-0">

                <div class="flex flex-col gap-2 min-w-0">

                  <h2 class="text-lg font-semibold text-gray-800">
                    ${bookData.book.title}
                  </h2>

                  <p class="text-sm text-gray-500">
                    ${bookData.book.author}
                  </p>

                  <span class="text-sm text-gray-600">
                    ${bookData.book.category.name}
                  </span>

                  <div class="flex flex-wrap gap-1 pb-3">
                    ${bookTags(bookData.book.tags)}
                  </div>

                </div>
              </div>

              <!-- Footer -->
              <div class="border-t border-gray-100 mt-auto pt-3">

                <div class="flex justify-between items-center mb-3">
                  <span class="text-sm text-gray-500">
                    ${bookData.owner.name}
                  </span>

                  <span class="text-sm font-medium text-gray-700">
                    ${bookData.offers_count}
                  </span>
                </div>

                <p class="${dateOfExchange(bookData.exchange_type)}">
                  ${bookData.start_date} - ${bookData.end_date}
                </p>

                <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition">
                  View Details
                </button>

              </div>

            </article>`
  })
}


function bookTags(bookstags) {
  let Bookstags = "";
  bookstags.forEach(tag => {
    Bookstags += `
      <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      ${tag}
                    </span>`;
  });
  return Bookstags
}

function bookstatus(status) {
  spanClass = ''
  if (status.trim().toLowerCase() === 'temporary') {
    spanClass += 'bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full'
  } else {
    spanClass += 'bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full'
  }
  return spanClass
}

function dateOfExchange(status) {
  timeSpanClass = ''
  if(status.trim().toLowerCase() === 'permanent'){
    timeSpanClass += 'hidden'
  }else {
    timeSpanClass+= 'text-xs text-gray-500 mb-3'
  }
  return timeSpanClass
}