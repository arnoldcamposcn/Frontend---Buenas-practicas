/**
 * @jest-environment jsdom
 */

import { jest } from "@jest/globals";

// 1️⃣ Mock del módulo API (ESM compatible)
jest.unstable_mockModule("../js/api.js", () => ({
  api: {
    contact: jest.fn(),
  },
}));

// 2️⃣ IMPORTS después del mock
const { handleFormSubmit } = await import("../js/form.js");
const { api } = await import("../js/api.js");
const { validators } = await import("../js/validations.js");

describe("Form submit logic", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="contactForm">
        <input name="name" value="" />
        <input name="email" value="" />
        <input name="subject" value="" />
        <textarea name="message"></textarea>
      </form>
    `;

    // Necesario para JSDOM
    const form = document.getElementById("contactForm");

    form.name = form.querySelector('input[name="name"]');
    form.email = form.querySelector('input[name="email"]');
    form.subject = form.querySelector('input[name="subject"]');
    form.message = form.querySelector('textarea[name="message"]');

  });

  test("muestra alerta si el formulario está vacío", async () => {
    validators.form = jest.fn().mockReturnValue({
      name: "required",
    });

    const form = document.getElementById("contactForm");
    const event = { preventDefault: jest.fn(), target: form };

    await handleFormSubmit(event);

    expect(validators.form).toHaveBeenCalled();
    expect(api.contact).not.toHaveBeenCalled();
  });

test("muestra éxito cuando la API responde bien", async () => {
  validators.form = jest.fn().mockReturnValue({});
  api.contact.mockResolvedValue({ ok: true });

  const form = document.getElementById("contactForm");
  form.reset = jest.fn(); // 👉 agrega esto

  form.querySelector('[name="name"]').value = "Arnold";
  form.querySelector('[name="email"]').value = "test@mail.com";
  form.querySelector('[name="subject"]').value = "Hola";
  form.querySelector('[name="message"]').value = "Mensaje";

  const event = { preventDefault: jest.fn(), target: form };

  await handleFormSubmit(event);

  expect(api.contact).toHaveBeenCalled();
  expect(form.reset).toHaveBeenCalled(); // 👉 ESTA LÍNEA CUBRE LA LÍNEA 28
});

});
