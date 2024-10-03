const Multitransfer = artifacts.require("Multitransfer");
const Token = artifacts.require("Token");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

contract("Multitransfer", async function (addresses) {
	it("Initated Successfully", async function () {
		const token = await Token.deployed();
		const [owner, ...recipents] = addresses;
		console.log(owner, recipents);
		const balance = await token.balanceOf(owner);

		assert.strictEqual(
			balance.toString(),
			"1000000000000000000000000",
			"Failed to initalize",
		);
	});
	it("Tranferred Successfyly", async function () {
		const multiTransfer = await Multitransfer.deployed();
		const token = await Token.deployed();
		const [owner, ...recipents] = addresses;
		const amountList = [...new Array(recipents.length)].map(() => 10);
		const totalAmount = amountList.reduce((agg, curr) => agg + curr, 0);
		await token?.approve(multiTransfer.address, totalAmount);
		try {
			multiTransfer.sendTokenToMultiple(token.addresses, recipents, amountList);
		} catch (err) {
			console.log(err);
		}
		const balance = await token.balanceOf(owner);
		assert.strictEqual(
			balance.toString(),
			"1000000000000000000000000",
			"Failed to initalize",
		);
	});
	// const isTotalSupply = (amount = 0) =>
	// 	async function () {
	// 		const token = await Token.deployed();
	// 		const totalSupply = await token.totalSupply();
	// 		assert.strictEqual(
	// 			totalSupply.toString(),
	// 			amount,
	// 			"Total Supply does not match",
	// 		);
	// 	};

	// function addTask(len = "1") {
	// 	return async function () {
	// 		const todoList = await Multitransfer.deployed();
	// 		const todo = await Multitransfer.deployed();
	// 		const token = await Token.deployed();
	// 		await token.approve(todo.address, 10);
	// 		var date = new Date("07/14/2024 16:00:00"); // some mock date

	// 		await todoList.addTask("This is my first Task", date.getTime() / 1000);
	// 		const taskLength = await todoList.totalTasks();
	// 		assert.strictEqual(
	// 			taskLength.toString(),
	// 			len,
	// 			"Task length should be one but do not match",
	// 		);
	// 	};
	// }

	// const isBalance = (requiredBalance = "") =>
	// 	async function () {
	// 		const token = await Token.deployed();
	// 		const balance = await token.balanceOf(primary);
	// 		assert.strictEqual(
	// 			balance.toString(),
	// 			requiredBalance,
	// 			"Transferred Amount is not correct",
	// 		);
	// 	};

	// it("Deployed successfully", async function () {
	// 	const todoList = await Multitransfer.deployed();
	// 	const token = await Token.deployed();
	// 	const balance = await token.balanceOf(todoList.address);
	// 	assert.equal(
	// 		balance,
	// 		"1000000000000000000000000",
	// 		"Balance does not match",
	// 	);
	// });

	// it("User connected successfully", async function () {
	// 	const todoList = await Multitransfer.deployed();
	// 	const token = await Token.deployed();
	// 	await todoList.connectUser();
	// 	const balance = await token.balanceOf(primary);
	// 	assert.strictEqual(
	// 		balance.toString(),
	// 		"100",
	// 		"Transferred Amount is not correct",
	// 	);
	// });

	// it("First Task Added", addTask("1"));
	// it("Ten tokens staked after adding task 1", isBalance("90"));

	// it("Second Task Added", addTask("2"));

	// it("Twenty tokens staked after adding task 2", isBalance("80"));

	// it("Task added successfully", addTask("3"));

	// it("Task length matches", async function () {
	// 	const todo = await Multitransfer.deployed();
	// 	const tasks = await todo.getTasksOfUser();
	// 	const parsedTasks = tasks.map((element) => {
	// 		const id = element[0];
	// 		const content = element[2];
	// 		const completed = element[3];
	// 		const startTime = element[4];
	// 		const endTime = element[5];
	// 		return { id, content, completed, startTime, endTime };
	// 	});
	// 	assert.strictEqual(
	// 		parsedTasks.length,
	// 		3,
	// 		"Tasks length do not match should be three",
	// 	);
	// });

	// it("Task retrieved successfully", async function () {
	// 	const ID = 1;
	// 	const todo = await Multitransfer.deployed();
	// 	const task = await todo.getTaskById(ID);
	// 	assert.strictEqual(parseInt(task.id), 1, "Id do not match");
	// });

	// it("Total supply matches", isTotalSupply("1000000000000000000000000"));

	// it("Task marked completed", async function () {
	// 	const ID = 1;
	// 	const todo = await Multitransfer.deployed();

	// 	await todo.markComplete(ID);
	// 	const task = await todo.getTaskById(ID);
	// 	assert.strictEqual(task.completed, true, "Failed to mark completed");
	// });

	// it("User have 85 tokens in their wallet", isBalance("85"));
	// //  it("Total supply matches", isTotalSupply("1000000000000000000000015"));
});
