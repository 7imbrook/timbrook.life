FROM python:3.7

COPY ./src/requirements.txt ./
RUN pip install -r requirements.txt

COPY ./src/ ./src
COPY ./conf/ ./conf
COPY ./entrypoint.sh ./entrypoint.sh

EXPOSE 5000

ENTRYPOINT [ "./entrypoint.sh" ]
