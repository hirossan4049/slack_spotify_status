import { delay } from "https://deno.land/std@0.170.0/async/mod.ts";

var _text = "";
export async function main() {
  while (true) {
    _fetch();
    await delay(5000);
  }
}

async function _fetch() {
  const trackName = `${await getArtist()} - ${await getTrack()}`;

  const duration = parseInt(await getDuration());
  const position = parseInt(await getPosition() + "000");
  const positon_per = position / duration;

  const rep = positon_per * 20;
  const bar = "▮".repeat(rep) + "▯".repeat(20 - rep);
  const postText = `${trackName} ${bar}`;
  if (postText != _text) {
    _text = postText;
    console.log(_text);
    await post(postText, (duration - position) / 100);
  }
}

async function post(text: string, remaining: number) {
  const limit = (Date.now() / 1000 + remaining).toFixed();
  const token = localStorage.getItem("token");
  const payload = encodeURIComponent(JSON.stringify({
    "status_emoji": ":spotify:",
    "status_text": text,
    "status_expiration": limit,
  }));
  const url =
    `https://slack.com/api/users.profile.set?profile=${payload}&pretty=1`;

  await fetch(url, {
    headers: { "Authorization": `Bearer ${token}` },
  });
}

async function getTrack() {
  switch (Deno.build.os) {
    case "darwin":
      return await runCommand(["sh", "./spotify_darwin.sh", "track"]);
    case "linux":
      throw "Not supported.";
    case "windows":
      throw "Not supported.";
  }
}

async function getArtist() {
  switch (Deno.build.os) {
    case "darwin":
      return await runCommand(["sh", "./spotify_darwin.sh", "artist"]);
    case "linux":
      throw "Not supported.";
    case "windows":
      throw "Not supported.";
  }
}

async function getDuration() {
  switch (Deno.build.os) {
    case "darwin":
      return await runCommand(["sh", "./spotify_darwin.sh", "duration"]);
    case "linux":
      throw "Not supported.";
    case "windows":
      throw "Not supported.";
  }
}

async function getPosition() {
  switch (Deno.build.os) {
    case "darwin":
      return await runCommand(["sh", "./spotify_darwin.sh", "position"]);
    case "linux":
      throw "Not supported.";
    case "windows":
      throw "Not supported.";
  }
}

async function runCommand(cmd: string[]): Promise<string> {
  const p = Deno.run({
    cmd: cmd,
    stdout: "piped",
    stderr: "piped",
    stdin: "null",
  });
  await p.status();
  return new TextDecoder().decode(await p.output()).replace("\n", "");
}
