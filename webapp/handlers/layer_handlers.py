import tornado.web
import json, httplib, urllib2, glob, os, sys
from Settings import ROOT, DATA_PATH
from subprocess import call

from safe.api import read_layer

'''This is the handler for the API call that returns the json metadata of a layer 
'''
class LayerHandler(tornado.web.RequestHandler):
    def get(self):
        purpose = self.get_argument("purpose")
        filename = self.get_argument("filename")
        if "GeoJSON" in purpose:
            output = filename[:-4]
            output = output + '.json'
            self.set_header("Content-Type", "application/json")
            try:
                with open(output) as data:
                    f = data.read()
                    self.write(f)
                    data.close()
            except:
                try:
                    call(['ogr2ogr', '-f', 'GeoJSON', output, filename])
                    data = open(output)
                    f = data.read()
                    self.write(f)
                    data.close()
                except:
                    raise# HTTPError(500)
        elif "keywords" in purpose:
            layer_type = self.get_argument("layer_type")
            encoding = sys.getfilesystemencoding()

            layer = read_layer(filename.encode(encoding))
            json_data = layer.keywords
            json_data.update({ "name": layer.name })
            self.set_header("Content-Type", "application/json")
            self.write(json.dumps(json_data))
