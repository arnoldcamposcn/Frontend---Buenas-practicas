
import { jest } from "@jest/globals";
import { showAlert } from "../js/alerts.js";

beforeEach(() => {
  jest.useFakeTimers();
  document.body.innerHTML = "";
});

test("alert se elimina después de 3 segundos", () => {
  showAlert("Hola", "success");

  const alert = document.querySelector(".alert--success");
  expect(alert).not.toBeNull();

  // Ejecutar todos los timers
  jest.runAllTimers();

  // Ahora debería estar eliminado
  expect(document.querySelector(".alert--success")).toBeNull();
});
