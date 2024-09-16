# ALX Learning Bot
An AI powered platform designed to automatically generate and assess quizzes, streamlining the process of creating and evaluating assessments. The platform offers advanced features to enhance both teaching and learning experiences, providing instant feedback and integrating seamlessly with Learning Management Systems (LMS).

## **Features**

- **AI-Generated Learning Resources**: Automatically generates resources and questions across a range of subjects and difficulty levels.
- **Instant Evaluation**: Provides immediate feedback on quizzes, including detailed explanations for each question.
- **LMS Integration**: Easily integrates with Learning Management Systems to manage and deliver quizzes effectively.

## **Technology Stack**

### **Backend**

- **FastAPI**: A high-performance web framework for building APIs with Python. It supports asynchronous programming and offers interactive documentation.
- **MongoDB**: A NoSQL database that stores quiz data and results efficiently with flexible schema designs.
- **Generative AI**: Utilizes advanced AI technologies to generate relevant quiz questions based on input topics and content.

### **Frontend**

- **React**: A powerful JavaScript library for building dynamic and interactive user interfaces, ensuring a seamless user experience.
- **TailwindCSS**: A utility-first CSS framework that facilitates rapid and efficient design of modern, responsive user interfaces.

## **Setup Instructions**

To set up the development environment for **ALX - Learning Bot**, follow these instructions:

### **Backend Setup**
- make sure you have Python3 `>=3.9` and Redis `>=4` installed
- `cd server` then run: `pip install -r requirements.txt` to install dependencies
- to start the development server run: `fastapi dev web/app.py`


### **Frontend Setup**
- make sure you have Nodejs `>=v18` installed
- `cd client` then run: `npm install` to install dependencies
- to start the development server run: `npm run dev`
