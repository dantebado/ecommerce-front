// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"
import { AddressGeoCodingResponse } from "../../../interface/misc.model"

export default async (req, res) => {
  let query = req.query.query
  let apiKey = process.env.POSITION_STACK_KEY
  let results = await axios.get<AddressGeoCodingResponse>(`http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${query}`)
  res.status(200).json({
    data: results.data.data.map((v, i, a) => {
      return {
        ...v,
        geocoding_result_type: v.type
      }
    })
  })
}
