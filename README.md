# OCR-Frontend
A simple and clean OCR [Image to Text] web app.

### Steps to run the OCR app locally:
  1. Open up a terminal in Visual Studio Code.
  2. Navigate into a directory where you want the code to be stored.
  3. Run these 2 commands to clone both the frontend and the backend of the app.
     ```
     git clone https://github.com/Shilish/OCR-Frontend.git
     ```
     ```
     git clone https://github.com/Shilish/OCR-Backend.git
     ```
  4. Now we have both the frontend and backend on our local machine.
  5. Navigate into each of the 2 directories in separate CLIs and run
     ```
     npm install
     ```
  6. Create a .env file in both of the folders.
  7. The .env file in the Frontend folder should contain
     ```
     REACT_APP_API_URI = http://localhost:3001⁠
     ```
  8. The .env file in the Backend folder should contain
     ```
     PORT = 3001
     API_URI = http://localhost:3001⁠ //NEEDS TO BE SET TO THE LINK THAT CAN ACCESS THE API(Does not always match the port)
     MONGO_URI = "Your MongoURI here"
     ```
  9. In the CLI of the Frontend directory run
      ```
      npm start
      ```
  10. In the CLI of the Backend directory run
      ```
      npm run js
      ```

If you visit `http://localhost:3000` on your browser you should now see the app running.
