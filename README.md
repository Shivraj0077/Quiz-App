# Interactive Quiz Platform

An interactive quiz platform built using **Vite** and **React.js**, featuring authentication, real-time quiz interactions, and a seamless user experience.

## 🚀 Features
- **User Authentication**: Secure login and registration functionality.
- **Real-Time Quizzes**: Interactive quizzes with instant feedback.
- **User Progress Tracking**: Track user scores and performance over time.
- **Responsive UI**: Optimized for both desktop and mobile devices.
- **Fast Performance**: Built with Vite for optimized speed and performance.

## 📊 Workflow
- **Quiz Start**: Clicking the "Start Quiz" button launches the quiz interface and starts the timer.
- **Question Timer**: Each question has a 30-second time limit.
    If the correct answer is selected, the message "Answer is correct" is displayed.
    If the wrong answer is selected, the message "Wrong answer" is displayed along with the correct answer.
- **Auto-Next Question**: Once the timer ends, the next question is automatically displayed—even if no answer was submitted.
- **Track Progress**: After all questions are completed (either by submission or timer expiration), users can review their progress.
    They can check their correct and incorrect answers along with the actual correct answers.

## 📂 Tech Stack
- **Frontend**: React.js (Vite)
- **Authentication**: Firebase/Auth or custom backend (depending on implementation)
- **Deployment**: Vercel

## 🛠 Installation
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- npm or yarn

### Setup & Run Locally
```sh
# Clone the repository
git clone https://github.com/yourusername/your-repo.git
cd your-repo

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
Vercel will automatically deploy the latest changes.

### **Manual Deployment with Vercel CLI**
```sh
npm install -g vercel  # Install Vercel CLI
vercel login           # Authenticate Vercel account
vercel --prod          # Deploy latest changes to production
```

## ⚙️ Environment Variables
Create a `.env` file and add the required environment variables:
```env
VITE_API_URL=your_api_url
VITE_FIREBASE_API_KEY=your_firebase_key
```

## 📜 License
This project is licensed under [MIT License](LICENSE).

## 📞 Contact
For any queries or contributions, reach out via [your-email@example.com] or open an issue in the repository.

