FROM python:3.7

WORKDIR /root/src
COPY ./requirements.txt ./requirements.txt

RUN pip install -r requirements.txt

COPY ./ ./

EXPOSE 5000

ENV FLASK_ENV=production
ENV FLASK_APP=mailer.py
CMD ["flask", "run", "--host=0.0.0.0"]
