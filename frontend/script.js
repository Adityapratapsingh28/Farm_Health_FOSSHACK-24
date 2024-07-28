window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 2000); 
});

// Function to highlight the current section in the menu
function highlightCurrentSection() {
    const scrollPosition = window.scrollY;

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.id;

        if (scrollPosition >= sectionTop - 50 && scrollPosition < sectionTop + sectionHeight - 50) {
            menuItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-page') === sectionId) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Add scroll event listener to highlight current section
window.addEventListener('scroll', highlightCurrentSection);

// ... rest of your code ...;

document.addEventListener('DOMContentLoaded', () => {
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

    document.getElementById('summarizeBtn').addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:8000/generate_review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            document.getElementById('summary').textContent = data.summary;
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('summary').textContent = 'An error occurred while fetching the summary.';
        }
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

   

    // Image upload functionality
    document.querySelector('.upload-box').addEventListener('click', () => {
        document.getElementById('file-input').click();
    });

    document.getElementById('file-input').addEventListener('change', async (event) => {
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

            // Send the image to the backend for prediction
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:8000/predict', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    displayPredictionResult(result);
                } else {
                    console.error('Prediction failed');
                    displayPredictionResult({ error: 'Prediction failed' });
                }
            } catch (error) {
                console.error('Error:', error);
                displayPredictionResult({ error: 'An error occurred' });
            }
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
            "Farmer Laws" : "Farmer Laws",
            "Farming Schemes" : "Farming Laws",
            "About Us": "About Us",
            "Farm Schemes": "Farm Schemes",
            "Prediction": "Prediction",
            "Confidence": "Confidence",
            "Early Blight": "Early Blight",
            "Late Blight": "Late Blight",
            "Healthy": "Healthy",
            "Error": "Error"
        },
        hi: {
            "FarmHealth": "फार्म हेल्थ",
            "Farming Made Easy": "खेती आसान हुई",
            "Upload Image": "छवि अपलोड करें",
            "Home": "होम",
            "Fertiliser": "उर्वरक",
            "Farmer Laws" : "किसान कानून",
            "Farming Schemes" : "खेती की योजनाएँ",
            "About Us": "हमारे बारे में",
            "Farm Schemes": "कृषि योजनाएं",
            "Prediction": "भविष्यवाणी",
            "Confidence": "विश्वास",
            "Early Blight": "प्रारंभिक अंगमारी",
            "Late Blight": "देर से अंगमारी",
            "Healthy": "स्वस्थ",
            "Error": "त्रुटि"
        },
        ta: {
            "FarmHealth": "பண்ணை ஆரோக்கியம்",
            "Farming Made Easy": "விவசாயம் எளிதாக்கப்பட்டது",
            "Upload Image": "படத்தை பதிவேற்றவும்",
            "Home": "முகப்பு",
            "Fertiliser": "உரம்",
            "Farmer Laws" : "விவசாயி சட்டங்கள்",
            "Farming Schemes" : "விவசாய திட்டங்கள்",
            "About Us": "எங்களை பற்றி",
            // New translations
            "Prediction": "கணிப்பு",
            "Confidence": "நம்பிக்கை",
            "Early Blight": "ஆரம்ப கருகல் நோய்",
            "Late Blight": "தாமத கருகல் நோய்",
            "Healthy": "ஆரோக்கியமான",
            "Error": "பிழை"
        }
    };

    function displayPredictionResult(result) {
        const resultElement = document.getElementById('prediction-result');
        const currentLanguage = languageSelect.value;

        if (result.error) {
            resultElement.textContent = `${translations[currentLanguage]["Error"]}: ${result.error}`;
        } else {
            const predictionText = translations[currentLanguage]["Prediction"];
            const confidenceText = translations[currentLanguage]["Confidence"];
            const classText = translations[currentLanguage][result.class] || result.class;

            resultElement.textContent = `${predictionText}: ${classText} (${confidenceText}: ${(result.confidence * 100).toFixed(2)}%)`;
        }

        // Store the original result data as a data attribute
        resultElement.setAttribute('data-result', JSON.stringify(result));
    }

    // Modified translatePage function
    function translatePage(language) {
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });

        // Re-display the prediction result in the new language
        const resultElement = document.getElementById('prediction-result');
        if (resultElement.textContent) {
            // If there's a result displayed, update it
            const result = JSON.parse(resultElement.getAttribute('data-result'));
            displayPredictionResult(result);
        }
    }

    // The rest of your code remains the same

    languageSelect.addEventListener('change', (e) => {
        translatePage(e.target.value);
    });

    translatePage('en');
});
