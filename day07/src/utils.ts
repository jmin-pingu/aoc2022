export class FsFile {
	name: string
	files: null | FsFile[]
	parent: FsFile | null
	size: number | null

  constructor(name: string, size: number | null, files: FsFile[] | null, parent: FsFile | null) {
    this.name = name;
    this.files = files;
    this.size = size;
		this.parent = parent
  }

	mkdir(name: string) {
		if (this.files === null) {
			this.files = [new FsFile(name, null, [], this)];
		} else { 
			this.files.push(new FsFile(name, null, [], this));
		}
	}

	mkfile(name: string, size: number) {
		if (this.files === null) {
			this.files = [new FsFile(name, size, null, this)];
		} else { 
			this.files.push(new FsFile(name, size, null, this));
		}
	}

	getDirectory(name: string): FsFile | null {
		if (this.files === null) { 
			return null; 
		}
		for (let file of this.files) {
			if (file.name === name && file.size === null) {
				return file;
			}
		}
		return null;
	}

	contains(name: string, size: number | null): boolean {
		if (this.files === null) { 
			return false; 
		}
		for (let file of this.files) {
			if (file.name === name && file.size === size) {
				return true;
			}
		}
		return false;
	}

	du(): number {
		let total = 0;
		if (this.files === null) {
			return total;
		}
		for (let file of this.files) {
			if (file.size !== null) {
				total += file.size;
			} else {
				total += file.du();
			}
		}
		return total;
	}

	walk(sizes: number[]) {
		if (this.files === null) {
			return;
		}

		for (let file of this.files) {
			if (file.size === null) {
				file.walk(sizes);
			}
		}
		sizes.push(this.du());
	}
}

export class Traverser {
	tokens: string[][]
	current: number
	root: FsFile
	traverser: FsFile

	constructor(tokens: string[][]) {
		this.tokens = tokens;
		this.current = 0;
		this.root = new FsFile("/", null, null, null);
		this.traverser = this.root;
	}
	
	next() {
		this.current += 1;

	}

	next_line()  {
		this.tokens.shift();
		this.current = 0;
	}

	scan(): FsFile {
		while (this.tokens.length > 0) {
			if (this.curr() === "$") {
				this.next();
				if (this.curr() === "cd") {
					this.cd();
				} else if (this.curr() === "ls") {
					this.ls();
				}
			} 
		}
		return this.root;
	}

	curr(): string | undefined {
		return this.tokens[0][this.current];
	}

	cd () {
		this.next();
		let directory = this.curr();
		if (directory !== undefined) {
			if (directory === "..") {
				if (this.traverser.parent !== null) {
					this.traverser = this.traverser.parent;	
				}
			} else if (directory === "/") {
				this.traverser = this.root;
			} else {
				let nextDir = this.traverser.getDirectory(directory);
				if (nextDir !== null){ this.traverser = nextDir; }
			} 
		}
		this.next_line();
	}

	ls () { 
		this.next_line();
		while (this.tokens.length > 0 && this.curr() !== "$") {
			if (this.curr() === "dir") {
				this.next();
				let name = this.curr();
				if (name !== undefined && !this.traverser.contains(name, null)) {
					this.traverser.mkdir(name);
				}
			} else {
				let size = parseInt(this.tokens[0][this.current]);
				this.next();
				let name = this.curr();

				if (name !== undefined && !this.traverser.contains(name, size)) {
					this.traverser.mkfile(name, size);
				}
			}
			this.next_line();
		}
	}
}

