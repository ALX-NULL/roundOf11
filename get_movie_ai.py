#!/usr/bin/env python3

""" a module that gets the movies from API based on """

import google.generativeai as gen_ai
import os
from typing import List


def __format_prompt__(user_request: str) -> str:
    """
    Create a structured prompt from the user request to generate content that
    adheres to the rules provided, including the rules for content generation.
    """

    prompt = f"""
	Provide me a list of movies related to the topic "{user_request}".
	Please include and follow the structure of the following details for each movie:\

	Title: The title of the movie.

	only the Title should be in the format: "Title:".
	only movies not documentaries.
	maximum 10 movies.
	"""
    return prompt


def generate_movies(user_request: str) -> str:
    """Generate structured content for learning using Google Gemini API."""

    # get the API key from the environment variable
    api_key = os.getenv('API_KEY')
    if not api_key:
        raise ValueError('API_KEY environment variable not set')

    # create a client
    gen_ai.configure(api_key=api_key)
    model = gen_ai.GenerativeModel("gemini-1.5-flash")

    # Format the prompt based on the user's request
    prompt = __format_prompt__(user_request)

    # Generate the content
    try:
        response = model.generate_content(prompt)
    except Exception as e:
        response = "Not allwoed to generate content for this request."
    # Output the generated content
    return response.text


def get_movies_list(user_request: str) -> List[str]:
    """Send the cleaned data to the user."""
    data = generate_movies(user_request)
    cleaned = []
    for movie in data.split("\n"):
        m = movie.replace("*", "").strip()
        if m.find('Title') != -1:
            m = m.split(":")
            if len(m) > 1:
                cleaned.append(m[1].strip())
    cleaned = list(set(cleaned))
    return cleaned
