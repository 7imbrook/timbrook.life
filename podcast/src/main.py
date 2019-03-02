import requests
from flask import Flask, Response
from bs4 import BeautifulSoup
from datetime import datetime


app = Flask(__name__)


def populate_episode(doc, data):
    item = doc.new_tag("item")
    bare_tags = {
        "title": data["name"],
        "itunes:duration": data["duration"],
        "description": data["description"],
        "itunes:subtitle": data["description"],
        "itunes:summary": data["description"],
    }
    for t, v in bare_tags.items():
        tag = doc.new_tag(t)
        tag.string = v
        item.append(tag)

    guid = doc.new_tag("guid", isPermaLink="flase")
    guid.string = data["url"]
    item.append(guid)

    item.append(doc.new_tag("enclosure", url=data["url"], type="audio/mpeg"))

    return item


def populate_podcast(doc, channel, podcast):
    # basics
    bare_tags = {
        "title": podcast["name"],
        "description": podcast["description"],
        "language": "en-us",
        "docs": "http://www.rssboard.org/rss-specification",
        "generator": "myself",
        "lastBuildDate": datetime.now().ctime(),
    }
    for t, v in bare_tags.items():
        tag = doc.new_tag(t)
        tag.string = v
        channel.append(tag)

    # Links
    link = podcast["url"] 
    lt = doc.new_tag("link")
    lt.string = link
    channel.append(lt)

    lta = doc.new_tag("atom:link", href=link, rel="self")
    channel.append(lta)

    # iTunes category and friends
    cat = doc.new_tag("itunes:category", text="Technology")
    cat.append(doc.new_tag("itunes:category", text="Podcasting"))
    channel.append(cat)

    channel.append(
        doc.new_tag(
            "itunes:image",
            href="https://timbrook-podcast.sfo2.digitaloceanspaces.com/podcover.png",
        )
    )
    expl = doc.new_tag("itunes:explicit")
    expl.string = "yes"
    channel.append(expl)

    # Episodes
    for ep in podcast['episodes']:
        channel.append(populate_episode(doc, ep))

    return channel


def get_podcasts(id):
    res = requests.get(
        "http://10.245.228.207/podcasts",
        headers={"Accept": "application/vnd.pgrst.object+json"},
        params={"select": "*,episodes(*)", "id": f"eq.{id}"},
    )

    return res.json()


@app.route("/pod.xml")
def podcasts():
    doc = BeautifulSoup(features="xml")

    rss_feed = doc.new_tag(
        "rss",
        **{
            "xmlns:atom": "http://www.w3.org/2005/Atom",
            "xmlns:content": "http://purl.org/rss/1.0/modules/content/",
            "xmlns:itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
            "version": "2.0",
        },
    )

    channel = doc.new_tag("channel")
    channel = populate_podcast(doc, channel, get_podcasts(1))

    rss_feed.append(channel)
    doc.append(rss_feed)

    return Response(str(doc), mimetype="text/xml")
