gsap.registerPlugin(ScrollTrigger);

const pageLoader = document.getElementById("pageLoader");
const yearElement = document.getElementById("year");
const bookingForm = document.getElementById("bookingForm");
const successModal = document.getElementById("successModal");
const modalCard = successModal.querySelector(".modal-card");
const modalBackdrop = successModal.querySelector(".modal-backdrop");
const closeModalButtons = successModal.querySelectorAll("[data-close-modal]");

yearElement.textContent = new Date().getFullYear();

function presetHeroIntroState() {
  gsap.set(".topbar", { y: -24, opacity: 0 });
  gsap.set(".hero-sea", { scale: 1.02, opacity: 0.96 });
  gsap.set(".hero-boat", { xPercent: -1.5, yPercent: 22, opacity: 1 });
  gsap.set(".hero-overlay", { opacity: 0.18 });
  gsap.set(".hero .reveal-text", { y: 34, opacity: 0 });
  gsap.set(".hero-aside", { y: 28, opacity: 0 });
}

function playHeroIntro() {
  const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTimeline
    .to(".topbar", { y: 0, opacity: 1, duration: 0.9, clearProps: "transform,opacity" })
    .to(".hero-sea", { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out", clearProps: "transform,opacity" }, "-=0.4")
    .to(
      ".hero-boat",
      {
        xPercent: 0,
        yPercent: 0,
        opacity: 1,
        duration: 3.4,
        ease: "power1.out",
        clearProps: "transform,opacity"
      },
      "-=0.8"
    )
    .to(
      ".hero-overlay",
      { opacity: 1, duration: 1.8, ease: "power2.out", clearProps: "opacity" },
      "-=2.2"
    )
    .to(
      ".reveal-text",
      { y: 0, opacity: 1, duration: 1, stagger: 0.12, clearProps: "transform,opacity" },
      "-=1.6"
    )
    .to(
      ".hero-aside",
      { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", clearProps: "transform,opacity" },
      "-=0.9"
    );
}

function replayHeroBoat() {
  gsap.fromTo(
    ".hero-boat",
    {
      xPercent: -1.5,
      yPercent: 22
    },
    {
      xPercent: 0,
      yPercent: 0,
      duration: 2.6,
      ease: "power1.out",
      overwrite: "auto"
    }
  );
}

function playLoaderIntro() {
  if (!pageLoader) {
    presetHeroIntroState();
    playHeroIntro();
    return;
  }

  presetHeroIntroState();

  const loaderTimeline = gsap.timeline({
    defaults: { ease: "power2.out" },
    onComplete: () => {
      pageLoader.remove();
      requestAnimationFrame(() => playHeroIntro());
    }
  });

  loaderTimeline
    .from(".page-loader-logo", { y: 18, opacity: 0, scale: 0.96, duration: 0.9 })
    .from(".page-loader-brand span", {
      y: 22,
      opacity: 0,
      duration: 0.72,
      stagger: 0.08
    }, "-=0.4")
    .from(".page-loader-line", { scaleX: 0.72, opacity: 0, duration: 0.7 }, "-=0.35")
    .from(".page-loader-copy", { y: 12, opacity: 0, duration: 0.8 }, "-=0.45")
    .to(".page-loader-progress", { width: "100%", duration: 1.35, ease: "power1.inOut" }, "-=0.2")
    .to(".page-loader-inner", { y: -18, opacity: 0, duration: 0.7, ease: "power2.inOut" }, "+=0.08")
    .to(
      pageLoader,
      {
        opacity: 0,
        duration: 0.45,
        ease: "power2.out"
      },
      "-=0.05"
    );
}

window.addEventListener("load", () => {
  playLoaderIntro();
});

ScrollTrigger.create({
  trigger: "#hero",
  start: "top top",
  end: "bottom top",
  onEnterBack: () => {
    replayHeroBoat();
  }
});

// Scroll-triggered section reveals keep motion subtle and consistent.
gsap.utils.toArray(".scroll-fade").forEach((element) => {
  gsap.from(element, {
    y: 44,
    opacity: 0,
    duration: 1.05,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 82%",
      toggleActions: "play none none reverse"
    }
  });
});

// Image panels feel more cinematic with a restrained mask-and-scale reveal.
gsap.utils.toArray(".reveal-panel").forEach((element) => {
  const image = element.querySelector("img");

  gsap.from(element, {
    clipPath: "inset(14% 0 14% 0 round 32px)",
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 84%",
      toggleActions: "play none none reverse"
    }
  });

  if (image) {
    gsap.from(image, {
      scale: 1.12,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 84%",
        toggleActions: "play none none reverse"
      }
    });
  }
});

