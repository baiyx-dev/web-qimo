const navLinks = [...document.querySelectorAll(".nav-link")];
const bookingForm = document.getElementById("releaseBookingForm");
const bookingSuccess = document.getElementById("bookingSuccess");
const heroImage = document.querySelector(".hero-image");
const heroVideo = document.getElementById("heroVideo");
const mediaButtons = [...document.querySelectorAll(".media-button")];
const mediaDots = [...document.querySelectorAll(".media-dot")];
const mediaPrev = document.getElementById("mediaPrev");
const mediaNext = document.getElementById("mediaNext");
const navSearch = document.getElementById("navSearch");
const mediaItems = ["image", "video"];
let activeMediaIndex = 0;

function setActiveNav(sectionName) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === sectionName);
  });
}

function setFieldError(field, message) {
  const wrapper = field.closest("label");
  wrapper.classList.toggle("is-invalid", Boolean(message));
  wrapper.querySelector("small").textContent = message;
}

function validateBookingForm() {
  const guestName = bookingForm.guestName;
  const contact = bookingForm.contact;
  const experience = bookingForm.experience;
  const contactValue = contact.value.trim();
  const emailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(contactValue);
  const phoneValid = /^(?:\+?86)?1[3-9]\d{9}$/.test(contactValue.replace(/[\s-]/g, ""));
  let valid = true;

  if (!guestName.value.trim()) {
    setFieldError(guestName, "请输入姓名。");
    valid = false;
  } else {
    setFieldError(guestName, "");
  }

  if (!contactValue) {
    setFieldError(contact, "请输入联系方式。");
    valid = false;
  } else if (!emailValid && !phoneValid) {
    setFieldError(contact, "请输入有效手机号或邮箱。");
    valid = false;
  } else {
    setFieldError(contact, "");
  }

  if (!experience.value) {
    setFieldError(experience, "请选择目的体验。");
    valid = false;
  } else {
    setFieldError(experience, "");
  }

  return valid;
}

function setHeroMedia(type) {
  const useVideo = type === "video";
  activeMediaIndex = Math.max(0, mediaItems.indexOf(type));

  heroImage.classList.toggle("is-active", !useVideo);
  heroVideo.classList.toggle("is-active", useVideo);
  mediaButtons.forEach((button) => {
    const activeType = useVideo ? "video" : "image";
    button.classList.toggle("is-active", button.dataset.media === activeType);
  });
  mediaDots.forEach((dot) => {
    dot.classList.toggle("is-active", dot.dataset.media === type);
  });

  if (useVideo) {
    if (heroVideo.readyState < 2) {
      heroVideo.load();
    }
    heroVideo.play().catch(() => setHeroMedia("image"));
  } else {
    heroVideo.pause();
  }
}

function moveHeroMedia(direction) {
  const nextIndex = (activeMediaIndex + direction + mediaItems.length) % mediaItems.length;
  setHeroMedia(mediaItems[nextIndex]);
}

function setupMotion() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.set(".reveal-text", { y: 36, opacity: 0 });
  gsap.set(".reveal-card", { y: 54, opacity: 0, scale: 0.96 });

  document.querySelectorAll(".release-section").forEach((section) => {
    const sectionName = section.dataset.section;

    gsap.to(section.querySelectorAll(".reveal-text"), {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => setActiveNav(sectionName),
      onEnterBack: () => setActiveNav(sectionName)
    });
  });

  gsap.to(".gallery-card.reveal-card", {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 1,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".gallery-section",
      start: "top 72%",
      toggleActions: "play none none reverse"
    }
  });

  gsap.utils.toArray(".feature-media.reveal-card, .booking-panel.reveal-card").forEach((card) => {
    gsap.to(card, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 78%",
        toggleActions: "play none none reverse"
      }
    });
  });

  gsap.utils.toArray(".parallax-image").forEach((image) => {
    gsap.fromTo(
      image,
      { scale: 1.12, yPercent: -4 },
      {
        scale: 1.02,
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: image.closest(".parallax-frame"),
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8
        }
      }
    );
  });

  ScrollTrigger.create({
    trigger: ".hero-section",
    start: "top top",
    end: "bottom top",
    scrub: true,
    animation: gsap.to(".hero-copy", { yPercent: -16, opacity: 0.42, ease: "none" })
  });
}

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  bookingSuccess.classList.remove("is-visible");

  if (!validateBookingForm()) return;

  bookingForm.reset();
  bookingForm.querySelectorAll("label").forEach((label) => label.classList.remove("is-invalid"));
  bookingForm.querySelectorAll("small").forEach((message) => {
    message.textContent = "";
  });
  bookingSuccess.classList.add("is-visible");
});

bookingForm.querySelectorAll("input, select").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.closest("label").classList.contains("is-invalid")) {
      validateBookingForm();
    }
  });
});

navSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  const keyword = navSearch.keyword.value.trim().toLowerCase();
  const targetMap = {
    suite: "suites",
    suites: "suites",
    dining: "dining",
    wellness: "wellness",
    gallery: "gallery",
    location: "location",
    booking: "booking",
    预约: "booking",
    餐: "dining",
    疗愈: "wellness",
    套房: "suites"
  };
  const target = targetMap[keyword] || "gallery";
  document.getElementById(target).scrollIntoView({ behavior: "smooth", block: "start" });
});

heroVideo.addEventListener("error", () => {
  setHeroMedia("image");
});

mediaButtons.forEach((button) => {
  button.addEventListener("click", () => setHeroMedia(button.dataset.media));
});

mediaDots.forEach((dot) => {
  dot.addEventListener("click", () => setHeroMedia(dot.dataset.media));
});

mediaPrev.addEventListener("click", () => moveHeroMedia(-1));
mediaNext.addEventListener("click", () => moveHeroMedia(1));

setHeroMedia("image");
setupMotion();
