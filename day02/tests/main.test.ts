import { Choice, partialOrder } from "../src/main"

describe("partialOrder", () => {
	it("should tie (return 0)", () => {
		expect(partialOrder(Choice.Rock, Choice.Rock)).toBe(0);
		expect(partialOrder(Choice.Paper, Choice.Paper)).toBe(0);
		expect(partialOrder(Choice.Scissors, Choice.Scissors)).toBe(0);
	})



});
 
