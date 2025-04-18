import * as fs from 'fs';

function part1(path: string): number {
	let file = fs.readFileSync(path, "utf8").trim();
	let total = 0;
	for (let line of file.split("\n")) {
		let pairs: string[] = line.split(",");
		let section1 = pairs[0].split("-").map((x)=>{return parseInt(x);}); 
		let section2 = pairs[1].split("-").map((x)=>{return parseInt(x);});
		let section1_lb = section1[0];
		let section1_ub = section1[1];
		let section2_lb = section2[0];
		let section2_ub = section2[1];

		let two_contains_one = section1_lb >= section2_lb && section1_ub <= section2_ub;
		let one_contains_two = section2_lb >= section1_lb && section2_ub <= section1_ub;
		if (two_contains_one || one_contains_two) {
			total += 1;	
		}
	}
	return total;
}

function part2(path: string): number {
	let file = fs.readFileSync(path, "utf8").trim();
	let total = 0;
	for (let line of file.split("\n")) {
		let pairs: string[] = line.split(",");
		let section1 = pairs[0].split("-").map((x)=>{return parseInt(x);}); 
		let section2 = pairs[1].split("-").map((x)=>{return parseInt(x);});
		let section1_lb = section1[0];
		let section1_ub = section1[1];
		let section2_lb = section2[0];
		let section2_ub = section2[1];

		let one_lb_in_two = section1_lb >= section2_lb && section1_lb <= section2_ub;
		let one_ub_in_two = section1_ub >= section2_lb && section1_ub <= section2_ub;
		let two_in_one = section1_ub >= section2_ub && section1_lb <= section2_lb;
		if (one_lb_in_two || one_ub_in_two || two_in_one) {
			total += 1;	
		}
	}
	return total;
}
// console.log(part1("input.txt"));
console.log(part2("input.txt"));
