

import express from "express";
import { PORT } from "./config";


class App {
  public app: express.Application;
  public port: string | number;

  constructor() {
    this.app = express();
    this.port = PORT;
    this.initalizeMiddlewares();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=========================================`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=========================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initalizeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }
}

export default App;
