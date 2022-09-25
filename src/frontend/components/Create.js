import { useState } from "react"
import { ethers } from "ethers"
import { Form, Button } from "react-bootstrap"

import NftAddress from "../contractsData/NFT-address.json"
import NftAbi from "../contractsData/NFT.json"

const Create = ({ marketplace, nft, account }) => {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const perMintCost = 0.000101714
  const calculatedMintCost = quantity * perMintCost

  const createNFT = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        NftAddress.address,
        NftAbi.abi,
        signer
      )
      try {
        setLoading(true)
        const response = await contract.mint(quantity, {
          value: ethers.utils
            .parseEther(calculatedMintCost.toString())
            .toString(),
        })
        console.log("Response: ", response)
        setLoading(false)
        window.location.replace("/")
      } catch (error) {
        console.log("Error: ", error)
      }
    }
  }

  return (
    <div className="container-fluid mt-5">
      {loading ? (
        <h3>Minting in-progress...</h3>
      ) : (
        <div className="row">
          <main
            role="main"
            className="col-lg-12 mx-auto"
            style={{ maxWidth: "1000px" }}
          >
            <div className="content mx-auto">
              <Form.Group cclassName="mb-3" controlId="formBasicEmail">
                <Form.Label>Quantity</Form.Label>

                <Form.Control
                  type="number"
                  placeholder="Number of NFTs to be minted"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  size="lg"
                />
                <Form.Text className="text-muted">
                  Enter the number of NFTs that will be minted
                </Form.Text>
                <div className="d-grid px-0">
                  <Button onClick={createNFT} variant="primary" size="lg">
                    Create and Mint my NFT!
                  </Button>
                </div>
              </Form.Group>
            </div>
          </main>
        </div>
      )}
    </div>
  )
}

export default Create
