import * as fs from "fs";

let input = fs.readFileSync("test-input.txt", "utf8");
let lines = input.trim().split("\n");

export enum Choice {
	Rock=1,
	Paper=2, 
	Scissors=3,
}

var encryption = {
	'A': Choice.Rock,
	'X': Choice.Rock,
	'B': Choice.Paper,
	'Y': Choice.Paper,
	'C': Choice.Scissors,
	'Z': Choice.Scissors,
};

export function partialOrder(l: Choice, r: Choice): 0 | 1 | -1 {
	if (l === r) {
		return 0;
	} else if ((l === Choice.Rock && r === Choice.Paper) || (l === Choice.Paper && r === Choice.Scissors) || (l === Choice.Scissors && r === Choice.Rock)) {
		return -1;
	}
	return 1;
}

for (var i in lines) {
	console.log("line: " + lines[i].split(" "));
}

