## Server side of the project
### Installation
1. Make python virtual environment
```bash
python -m venv <name_of_virtual_environment>
```
2. Activate virtual environment
```bash
source <name_of_virtual_environment>/bin/activate
```
3. Install requirements
```bash
pip install -r requirements.txt
```
4. Install redis
```bash
sudo apt-get install redis-server
```
6. activate redis
```bash
systemctl start redis
```
7. source env variables
```bash
source web/set_env_vars
```
8. Run the server
```bash
fastapi dev web/app.py
```
### endpoints
#### ai content
1. head to "http://127.0.0.1:8000/api/v1/get_ai_content?query=<query>"
2. Replace <query> with the topic you want to learn
#### movies
1. head to "http://127.0.0.1:8000/api/v1/get_movies?query=<query>"
2. Replace <query> with the movie you want to find
