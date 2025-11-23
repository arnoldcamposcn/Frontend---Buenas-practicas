


export function showAlert(message, type="success"){
    const alert = document.createElement("div");
    alert.className = `alert alert--${type}`;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}
