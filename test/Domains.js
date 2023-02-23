const { expect } = require('chai');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe('Domains', () => { 
    async function deployDomainsFixture(){
        const [owner, randomPerson] = await ethers.getSigners();
        const domains = await ethers.getContractFactory("Domains");
        const domainsContract = await domains.deploy();
        
        await domainsContract.deployed();

        console.log('Contract Address : ', domainsContract.address);

        return { domainsContract, owner, randomPerson };
    }

    describe('Register a Name', () => {
        it("It should register a new name", async () => {
            
            const { domainsContract, owner, randomPerson } = await loadFixture(deployDomainsFixture);
            const txn = await domainsContract.register("doom");

            await txn.wait();
            const domainOwner = await domainsContract.getAddress("doom");

            console.log("Owner of domain : ", domainOwner);
            expect(domainOwner).to.equal(owner.address);
        });

        // it ("Should give an error", async () => {
        //     const {domainsContract, owner, randomPerson} = await loadFixture(deployDomainsFixture);
        //     const txn = await domainsContract.register("pandit");

        //     await txn.wait();

        //     const domainOwner = await domainsContract.getAddress("pandit");
        //     console.log("Owner of domain pandit : ", domainOwner);

        //     // trying to set a record that doesn't belong to this address
        //     txn = await domainsContract.connect(randomPerson).setRecord("pandit","Nice domain");
        //     await txn.wait();
        //     console.log("Transaction : ",txn)
        //     expect(txn).to.contain('Domain does not belong to this address')
        // });
     });
 });