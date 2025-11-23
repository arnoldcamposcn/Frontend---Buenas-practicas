import { jest } from "@jest/globals";
import { api } from "../js/api.js";

describe("API module", () => {

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test("contact envía un POST correctamente", async () => {
    const fakeResponse = { ok: true };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(fakeResponse)
    });

    const data = {
      name: "Arnold",
      email: "test@mail.com",
      subject: "Hola",
      message: "Mensaje"
    };

    const result = await api.contact(data);

    expect(fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/contact",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
    );

    expect(result).toEqual(fakeResponse);
  });

  test("contact lanza error cuando response.ok es false", async () => {
    fetch.mockResolvedValue({ ok: false });

    await expect(api.contact({})).rejects.toThrow("Error en el servidor");
  });

});
