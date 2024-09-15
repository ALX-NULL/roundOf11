#!/usr/bin/env python3

""" a module that gets json data from ai generated content """

import ai_content
from typing import Dict, Union


def clean_data(data: Dict) -> Dict:
    """Clean the data by removing unnecessary characters."""
    # removing #, * and extra
    for key, value in data.items():
        data[key] = value.replace("#", "").replace("*", "").strip()

    return data


def get_ai_json(user_request: str) -> Union[Dict, None]:
    """Get AI generated content in JSON format."""
    content = ai_content.generate_content(user_request)
    indexes = {
        "title": 0,
        "flags": content.find('Flags'),
        "introduction": content.find('Introduction'),
        "resources": content.find('Resources'),
        "learning_objectives": content.find('Learning Objectives')
    }

    for val in indexes.values():
        if val == -1 or content[val:].find('N/A') != -1 or content[val:].find(
                'None') != -1:
            print("Error: Content not found in the response.")
            return None

    data = {
        "title": content[indexes["title"]:indexes["flags"]],
        "flags": content[indexes["flags"]:indexes["introduction"]],
        "introduction": content[indexes["introduction"]:indexes["resources"]],
        "resources":
        content[indexes["resources"]:indexes["learning_objectives"]],
        "learning_objectives": content[indexes["learning_objectives"]:]
    }

    data = clean_data(data)
    return data
