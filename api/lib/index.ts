import PostController from './controllers/data.controller';
import App from './app';
import IndexController from "./controllers/index.controller";

const app: App = new App([
   new PostController(),
   new IndexController(),
]);

app.listen();