# css-portal
a simple customer service system portal using react , react-bootstrap and python

# dependence

Nodejs == 12.18.2
nodejs dependence in `/frontend`

Phython == 3.8.4
python dependence in `/backend`

# deploy

1. in `/frontend`, RUN `npm run build`
2. copy `/frontend/build/static/*` to `backend/static/*`
3. rename the js files and css files link in `backend/page/templates/page/index.html`
4. install git and get source code : `yum install git`, `git clone https://github.com/astwyg/css-portal.git`
5. (assuming you are using `CentOS Linux release 7.6.1810 (Core)`) install os dependencies: `yum install epel-release mysql-devel gcc gcc-devel python3-devel`
6. prepare python env: `pip3 install virtualenv -i https://pypi.tuna.tsinghua.edu.cn/simple`, `pip install -r requirments.txt -i https://pypi.tuna.tsinghua.edu.cn/simple`, `pip3 install `
7. prepare your django app: 1) copy your `config.py` to `/css-portal/backend/backend`. 2) RUN `python manage.py makemigration`, `python manage.py collectstatics`
8. config gunicorn: `pip3 install gunicorn`, RUN `gunicorn --bind 0.0.0.0:81 --chdir /root/css-portal/backend/ wsgi`

