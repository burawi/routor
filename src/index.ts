import { Path } from "path-parser"
import * as types from "./types";

const defaultOptions: types.RouterOptions = {
   notFoundTemplate: "404 Not found"
}

export const g = 5;

export class Router {

  handlers: types.Handler[];
  container: Element;
  options?: types.RouterOptions;

  constructor(container: Element, options: types.RouterOptions = defaultOptions) {
    this.handlers = [];
    this.container = container;
    this.options = options;
    this.watch()
  }

  addHandler(route: string, handler: types.rawHandler) {
    this.handlers.push({
      path: new Path(route),
      ...handler
    });
  }

  open(route: string) {
    const url = `${window.location.origin}${route}`;
    const finder = (handler: types.Handler): types.Handler => handler.path.test(route)
    const handler = this.handlers.find(finder);
    const params: object = handler?.path.test(route);
    const beforeOpen = handler?.beforeOpen || this.options?.beforeOpen;
    if(beforeOpen) beforeOpen();
    this.container.innerHTML = handler?.template || this.options?.notFoundTemplate || "";
    window.history.pushState({}, route, url);
    handler?.controller(params);
  }

  reload() {
    this.open(window.location.href);
  }

  watch() {
    window.addEventListener("popstate", () => {
      this.open(window.location.href);
    });
  }
}
