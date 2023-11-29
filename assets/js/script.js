function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledImageInfo = shuffleArray(imageInfoArray);

const shuffledImage = (tipe) => {
  if (tipe) return shuffleArray(imageInfoArray.filter(item => item.tipe === tipe))
  return shuffleArray(imageInfoArray)
}

const createBookCard = (imageInfo) => {
  const imagePath = `./assets/image/${imageInfo.filename}`;

  const card = document.createElement("div");
  card.className = "card relative";

  const img = document.createElement("img");
  img.src = imagePath;
  img.alt = imageInfo.filename;
  img.style = "width: 200px; height: 250px;";
  img.className = "mx-auto my-auto rounded";

  const body = document.createElement("div");
  body.className = "card-body p-2 relative";

  const title = document.createElement("p");
  title.className = "text-gray-500 text-sm mb-1";
  title.style = "font-size: 16px;";
  title.textContent = imageInfo.title;

  const author = document.createElement("h5");
  author.className = "card-title mb-2";
  author.textContent = imageInfo.author;

  const iconsContainer = document.createElement("div");
  iconsContainer.className = "flex justify-between items-center mt-4";

  const createIcon = (iconClass, tooltipContent, onClickHandler) => {
    const icon = document.createElement("i");
    icon.className = iconClass;
    icon.style.fontSize = "24px";
    icon.onclick = (event) => {
      event.stopPropagation();
      onClickHandler();
    };

    iconsContainer.appendChild(icon);

    tippy(icon, {
      content: tooltipContent,
    });
  };

  createIcon(
    "fas fa-book-reader text-gray-500 cursor-pointer mr-2 hover:text-blue-500",
    "Borrow Book",
    () => borrowBook(imageInfo.title)
  );

  createIcon(
    "fas fa-info-circle text-gray-500 cursor-pointer hover:text-blue-500",
    "Details",
    () => (location.href = "detail.html?buku=" + imageInfo.api)
  );

  body.appendChild(author);
  body.appendChild(title);
  body.appendChild(iconsContainer);
  card.appendChild(img);
  card.appendChild(body);

  return card;
};

const addBooksToContainer = (container, bookArray) => {
  bookArray.forEach((book) => {
    const card = createBookCard(book);
    container.appendChild(card);
  });
};

const rekomendasi = document.getElementById("imageContainer");
const favoritContainer = document.getElementById("populerr");
const fiksiContainer = document.getElementById("fiksii");

addBooksToContainer(rekomendasi, shuffledImage(false));
addBooksToContainer(favoritContainer, shuffledImage('favorit'));
addBooksToContainer(fiksiContainer, shuffledImage('fiksi'));

function borrowBook(bookTitle) {
  Swal.fire({
    title: "Website masih statis",
    text: `Fitur Pinjam untuk buku '${bookTitle}' sedang dalam pengembangan.`,
    icon: "info",
    confirmButtonText: "OK",
  });
}
