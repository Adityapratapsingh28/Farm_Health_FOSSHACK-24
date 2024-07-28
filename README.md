# Farm_Health - Farming made easy :seedling:

## Problem Statement 📚
Farmers in india due to lack of knowledge and awareness about plant disesae did'nt know that from which disesae thier plant is suffering from and which lead them to the huge ecomonic loss and crop wastage , many websites are there to help them but these websites are only available on English language , but since majorty of the farmers only knows thier regional and local languages.This language issue create more complication to communicate with them and to help them using usefull technology.

## Our Solution :computer:
Farm_Heath is specially decined  platform for  farmers , it uses neural networks to predict the disease of potato plant by just unploading the photo of leaf from your device, with the help of NLP it will also be providing insides on analysing the growth of fertiliser product  using sentimental analysis and summary of huge reviews in 5 lines . This website also be providing some useful farming laws and schemes given by our government which are available on regional languages such as hindi, english, & tamil .

## Key Features 🤖
- Plant disease prediction

   - Our Deep learning model will take the image of plant from user and predict the disease from which thbe plant is suffering from.

- Fertilizer analysis summarization

   - NLP model using webscrapping and month on month sentimental analysis on amazon reviews of each year given by user and it will provide the summary of all the reviews so the farmer can get a idea that how is the product is that product is going to help him or not.
 
- Multilingual website

   - Our website is available on three languages right now that are hindi , english & tamil. This will provide ease of communication and readability to farmers.
 
- Farmers laws/schemes

   - Since many farmers are unaware about the farmer laws given by our goverment and schemes provided by the goverment to help farmers, so on our website we have provided the laws & schemes in a very easy simple language so the farmer can understand easily.
 
- Website Interface: 

  - User-friendly website interface for easy interaction and navigation.
 
- Enhanced Model Training:

  - Our deep learning model is trained and tested and the accuracy is 98% , while our summarization analysis model is also performing good.
 
## Technology Used :bulb:
### Deep learning :brain:
- Data loading from kaggle
- preprocessing and resize of images
- Data Augmentation
- Splitting of dataset
- Trainig of model using CNN

### Natural Language Processing :dart:
- Web Scraping using beautiful soup & requests
- Data cleaning using nltk and langid
- Applying tfidef, textblob, nmf to get top 1000 reviews.(opensource)
- summarization using falconsai/text_summarization(opensource)

 ### Web :magic_wand:
 - HTML CSS
 - Vanila js
 - FastAPI

## Graph

<img width="373" alt="graph" src="https://github.com/user-attachments/assets/362127fb-cde2-4efa-bb55-f24fe9580b2e">

## Future Scope and Scalability & Contribution 🚀
- include more dataset of different plants so the farmers can predict different plants disease.
- add more languages such as bengali , marathi , bhojpuri , telegu , malayalam etc according to the location of the user.
- add a weather warning system for farmers that will warn farmer a day before of heavy rainfall or bad weather to reduce loss.
- add a chatbot which is available on difffernet languages to ease communication.
- add more fertilizer reviews to the website which will help farmers to buy good fertilizer that will not harm their crops.

## Setup Instructions 🛠
### Prerequisites
Before you proceed with the setup, ensure that you have the following prerequisites installed on your system:
- [Python](https://www.python.org/)(version 3.7 or higher)
- [pip](https://pip.pypa.io/en/stable/)
- [Git](https://git-scm.com/)
