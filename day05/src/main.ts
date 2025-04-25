import * as fs from 'fs';

export class Move {
	from: number
	to: number
	num: number

  constructor(num: number, from: number, to: number) {
    this.num = num;
    this.from = from;
    this.to = to;
  }
}

function parse(path: string): [Map<number, string[]>, Array<Move>] {
	let input: string = fs.readFileSync(path, "utf8");
	let lines: string[] = input.split("\n\n");
	let stack = lines[0];
	let instructions = lines[1];
	let stacks: Map<number, string[]> = new Map<number, string[]>();
	let moves: Array<Move> = new Array<Move>();

	for (let instruction of instructions.trim().split("\n")) {
		let parsed = /.*?([0-9]+).*?([0-9]+).*?([0-9]+)/.exec(instruction);
		if (parsed !== null) {
			moves.push(new Move(Number(parsed[1]), Number(parsed[2]), Number(parsed[3])));
		}
	}

	const CHUNK_SIZE = 4;
	for (let row of stack.split("\n").reverse().slice(1)) {
		let idx = 0;
		while (idx < row.length) {
			let character: string = row.substring(idx, idx + CHUNK_SIZE).trim();
			let parsed_character = character.match(/\[([A-Z])\]/);
			if (parsed_character != null) {
				character = parsed_character[1];
				let column_number: number =  Math.round(idx / CHUNK_SIZE + 1);
				let column = stacks.get(column_number);
				if (column === undefined) {
					let column = new Array<string>();
					column.push(character);
					stacks.set(column_number, column);
				} else {
					column.push(character);
				}
			}
			idx += CHUNK_SIZE;
		}
	}
	return [stacks, moves];
}

function print_stacks(stacks: Map<number, string[]>) {
	let builder_string: string = "";
	for (let values of stacks.values()) {
		builder_string += values[values.length-1];
	}
	console.log(builder_string);
}

function part1(path: string) {
	let [stacks, moves] = parse(path);
	for (let move of moves) {      
		let from_column = stacks.get(move.from);
		let to_column = stacks.get(move.to);
		if (from_column !== undefined && to_column !== undefined) {
			for (let i = 0; i < move.num; i++) {      
	 			let elem = from_column.pop();
				if (elem !== undefined) {
					to_column.push(elem);
				} 		
			}
		}
	}
	print_stacks(stacks);
}


function part2(path: string) {
	let [stacks, moves] = parse(path);
	for (let move of moves) {      
		let from_column = stacks.get(move.from);
		let to_column = stacks.get(move.to);
		if (from_column !== undefined && to_column !== undefined) {
			to_column.push(...from_column.splice(from_column.length - move.num, move.num));
		}
	}
	print_stacks(stacks);
}

// print message
part1("input.txt");
part2("input.txt");
