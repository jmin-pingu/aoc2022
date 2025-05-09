import * as fs from "fs";
import { Traverser } from './utils';

let lines = fs.readFileSync("input.txt", "utf8");
// assume root exists
let traverser = new Traverser(lines.trim().split("\n").map((line) => line.split(" ")));
let output = traverser.scan();

let large_directories = new Array<number>();
// Part 1
output.walk(large_directories);
console.log("Part 1:", large_directories.filter((elem) => elem <=100000).reduce((prev, curr) => prev += curr))

// Part 2
let fs_size = output.du();
let free_space = 70000000 - fs_size;

console.log("Part 2:", Math.min(...large_directories.filter((elem) => elem >= Math.max(30000000 - free_space, 0))))

