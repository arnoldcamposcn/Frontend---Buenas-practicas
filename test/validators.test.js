import { validators } from "../js/validations.js";

describe("Validators - Unit Tests", () => {

  test("isEmail devuelve true para correos válidos", () => {
    expect(validators.isEmail("test@mail.com")).toBe(true);
    expect(validators.isEmail("test123@dominio.org")).toBe(true);
  });

  test("isEmail devuelve false para correos inválidos", () => {
    expect(validators.isEmail("hola")).toBe(false);
    expect(validators.isEmail("correo@")).toBe(false);
    expect(validators.isEmail("@dominio.com")).toBe(false);
  });

  test("isEmpty detecta textos vacíos o espacios", () => {
    expect(validators.isEmpty("")).toBe(true);
    expect(validators.isEmpty("   ")).toBe(true);
    expect(validators.isEmpty("hola")).toBe(false);
  });

  test("form retorna errores si algún campo está vacío", () => {
    const data = { name: "", email: "", subject: "", message: "" };
    const errors = validators.form(data);

    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.subject).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  test("form retorna objeto vacío si todo es válido", () => {
    const data = {
      name: "Arnold",
      email: "test@mail.com",
      subject: "Hola",
      message: "Mensaje"
    };

    expect(validators.form(data)).toEqual({});
  });

});
