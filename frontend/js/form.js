import { validators } from "./validations.js";
import { api } from "./api.js";
import { showAlert } from "./alerts.js";

export async function handleFormSubmit(event) {
    event.preventDefault();

    const data = {
        name: event.target.name.value,
        email: event.target.email.value,
        subject: event.target.subject.value,
        message: event.target.message.value
    };

    const errors = validators.form(data);

    if (Object.keys(errors).length > 0) {
        const firstError = Object.values(errors)[0];
        showAlert(firstError, "error");
        return;
    }

    try {
        const result = await api.contact(data);
        showAlert("Mensaje enviado correctamente", "success");
        event.target.reset();
    } catch (err) {
        showAlert("Hubo un error al enviar el mensaje", "error");
    }
}
