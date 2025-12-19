document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".mySwiper")) {
    new Swiper(".mySwiper", {
      loop: true,
      spaceBetween: 10,
      breakpoints: {
        375: {
          slidesPerView: 1.75,
          spaceBetween: 20,
        },
        700: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  }

  const navbar = document.querySelector(".navbar");
  if (navbar) {
    const toggle = navbar.querySelector(".toggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        navbar.classList.toggle("collapsed");
      });
    }

    window.addEventListener("scroll", () => {
      const windowY = window.pageYOffset;
      const navbarHeight = navbar.offsetHeight;
      if (windowY > navbarHeight) navbar.classList.add("sticky");
      else navbar.classList.remove("sticky");
    });
  }

  const url = "https://6944afaf7dd335f4c360efd7.mockapi.io/Love";

  const form = document.getElementById("userForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const data = {
        InfoTExt_block: document.getElementById("InfoTExt_block").value.trim(),
        Place: document.getElementById("Place").value.trim(),
        Date: Number(document.getElementById("Date").value),
      };



      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network error");
          return response.json();
        })
        .then(() => {
          document.getElementById("status").textContent =
            "Буде виконано";
          form.reset();
        })
        .catch((err) => {
          document.getElementById("status").textContent =
            "Error: " + err.message;
        });
    });
  }

  const container = document.getElementById("clientsContainer");

  if (container) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((client) => {
          const card = document.createElement("div");
          card.className = "client-card";

          card.innerHTML = `
            <h2>Побажання</h2>
            <h3><span class="clientLabel">Побажання:</span>  ${client.InfoTExt_block}</h3>
            <h3><span class="clientLabel">Місце:</span>  ${client.Place}</h3>
            <h3><span class="clientLabel">Дата:</span>  ${client.Date}</h3>
          `;

          const closeButton = document.createElement("button");
          closeButton.textContent = "Виконано";
          closeButton.className = "close-btn btn";

          const modal = document.getElementById("confirmModal");
          const confirmYes = document.getElementById("confirmYes");
          const confirmNo = document.getElementById("confirmNo");
          
          closeButton.addEventListener("click", () => {

            modal.style.display = "flex";
          
            confirmNo.onclick = () => {
              modal.style.display = "none";
            };
          
            confirmYes.onclick = () => {
              modal.style.display = "none";
              closeButton.disabled = true;
          
              fetch(`${url}/${client.id}`, {
                method: "DELETE",
              })
                .then((res) => {
                  if (res.ok || res.status === 404) {
                    card.remove();
                  } else {
                    console.error("Error deleting client:");
                  }
                })
                .catch((err) => console.error("Network error", err));
            };
          });

          card.appendChild(closeButton);

          container.appendChild(card);
        });
      })
      .catch((error) => console.error("Error retrieving data:", error));
  }
});
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
document.querySelectorAll(".scroll-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    window.scrollTo({
      top: targetElement.offsetTop - 20,
      behavior: "smooth",
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const adminBtn = document.getElementById("adminBtn");
  const loginModal = document.getElementById("loginModal");
  const loginSubmit = document.getElementById("loginSubmit");
  const loginCancel = document.getElementById("loginCancel");
  const loginError = document.getElementById("loginError");

  if (!adminBtn || !loginModal || !loginSubmit || !loginCancel || !loginError) return;

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin";

  adminBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
    loginError.textContent = "";
    document.getElementById("adminUsername").value = "";
    document.getElementById("adminPassword").value = "";
  });

  loginCancel.addEventListener("click", () => {
    loginModal.style.display = "none";
  });

  loginSubmit.addEventListener("click", () => {
    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      window.location.href = "admin.html"; 
    } else {
      loginError.textContent = "Incorrect username or password";
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.style.display = "none";
  });
});