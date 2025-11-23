
export const validators = {
    isEmpty: value => value.trim().length === 0,
    isEmail: value => /\S+@\S+\.\S+/.test(value),

    form(data){
        const errors = {};

        if (this.isEmpty(data.name)) errors.name= "El nombre es obligatorio.";
        if(!this.isEmail(data.email)) errors.email = "El email es obligatorio.";
        if(this.isEmpty(data.subject)) errors.subject = "El asunto es obligatorio.";
        if(this.isEmpty(data.message)) errors.message = "El mensaje es obligatorio";

        return errors;
    }
}