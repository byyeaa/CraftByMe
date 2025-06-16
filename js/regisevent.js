document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);

    // Ambil semua parameter yang mungkin dari URL
    const eventId = urlParams.get('event_id');
    const eventName = urlParams.get('name');
    const eventDate = urlParams.get('date');
    const eventTime = urlParams.get('time');
    const eventDescription = urlParams.get('description');
    const eventImage = urlParams.get('image');

    // Elemen HTML untuk menampilkan detail event
    const eventMainTitle = document.getElementById('event-main-title');
    const eventDescriptionFull = document.getElementById('event-description-full');
    const eventDateEl = document.getElementById('event-date');
    const eventTimeEl = document.getElementById('event-time');
    const eventImageEl = document.getElementById('event-image');

    // Elemen formulir
    const hiddenEventIdInput = document.getElementById('hidden-event-id');
    const hiddenEventNameInput = document.getElementById('hidden-event-name');
    const registrationForm = document.getElementById('registration-form');
    const submitButton = document.getElementById('submit-button');

    if (eventId) {
        eventMainTitle.textContent = eventName || 'Event Details';
        eventDescriptionFull.textContent = eventDescription || 'No description available.';
        eventDateEl.textContent = eventDate || 'Date not specified';
        eventTimeEl.textContent = eventTime || 'Time not specified';
        if (eventImage) {
            eventImageEl.src = eventImage;
            eventImageEl.alt = eventName || 'Event Image';
        } else {
            eventImageEl.style.display = 'none'; 
        }

        hiddenEventIdInput.value = eventId;
        hiddenEventNameInput.value = eventName || '';

    } else {
        eventMainTitle.textContent = 'Event Not Found!';
        eventDescriptionFull.textContent = 'Please go back to the events page and select an event.';
        registrationForm.style.display = 'none'; 
        eventImageEl.style.display = 'none'; 
        eventDateEl.style.display = 'none';
        eventTimeEl.style.display = 'none';
        submitButton.textContent = 'Go to Events Page';
        submitButton.onclick = () => window.location.href = 'events.html'; 
    }

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const formData = new FormData(registrationForm);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        console.log('Mengirim data pendaftaran:', data);

      
        alert(`Pendaftaran untuk "${data.eventName}" berhasil! Data: \nNama: ${data.fullName}\nEmail: ${data.emailAddress}\nDiet: ${data.dietaryRestrictions}\nTamu: ${data.numGuests}`);
         window.location.href = 'events.html';
    });
});