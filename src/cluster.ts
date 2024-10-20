import cluster from 'cluster';
import { cpus } from 'os';
import {
  createServer,
  IncomingMessage,
  ServerResponse,
  request,
  RequestOptions
} from 'http';
import { app } from './app';
import { userDB } from './db';
import { User } from './types';

const PORT = parseInt(process.env.PORT!) || 4000;
const numCPUs = cpus().length;
const workers: number[] = [];

if (cluster.isPrimary) {
  let currentWorker = 0;

  for (let i = 1; i < numCPUs; i++) {
    const workerPort = PORT + i;
    workers.push(workerPort);
    const worker = cluster.fork({ PORT: workerPort});
    worker.send({ users: userDB })
  }

  const balancer = createServer((req: IncomingMessage, res: ServerResponse) => {
    const workerPort = PORT + (currentWorker % (numCPUs - 1)) + 1;
    currentWorker++;

    const options: RequestOptions = {
      hostname: 'localhost',
      port: workerPort,
      path: req.url,
      method: req.method,
      headers: req.headers
    }

    const proxy = request(options, (workerRes) => {
      res.writeHead(workerRes.statusCode!, workerRes.headers);
      workerRes.pipe(res)
    })

    req.pipe(proxy);
  })

  balancer.listen(PORT, () => {
    console.log(`Load balancer listening on port ${PORT}`)
  })

  const broadcastMessageToWorkers = (msg: { users: User[] }, senderWorkerId: number) => {
    for (const id in cluster.workers) {
      if (cluster.workers[id] && cluster.workers[id]?.id !== senderWorkerId) {
        cluster.workers[id].send(msg)
      }
    }
  }

  for (const worker of Object.values(cluster.workers!)) {
    if (worker) {
      worker.on('message', (msg) => {
        broadcastMessageToWorkers(msg, worker.id)
      });
    }
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`)
    const newWorkerPort = PORT + workers.length + 1;
    const newWorker = cluster.fork({ PORT: newWorkerPort })
    workers.push(newWorkerPort)
    newWorker.on('message', (msg) => {
      broadcastMessageToWorkers(msg, newWorker.id)
    });
  })
} else {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}