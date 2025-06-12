
let web3;
let contract;
const contractAddress = "0x32880ed747bc5bbe4a2712682004398f32a16e0c";
const tokenAddress = "0x65e47d9bd03c73021858ab2e1acb2cab38d9b039";
let user;

window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        user = accounts[0];
        contract = new web3.eth.Contract(stakingABI, contractAddress);
        document.getElementById("status").innerText = "Connected: " + user;
    } else {
        alert("MetaMask not detected");
    }
});

document.getElementById("connectWallet").onclick = async () => {
    await ethereum.request({ method: "eth_requestAccounts" });
};

document.getElementById("approveBtn").onclick = async () => {
    const amount = document.getElementById("stakeAmount").value;
    const tokenContract = new web3.eth.Contract([
        {
            "constant": false,
            "inputs": [
                { "name": "_spender", "type": "address" },
                { "name": "_value", "type": "uint256" }
            ],
            "name": "approve",
            "outputs": [{ "name": "", "type": "bool" }],
            "type": "function"
        }
    ], tokenAddress);
    await tokenContract.methods.approve(contractAddress, web3.utils.toWei(amount, "ether")).send({ from: user });
};

document.getElementById("stakeBtn").onclick = async () => {
    const amount = document.getElementById("stakeAmount").value;
    const tier = document.getElementById("stakeTier").value;
    await contract.methods.stake(web3.utils.toWei(amount, "ether"), tier).send({ from: user });
};

document.getElementById("claimBtn").onclick = async () => {
    await contract.methods.claim(0).send({ from: user });
};
