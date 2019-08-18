FROM python:slim

# set working directory
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app
RUN pip install -r requirements.txt
COPY . /app

CMD [ "python", "app.py" ]
