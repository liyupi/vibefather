import assert from "node:assert/strict";
import { createServer } from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { AddressInfo } from "node:net";
import { test } from "node:test";
import { getJson, getText } from "../src/http.js";

async function withServer(
  handler: (req: IncomingMessage, res: ServerResponse) => void,
  run: (base: string) => Promise<void>,
) {
  const server = createServer(handler);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

test("getText times out when the server never responds", async () => {
  await withServer(
    () => {},
    async (base) => {
      const started = Date.now();
      await assert.rejects(getText(`${base}/hang`, 100), /Request timed out after 0\.1s/);
      assert.ok(Date.now() - started < 2000, "should abort instead of waiting for the socket");
    },
  );
});

test("getJson times out when the server never responds", async () => {
  await withServer(
    () => {},
    async (base) => {
      await assert.rejects(getJson(`${base}/hang`, 100), /Request timed out after 0\.1s/);
    },
  );
});

test("getText returns the response body", async () => {
  await withServer(
    (_req, res) => {
      res.writeHead(200, { "content-type": "text/markdown" });
      res.end("# hi");
    },
    async (base) => assert.equal(await getText(`${base}/md`), "# hi"),
  );
});

test("getJson parses JSON", async () => {
  await withServer(
    (_req, res) => {
      res.writeHead(200, { "content-type": "application/json" });
      res.end('{"ok":true}');
    },
    async (base) => assert.deepEqual(await getJson(`${base}/json`), { ok: true }),
  );
});

test("404 keeps the template hint", async () => {
  await withServer(
    (_req, res) => {
      res.writeHead(404);
      res.end("nope");
    },
    async (base) => assert.rejects(getText(`${base}/missing`), /Template not found/),
  );
});
