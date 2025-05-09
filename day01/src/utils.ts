export class BinaryHeap {
	heap: number[]

  constructor() {
    this.heap = [];
  }
	
	append(item: number) {
		this.heap = [...this.heap, item];
		this.bubble();
	}

	parent(index: number): number {
		if (index == 0)	return 0;
		return Math.floor((index - 1) / 2);
	}

	child(index: number): number {
		return index * 2 + 1;
	}

	/* bubble()
	 *
	 */
	bubble() {
		let idx = this.heap.length-1;
		var parent_idx: number;
		while (idx > 0) {
			parent_idx = this.parent(idx);
			if (this.heap[parent_idx] < this.heap[idx]) {
				let temp = this.heap[parent_idx];
				this.heap[parent_idx] = this.heap[idx];
				this.heap[idx] = temp;
			} else {
				break;
			}
			idx = parent_idx;
		}
	}

	heapify() {
		let idx = 0;
		let child_idx = this.child(idx);
		while (child_idx < this.heap.length) {
			if (child_idx + 1 < this.heap.length && this.heap[child_idx] < this.heap[child_idx + 1]) {
				child_idx = child_idx + 1;
			}
			let temp = this.heap[child_idx];
			this.heap[child_idx] = this.heap[idx];
			this.heap[idx] = temp;

			idx = child_idx;
			child_idx = this.child(idx);
		}
	}

	peek(): number {
		return this.heap[0];
	}

	pop(): number {
		let value = this.heap[0];
		let temp = this.heap[this.heap.length-1];
		this.heap = this.heap.slice(0, this.heap.length-1);
		if (this.heap.length > 0) this.heap[0] = temp;
		this.heapify();
		return value;
	}
}

