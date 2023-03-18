import "./styles.css";
import { showWeather } from "./showWeather";
import { storageManager } from "./localStorage";

showWeather(document.getElementById("app"));
storageManager(document);
