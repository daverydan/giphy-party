const api_key = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
const searchForm = document.querySelector("#searchForm");

const searchGiphy = async (e) => {
  e.preventDefault();
  const q = e.target.elements.search.value;
  const offset = Math.floor(Math.random() * Math.floor(200));
  if (!q) return;
  try {
    const res = await axios.get("http://api.giphy.com/v1/gifs/search", {
      params: { q, limit: 1, offset, api_key },
    });
    createGiphy(res.data.data[0]);
    toggleDeleteButton(true);
  } catch (error) {
    alert("Please try again.");
  }
};

const createGiphy = (giphy) => {
  const giphyContainer = document.querySelector("#giphys");
  const img = document.createElement("IMG");
  img.src = giphy.images.downsized.url;
  img.alt = giphy.title;
  giphyContainer.prepend(img);
};

const toggleDeleteButton = (show = false) => {
  const deleteBtn = document.querySelector("#deleteBtn");
  show ? deleteBtn.classList.add("show") : deleteBtn.classList.remove("show");
};

const removeGiphys = () => {
  const images = document.querySelectorAll("#giphys img");
  toggleDeleteButton();
  images.forEach((img) => {
    img.classList = "destroy";
    setTimeout(() => {
      window.location.reload();
    }, 300);
  });
};

searchForm.addEventListener("submit", searchGiphy);
deleteBtn.addEventListener("click", removeGiphys);
