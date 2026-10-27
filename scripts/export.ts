import { writeFileSync } from "fs";
import { vunjo } from "../src/content/vunjo";
writeFileSync("/tmp/vunjo.json", JSON.stringify(vunjo));
