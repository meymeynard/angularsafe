'''
from handlers.handlers import IndexHandler, CalculateHandler, \
    ImpactJSONHandler, ImpactPDFHandler, \
    ImpactStyleHandler, ImpactMapPDFHandler, FileTreeHandler
from handlers.layer_handlers import LayerHandler
'''
from handlers.handlers import IndexHandler, FileTreeHandler, WebsafeHandler    
from handlers.menu_handlers import Menu1Handler, Menu2Handler
from modules import NavbarModule

import os.path
import tornado.web

# This is where we encode the urls with their respective handlers   
handlers = [
    (r"/", IndexHandler),
    (r"/filetree", FileTreeHandler),
    #(r"/calculate", CalculateHandler),
    #(r"/layers", LayerHandler)
]

#This adds the modules that AngularJS' routing service uses
handlers += [
    (r"/api/menulevel1", Menu1Handler),
    (r"/api/menulevel2", Menu2Handler),
    (r"/api/websafe", WebsafeHandler)
]

'''
handlers += [
    (r"/impactstyle", ImpactStyleHandler),
    (r"/json", ImpactJSONHandler),
    (r"/mappdf", ImpactMapPDFHandler),
    (r"/pdf", ImpactPDFHandler),
]
'''

class Application(tornado.web.Application):
	def __init__(self):
		settings = dict(
			template_path=os.path.join(os.path.dirname(__file__), "templates"),
			static_path=os.path.join(os.path.dirname(__file__), "static"),
			debug=True,
            ui_modules = {'Navbar': NavbarModule}
		)
		tornado.web.Application.__init__(self, handlers, **settings)