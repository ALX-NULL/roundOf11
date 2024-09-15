#!/usr/bin/env python3

""" test movies module """

import get_movies_db


if __name__ == "__main__":
	r = input("Enter the movie name: ")
	print(get_movies_db.get_movies_list(r))