const { getCookie, setCookie } = require("hono/cookie");

const toHono = (expressHandler) => {
  return async (c, next) => {
    // If request body has not been parsed yet, parse it based on Content-Type
    if (!c.reqBodyParsed) {
      const contentType = c.req.header("content-type") || "";
      if (contentType.includes("application/json")) {
        c.reqBody = await c.req.json().catch(() => ({}));
      } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
        c.reqBody = await c.req.parseBody().catch(() => ({}));
      } else {
        c.reqBody = {};
      }
      c.reqBodyParsed = true;
    }

    const req = {
      body: c.reqBody,
      query: c.req.query(),
      params: c.req.param(),
      headers: c.req.header(),
      cookies: getCookie(c),

      // Getter/setter shims to pass request state down the middleware chain via Hono context variables
      get user() { return c.get("user"); },
      set user(val) { c.set("user", val); },
      get file() { return c.get("file"); },
      set file(val) { c.set("file", val); },
      get files() { return c.get("files"); },
      set files(val) { c.set("files", val); },
    };

    let resStatus = 200;
    const resHeaders = {};

    const res = {
      status: (code) => {
        resStatus = code;
        return res;
      },
      json: (data) => {
        let code = typeof resStatus === 'number' && resStatus >= 100 && resStatus <= 599 ? resStatus : 200;
        const response = c.json(data, code);
        c.finalResponse = response;
        return response;
      },
      send: (data) => {
        const response = c.text(data, resStatus);
        c.finalResponse = response;
        return response;
      },
      setHeader: (name, value) => {
        resHeaders[name] = value;
        c.header(name, value);
        return res;
      },
      cookie: (name, value, options = {}) => {
        // Hono expects maxAge in seconds, Express expects milliseconds
        const maxAge = options.maxAge ? options.maxAge / 1000 : undefined;
        setCookie(c, name, value, {
          httpOnly: options.httpOnly,
          secure: options.secure,
          sameSite: options.sameSite ? (options.sameSite.toLowerCase() === "none" ? "None" : (options.sameSite.toLowerCase() === "strict" ? "Strict" : "Lax")) : "Lax",
          maxAge: maxAge,
          path: options.path || "/",
        });
        return res;
      }
    };

    let nextCalled = false;
    let nextPromise;
    const expressNext = (err) => {
      if (err) {
        throw err;
      }
      nextCalled = true;
      nextPromise = next();
    };

    try {
      require('fs').appendFileSync('adapter_flow.txt', 'Calling handler\n');
      await expressHandler(req, res, expressNext);
      require('fs').appendFileSync('adapter_flow.txt', 'Handler done\n');
      if (nextPromise) {
        await nextPromise;
      }
      if (c.finalResponse) {
        return c.finalResponse;
      }
      if (nextCalled) {
        return;
      }
      return c.json({ success: false, message: "Response not sent" }, 500);
    } catch (err) {
      console.error("Error in handler adapter:", err);
      require('fs').writeFileSync('adapter_error.txt', err.stack);
      // Map error status safely (ensure it's in the valid 200-599 range)
      const code = (resStatus >= 200 && resStatus <= 599) ? resStatus : 500;
      return c.json({ success: false, message: err.message }, code);
    }
  };
};

module.exports = { toHono };
