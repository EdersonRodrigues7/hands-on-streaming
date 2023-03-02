import Camera from "../../../lib/shared/camera.js";
import Controller from "./controller.js";
import Service from "./service.js";
import { supportsWorkerType } from "../../../lib/shared/util.js";
import View from "./view.js";

async function getWorker(){
  if(supportsWorkerType) {
    const worker = new Worker('./src/worker.js', {type: 'module'});
    return worker;
  };

  const workerMock = {
    async postMessage() {},
    onmessage(msg) {}
  };

  return workerMock;
}

const worker = await getWorker();
worker.postMessage('HEY');
const camera = await Camera.init();
const [rootPath] = window.location.href.split('/pages/')

const factory = {
  async initialize() {
    return Controller.initialize({
      view: new View({}),
      service: new Service({})
    })
  }
}

export default factory