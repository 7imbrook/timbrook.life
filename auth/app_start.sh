#!/bin/bash

uwsgi --http 0.0.0.0:5000 --wsgi-file auth.py --master --callable app