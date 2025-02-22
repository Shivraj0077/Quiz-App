# Interactive Quiz Platform

An interactive quiz platform built using **Vite** and **React.js**, featuring real-time quiz interactions, and a seamless user experience.

## 🚀 Features
- **Real-Time Quizzes**: Interactive quizzes with instant feedback.
- **User Progress Tracking**: Track user scores and performance over time.
- **Responsive UI**: Optimized for both desktop and mobile devices.
- **Fast Performance**: Built with Vite for optimized speed and performance.
- **IndexedDb**: IndexedDb is used as database to store user's submissions, and track their progress in detail.

## 📊 Workflow
- **Quiz starts**: On clicking the start quiz button the quiz interface arrives and immediately the quiz starts with timer for every question.
- **Question's Timer**: Every question has 30 seconds of time limit to submit. Once question is submitted if correct option is selected "Answer is correct will be displayed". If wrong answer is submitted Wrong answer   
    with correct option is displayed.
- **Next Option**: Once timer is finised next question is automatically displayed(even if answer is not submitted to current question as per time limit).
- **Track Progress**: Once all questions timer is finished or all questions are submitted, user can view their progress of all submissions made and check their right and wrong answers with actual correct answers.

## 📂 Tech Stack
- **Frontend**: React.js (Vite)
- **Deployment**: Vercel

## 🛠 Installation
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- npm or yarn

### Setup & Run Locally
```sh
# Clone the repository
git clone https://github.com/Shivraj0077/Quiz-App.git
cd my-app

# Install dependencies
npm install  # or yarn install

# Start development server
npm run dev  # or yarn dev
```

## 🚀 Deployment
### **Automatic Deployment (GitHub)**
If your project is connected to Vercel via GitHub, just push changes:
```sh
git add .
git commit -m "Updated features"
git push origin main  # or your deployment branch
```

## Deployed Website

https://quiz-platform-79ua1rfpd-shivrajs-projects-0880d39f.vercel.app/

## Contact
Email: shivrajpawar6906@gmail.com

