#!/usr/bin/env python3

""" test endpoint module """

import requests


def test_endpoint():

	reponse = requests.get(
		"http://localhost:8000/api/v1/get_ai_content?query=python")
	reponse = reponse.json()
	resource = reponse['resources']

	res = resource.split("\n")
	for r in res:
		print(r)

if __name__ == "__main__":
	test_endpoint()
