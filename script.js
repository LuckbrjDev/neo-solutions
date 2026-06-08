const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  nav.classList.toggle("open", !isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    nav.classList.remove("open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const modal = document.querySelector("#image-modal");
const modalImage = modal.querySelector("img");
const modalClose = modal.querySelector(".modal-close");

document.querySelectorAll(".project-image").forEach((button) => {
  button.addEventListener("click", () => {
    modalImage.src = button.dataset.image;
    modalImage.alt = button.dataset.alt;
    modal.showModal();
    document.body.classList.add("modal-open");
  });
});

const closeModal = () => {
  modal.close();
  document.body.classList.remove("modal-open");
};

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
modal.addEventListener("close", () => document.body.classList.remove("modal-open"));

const form = document.querySelector("#contact-form");
const feedback = form.querySelector(".form-feedback");
let selectedChannel = "whatsapp";

form.querySelectorAll("[data-channel]").forEach((button) => {
  button.addEventListener("click", () => {
    selectedChannel = button.dataset.channel;
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const name = data.get("name").trim();
  const company = data.get("company").trim() || "Não informado";
  const email = data.get("email").trim();
  const service = data.get("service");
  const message = data.get("message").trim();

  const contactMessage = [
    "Olá, Neo Solutions!",
    "",
    `Meu nome é ${name}.`,
    `Empresa: ${company}`,
    `E-mail: ${email}`,
    `Serviço de interesse: ${service}`,
    "",
    "Sobre o projeto:",
    message,
  ].join("\n");

  if (selectedChannel === "email") {
    const subject = `Novo projeto - ${service} - ${name}`;
    window.location.href =
      `mailto:luckrj.dev@gmail.com?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(contactMessage)}`;
    feedback.textContent = "Abrindo seu aplicativo de e-mail com a mensagem preenchida.";
    return;
  }

  const whatsappUrl = `https://wa.me/5511946677094?text=${encodeURIComponent(contactMessage)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  feedback.textContent = "Abrindo o WhatsApp com a mensagem preenchida.";
});

document.querySelector("#year").textContent = new Date().getFullYear();
