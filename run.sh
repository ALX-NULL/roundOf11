python -m venv spinner
source ./spinner/bin/activate
pip install -r server/requirements.txt
source server/web/set_env_vars
sudo apt install redis
sudo service redis-server start
fastapi dev server/web/app.py
