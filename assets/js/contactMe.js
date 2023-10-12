emailjs.init("3ipKWk5aNaq8KkHQ4");
const btn = document.getElementById("button");

document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    btn.value = "Sending...";

    const serviceID = "default_service";
    const templateID = "template_td7d4x9";

    emailjs.sendForm(serviceID, templateID, this).then(
        () => {
            btn.value = "Send Email";
            alert("Message Sent Succesfully. Check your mail for Confirmation");
        },
        (err) => {
            btn.value = "Send Email";
            alert(JSON.stringify(err));
        }
    );
});
