	1. brew install postgresql
		○ Install postgresql in macOS
	2. brew tap heroku/brew && brew install heroku
		○ Install heroku cli in macOS
  3. brew install node
    ○ Install node.js
	
	(No need to use) React (Frontend)
	3. create-react-app djreact-deploy1
		○ create a React App
	4. cd djreact-deploy1/
	5. Update package.json
	6. mkdir -p public/static
	7. mv public/logo*, manifest.json, favicon.ico => public/static/
	8. modify path of manifest.json and favicon.ico in index.html 
	
	Django (Backend)
	9. mkvirtualenv djreact-deploy1
		○ create a virtual env for django
	10. LDFLAGS='-L/usr/local/lib -L/usr/local/opt/openssl/lib -L/usr/local/opt/readline/lib' pip install psycopg2
		○ LDFLAGS is very important!!!!
	11. pip install django djangorestframework whitenoise gunicorn django-heroku
		a. With django-heroku, I save efforts of setting DATABASE_URL, ALLOW_HOSTS, WhiteNoise
	12. django-admin startproject backend .
	13. create backend/views.py (optional)
	14. update backend/urls.py (optional)
	15. update backend/settings.py (optional)
	
	Heroku (Delpoyment)
	16. yarn build
	17. heroku login
	18. heroku create dj-react-1
	19. heroku buildpacks:add --index 1 heroku/nodejs
	20. heroku buildpacks:add --index 2 heroku/python
	21. heroku addons:create heroku-postgresql:hobby-dev
	22. pip freeze > requirements.txt
	23. create runtime.txt
	python-3.7.3
	24. create Procfile
	release: python manage.py migrate
	web: gunicorn backend.wsgi --log-file -
	25. yarn install
	26. git add .
	27. git commit -m "prepare for heroku"
	28. git push heroku master
	(git push heroku video_check_in:master)
