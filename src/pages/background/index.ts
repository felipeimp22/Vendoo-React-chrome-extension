import { MESSAGING_PORT } from "@src/common";
import { BaseMessage } from "@src/types";
import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import axios from "axios";

reloadOnUpdate("pages/background");

console.log("background loaded");

chrome.runtime.onConnect.addListener((port) => {
  console.log("background connection request to", port.name);
  if (port.name !== MESSAGING_PORT) return;
  port.onMessage.addListener((msg: BaseMessage) => {

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3946e911c9msh85fd5bb89ad2636p14caaejsn31c07383fd77', 
        'X-RapidAPI-Host': 'grailed.p.rapidapi.com'
      }
    };
    if (msg.type === "fetch") { 
      fetch(`https://grailed.p.rapidapi.com/search?query=${msg.storename}&page=${msg.page}&hitsPerPage=32&sortBy=mostrecent`, options)
      .then(response => response.json())
      .then(data => {
        port.postMessage({ type: "fetch", items: data });
      })
      .catch(error => {
        console.error("Fetching items failed:", error);
        port.postMessage({ type: "fetch", message: "Failed to fetch items" });
      });
    }
  });
});

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});
