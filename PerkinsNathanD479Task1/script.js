// Mobile navigation
const menuButton = document.querySelector('.menu-toggle');
const mainNavigation = document.querySelector('.main-nav');

if (menuButton && mainNavigation) {
    menuButton.addEventListener('click', function () {
        const isOpen = mainNavigation.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.textContent = isOpen ? 'Close' : 'Menu';
    });

    // Close the menu when a visitor follows a link.
    mainNavigation.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            mainNavigation.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.textContent = 'Menu';
        });
    });
}

// Mock booking form
const bookingForm = document.querySelector('#booking-demo');

if (bookingForm) {
    const serviceSelect = document.querySelector('#booking-service');
    const accommodationSelect = document.querySelector('#stay-type');
    const accommodationOptions = document.querySelector('#stay-options');
    const resultBox = document.querySelector('#booking-result');
    const resultText = document.querySelector('#booking-output');
    const nextLink = document.querySelector('#booking-next');

    function showAccommodationOptions() {
        accommodationOptions.hidden = serviceSelect.value !== 'stay';
    }

    // Some links preselect the service or accommodation category
    const parameters = new URLSearchParams(window.location.search);
    const service = parameters.get('type');
    const stay = parameters.get('stay');

    if (['stay', 'activity', 'transport'].includes(service)) {
        serviceSelect.value = service;
    }
    if (['hotel', 'beach-house', 'bed-breakfast', 'hostel'].includes(stay)) {
        accommodationSelect.value = stay;
    }

    showAccommodationOptions();
    serviceSelect.addEventListener('change', showAccommodationOptions);

    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (serviceSelect.value === 'stay') {
            const selectedText = accommodationSelect.options[accommodationSelect.selectedIndex].text;
            resultText.textContent = 'You selected ' + selectedText +
                '. On a real website you would now review verified listings and availability.';
            nextLink.href = 'stay.html';
            nextLink.textContent = 'Explore Where to Stay';
        } else if (serviceSelect.value === 'activity') {
            resultText.textContent = 'You selected an activity or tour.' +
                ' On a real website you would now compare verified activity providers.';
            nextLink.href = 'activities.html';
            nextLink.textContent = 'Explore Things to Do';
        } else {
            resultText.textContent = 'You selected transportation.' +
                ' On a real website you would now compare verified transport providers.';
            nextLink.href = 'transportation.html';
            nextLink.textContent = 'Explore Transportation';
        }

        resultText.textContent += ' No reservations or payments are processed by this prototype.';
        resultBox.hidden = false;
        resultBox.focus();
    });
}
