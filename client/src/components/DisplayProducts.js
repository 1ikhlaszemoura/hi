import React, { useState, useEffect } from 'react';
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/Supplychain.json";
import { ethers } from "ethers";


const DisplayProducts = () => {
    const ContractAddress = "0xFa56954976bA7d616945c09A7e360499e7038d98" //"0xFa56954976bA7d616945c09A7e360499e7038d98";
    
    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    async function getProduct() {
        if (typeof window.ethereum !== "undefined") {
            requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log(await signer.getAddress())

            const contract = new ethers.Contract(
                ContractAddress,
                SupplyChain.abi,
                provider
            );
            try {
                
                const Wdata = await contract.getProducts();
                console.log("data: ", Wdata);
                
                //console.log(contract);

            } catch (err) {
                console.log("Error: ", err);
            }
        }
    }

    return (
        <>
        PRODUCT
        <div><button onClick={getProduct}>PRODUCTS</button></div>
        </>);
}

export default DisplayProducts;