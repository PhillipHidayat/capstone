# MedCapture

## Description

MedCapture is a groundbreaking software system designed to empower medical professionals in their daily tasks. In the fast-paced world of healthcare, accurate documentation and effective communication are paramount. MedCapture addresses these critical needs by offering an intuitive touch interface that enables medical practitioners to efficiently identify, label, and highlight specific areas of concern during patient examinations.

## Deployement
You can find us here: https://nav-update.dr6qa5vtvriu2.amplifyapp.com/

This prject was deployed using AWS Amplify. AWS Amplify offers a serverless platform for creating and deploying single page web applications. Our application was built using React for our front end web page as well as AWS for our back end resources. 


## Installation and Setup
In addition to the steps below, you will need an AWS account with the proper IAM permissions and to access AWS Amplify otherwise you will not be able to generate a back end. 

1. Clone the repository
```
git clone https://capstone-cs.eng.utah.edu/medcapture/medcapture.git
```
2. Install NodeJS here https://nodejs.org/en/download/current (you may need to restart your terminal or ide after the installation completes for it to recognize npm commands)
3. Navigate to the medcapture folder and install dependencies with the following commands:
```
cd medcapture
npm install
```
4. Install AWS Amplify here https://docs.amplify.aws/ (Get started for free -> React -> Amplify CLI -> Install Amplify CLI)
5. Follow the steps on getting started and signing into the amplify CLI. 
6. run the following command to spin up the required AWS resources (This will take some time).
```
amplify push
```

7. To run the application:
```
npm start
```

## Usage
This site is intended for Opthomologists and other eye medical professionals who conduct eye examinations. The software provides an electronic system for conducting, storing, editing, and generating eye examinations.


## Authors and acknowledgment
Tanner Jones, Ben Sheppard, Phillip Hidayat and Ryan Springborn


## Project status
Beta Stage, Final Release April 19th
