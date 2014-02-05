import tornado.web

class Menu1Handler(tornado.web.RequestHandler):
    def get(self):
        self.render("menu/menulevel1.html")
        
class Menu2Handler(tornado.web.RequestHandler):
    def get(self):
        self.render("menu/menulevel2.html")