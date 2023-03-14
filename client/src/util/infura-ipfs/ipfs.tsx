import {create} from 'ipfs-http-client';
import { Buffer } from 'buffer'

const projectId = '2MxvyhtacHyEkPi21FbYgtHW0Z3'
const apiKeySecret = '679be2226a6cd04e55726f94eb1d3b70'

const auth = 'Basic ' + Buffer.from(projectId + ':' + apiKeySecret).toString('base64');

export const client = create({ 
    host: 'ipfs.infura.io', 
    port: 5001, 
    protocol: 'https', 
    headers: { 
        authorization: auth
    } });