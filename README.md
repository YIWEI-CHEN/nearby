# nearby
> Whoever needs, we are nearby to help.

- With increasing demand in senior care, we aim to develop a platform offering peer-to-peer in-home care service.
- Our system will be able to match care-seeker and provider according to their locations and preferences.
## Heroku Link
https://nearby-deepmining.herokuapp.com/

## Prerequisites
1. python 3 ([runtime.txt](https://github.com/YIWEI-CHEN/nearby/blob/master/runtime.txt))
2. virtualenvwrapper   
3. django ([requirements.txt](https://github.com/YIWEI-CHEN/nearby/blob/master/requirements.txt))
4. node.js \
`brew install node`
5. yarn \
`brew install yarn`
6. postgresql \
`brew install postgresql`
7. heroku \
`brew tap heroku/brew && brew install heroku`

## Setup
1. `git clone https://github.com/YIWEI-CHEN/nearby/ nearby`
2. `cd nearby`
3. `mkvirtualenv nearby` \
 (`workon nearby`)
4. `LDFLAGS='-L/usr/local/lib -L/usr/local/opt/openssl/lib -L/usr/local/opt/readline/lib' pip install psycopg2`
5. `pip install -r requirements.txt`
5. `yarn install`

## Local Testing
1. `yarn build`
2. `python manager.py migrate`
3. `python manager.py runserver`
4. open `localhost:8000`
5. or `localhost:3000`

## Deployment
1. `herolu login`
2. `heroku create <Your App Name>`
3. `heroku buildpacks:add --index 1 heroku/nodejs`
4. `heroku buildpacks:add --index 2 heroku/python`
5. `heroku addons:create heroku-postgresql:hobby-dev`
5. make sure you commit all changes by `git commit -am "msg"`
6. `git push heroku master` \
(`git push heroku HEAD:master`)
