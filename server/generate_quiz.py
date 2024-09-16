#!/usr/bin/env python3

""" This module generates a quiz based on topic and learning objectives. """

import google.generativeai as gen_ai
import os
from typing import Dict

class QuizGenerator:
    """ QuizGenerator class to generate a quiz """

    def __init__(self):
        """ Initialize the QuizGenerator class """

        # Get the API key from the environment variable
        api_key = os.getenv('API_KEY')
        if not api_key:
            raise ValueError('API_KEY environment variable not set')

        # Configure the generative AI with system instruction
        gen_ai.configure(api_key=api_key)
        self.ai = gen_ai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=(
                "You are a quiz generator. Generate only multiple-choice questions (MCQ) "
                "with exactly 4 answer options. Each question should follow this structure: "
                "Question1: <question text> "
                "Choices1: "
                "A: <option A> "
                "B: <option B> "
                "C: <option C> "
                "D: <option D> "
                "Answer1: <correct option>. "
                "Repeat this format for each question."
            )
        )

    def generate_quiz(self, topic: str, learning_objectives: str, num_questions: int = 5):
        """
        Generate a quiz based on the provided topic and learning objectives.

        Args:
                topic (str): The subject of the quiz (e.g., "Python Programming").
                learning_objectives (list): A list of learning objectives for the quiz.
                num_questions (int): The number of questions in the quiz (default is 5).

        Returns:
                str: The generated quiz as a string.
        """

        # Construct the user-level prompt with specific instructions
        prompt = (
            f"Generate a {num_questions}-question quiz about the topic '{topic}'. "
            f"The questions should assess the following learning objectives: {', '.join(learning_objectives)}. "
            "All questions must follow this structure: "
            "Question1: <question text> "
            "Choices1: "
            "A: <option A> "
            "B: <option B> "
            "C: <option C> "
            "D: <option D> "
            "Answer1: <correct option>. "
            "Each question should have only one correct answer."
        )

        # Send the prompt to the AI and get the response
        response = self.ai.generate_content(prompt)

        return response.text


def clean_data(quiz: str) -> Dict:
    """ Clean the quiz data and return it as a dictionary. """

    quizzes = {}
    quiz_parts = quiz.split("Question")

    for i in range(1, len(quiz_parts)):  # Skip index 0 since it’s before "Question1"
        question_part = quiz_parts[i].strip().replace("*", " ")

        # Extract question text
        question_text = question_part.split("Choices")[0].strip()
        question_number = i
        choices_part = question_part.split("Choices")[1].strip()

        # Split choices and answer
        choices_text = choices_part.split("Answer")[0].strip()
        answer_text = choices_part.split("Answer")[1].strip()

        # Collect choices
        choices = {
            'A': choices_text.split("A:")[1].split("B:")[0].strip(),
            'B': choices_text.split("B:")[1].split("C:")[0].strip(),
            'C': choices_text.split("C:")[1].split("D:")[0].strip(),
            'D': choices_text.split("D:")[1].strip(),
        }

        # Collect final quiz data
        quizzes[question_number] = {
            "question": question_text.split(":")[1].strip(),
            "choices": choices,
            "answer": answer_text.split(":")[1].strip(),
        }

    return quizzes


def generate_quiz_ai(topic: str, learning_objectives: str, num_questions: int = 5) -> Dict:
    """ Generate a quiz based on the provided topic and learning objectives. """

    # Initialize the QuizGenerator
    quiz_generator = QuizGenerator()

    # Generate the quiz
    quiz = quiz_generator.generate_quiz(
        topic, learning_objectives, num_questions)

    # Clean the quiz data
    quizzes = clean_data(quiz)
    return quizzes
