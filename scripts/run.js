const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const gifPronunciationContractFactory = await hre.ethers.getContractFactory(
    "GifPronunciationPortal",
  );
  const gifPronunciationContract =
    await gifPronunciationContractFactory.deploy();
  await gifPronunciationContract.deployed();

  console.log("Contract address:", gifPronunciationContract.address, "\n");
  console.log("Contract owner:", owner.address, "\n");

  const getTotals = async () => {
    await gifPronunciationContract.getSoftTotal();
    await gifPronunciationContract.getHardTotal();
  };

  await getTotals();

  const castSoftVote = await gifPronunciationContract.castSoftVote();
  await castSoftVote.wait();
  await getTotals();

  const castHardVote = await gifPronunciationContract
    .connect(randomPerson)
    .castHardVote();
  await castHardVote.wait();
  await getTotals();
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
