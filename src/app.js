document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Car Audio", img: "car-audio.jpg", price: 1000000 },
      {
        id: 2,
        name: "Car Headlights",
        img: "car-headlights.jpg",
        price: 2000000,
      },
      {
        id: 3,
        name: "Car Seat Cover",
        img: "car-seat-cover.jpg",
        price: 4000000,
      },
      { id: 4, name: "Car Spoiler", img: "car-spoiler.jpg", price: 3000000 },
      { id: 5, name: "Car Wheel", img: "car-wheel.jpg", price: 3000000 },
    ],
  }));

  Alpine.store("modal", {
    item: null,
    open(product) {
      this.item = product;
    },
    close() {
      this.item = null;
    },
  });

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
  Alpine.data("checkoutForm", () => ({
    name: "",
    email: "",
    phone: "",

    get valid() {
      const phoneDigits = this.phone.replace(/\D/g, "");
      return (
        this.name.trim().length > 1 &&
        /^\S+@\S+\.\S+$/.test(this.email.trim()) &&
        phoneDigits.length >= 9 &&
        phoneDigits.length <= 15
      );
    },

    submit() {
      if (!this.valid) return;

      const cart = Alpine.store("cart");
      const lines = cart.items.map(
        (i) => `• ${i.name} x${i.quantity} = ${rupiah(i.total)}`,
      );

      const message =
        `Halo Glory Variasi, saya ingin pesan:\n\n` +
        `${lines.join("\n")}\n\n` +
        `Total: ${rupiah(cart.total)}\n\n` +
        `Nama: ${this.name.trim()}\n` +
        `Email: ${this.email.trim()}\n` +
        `Telepon: ${this.phone.trim()}`;

      const nomorToko = "6282268752459"; // ganti dengan nomor WA toko
      const url = `https://wa.me/${nomorToko}?text=${encodeURIComponent(message)}`;

      window.location.href = url;
      cart.items = [];
      cart.total = 0;
      cart.quantity = 0;
      this.name = this.email = this.phone = "";
    },
  }));
});

// konversi rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
// form validasi
