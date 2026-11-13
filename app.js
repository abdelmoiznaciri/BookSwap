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
            <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
                data-book-id=${bookData.id}>
                <div class="relative">
                    <img src="http://127.0.0.1:8000${bookData.book.image_url }" alt="Nella Fossa dei
                    Leoni" class="aspect-[2/3] w-full object-cover"><span
                        class="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold shadow-lg">${bookData.exchange_type}</span>
                </div>
                <div class="p-4">
                    <p class="text-xs font-bold uppercase tracking-wider text-cine-red">${bookData.book.category.name}</p>
                    <h3 class="mt-1 text-lg font-black">${bookData.book.title}</h3>
                    <p class="mt-2 text-sm text-slate-500">${bookData.book.description}</p>
                    <button
                        class="mt-4 w-full rounded-xl border border-slate-300 bg-blue-700 px-4 py-3 font-extrabold text-white hover:bg-blue-900">Choisir
                        ce book</button>
                </div>
            </article>`
  })
}

