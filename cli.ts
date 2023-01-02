import { Command } from "https://deno.land/x/cliffy@v0.19.2/command/mod.ts";
import { main } from "./main.ts";

const { options, args } = await new Command()
  .name("slack spotify")
  .version("0.1.0")
  .description("Spotifyで再生中の曲をSlackのステータスに表示するやつ")
  .option("-s --set-token <token>", "SlackAPI token.")
  .parse(Deno.args);

if (options.setToken) {
  localStorage.setItem("token", options.setToken);
  console.log("Token Setted!");
} else {
  main()
}