// Gentle parallax helps large photography feel immersive without becoming flashy.
gsap.utils.toArray(".parallax-image").forEach((image) => {
  gsap.to(image, {
    yPercent: 8,
    ease: "none",
    scrollTrigger: {
      trigger: image.closest("section, article, figure"),
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5
    }
  });
});

document.querySelectorAll(".hover-card").forEach((card) => {
  const media = card.querySelector("img");

  card.addEventListener("mouseenter", () => {
    gsap.to(card, { y: -6, duration: 0.35, ease: "power2.out" });
    gsap.to(media, { scale: 1.04, duration: 0.55, ease: "power2.out" });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, { y: 0, duration: 0.35, ease: "power2.out" });
    gsap.to(media, { scale: 1, duration: 0.55, ease: "power2.out" });
  });
});

const validators = {
  guestName: (value) => {
    const trimmed = value.trim();
    const namePattern = /^(?:[\u4e00-\u9fa5]{2,10}|[A-Za-z]+(?:[ '-][A-Za-z]+){0,3})$/;
    if (!trimmed) return "请输入姓名。";
    if (!namePattern.test(trimmed)) return "请输入真实姓名，支持中文姓名或英文姓名。";
    return "";
  },
  contactInfo: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "请输入邮箱或手机号。";
    const emailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmed);
    const phoneValid = /^(?:\+?86)?1[3-9]\d{9}$/.test(trimmed.replace(/[\s-]/g, ""));
    if (!emailValid && !phoneValid) return "请输入有效的邮箱或手机号。";
    return "";
  },
  checkIn: (value) => (!value ? "请选择入住日期。" : ""),
  checkOut: (value) => (!value ? "请选择离店日期。" : ""),
  roomType: (value) => (!value ? "请选择房型偏好。" : ""),
  specialRequest: (value) => {
    if (value.trim().length > 240) return "特殊需求请控制在 240 个字符以内。";
    return "";
  }
};

function setFieldState(field, message) {
  const wrapper = field.closest(".field");
  const errorElement = wrapper.querySelector(".error-message");

  wrapper.classList.toggle("is-invalid", Boolean(message));
  errorElement.textContent = message;
}

function validateField(field) {
  const validator = validators[field.name];
  if (!validator) return "";

  let message = validator(field.value);

  if (!message && (field.name === "checkIn" || field.name === "checkOut")) {
    const checkIn = bookingForm.checkIn.value;
    const checkOut = bookingForm.checkOut.value;

    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
      message =
        field.name === "checkOut"
          ? "离店日期必须晚于入住日期。"
          : "";
      setFieldState(bookingForm.checkOut, "离店日期必须晚于入住日期。");
    }
  }

  if (field.name !== "checkOut" || message) {
    setFieldState(field, message);
  }

  if (field.name === "checkIn" && bookingForm.checkOut.value) {
    const checkOutMessage =
      new Date(bookingForm.checkOut.value) <= new Date(field.value)
        ? "离店日期必须晚于入住日期。"
        : "";
    setFieldState(bookingForm.checkOut, checkOutMessage);
  }

  return message;
}

function validateForm() {
  const fields = [...bookingForm.querySelectorAll("input, select, textarea")];
  const errors = fields.map(validateField).filter(Boolean);
  return errors.length === 0;
}

function openModal() {
  successModal.classList.add("is-open");
  successModal.setAttribute("aria-hidden", "false");

  gsap.fromTo(
    successModal,
    { opacity: 0 },
    { opacity: 1, duration: 0.3, ease: "power2.out" }
  );

  gsap.fromTo(
    modalCard,
    { y: 16, scale: 0.96, opacity: 0 },
    { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: "power3.out" }
  );
}

function closeModal() {
  gsap.to(successModal, {
    opacity: 0,
    duration: 0.25,
    ease: "power2.in",
    onComplete: () => {
      successModal.classList.remove("is-open");
      successModal.setAttribute("aria-hidden", "true");
      gsap.set([successModal, modalCard], { clearProps: "all" });
    }
  });
}

bookingForm.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    if (field.closest(".field").classList.contains("is-invalid")) {
      validateField(field);
    }
  });
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) return;

  bookingForm.reset();
  bookingForm
    .querySelectorAll(".field")
    .forEach((field) => field.classList.remove("is-invalid"));
  bookingForm
    .querySelectorAll(".error-message")
    .forEach((message) => (message.textContent = ""));

  openModal();
});

closeModalButtons.forEach((button) => button.addEventListener("click", closeModal));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && successModal.classList.contains("is-open")) {
    closeModal();
  }
});

modalBackdrop.addEventListener("click", closeModal);
