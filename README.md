# Overview
Race-Dar is an interactive quiz application designed to test users' ability to identify ethnicities based on images. The app dynamically fetches images from an S3 bucket and provides feedback based on user responses. It includes features such as responsive design, dynamic delays for correct and incorrect answers, and a results page summarizing the user's performance.

### Features
Dynamic Image Loading: Images are fetched from an S3 bucket based on categories.
Responsive Design: Optimized for both desktop and mobile devices.
Feedback Mechanism: Displays correct answers and highlights incorrect responses.
Progress Tracking: Tracks user progress and displays scores.
Results Page: Summarizes the user's performance with text and images.

### Technologies Used
Frontend: React (with TypeScript)
Routing: React Router
State Management: React Hooks (useState, useEffect)
Image Hosting: AWS S3 Bucket
Deployment: Netlify

### Project requirements
Prerequisites
Node.js (v14 or higher)
npm or yarn

### Installation Steps
Clone the repository:
Navigate to the project directory:
Install dependencies:
Start the development server:
Open the app in your browser at http://localhost:3000.
Deployment
The application is deployed on Netlify. You can access it at: https://racedar.netlify.app

### How to deploy code 
Push your code to a GitHub repository.
Connect the repository to Netlify.
Configure build settings:
Build Command: npm run build
Publish Directory: build
Deploy the site.

### 
Project Structure
race-dar/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── img/icons/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── QuizBlock/
│   │   └── Result/
│   ├── pages/
│   │   ├── Quiz/
│   │   └── Result/
│   ├── common/
│   ├── utils/
│   └── App.tsx
├── package.json
└── README.md

### Known Issues
Caching: Ensure the browser cache is cleared after deploying updates to avoid stale assets.
Mobile Responsiveness: Some elements may require additional adjustments for smaller screens.

### Future Enhancements
Leaderboard: Add a leaderboard to track top scores.
User Authentication: Allow users to log in and save their progress.
Additional Categories: Expand the quiz with more diverse categories and images.

### License
This project is licensed under the MIT License. See the LICENSE file for details.

