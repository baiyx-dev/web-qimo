$(function () {
  const $loader = $("#pageLoader");
  const $topbar = $(".topbar");
  const $reveals = $(".reveal");
  const $form = $("#aurelleBookingForm");
  const $toast = $("#successToast");
  let loaderFinished = false;

  $topbar.css({ opacity: 0, transform: "translateY(-18px)" });

  function finishLoading() {
    if (loaderFinished) return;
    loaderFinished = true;

    window.setTimeout(function () {
      $loader.fadeOut(450, function () {
        $loader.remove();
      });
      $topbar.animate({ opacity: 1 }, 520).css("transform", "translateY(0)");
      revealOnScroll();
    }, 900);
  }

  if (document.readyState === "complete") {
    finishLoading();
  } else {
    $(window).one("load", finishLoading);
    window.setTimeout(finishLoading, 2400);
  }

  function revealOnScroll() {
    const viewportBottom = $(window).scrollTop() + $(window).height() * 0.86;
    $reveals.each(function () {
      const $item = $(this);
      if ($item.hasClass("is-visible")) return;
      if ($item.offset().top < viewportBottom) {
        $item.addClass("is-visible");
      }
    });
  }

  $(window).on("scroll resize", revealOnScroll);
  revealOnScroll();

  $(".facility-card, .room-card").on("mouseenter", function () {
    $(this).css({
      transform: "translateY(-5px)",
      transition: "transform 0.3s ease"
    });
  });

  $(".facility-card, .room-card").on("mouseleave", function () {
    $(this).css("transform", "translateY(0)");
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
    $toast.stop(true, true).fadeIn(220).delay(1800).fadeOut(300);
  });
});
