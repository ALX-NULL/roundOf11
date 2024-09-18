#!/usr/bin/env python3

""" test topic generation  """

import json
from ai_generate.content_gen import generate_content


def test_topic_generation(r):
    """Test the topic generation function."""

    data = generate_content(r)

    # Extract title
    title = data.get("title", "No title found")

    # Extract flags
    flags = data.get("flags", [])

    # Extract introduction
    introduction = data.get("introduction", "No introduction found")

    # Extract resources
    resources = {}
    for resource in data.get("resources", []):
        title = resource.get("title", "No title")
        description = resource.get("description", "No description")
        url = resource.get("url", "No URL")
        resources[title] = {"description": description, "url": url}

    # extract learning objectives
    learning_objectives = data.get("learning_objectives", [])

    print("title: ", title)
    print("flags: ", flags)
    print("intro: ", introduction)
    print("resources: ", resources)
    print("learning objectives: ", learning_objectives)


if __name__ == "__main__":
    r = input("Enter the topic: ")
    test_topic_generation(r)
