FROM python:3.7

COPY ./src/requirements.txt ./
RUN pip install -r requirements.txt

COPY ./src/ ./

ENV FLASK_APP=main
ENV FLASK_ENV=production

ENTRYPOINT [ "flask", "run", "--host", "0.0.0.0" ]
