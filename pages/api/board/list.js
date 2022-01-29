import axios from 'axios'
export default async function handler(req, res) {
  console.log('[req] api/board/list', req.query)
  const {data} = await axios.get(process.env.ENV_API_URI+'/board/list', {params:req.query})
  res.status(200).json(data)
}
