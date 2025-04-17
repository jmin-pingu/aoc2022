import * as fs from "fs";

function part1(path: string): number {
	let lines = fs.readFileSync(path, "utf8");
	let items = new Array();
	for (let line of lines.trim().split("\n")) {
		let left_contains = new Set<string>();
		let right_contains = new Set<string>();
		let l = 0;
		let r = line.length-1;
		// Find matching
		while (l < r) {
			left_contains.add(line[l]);
			right_contains.add(line[r]);
			l += 1;		
			r -= 1;
		}
		items = items.concat(Array.from(new Set<string>([...left_contains].filter(x => right_contains.has(x)))));
	}

	// Final conversion
	let parsed_items: number[] = items.map(
		(item) => {
			if (/^[A-Z]/.test(item)) {
				return Buffer.from(item)[0] - 38;
			} else if (/^[a-z]/.test(item)) {
				return Buffer.from(item)[0] - 96;
			} else {
				throw Error("Character should be only alphabetic.");
			}
		}
	);

 return parsed_items.reduce((val, cur) => val + cur, 0);
}

function part2(path: string): number {
	let lines = fs.readFileSync(path, "utf8");
	let items = new Array();
	let counter = 0;
	let common_set = new Set<string>();
	for (let line of lines.trim().split("\n")) {
		let builder_set = new Set<string>();
		// Find matching
		if (counter === 0) {
			common_set = new Set<string>();
			for (let char of line) { common_set.add(char); }
		} else if (counter <= 2) {
			for (let char of line) { builder_set.add(char); }
			common_set = new Set<string>([...common_set].filter(x => builder_set.has(x)));
		}

		counter += 1;

		if (counter == 3) {
			items = items.concat(Array.from(common_set));
			counter = 0;
		}
	}

	// Final conversion
	let parsed_items: number[] = items.map(
		(item) => {
			if (/^[A-Z]/.test(item)) {
				return Buffer.from(item)[0] - 38;
			} else if (/^[a-z]/.test(item)) {
				return Buffer.from(item)[0] - 96;
			} else {
				throw Error("Character should be only alphabetic.");
			}
		}
	);
 	return parsed_items.reduce((val, cur) => val + cur, 0);
}

console.log(part1("input.txt"));
console.log(part2("input.txt"));
