FROM python:3.7-alpine3.12

MAINTAINER IascCHEN

# 更新Alpine的软件源为国内（清华大学）的站点 TUNA
RUN echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.12/main" > /etc/apk/repositories && \
    echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.12/community" >> /etc/apk/repositories && \
    echo "https://mirror.tuna.tsinghua.edu.cn/alpine/edge/testing" >> /etc/apk/repositories

# This hack is widely applied to avoid python printing issues in docker containers.
# See: https://github.com/Docker-Hub-frolvlad/docker-alpine-python3/pull/13
ENV PYTHONUNBUFFERED=1

RUN apk update && apk upgrade && \
    apk add --virtual tempPacks python2 gyp gcc g++ make libffi-dev openssl-dev libtool && \
    apk add --no-cache mysql-client nodejs npm

RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

ARG NPM_REGISTRY="https://registry.npm.taobao.org"
ARG SAAS_REGISTRY="https://npm.taobao.org/mirrors/node-sass"
RUN npm config set registry ${NPM_REGISTRY}
RUN npm config set sass_binary_site ${SAAS_REGISTRY}

WORKDIR /opt/app
# RUN git clone https://github.com/astwyg/css-portal.git

COPY ./frontend/package.json ./frontend/package.json
RUN echo "**** Init FrontEnd ****" && \
    cd frontend && \
    echo "  node version: $(node --version)" && \
    echo "  npm version: $(npm --version)" && \
    npm install

COPY ./backend/requirements.txt ./backend/requirements.txt
RUN echo "**** Init Backend ****" && \
    cd backend && \
    echo "  python version: $(python --version)" && \
    echo "  pip version: $(pip --version)" && \
    pip install -r ./requirements.txt

RUN echo "======"

COPY ./backend /opt/app/backend/
# RUN ls -la /opt/app/backend
COPY ./frontend /opt/app/frontend/
# RUN ls -la /opt/app/frontend

WORKDIR /opt/app/frontend
RUN echo "**** Build FrontEnd ****" && \
    npm run build && \
    cp -r ./build/static ../backend/ && \
    cp ./build/index.html ../backend/page/templates/page/
RUN apk del tempPacks

WORKDIR /opt/app/backend
RUN echo "**** Build Backend ****" && \
    echo "  python version: $(python --version)" && \
    python manage.py migrate && \
    python manage.py collectstatic

# RUN ls -la /opt/app/backend/static

RUN pip install gunicorn

EXPOSE 9000
# CMD ["python", "manage.py", "runserver", "0.0.0.0:9000"]
CMD ["gunicorn", "backend.wsgi", "-c", "gun.conf.py"]
