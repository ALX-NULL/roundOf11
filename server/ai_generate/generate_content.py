#!/usr/bin/env python3
"""Module to generate content based on a user request."""

import os
import google.generativeai as gemini
import json


class ContentGen:
	"""Generate class used to generate content based on a user request."""

	def __init__(self):
		"""Initialize methond for new instance of the ContentGen class."""
		self.api_key = os.getenv("API_KEY2")
		self.template_path = "server/ai_generate/template.txt"
		self.rules_apth = "server/ai_generate/rules.txt"

	def prepare_prompt(self, topic: str):
		"""Create a structured prompt for the AI based on passed topic."""
		with open(self.rules_apth, "r") as file:
			rules = file.read()
		with open(self.template_path, "r") as file:
			template = file.read()

		self.prompt = f"""
			You are a learning guide creator.
			request must follow these rules
				{rules}
			generate a learning guide following this temp:
				{template}
			The request is: "{topic}"
			"""

	def produce_content(self):
		"""Generate content based on the prompt."""

		if not self.api_key:
			print("API key not found.")
			return None

		if not self.prompt:
			print("Prompt not found.")
			return None

		gemini.configure(api_key=self.api_key)
		model = gemini.GenerativeModel("gemini-1.5-flash")
		try:
			response = model.generate_content(self.prompt)
		except Exception as e:
			print(f"Error: {e}")
			return None

		try:
			self.content = response.text
			self.content = self.content.strip()
			if self.content.startswith("```json"):
				self.content = self.content[8:]
				self.content = self.content[:-3]
		except Exception as e:
			print(f"Error: {e}")
			return None

	def json_convert(self):
		"""Convert the generated content to a JSON format."""
		try:
			data = json.loads(self.content)
		except Exception as e:
			return {"error": f"404{e}"}

		return data


def generate_content(topic: str) -> dict:
	"""Main function to generate content based on a user request."""

	# decode the string beacuse the input could be in antoher language
	topic = str(topic.encode("utf-8").decode("utf-8"))
	print(topic)
	gen = ContentGen()
	gen.prepare_prompt(topic)
	gen.produce_content()
	return gen.json_convert()


if __name__ == "__main__":
	print(generate_content("React"))
	print(generate_content("tomatos"))
