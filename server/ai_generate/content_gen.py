#!/usr/bin/env python3
""" """

import os
import google.generativeai as gemini


class ContentGen:
    """ """
    rules = [
            "no plagiarism", "no inappropriate content", "no spam",
            "correct links to resources",
            "if any non related content is generated, please ignore it",
            "if any content is'nt related to user request, please ignore it",
            "if uesr request is'nt about learning a topic, please ignore it"
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
        except Exception:
            response = "Sorry, Cannot generate conteent for this request."
            self.content = response
        self.content = response.text

    def convert_json(self):
        """Get AI generated content in JSON format."""
        if not hasattr(self, "content"):
            print("Error: Content not generated.")
            return None

        indexes = {
                "title": 0,
                "flags": self.content.find('Flags'),
                "introduction": self.content.find('Introduction'),
                "resources": self.content.find('Resources'),
                "learning_objectives": self.content.find('Learning Objectives')
                }

        for val in indexes.values():
            if val == -1 or self.content[val:].find('N/A') != -1 or self.content[val:].find(
                    'None') != -1:
                print("Error: Content not found in the response.")
                return None

        self.data = {
                "title": self.content[indexes["title"]:indexes["flags"]],
                "flags": self.content[indexes["flags"]:indexes["introduction"]],
                "introduction": self.content[indexes["introduction"]:indexes["resources"]],
                "resources": self.content[indexes["resources"]:indexes["learning_objectives"]],
                "learning_objectives": self.content[indexes["learning_objectives"]:]
                }


def generate_content(topic: str) -> dict:
    gen = ContentGen()
    gen.generate_request(topic)
    gen.generate_content()
    gen.convert_json()

    for key, value in gen.data.items():
        gen.data[key] = value.replace("#", "").replace("*", "").strip()
    return gen.data
