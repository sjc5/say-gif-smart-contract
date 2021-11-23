const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory(
    "GifPronunciationPortal",
  );
  const contract = await contractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });

  await contract.deployed();

  console.log("Contract address:", contract.address, "\n");
  console.log("Contract owner:", owner.address, "\n");

  let contractBalance = await hre.ethers.provider.getBalance(contract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance),
  );

  const getTotals = async () => {
    await contract.getSoftTotal();
    await contract.getHardTotal();
  };

  await getTotals();

  const castSoftVote = await contract.castVote("john", true);
  await castSoftVote.wait();
  await getTotals();

  const castHardVote = await contract
    .connect(randomPerson)
    .castVote("sally", false);
  await castHardVote.wait();
  await getTotals();

  let allVotes = await contract.getAllVotes();
  console.log(allVotes);

  contractBalance = await hre.ethers.provider.getBalance(contract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance),
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.warn(e);
    process.exit(1);
  }
};

runMain();
