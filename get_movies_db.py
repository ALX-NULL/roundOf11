#!/usr/bin/env python3

""" a module that gets the movies from API based on
topic provided by the user """

import requests
import os
import json
from typing import List, Dict


def get_movie(name: str) -> json:
    """Get the movie based on the name."""
    url = f"https://api.themoviedb.org/3/search/movie?query={name}"

    headers = {
        "accept": "application/json",
        "Authorization": os.getenv("MOVIES_API_KEY")
    }

    response = requests.get(url, headers=headers).json()

    return response


def get_movies_list(user_request: str) -> Dict:
    """Get the list of movies based on the user request."""
    movies = {}
    response = get_movie(user_request)
    if response.get('results'):
        for movie in response['results']:
            movies[movie['title']] = movie
    return movies
