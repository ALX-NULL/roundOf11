#!/usr/bin/env python3
"""Module to generate content based on a user request."""

import os
import google.generativeai as gemini
import json


class ContentGen:
    """Generate class used to generate content based on a user request."""
    rules = [
            "not empty",
            "clear",
            "related to a learning topic",
            "no random words or characters",
            "no offensive language",
            "no hate speech",
            "no personal attacks",
            "no harassment",
            "no threats",
            "no violence",
            "no discrimination",
            "no spam",
            "no plagiarism",
            "no inappropriate request",
            ]

    def __init__(self):
        """Initialize methond for new instance of the ContentGen class."""
        self.api_key = os.getenv("API_KEY")
        self.template_path = "server/ai_generate/template.txt"
        self.example_path = "server/ai_generate/example_respond.txt"

    def prepare_prompt(self, topic: str):
        """Create a structured prompt for the AI based on passed topic."""

        rules_text = "\n".join([f"- {rule}" for rule in self.rules])
        with open(self.template_path, "r") as file:
            template = file.read()
        with open(self.example_path, "r") as file:
            example = file.read()

        self.prompt = f"""
            The user request is: "{topic}"
            the user request must follow these rules, if not ignore it:
                {rules_text}
            generate a learning guide based on the following structure
            (must include all sections):
                {template}
            Here is an example of the respond you must produce (json format):
                {example}
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
    gen = ContentGen()
    gen.prepare_prompt(topic)
    gen.produce_content()
    return gen.json_convert()


if __name__ == "__main__":
    # Example usage
    # response = generate_content("potaotos")
    # print(response)
    # response = generate_content("blah blah balh")
    # print(response)
    # response = generate_content("how to kill pepole")
    # print(response)
    # response = generate_content("kfjdfjiejsdlfjsk")
    # print(response)
    # response = generate_content("shit")
    # print(response)
    response = generate_content("python")
    print(response)
    response = generate_content("sex")
    print(response)
