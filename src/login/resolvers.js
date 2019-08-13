import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';
const URL = `http://${url}:${port}/${entryPoint}`;



const resolvers = {
	Query: {
	},
	Mutation: {
		login: async (_, { credentials }) =>{
			let res = await	generalRequest(`${URL}`, 'POST', credentials)
			console.log(res)
			if(res){
				if(res === 'LDAPException found'){
					return res
				}else{
					return 'Usuario autenticado.'
				}				
			}else{
				return 'Usuario no autenticado.'
			}
		}			
	}
};

export default resolvers;
