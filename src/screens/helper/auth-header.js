import { reactLocalStorage } from 'reactjs-localstorage';
import packageJson from "../../../package.json";

const apiVersion = packageJson.version;
let token = reactLocalStorage.get('@ClirnetStore:refreshToken', true)
export function authHeader() {
    if (token) { 
        return {
            'Authorization': token,
            'version': apiVersion
        };
    }else{
        return {
            
        };
    }
}