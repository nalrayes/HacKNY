import codecs
import json
import sys
import logging

import requests
from dshelpers import request_url

def unshort(url):
    """
    Take a URL as string and returned unshortened form using expandurl API.
    """
    query_url = 'http://www.linkexpander.com/?url={}'.format(url)
    r = request_url(query_url)

    output_json = json.loads(r.text)

    end_url = output_json['end_url']
    if end_url.startswith('http') or end_url.startswith('https'):
        return output_json['end_url']
    # for examples, where "end_url": "/Homepage.aspx",
    # "urls": ["http://t.co/l638KnZ1Zb", "http://starcb.com", "/Homepage.aspx"]
    else:
        return output_json['urls'][-2]