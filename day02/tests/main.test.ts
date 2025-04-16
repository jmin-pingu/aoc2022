import { Choice, partialOrder } from "../src/main"

describe("partialOrder", () => {
	it("should tie (return 0)", () => {
		expect(partialOrder(Choice.Rock, Choice.Rock)).toBe(0);
		expect(partialOrder(Choice.Paper, Choice.Paper)).toBe(0);
		expect(partialOrder(Choice.Scissors, Choice.Scissors)).toBe(0);
	})

	it("should lose (return -1)", () => {
		expect(partialOrder(Choice.Rock, Choice.Paper)).toBe(-1);
		expect(partialOrder(Choice.Paper, Choice.Scissors)).toBe(-1);
		expect(partialOrder(Choice.Scissors, Choice.Rock)).toBe(-1);
	})

	it("should win (return 1)", () => {
		expect(partialOrder(Choice.Scissors, Choice.Paper)).toBe(1);
		expect(partialOrder(Choice.Rock, Choice.Scissors)).toBe(1);
		expect(partialOrder(Choice.Paper, Choice.Rock)).toBe(1);
	})
});
 
