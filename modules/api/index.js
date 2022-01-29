import axios from 'axios'
import useSWR from 'swr'

const getFetcher = (url, params) => axios.get(url,  {params: params}).then(res => res.data)
const postFetcher = (url, body, params) => axios.post(url, body, {params: params}).then(res => res.data)

const URL_PREFIX = '/api'
const safeUrl = (str)=>{
    if(str && str.length > 0 && str[0] === '/'){
        return URL_PREFIX + str
    }else{
        return URL_PREFIX + '/' + str
    }
}

export default {
    get:function(url, params){
        console.log('[get fetch] url:['+url+']')
        const { data, error } = useSWR([safeUrl(url), params], getFetcher)
        console.log('[get fetch result] ', data, error)
        return data;
    },
    post:function(url, body, params){
        console.log('[post fetch] url:['+url+']')
        const { data, error } = useSWR([safeUrl(url), body, params], postFetcher)
        console.log('[post fetch result] ', data, error)
        return data;
    }
}