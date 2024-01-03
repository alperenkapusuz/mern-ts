import express from "express";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initalizeMiddlewares();
  }

  public listen() {
    this.app.listen(3005, () => {
      console.log("Express server listening on port 3000");
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