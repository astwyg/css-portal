FROM arm64v8/ubuntu:20.04

MAINTAINER IascCHEN

# 更新Ubuntu的软件源为国内（清华大学）的站点 TUNA
RUN echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ focal main restricted universe multiverse" > /etc/apt/sources.list && \
    echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ focal-updates main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ focal-backports main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ focal-security main restricted universe multiverse" >> /etc/apt/sources.list

# This hack is widely applied to avoid python printing issues in docker containers.
# See: https://github.com/Docker-Hub-frolvlad/docker-alpine-python3/pull/13
ENV PYTHONUNBUFFERED=1

RUN apt update && apt upgrade -y && apt install -y apt-utils
RUN apt install -y build-essential libssl-dev libffi-dev python3-dev python3-pip curl gcc g++ make libmysqlclient-dev \
    mysql-client nginx

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt install -y nodejs gyp

RUN echo "  python3 version: $(python3 --version)" && \
    echo "  pip3 version: $(pip3 --version)" && \
    echo "  node version: $(node --version)" && \
    echo "  npm version: $(npm --version)"

RUN pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

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
    echo "  python3 version: $(python3 --version)" && \
    echo "  pip3 version: $(pip3 --version)" && \
    pip3 install -r ./requirements.txt

RUN echo "======"

COPY ./nginx/nginx_gunicorn.conf /etc/nginx/conf.d/nginx_gunicorn.conf

COPY ./backend /opt/app/backend/
# RUN ls -la /opt/app/backend
COPY ./frontend /opt/app/frontend/
# RUN ls -la /opt/app/frontend

WORKDIR /opt/app/frontend
RUN echo "**** Build FrontEnd ****" && \
    npm run build && \
    cp -r ./build/static ../backend/ && \
    cp ./build/index.html ../backend/page/templates/page/

WORKDIR /opt/app/backend
RUN echo "**** Build Backend ****" && \
    echo "  python3 version: $(python3 --version)" && \
    mkdir -p logs && \
    python3 manage.py migrate && \
    python3 manage.py collectstatic

# RUN ls -la /opt/app/backend/static

RUN pip3 install gunicorn

EXPOSE [80, 9000]
# CMD ["python3", "manage.py", "runserver", "0.0.0.0:9000"]
CMD ["gunicorn", "backend.wsgi", "-c", "gun.conf.py"]
