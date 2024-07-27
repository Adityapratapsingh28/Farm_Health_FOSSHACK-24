window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 2000); 
});


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
        let content;
        switch(page) {
            case 'farmer-laws':
                content = `
            <h2>Farmer Laws</h2>
            <p>1. Pradhan Mantri Fasal Bima Yojana (PMFBY)<br>
            * If your crop fails, you can claim insurance to cover your losses, ensuring you don't suffer financially.<br>
            * This is a crop insurance scheme that provides financial support if your crops are damaged by natural events like floods, droughts, pests, or diseases.</p>
            
            <p>2. Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)<br>
            * You can get support to set up efficient irrigation systems like drip or sprinkler irrigation, ensuring your crops get enough water and improve yields.<br>
            * This scheme aims to improve irrigation systems to ensure that every field gets water.</p>
            
            <p>3. Kisan Credit Card (KCC) Scheme<br>
            * You can use this card to get money when you need it for your farming expenses and repay it later at low-interest rates.<br>
            * This scheme provides you with a credit card that gives you easy access to loans for buying seeds, fertilizers, pesticides, and other farming needs.</p>
            
            <p>4. Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)<br>
            * You will receive Rs. 6,000 each year in three installments, which can help cover your farming expenses and personal needs.<br>
            * This scheme provides small and marginal farmers with Rs. 6,000 per year, directly deposited into their bank accounts.</p>
            
            <p>5. National Agriculture Market (e-NAM)<br>
            * This is an online platform that connects different agricultural markets across India, allowing you to sell your produce to buyers from different states.<br>
            * You can list your produce online and reach a larger market, potentially getting better prices without leaving your village.</p>
            
            <p>6. Soil Health Card Scheme<br>
            * You can use the soil health card to know what nutrients your soil needs, helping you make informed decisions about fertilizers and improving your crop yields.<br>
            * This scheme provides you with a card that gives detailed information about the health of your soil and recommendations on how to improve it.</p>
            
            <p>7. Paramparagat Krishi Vikas Yojana (PKVY)<br>
            * You get financial assistance and training to adopt organic farming practices, which can improve soil fertility and produce healthier crops.<br>
            * This scheme promotes organic farming to improve soil health and produce chemical-free crops.</p>
             `;
                break;
            case 'farming-schemes':
                content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est daborum.";
                break;
            default:
                content = `<p>This is the ${page} content.</p>`;
                break;
        }
        popupTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ');
        popupBody.innerHTML = content;
        popup.style.display = 'block';
    }

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
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
            // New translations
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
            // New translations
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
