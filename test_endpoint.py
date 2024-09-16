#!/usr/bin/env python3

""" test endpoint module """

import requests


def test_endpoint_ai_generation():

	reponse = requests.get(
	 "http://localhost:8000/api/v1/get_ai_content?query=python")
	reponse = reponse.json()
	resource = reponse['resources']

	res = resource.split("\n")
	for r in res:
		print(r)


def test_endpoint_quiz():
	response = requests.get(
		"http://localhost:8000/api/v1/quiz?topic=python&learning_objectives=python"
	)
	response = response.json()

	# convert it do dict
	quiz = dict(response)
	for key, value in quiz.items():
		print("the question is: ", value['question'])
		print("choiuces: ", value['choices'])
		print("answer: ", value['answer'])

		print("the correct choice", value['choices'][value['answer']])
		print("*" * 50)
if __name__ == "__main__":

	test_endpoint_quiz()
