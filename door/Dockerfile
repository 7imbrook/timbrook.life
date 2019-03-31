FROM python:3.7

COPY ./requirements.txt ./requirements.txt

RUN pip install -r requirements.txt

COPY ./ ./

EXPOSE 5000
CMD ["uwsgi", "--ini", "uwsgi.ini"]
