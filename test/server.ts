import fs from 'fs';
import http from 'http';
import https from 'https';
import optimist from 'optimist';
import path from 'path';
import url from 'url';

function main() {
  const opts = optimist.options('port', {
        default: 9797,
        describe: 'HTTPS service port'
      })
      .options('help', {
        alias: '?',
        describe: 'Display this help'
      })
      .boolean('help');

  const argv = opts.argv;

  if (argv.help) {
    opts.showHelp();
    return;
  }

  const httpsOpts = {
    key: fs.readFileSync('./test/key.pem'),
    cert: fs.readFileSync('./test/cert.pem')
  };

  https.createServer(httpsOpts, processRequest).listen(argv.port, '0.0.0.0');
  http.createServer(processRequest).listen(argv.port + 1, '0.0.0.0');


  console.log(`Server running at https://127.0.0.1:${argv.port}/`);
}

const mimeTypes: {[s: string]: string;} = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
};

async function processRequest(request: http.IncomingMessage, response: http.ServerResponse) {
    const parsedUrl = url.parse(request.url, true);
    const serverPath = parsedUrl.pathname;

    const dirPath = path.resolve(process.cwd(), './');
    const localPath = path.join(dirPath, serverPath);
    if (!localPath.startsWith(dirPath)) {
      console.log(`attempt to load ${localPath} within ${dirPath}`);
      response.writeHead(404, {
        'Content-Type': "text/plain"
      });
      response.write('not found.');
      response.end();
      return;
    }
  
    const header: {[s: string]: string;} = {
      'access-control-allow-origin': '*'
    };
  
    const mimeType = mimeTypes[path.extname(localPath)];
    if (mimeType) {
      header['Content-Type'] = mimeType;
    }
  
    try {
      const content = await new Promise((resolve, reject) => {
        fs.readFile(localPath, (error, content) => {
          if (error) {
            reject(error);
          } else {
            resolve(content);
          }
        });
      });
  
      response.writeHead(200, header);
      response.write(content, 'binary');
      response.end();
    } catch (e) {
      response.writeHead(500, {
          'Content-Type': "text/plain"
        });
      response.write(e + '\n');
      response.end();
    }
  }

main();
