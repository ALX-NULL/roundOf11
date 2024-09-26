source server/web/set_env_vars
source server/.venv/bin/activate
fastapi dev server/web/app.py
