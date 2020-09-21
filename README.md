# css-portal
a simple customer service system portal using react , react-bootstrap and python

# dependence

Nodejs == 12.18.2
nodejs dependence in `/frontend`

Phython == 3.8.4
python dependence in `/backend`

# debug

use `//"proxy": "http://123.150.8.50:8000/",` in package.json, and set REACT_APP_BACKEND_SERVER in .env

# deploy

1. in `/frontend`, RUN `npm run build`
2. copy `/frontend/build/static/*` to `backend/static/*`
3. rename the js files and css files link in `backend/page/templates/page/index.html`
4. install git and get source code : `yum install git`, `git clone https://github.com/astwyg/css-portal.git`
5. (assuming you are using `CentOS Linux release 7.6.1810 (Core)`) install os dependencies: `yum install epel-release mysql-devel gcc gcc-devel python3-devel`
6. prepare python env: `pip3 install virtualenv -i https://pypi.tuna.tsinghua.edu.cn/simple`, `pip install -r requirments.txt -i https://pypi.tuna.tsinghua.edu.cn/simple`
7. prepare your django app: 1) copy your `config.py` to `/css-portal/backend/backend`. 2) RUN `python manage.py migrate`, `python manage.py collectstatics`
8. config gunicorn: `pip3 install gunicorn`, RUN `gunicorn --bind 127.0.0.1:9000 --chdir /root/css-portal/backend/ wsgi`
9. set your nginx(v1.18) `vim /etc/nginx/conf.d/default.conf`:
```
server {
    listen 81;
    server_name nisp.phytium.com.cn;

    location = /favicon.ico { access_log off; log_not_found off; }
    location ^~/static/ {
        root /var/www;
        #proxy_pass http://127.0.0.1:9000;
    }

    location / {
        proxy_pass http://127.0.0.1:9000;
    }
}
```


everytime you update the static files, you have to run `python manage.py collectstatic` and restart gunicorn.


# howto

## 1)给MSS(市场,销售,支持)部门人员批量生成激活码权限

增加新用户组MSS, 授予下列权限:

* 用户|Can view user
* 邀请码|Can add Users
* invite code batch| 批量创建
* invite code batch| Can view invite code batch
* 平台用户| Can view Users

# Docker 

## Django

    git clone https://github.com/astwyg/css-portal.git
    ./docker_build.sh
    
Run: add env to start shell as follows:

    docker run --name my-nisp -p 9000:9000 -e DEBUG=True -e SECRET_KEY='' -e BATCH_INVITE_SECRET='' -e BACKDOOR_INVITE_CODE='' -e UDESK_ENTRY='' -e UDESK_ADMIN_EMAIL='' -e UDESK_ADMIN_PASSWD='' -e UDESK_V1_SECRET='' -e UDESK_V1_WEB_IM_KEY='' -e DB_NAME='' -e DB_USER='' -e DB_PASSWORD='' -e DB_HOST='' -e DB_PORT='' -d phytium/nisp-python:3-alpine3.12
