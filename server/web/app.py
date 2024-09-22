import json
import redis.asyncio as redis
import socket
from fastapi import FastAPI, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Optional
from difflib import SequenceMatcher
from ai_generate import generate_content as AI
from ai_generate import generate_quiz as AI_quiz
from get_movie_ai import get_movies_list
from get_movies_db import get_movies_list as movies_from_db
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def check_redis_service(host='localhost', port=6379):
    try:
        # Try to connect to the Redis server
        sock = socket.create_connection((host, port), timeout=2)
        sock.close()
        return True
    except (socket.timeout, ConnectionRefusedError):
        return False


if not check_redis_service():
    pass
else:
    redis_client = redis.Redis(host='localhost', port=6379)
EXPIRY_TIME = 10800  # 3 hours in seconds


# Helper function to calculate LCS similarity
def lcs_similarity(query1: str, query2: str) -> float:
    return SequenceMatcher(None, query1, query2).ratio()


# Cache storage and retrieval logic with key namespace
async def cache_response(query: str, content: Dict, namespace: str):
    if not check_redis_service():
        return
    key = f"{namespace}_{query}"
    await redis_client.setex(key, EXPIRY_TIME, json.dumps(content))


async def get_cached_response(query: str, namespace: str) -> Optional[Dict]:
    if not check_redis_service():
        return
    keys = await redis_client.keys(f"{namespace}_*")

    for key in keys:
        stored_query = key.decode("utf-8").replace(f"{namespace}_", "")
        # Check if LCS similarity is high enough (e.g., > 0.8 threshold)
        if lcs_similarity(query, stored_query) > 0.8:
            cached_content = await redis_client.get(key)
            if cached_content:
                return json.loads(cached_content)
    return None


@app.get('/api/v1/get_ai_content')
async def get_ai_content(query: str, response: Response) -> Dict:
    """ Get AI-generated content, cache it,
    and use Redis for session management """

    # Use 'ai_query_' namespace for AI-generated content
    namespace = "ai_query"

    # Try to get a cached response if the query is similar to an existing one
    cached_response = await get_cached_response(query, namespace)
    if cached_response:
        return cached_response

    # If no cached response, generate new content from AI
    ai_content = AI.generate_content(query)

    if ai_content and len(ai_content) > 3:
        # Cache the new query and response for 3 hours
        await cache_response(query, ai_content, namespace)
        return ai_content
    else:
        return {}


@app.get('/api/v1/get_movies')
async def get_movies(query: str, response: Response) -> Dict:
    """Get a list of movies based on the user query."""

    namespace = "movies_query"

    # Try to get a cached response if the query is similar to an existing one
    cached_response = await get_cached_response(query, namespace)
    if cached_response:
        return cached_response

    # Fetch new movies based on the query
    # Ensure the async function is awaited
    movies = get_movies_list(query)
    dict_movies = {}

    for movie in movies:
        dict_movies[movie] = movies_from_db(movie)
    if dict_movies:
        # Cache the new query and response for 3 hours
        await cache_response(query, dict_movies, namespace)
        return dict_movies
    else:
        return HTTPException(
            status_code=404, detail="No content found for the given query.")


@app.get('/api/v1/quiz')
def generate_quiz(topic: str, learning_objectives: str) -> Dict:
    """Generate a quiz based on the provided topic and learning objectives."""
    # Use the AI model to generate a quiz
    quiz_generator = AI_quiz.generate_quiz_ai(topic,
                                              learning_objectives,
                                              num_questions=5)
    return quiz_generator
