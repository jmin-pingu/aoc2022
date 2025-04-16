import * as fs from 'fs';
import { BinaryHeap } from './utils';

function part1(path: string): number {
	let input: string = fs.readFileSync(path, "utf8");
	let inputs = input.split("\n\n");
	let max = 0;
	for (var i in inputs) {
		var current_max = 0;
		let items: string[] = inputs[i].split("\n");
		for (var j in items) {
			current_max += Number(items[j]);
		}
		max = current_max > max ? current_max : max;
	}
	return max;
}

function part2(path: string): number {
	let input: string = fs.readFileSync(path, "utf8");
	let inputs = input.split("\n\n");

	let heap = new BinaryHeap();
	for (var i in inputs) {
		var current_max = 0;
		let items: string[] = inputs[i].split("\n");
		for (var j in items) {
			current_max += Number(items[j]);
		}
		heap.append(current_max);
	}

	var max = 0
	for (let i = 0; i < 3; i++) {
		max += heap.pop();
	}
	return max;
}


console.log(part2("input.txt"));
