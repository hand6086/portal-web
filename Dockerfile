FROM harbor.quanyou.com.cn/quanyou-tools/frontnodejs:0.1.0

ENV LANG en_US.UTF-8
RUN echo "Asia/shanghai" > /etc/timezone;

ADD app /app
WORKDIR /app

ENTRYPOINT npm run start


EXPOSE 3000
