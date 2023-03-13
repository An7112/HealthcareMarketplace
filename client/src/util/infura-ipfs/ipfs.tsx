import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'

const projectId = '09c13a739eb6436c95589c3a11763eca'
const apiKeySecret = 'bcd4d3a30d274a60a1e544e714e9071d'

const auth = 'Basic' + Buffer.from(projectId + ':' + apiKeySecret).toString('base64')

export const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    }
})