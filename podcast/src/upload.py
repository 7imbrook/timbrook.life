import os
import boto3
from flask import Flask, Response

app = Flask(__name__)

key = os.environ.get("ACCESS_KEY_ID")
secret = os.environ.get("SECRET_ACCESS_KEY")

s3 = boto3.client(
    "s3",
    aws_access_key_id=key,
    aws_secret_access_key=secret,
    region_name="sfo2",
    endpoint_url="https://sfo2.digitaloceanspaces.com",
)


@app.route("/<upload_id>")
def upload(upload_id):
    return s3.generate_presigned_url(
        ClientMethod="put_object",
        Params={"Bucket": "timbrook-podcast", "Key": upload_id},
        ExpiresIn="720",
    )
