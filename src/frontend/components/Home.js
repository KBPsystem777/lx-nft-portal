import { useState, useEffect } from "react"
import { ethers } from "ethers"
import axios from "axios"

require("dotenv").config()

const NFT_API_BASE =
  "https://deep-index.moralis.io/api/v2/nft/0x3b59a38bc8ecd4ed55f6828591e5ce0f86af29ac?chain=rinkeby&format=decimal"

const NFTItem = ({ nftDetails }) => {
  const nftMetaData = JSON.parse(nftDetails.metadata)
  console.log("Meta", nftMetaData)
  return (
    <div>
      <ul>
        <ol>
          <h2>
            <a
              href={`https://rinkeby.etherscan.io/token/0x3b59a38bc8ecd4ed55f6828591e5ce0f86af29ac?a=${nftDetails?.token_id}`}
            >
              {nftMetaData?.name}
            </a>
          </h2>
        </ol>
      </ul>
    </div>
  )
}

const Home = ({ marketplace, nft }) => {
  const [nftData, setNftData] = useState(null)
  const [loading, setLoading] = useState(true)
  const getAllNfts = () => {
    var config = {
      method: "get",
      url: NFT_API_BASE,
      headers: {
        "x-api-key": process.env.REACT_APP_MORALIS_API_KEY,
      },
    }
    axios(config)
      .then(function (response) {
        setNftData(response.data?.result)
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    getAllNfts()
  }, [])

  return (
    <div>
      {loading ? (
        <h2>loading... </h2>
      ) : (
        <div>
          {nftData.map((item) => (
            <NFTItem nftDetails={item} />
          ))}
        </div>
      )}
    </div>
  )
}
export default Home
