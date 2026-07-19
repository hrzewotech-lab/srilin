class MockRoute {
  constructor(router, path) {
    this.router = router;
    this.path = path;
  }

  get(...handlers) {
    this.router.get(this.path, ...handlers);
    return this;
  }

  post(...handlers) {
    this.router.post(this.path, ...handlers);
    return this;
  }

  put(...handlers) {
    this.router.put(this.path, ...handlers);
    return this;
  }

  delete(...handlers) {
    this.router.delete(this.path, ...handlers);
    return this;
  }

  patch(...handlers) {
    this.router.patch(this.path, ...handlers);
    return this;
  }
}

class MockRouter {
  constructor() {
    this.routes = [];
  }

  get(path, ...handlers) {
    this.routes.push({ method: "get", path, handlers });
    return this;
  }

  post(path, ...handlers) {
    this.routes.push({ method: "post", path, handlers });
    return this;
  }

  put(path, ...handlers) {
    this.routes.push({ method: "put", path, handlers });
    return this;
  }

  delete(path, ...handlers) {
    this.routes.push({ method: "delete", path, handlers });
    return this;
  }

  patch(path, ...handlers) {
    this.routes.push({ method: "patch", path, handlers });
    return this;
  }

  use(path, ...handlers) {
    // If router.use(middleware) is called without a path, path defaults to "/"
    if (typeof path === "function") {
      handlers.unshift(path);
      path = "/";
    }
    this.routes.push({ method: "use", path, handlers });
    return this;
  }

  route(path) {
    return new MockRoute(this, path);
  }
}

const expressShim = {
  Router: () => new MockRouter()
};

module.exports = expressShim;
