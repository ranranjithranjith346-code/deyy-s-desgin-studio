// MOBILE MENU

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", function () {

    navbar.classList.toggle("active");

    const isOpen = navbar.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.textContent = isOpen ? "✕" : "☰";

});

// CLOSE MENU AFTER CLICKING A LINK

document.querySelectorAll(".navbar a").forEach(function (link) {

    link.addEventListener("click", function () {

        navbar.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.textContent = "☰";

    });

});

// AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// SET MINIMUM EVENT DATE

const eventDate = document.getElementById("eventDate");

const today = new Date();

const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

eventDate.min = localToday;


// BOOKING FORM

const bookingForm = document.getElementById("bookingForm");

const formMessage = document.getElementById("formMessage");


// IMPORTANT:
// Replace this with your studio WhatsApp number.
// Example: 919876543210
// Include country code, without + or spaces.

const STUDIO_WHATSAPP = "8015783821";


bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const email = document.getElementById("email").value.trim();

    const eventType = document.getElementById("eventType").value;

    const date = document.getElementById("eventDate").value;

    const packageType = document.getElementById("package").value;

    const message = document.getElementById("message").value.trim();


    // CHECK NAME

    if (name.length < 2) {

        showMessage("Please enter your full name.", "error");

        return;

    }


    // CHECK PHONE NUMBER

    if (!/^[0-9]{10}$/.test(phone)) {

        showMessage("Please enter a valid 10-digit phone number.", "error");

        return;

    }


    // CHECK EVENT DATE

    if (!date || date < localToday) {

        showMessage("Please select today or a future event date.", "error");

        return;

    }


    // CHECK WHATSAPP NUMBER

    if (!/^[0-9]{10,15}$/.test(STUDIO_WHATSAPP)) {

        showMessage(
            "Studio WhatsApp number is not configured yet. Please contact the studio directly.",
            "error"
        );

        return;

    }


    // PREPARE BOOKING MESSAGE

    const bookingDetails =

        "Hello Deyy's Desgin Studio!%0A%0A" +

        "*New Photography Booking Enquiry*%0A%0A" +

        "Name: " + encodeURIComponent(name) + "%0A" +

        "Phone: " + encodeURIComponent(phone) + "%0A" +

        "Email: " + encodeURIComponent(email || "Not provided") + "%0A" +

        "Event: " + encodeURIComponent(eventType) + "%0A" +

        "Date: " + encodeURIComponent(date) + "%0A" +

        "Package: " + encodeURIComponent(packageType) + "%0A" +

        "Message: " + encodeURIComponent(message || "No additional message");


    const whatsappURL =

        "https://wa.me/<8015783821>" + STUDIO_WHATSAPP +

        "?text=" + bookingDetails;


    // OPEN WHATSAPP

    const whatsappWindow = window.open(
        "https://wa.me/<8015783821>"
        "_blank"
    );

    if (whatsappWindow) {

        showMessage(
            "Your booking enquiry is ready in WhatsApp. Please press Send to submit it.",
            "success"
        );

    } else {

        showMessage(
            "WhatsApp could not be opened. Please allow pop-ups and try again.",
            "error"
        );

    }

});


function showMessage(message, type) {

    formMessage.textContent = message;

    formMessage.className = type;

}