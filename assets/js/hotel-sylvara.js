$(function () {
  const $loader = $("#pageLoader");
  const $topbar = $(".topbar");
  const $reveals = $(".reveal");
  const $form = $("#sylvaraBookingForm");
  const $toast = $("#successToast");
  let loaderFinished = false;

  $topbar.css({ opacity: 0, transform: "translateY(-18px)" });

  function revealOnScroll() {
    const viewportBottom = $(window).scrollTop() + $(window).height() * 0.84;
    $reveals.each(function () {
      const $item = $(this);
      if ($item.hasClass("is-visible")) return;
      if ($item.offset().top < viewportBottom) {
        $item.addClass("is-visible");
      }
    });
  }

  function finishLoading() {
    if (loaderFinished) return;
    loaderFinished = true;

    window.setTimeout(function () {
      $loader.fadeOut(520, function () {
        $loader.remove();
      });
      $topbar.animate({ opacity: 1 }, 620).css("transform", "translateY(0)");
      revealOnScroll();
    }, 760);
  }

  if (document.readyState === "complete") {
    finishLoading();
  } else {
    $(window).one("load", finishLoading);
    window.setTimeout(finishLoading, 2400);
  }

  $(window).on("scroll resize", revealOnScroll);
  revealOnScroll();

  $(".room-card, .facility-item").on("mouseenter", function () {
    $(this).css({
      borderColor: "rgba(214, 169, 108, 0.48)",
      transform: "translateY(-4px)",
      transition: "transform 0.32s ease, border-color 0.32s ease"
    });
  });

  $(".room-card, .facility-item").on("mouseleave", function () {
    $(this).css({
      borderColor: "",
      transform: "translateY(0)"
    });
  });

  function setError($field, message) {
    $field.closest("label").find("small").text(message);
  }

  function validate() {
    let valid = true;
    const $name = $form.find("[name='name']");
    const $contact = $form.find("[name='contact']");
    const $room = $form.find("[name='room']");
    const contactValue = $.trim($contact.val());
    const emailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(contactValue);
    const phoneValid = /^(?:\+?86)?1[3-9]\d{9}$/.test(contactValue.replace(/[\s-]/g, ""));

    $form.find("small").text("");

    if (!$.trim($name.val())) {
      setError($name, "请输入姓名。");
      valid = false;
    }

    if (!contactValue) {
      setError($contact, "请输入联系方式。");
      valid = false;
    } else if (!emailValid && !phoneValid) {
      setError($contact, "请输入有效手机号或邮箱。");
      valid = false;
    }

    if (!$room.val()) {
      setError($room, "请选择房型。");
      valid = false;
    }

    return valid;
  }

  $form.on("submit", function (event) {
    event.preventDefault();
    if (!validate()) return;

    this.reset();
    $toast.stop(true, true).fadeIn(220).delay(1900).fadeOut(300);
  });
});
