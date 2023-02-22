import axios from "axios";

export default axios.create({
  baseURL: "https://excited-cummerbund-wasp.cyclic.app/api/v0",
  headers: {
    "Content-type": "application/json"
  }
});