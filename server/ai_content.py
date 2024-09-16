#!/usr/bin/env python3

"""
This module defines AI handling functions using Google Gemini API to generate
structured learning content based on any user request.
"""

import google.generativeai as gen_ai
import os


def format_prompt(user_request: str) -> str:
    """
        Create a structured prompt from the user request to generate content
        that adheres to the rules provided, including the rules
        for content generation.
        """
    rules = [
            "no plagiarism", "no inappropriate content", "no spam",
            "correct links to resources"
            "if any non related content is generated, please ignore it"
            "if any content is not related to the user request, please ignore it"
            "if uesr request is not about learning a topic, please ignore it"
            ]

    # Add rules to the prompt
    rules_text = "\n".join([f"- {rule}" for rule in rules])

    prompt = f"""
    The user request is: "{user_request}"

    Please generate a learning guide based on the following structure (must include all sections):

        1. Title: Provide the main topic derived from the user's request.

    2. Flags: Specify what the topic is about (e.g., backend, frontend, database, devops, etc.).
       Include multiple flags if applicable.

    3. Introduction: Write an easy and simple introduction to the topic that covers its basics,
       about 5 to 15 lines.

    4. Resources: Provide a list of up to 7 good learning resources (articles, videos, etc.) for the topic.
       Include a variety (e.g., two articles, some videos).

    5. Learning Objectives: Provide 5-10 bullet points outlining what the user will learn from studying this topic.

    headers should be in the format: "## Title" for each section.
    header names should be in the format: "Title", "Flags", "Introduction", "Resources", "Learning Objectives".

    example:
        user request: i want to learn assebmly in simply way.

    ## Learning Assembly Language: A Simple Guide

    ## Flags: Programming, Low-Level, Systems Programming

    ## Introduction

    Assembly language is a low-level programming language that provides a direct interface to a computer's hardware. Unlike high-level languages like Python or JavaScript, assembly language uses mnemonics (short codes) to represent instructions that the CPU can understand. While it might seem complex, learning assembly can offer valuable insights into how computers function and can be useful for tasks like optimizing code, creating device drivers, or even understanding malware.

    ## Resources

    1. **Assembly Language Tutorial (by TutorialsPoint):** A comprehensive guide with examples and exercises covering various assembly concepts. [https://www.tutorialspoint.com/assembly_programming/index.htm](https://www.tutorialspoint.com/assembly_programming/index.htm)
    2. **The Art of Assembly Language Programming:** A book covering assembly language concepts and applications for beginners. [https://www.amazon.com/Art-Assembly-Language-Programming-Second/dp/0131878526](https://www.amazon.com/Art-Assembly-Language-Programming-Second/dp/0131878526)
    3. **YouTube Channel: Ben Eater:** Ben Eater has a great series of videos on building a simple computer from scratch, which includes explanations of assembly language concepts. [https://www.youtube.com/channel/UCt0c86nW390X5_88T69M8eQ](https://www.youtube.com/channel/UCt0c86nW390X5_88T69M8eQ)
    4. **Assembly Language - Crash Course Computer Science #28:** A concise overview of assembly language within the context of computer science. [https://www.youtube.com/watch?v=8-R1U4kI8k0](https://www.youtube.com/watch?v=8-R1U4kI8k0)
    5. **Assembly Programming in Linux:** A detailed guide on assembly programming within the Linux environment. [https://www.linux.com/training-tutorials/assembly-programming-linux](https://www.linux.com/training-tutorials/assembly-programming-linux)

    ## Learning Objectives

    * Understand the basic concepts of assembly language and its role in computer architecture.
    * Learn how to write assembly code for common tasks like arithmetic operations, data manipulation, and control flow.
    * Gain familiarity with assembly language instructions and registers.
    * Develop an understanding of how assembly code interacts with hardware components.
    * Learn about different assembly language dialects and their variations.
    * Explore real-world applications of assembly programming, such as system optimization and device driver creation.

    Make sure to follow these rules for the content generation:
        {rules_text}
    """
    return prompt


def generate_content(user_request: str) -> str:
    """Generate structured content for learning using Google Gemini API."""

    # get the API key from the environment variable
    api_key = os.getenv('API_KEY')
    if not api_key:
        raise ValueError('API_KEY environment variable not set')

    # create a client
    gen_ai.configure(api_key=api_key)
    model = gen_ai.GenerativeModel("gemini-1.5-flash")

    # Format the prompt based on the user's request
    prompt = format_prompt(user_request)

    # Generate the content
    try:
        response = model.generate_content(prompt)
    except Exception as e:
        response = "Not allwoed to generate content for this request."
    # Output the generated content
    return response.text
