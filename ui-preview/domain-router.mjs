import http from "node:http";
import httpProxy from "http-proxy";

const PORT = 80;

const routes = {
    "innovai.swaif.local": "http://127.0.0.1:4174",
    "innovai.siic.local": "http://127.0.0.1:5174",
};

const proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    xfwd: true,
});

proxy.on("error", (error, req, res) => {
    const host = req?.headers?.host || "unknown-host";
    if (!res.headersSent) {
        res.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
    }
    res.end(`Proxy error for ${host}: ${error.message}`);
});

const server = http.createServer((req, res) => {
    const rawHost = req.headers.host || "";
    const host = rawHost.split(":")[0].toLowerCase();
    const target = routes[host];

    if (!target) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Host not mapped in local domain router.");
        return;
    }

    proxy.web(req, res, { target });
});

server.on("upgrade", (req, socket, head) => {
    const rawHost = req.headers.host || "";
    const host = rawHost.split(":")[0].toLowerCase();
    const target = routes[host];

    if (!target) {
        socket.destroy();
        return;
    }

    proxy.ws(req, socket, head, { target });
});

server.listen(PORT, "0.0.0.0", () => {
    console.log("Domain router running on http://0.0.0.0:80");
    console.log("innovai.swaif.local -> http://127.0.0.1:4174");
    console.log("innovai.siic.local -> http://127.0.0.1:5174");
});
