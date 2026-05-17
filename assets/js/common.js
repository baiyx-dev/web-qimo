$(function () {
  const $loader = $("#pageLoader");
  const $topbar = $(".topbar");
  const $reveals = $(".reveal");
  const $form = $(".booking-form").first();
  const $toast = $("#successToast");
  let loaderFinished = false;

  $topbar.css({ opacity: 0, transform: "translateY(-18px)" });

  function revealOnScroll() {
    const threshold = Number($form.data("revealThreshold")) || 0.86;
    const viewportBottom = $(window).scrollTop() + $(window).height() * threshold;
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

    const delay = Number($form.data("loaderDelay")) || 760;
    const fadeDuration = Number($form.data("loaderFade")) || 420;
    const topbarDuration = Number($form.data("topbarAnimate")) || 520;

    window.setTimeout(function () {
      if ($loader.length) {
        $loader.fadeOut(fadeDuration, function () {
          $loader.remove();
        });
      }
      $topbar.animate({ opacity: 1 }, topbarDuration).css("transform", "translateY(0)");
      revealOnScroll();
    }, delay);
  }

  if (document.readyState === "complete") {
    finishLoading();
  } else {
    $(window).one("load", finishLoading);
    window.setTimeout(finishLoading, 2400);
  }

  $(window).on("scroll resize", revealOnScroll);
  revealOnScroll();

  const hoverSelector = $form.data("hoverSelector");
  const hoverColor = $form.data("hoverColor");
  const hoverY = Number($form.data("hoverY")) || -4;
  const hoverTransition = $form.data("hoverTransition") || "transform 0.28s ease, border-color 0.28s ease";

  if (hoverSelector) {
    $(hoverSelector).on("mouseenter", function () {
      var props = { transform: "translateY(" + hoverY + "px)", transition: hoverTransition };
      if (hoverColor) props.borderColor = hoverColor;
      $(this).css(props);
    });

    $(hoverSelector).on("mouseleave", function () {
      var props = { transform: "translateY(0)" };
      if (hoverColor) props.borderColor = "";
      $(this).css(props);
    });
  }

  function setError($field, message) {
    $field.closest("label").find("small").text(message);
  }

  function validate() {
    var valid = true;
    var $name = $form.find("[name='name']");
    var $contact = $form.find("[name='contact']");
    var $room = $form.find("[name='room']");
    var contactValue = $.trim($contact.val());
    var contactError = BookingValidation.contactMessage(
      contactValue,
      "请输入联系方式。",
      "请输入有效手机号或邮箱。"
    );

    $form.find("small").text("");

    if (!$.trim($name.val())) {
      setError($name, "请输入姓名。");
      valid = false;
    }

    if (contactError) {
      setError($contact, contactError);
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

    var toastDelay = Number($form.data("toastDelay")) || 1900;
    this.reset();
    $toast.stop(true, true).fadeIn(220).delay(toastDelay).fadeOut(300);
  });
});
