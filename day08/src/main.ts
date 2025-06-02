import * as fs from "fs";

enum Direction {
	L, 
	R, 
	U,
	D,
}

class VisibleCounter {
	visible_left: number
	visible_right: number
	visible_up: number
	visible_down: number

	constructor() {
		this.visible_up = 0;
		this.visible_right = 0;
		this.visible_left = 0;
		this.visible_down = 0;
	}

	set(direction: Direction, value: number) {
		switch (direction) {
			case Direction.L: 
				this.visible_left = value;
				return;
			case Direction.R: 
				this.visible_right = value;
				return;
			case Direction.U: 
				this.visible_up = value;
				return;
			case Direction.D:
				this.visible_down = value;
				return;
		}
	}

	calculate_score(): number {
		return this.visible_up * this.visible_left * this.visible_down * this.visible_right;
	}
}

class Grid {
	grid: string[]
	constructor(path: string) {
		let lines = fs.readFileSync(path, "utf8");
		this.grid = lines.trim().split("\n");
	}

	visible_matrix(direction: Direction): boolean[][] {
		let visible = Array(this.grid.length).fill(null).map(() => Array(this.grid[0].length).fill(true));
		let [row_idx, column_idx] = [0, 0];
		switch (direction)	{
			case Direction.L:
				[row_idx, column_idx]= [0, 0];
				while (row_idx < visible.length) {
					let running_max = this.grid[row_idx][column_idx];
					while (column_idx < visible[0].length - 1) {
						if (running_max < this.grid[row_idx][column_idx + 1]) {
							running_max = this.grid[row_idx][column_idx + 1];
						} else {
							visible[row_idx][column_idx + 1] = false;
						}
						column_idx++;
					}
					column_idx = 0;
					row_idx++;
				}
				return visible;
			case Direction.R:
				[row_idx, column_idx]= [0, visible[0].length - 1];
				while (row_idx < visible.length) {
					let running_max = this.grid[row_idx][column_idx];
					while (column_idx > 0) {
						if (running_max < this.grid[row_idx][column_idx - 1]) {
							running_max = this.grid[row_idx][column_idx - 1];
						} else {
							visible[row_idx][column_idx - 1] = false;
						}
						column_idx--;
					}
					column_idx = visible[0].length - 1;
					row_idx++;
				}
				return visible;
			case Direction.U:
				[row_idx, column_idx]= [visible.length - 1, 0];
				while (column_idx < visible[0].length) {
					let running_max = this.grid[row_idx][column_idx];
					while (row_idx > 0) {
						if (running_max < this.grid[row_idx - 1][column_idx]) {
							running_max = this.grid[row_idx - 1][column_idx];
						} else {
							visible[row_idx - 1][column_idx] = false;
						}
						row_idx--;
					}
					column_idx++;
					row_idx = visible.length - 1;
				}
				return visible;
			case Direction.D:
				[row_idx, column_idx]= [0, 0];
				while (column_idx < visible[0].length) {
					let running_max = this.grid[row_idx][column_idx];
					while (row_idx < visible.length - 1) {
						if (running_max < this.grid[row_idx + 1][column_idx]) {
							running_max = this.grid[row_idx + 1][column_idx];
						} else {
							visible[row_idx + 1][column_idx] = false;
						}
						row_idx++;
					}
					column_idx++;
					row_idx = 0;
				}
				return visible;
		}
	}
}

let grid = new Grid("input.txt");
const [up, down, left, right] = [grid.visible_matrix(Direction.U), grid.visible_matrix(Direction.D), grid.visible_matrix(Direction.L), grid.visible_matrix(Direction.R)];

let [row_idx, column_idx] = [0, 0];
let total = 0;
while (row_idx < up.length) {
	while (column_idx < up[0].length) {
		if (up[row_idx][column_idx] || down[row_idx][column_idx] || left[row_idx][column_idx] || right[row_idx][column_idx]) {
			total++;
		}
		column_idx++;
	}
	row_idx++;
	column_idx = 0;
}

// Part 2:

class GridPart2 {
	grid: string[]
	visible: VisibleCounter[][]

	constructor(path: string) {
		let lines = fs.readFileSync(path, "utf8");
		this.grid = lines.trim().split("\n");
		this.visible = Array(this.grid.length).fill(null).map(() => Array(this.grid[0].length).fill(null));
		let [row, col] = [0, 0];
		while (row < this.visible.length) {
			while (col < this.visible[0].length) {
				this.visible[row][col] = new VisibleCounter();
				col++
			}
			col = 0;
			row++
		}
	}

	parse_visible(): VisibleCounter[][] {
		let [row_idx, column_idx] = [0, 0];
		while (row_idx < this.visible.length) {
			while (column_idx < this.visible[0].length) {
				this.check_from_coordinate(row_idx, column_idx, Direction.U);
				this.check_from_coordinate(row_idx, column_idx, Direction.D);
				this.check_from_coordinate(row_idx, column_idx, Direction.L);
				this.check_from_coordinate(row_idx, column_idx, Direction.R);
				column_idx++;
			}
			column_idx = 0;
			row_idx++;
		}
		return this.visible;
	}

	private within_bounds(x: number, y: number): boolean {
		return x >= 0 && x < this.grid[0].length && y >= 0 && y< this.grid.length;
	}

	private check_from_coordinate(x: number, y: number, direction: Direction) {
		let total_visible = 0;
		let [temp_x, temp_y] = [x, y];
		switch (direction) {
			case Direction.L:
				while (this.within_bounds(temp_x - 1, temp_y) && this.grid[y][x] > this.grid[temp_y][temp_x - 1]) {
					total_visible++;
					temp_x--;
				}
				if (this.within_bounds(temp_x - 1, temp_y)) { total_visible++; }
				break;
			case Direction.R:
				while (this.within_bounds(temp_x + 1, temp_y) && this.grid[y][x] > this.grid[temp_y][temp_x + 1]) {
					total_visible++;
					temp_x++;
				}
				if (this.within_bounds(temp_x + 1, temp_y)) { total_visible++; }
				break;
			case Direction.D:
				while (this.within_bounds(temp_x, temp_y + 1) && this.grid[y][x] > this.grid[temp_y + 1][temp_x]) {
					total_visible++;
					temp_y++;
				}
				if (this.within_bounds(temp_x, temp_y + 1)) { total_visible++; }
				break;
			case Direction.U:
				while (this.within_bounds(temp_x, temp_y - 1) && this.grid[y][x] > this.grid[temp_y - 1][temp_x]) {
					total_visible++;
					temp_y--;
				}
				if (this.within_bounds(temp_x, temp_y - 1)) { total_visible++; }
				break;
		}
		this.visible[y][x].set(direction, total_visible)
	}
}

let grid_pt2 = new GridPart2("input.txt");
let visible = grid_pt2.parse_visible();
console.log(Math.max(
						...visible
						.map((row) => row.map((entry) => entry.calculate_score()))
						.map((row) => Math.max(...row))
)
);

