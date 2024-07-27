window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 2000); 
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger-menu');
const sideMenu = document.querySelector('.side-menu');
const closeBtn = document.querySelector('.close-btn');
const menuItems = document.querySelectorAll('.menu-items a');
const popup = document.querySelector('.popup');
const popupTitle = document.getElementById('popup-title');
const popupBody = document.getElementById('popup-body');
const closePopup = document.querySelector('.close-popup');

hamburger.addEventListener('click', () => {
    sideMenu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('active');
});

menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.closest('a').getAttribute('data-page');
        if (page === 'home') {
            window.location.reload();
        } else {
            showPopup(page);
        }
        sideMenu.classList.remove('active');
    });
});

function showPopup(page) {
    popupTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);
    popupBody.innerHTML = `<p>This is the ${page} content.</p>`;
    popup.style.display = 'block';
}

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Image upload functionality
document.querySelector('.upload-box').addEventListener('click', () => {
    document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = "Uploaded Image";
            img.style.maxWidth = "100%";
            document.getElementById('image-preview').innerHTML = "";
            document.getElementById('image-preview').appendChild(img);
        }
        reader.readAsDataURL(file);
    }
});

// Language translation functionality
const languageSelect = document.getElementById('language-select');
const translatableElements = document.querySelectorAll('[data-translate]');

const translations = {
    en: {
        "FarmHealth": "FarmHealth",
        "Farming Made Easy": "Farming Made Easy",
        "Upload Image": "Upload Image",
        "Home": "Home",
        "Fertiliser": "Fertiliser",
        "Constitution": "Constitution",
        "About Us": "About Us"
    },
    hi: {
        "FarmHealth": "फार्म हेल्थ",
        "Farming Made Easy": "खेती आसान हुई",
        "Upload Image": "छवि अपलोड करें",
        "Home": "होम",
        "Fertiliser": "उर्वरक",
        "Constitution": "संविधान",
        "About Us": "हमारे बारे में"
    },
    ta: {
        "FarmHealth": "பண்ணை ஆரோக்கியம்",
        "Farming Made Easy": "விவசாயம் எளிதாக்கப்பட்டது",
        "Upload Image": "படத்தை பதிவேற்றவும்",
        "Home": "முகப்பு",
        "Fertiliser": "உரம்",
        "Constitution": "அரசியலமைப்பு",
        "About Us": "எங்களை பற்றி"
    }
};

function translatePage(language) {
    translatableElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
}

languageSelect.addEventListener('change', (e) => {
    translatePage(e.target.value);
});

translatePage('en');