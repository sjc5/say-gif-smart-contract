const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory(
    "GifPronunciationPortal",
  );
  const contract = await contractFactory.deploy();

  await contract.deployed();

  console.log("Contract address:", contract.address, "\n");
  console.log("Contract owner:", owner.address, "\n");

  const getTotals = async () => {
    await contract.getSoftTotal();
    await contract.getHardTotal();
  };

  await getTotals();

  const castSoftVote = await contract.castSoftVote("john");
  await castSoftVote.wait();
  await getTotals();

  const castHardVote = await contract
    .connect(randomPerson)
    .castHardVote("sally");
  await castHardVote.wait();
  await getTotals();

  let allVotes = await contract.getAllVotes();
  console.log(allVotes);
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
