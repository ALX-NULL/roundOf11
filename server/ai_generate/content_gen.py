#!/usr/bin/env python3
""" """

import os
import google.generativeai as gemini
import json


class ContentGen:
	""" """
	rules = [
	 "no plagiarism", "no inappropriate content", "no spam",
	 "correct links to resources",
	 "if any non related content is generated, please ignore it",
	 "if any content is'nt related to user request, please ignore it",
	 "if user request isn't about learning a topic, please ignore it"
	]

	def __init__(self):
		self.api_key = os.getenv("API_KEY")

	def generate_request(self, topic: str):
		"""Create a structured prompt for the AI to generate content."""

		rules_text = "\n".join([f"- {rule}" for rule in self.rules])
		with open("server/ai_generate/template.txt", "r") as file:
			template = file.read()
		with open("server/ai_generate/example_respond.txt", "r") as file:
			example = file.read()

		self.prompt = f"""
			The user request is: "{topic}"
			Please generate a learning guide based on the following structure
			(must include all sections):
			{template}
			Here is an example of the content structure:
			{example}
			Make sure to follow these rules for the content generation:
			{rules_text}
			"""

	def generate_content(self):
		"""Generate content based on the prompt."""
		gemini.configure(api_key=self.api_key)
		model = gemini.GenerativeModel("gemini-1.5-flash")
		try:
			response = model.generate_content(self.prompt)
		except Exception as e:
			print(f"Error: {e}")
			return None
		self.content = response.text

	def convert_json(self):
		"""Convert the AI generated content string into a dictionary."""
		if not hasattr(self, "content"):
			print("Error: Content not generated.")
			return None

		# Assuming self.content is already a valid JSON string, we use json.loads()
		try:
			self.data = json.loads(self.content)
		except json.JSONDecodeError as e:
			print(f"Error converting content to JSON: {e}")
			return None

		return self.data


def generate_content(topic: str) -> dict:
	gen = ContentGen()
	gen.generate_request(topic)
	gen.generate_content()

	# Convert the content string to a real Python dictionary
	try:
		data = json.loads(gen.content)
	except json.JSONDecodeError as e:
		return {"error": "404"}
		
	return data


if __name__ == "__main__":
	# Example usage
	response = generate_content("python")
	print(response)
