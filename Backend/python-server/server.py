from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path
import os
import json

pythonServer = Path(__file__).resolve().parent
systemOntology = pythonServer / 'ontology'

class OntologyHandler(BaseHTTPRequestHandler):
    def send_reponse(self, status, type, response):
        self.send_response(status)
        self.send_header('Content-Type', type)
        self.end_headers()
        self.wfile.write(response)
        
    def do_GET(self):
        json_path = systemOntology / 'json' / 'paths.json'
        try:
            with open(json_path, 'r') as json_file:
                paths = json.load(json_file)
            json_string = json.dumps(paths)
            
            self.send_reponse(200, 'application/json', json_string.encode('utf-8'))
        except FileNotFoundError:            
            print(json_path)
            self.send_reponse(404, 'text/html', b'File not found')

def main():
    PORT = 8181
    server  = HTTPServer(("", PORT), OntologyHandler)
    print("Ontology server is listening on port:", PORT)
    server.serve_forever()
    
    
if __name__ == "__main__":
    main()