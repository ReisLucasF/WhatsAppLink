document.addEventListener("DOMContentLoaded", function () {
  lucide.createIcons();

  const phoneMask = (value) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", (e) => {
    e.target.value = phoneMask(e.target.value);
  });

  const whatsappForm = document.getElementById("whatsapp-form");
  const resultDiv = document.getElementById("result");
  const generatedLinkInput = document.getElementById("generated-link");
  const openLinkBtn = document.getElementById("open-link");
  const copyBtn = document.getElementById("copy-btn");
  const copyMessage = document.getElementById("copy-message");

  whatsappForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let phone = phoneInput.value.replace(/\D/g, "");

    if (phone.length === 11 || phone.length === 10) {
      phone = "55" + phone;
    }

    const message = encodeURIComponent(
      document.getElementById("message").value
    );

    const whatsappLink = `https://wa.me/${phone}${
      message ? "?text=" + message : ""
    }`;

    generatedLinkInput.value = whatsappLink;
    openLinkBtn.href = whatsappLink;
    resultDiv.classList.remove("hidden");
    copyBtn.disabled = false;
  });

  // Copiar
  copyBtn.addEventListener("click", () => {
    generatedLinkInput.select();
    document.execCommand("copy");

    copyMessage.classList.remove("hidden");
    setTimeout(() => {
      copyMessage.classList.add("hidden");
    }, 3000);
  });
});
