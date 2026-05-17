(function (window) {
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const phonePattern = /^(?:\+?86)?1[3-9]\d{9}$/;

  function normalizePhone(value) {
    return value.replace(/[\s-]/g, "");
  }

  function isEmailOrPhone(value) {
    const trimmed = value.trim();
    return emailPattern.test(trimmed) || phonePattern.test(normalizePhone(trimmed));
  }

  function contactMessage(value, emptyMessage, invalidMessage) {
    const trimmed = value.trim();
    if (!trimmed) return emptyMessage;
    if (!isEmailOrPhone(trimmed)) return invalidMessage;
    return "";
  }

  window.BookingValidation = {
    contactMessage,
    isEmailOrPhone
  };
})(window);
