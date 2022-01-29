import axios from 'axios'
export default async function handler(req, res) {
  console.log('[req] api/category/list')
  const {data} = await axios.get(process.env.ENV_API_URI+'/category/list')
  res.status(200).json(data)
}
