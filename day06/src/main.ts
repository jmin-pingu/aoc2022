import * as fs from "fs";

function find_sop_marker(path: string, packet_length: number) {
	let map = new Map<string, number>();
	let last_valid_position = 0;
	let position = 0;
	let line = fs.readFileSync(path, "utf8");

	for (let ch of line) {
		position += 1;
		let last_position = map.get(ch);

		if (last_position !== undefined) {
			last_valid_position = Math.max(last_position, last_valid_position);
			// console.log(ch, last_valid_position);
		}
		map.set(ch, position);
		if (position - last_valid_position >= packet_length) {
			return position;
		}
	}
}


// update valid anytime there is a duplicate
console.log("Part 1:", find_sop_marker("input.txt", 4));
console.log("Part 2:", find_sop_marker("input.txt", 14));

