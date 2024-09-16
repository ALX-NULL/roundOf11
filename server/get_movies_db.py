#!/usr/bin/env python3

""" a module that gets the movies from API based on 
topic provided by the user """

import requests
import os
import json
from typing import List, Dict



def get_movie(name: str) -> json:
	"""Get the movie based on the name."""
	url = f"https://api.themoviedb.org/3/search/multi?query={name}"

	headers = {
	 "accept": "application/json",
	 'Authorization': os.getenv('MOVIES_API_KEY')
	}

	response = requests.get(url, headers=headers).json()

	return response


def get_movies_list(user_request: str) -> Dict:
	"""Get the list of movies based on the user request."""
	movies = {}
	response = get_movie(user_request)
	if response.get('results'):
		for movie in response['results']:
			try:
				movies[movie['title']] = {
					'overview':
					movie['overview'],
					'poster_path':
					'https://image.tmdb.org/t/p/w500' +
					str(movie['poster_path']),
					'release_date':
					movie['release_date'],
					'name':
					movie['original_title'],
					'popularity':
					movie['popularity'],
					'average_vote':
					movie['vote_average']
				}
			except Exception as e:
				pass
				
	return movies
