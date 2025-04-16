import * as fs from "fs";

export enum Choice {
	Rock=1,
	Paper=2, 
	Scissors=3,
}

export function partialOrder(l: Choice, r: Choice): 0 | 1 | -1 {
	if (l === r) {
		return 0;
	} else if ((l === Choice.Rock && r === Choice.Paper) || (l === Choice.Paper && r === Choice.Scissors) || (l === Choice.Scissors && r === Choice.Rock)) {
		return -1;
	}
	return 1;
}

export function choiceToGetOutcome(choice: Choice, outcome: 0 | 1 | -1): Choice {
	for (const val of Object.values(Choice).filter(value => typeof value === "number")) {
		if (partialOrder(val, choice) === outcome) { return val; }
 	}
	throw new Error("Unreachable segment");
}

function part1(path: string): number {
	let input = fs.readFileSync(path, "utf8");
	let lines = input.trim().split("\n");

	var encoding = new Map<string, Choice>();
	encoding.set('A', Choice.Rock);
	encoding.set('X', Choice.Rock);
	encoding.set('B', Choice.Paper);
	encoding.set('Y', Choice.Paper);
	encoding.set('C', Choice.Scissors);
	encoding.set('Z', Choice.Scissors);

	let total = 0;
	for (var i in lines) {
		const game: string[] = lines[i].split(" ")
		let op = encoding.get(game[0]);
		let me = encoding.get(game[1]);

		if (me !== undefined && op !== undefined) {
			total += me + (3 * (partialOrder(me, op) + 1));
		}
	}
	return total;
}

function part2(path: string): number {
	let input = fs.readFileSync(path, "utf8");
	let lines = input.trim().split("\n");

	var encoding = new Map<string, Choice>();
	encoding.set('A', Choice.Rock);
	encoding.set('B', Choice.Paper);
	encoding.set('C', Choice.Scissors);

	var action = new Map<string, 1 | 0 | -1>();
	action.set('X', -1);
	action.set('Y', 0);
	action.set('Z', 1);

	let total = 0;
	for (var i in lines) {
		const game: string[] = lines[i].split(" ")
		const op = encoding.get(game[0]);
		const outcome = action.get(game[1]);

		if (outcome === undefined || op === undefined) { 
			throw Error("Incorrectly parsed path.")
		}
		let me = choiceToGetOutcome(op, outcome) 
		total += me + (3 * (outcome + 1));
	}
	return total;
}
console.log(part1("input.txt"));
console.log(part2("input.txt"));
