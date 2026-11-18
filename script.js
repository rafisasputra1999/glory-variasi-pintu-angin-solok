// togel kelas active hamburger menu

const navbarNav = document.querySelector(".navbar-nav");

// ketika di klik
document.querySelector("#hamburger").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};


// togle class active search-form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

// toggle active shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) =>{
  shoppingCart.classList.toggle('active');
  e.preventDefault();
}

// klik diluar elemen

const hamburger = document.querySelector("#hamburger");
const searchButton = document.querySelector('#search-button');
const shoppingCartButton = document.querySelector('#shopping-cart-button');

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!searchButton.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!shoppingCartButton.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// modal box

const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
  
  btn.onclick = (e) => {
    itemDetailModal.style.display = 'flex';
    e.preventDefault();
  };
})


// klik tombol close modal
document.querySelector('.modal .close-btn').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault()
}
// klik diluar modal box
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  };
};

