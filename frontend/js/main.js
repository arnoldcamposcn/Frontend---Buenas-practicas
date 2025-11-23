

import { handleFormSubmit } from "./form.js";

document.addEventListener("DOMContentLoaded", () => {
   const form = document.getElementById("contactForm");
   form.addEventListener("submit", handleFormSubmit);
});