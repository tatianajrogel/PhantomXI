#!/usr/bin/env node
/**
 * Uploads an APK to Appetize.io using a publicly accessible APK URL.
 * Usage: node scripts/upload-appetize.mjs <APK_URL> [publicKey]
 *
 * APPETIZE_TOKEN must be set in the environment.
 * If publicKey is given, the existing Appetize app is updated (PUT) instead of created (POST).
 */

const token = process.env.APPETIZE_TOKEN;
const apkUrl = process.argv[2];
const publicKey = process.argv[3];

if (!token) {
  console.error("Missing APPETIZE_TOKEN env var");
  process.exit(1);
}
if (!apkUrl) {
  console.error("Usage: node scripts/upload-appetize.mjs <APK_URL> [publicKey]");
  process.exit(1);
}

const endpoint = publicKey
  ? `https://api.appetize.io/v1/apps/${publicKey}`
  : "https://api.appetize.io/v1/apps";
const method = publicKey ? "POST" : "POST";

const body = {
  url: apkUrl,
  platform: "android",
};

const res = await fetch(endpoint, {
  method,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": token,
  },
  body: JSON.stringify(body),
});

const text = await res.text();
if (!res.ok) {
  console.error(`Appetize API error ${res.status}: ${text}`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(text);
} catch {
  console.log(text);
  process.exit(0);
}

console.log("✅ Uploaded to Appetize");
console.log("publicKey:", data.publicKey);
console.log("appURL:   ", data.appURL || `https://appetize.io/app/${data.publicKey}`);
console.log("manage:   ", data.manageURL || "");
