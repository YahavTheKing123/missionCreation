import attackTypes from './attackTypes.json';
import attackTypesDetails from './attackTypesDetails.json';


const map = new Map([
    ['attackTypes', attackTypes],
    ['attackTypesDetails', attackTypesDetails],
])

export const ValueSet = {
    getLiterals: ({sname}) => {  
        
        const fileName = sname.split('.')[2];
        const jsObj = map.get(fileName)
        return jsObj.schema.literals;
    }
}

export const EntitiesMngr = {
    getModelByVal: async (values, sname) => {    
                    
        const fileName = sname.split('.')[2];
        const jsObj = map.get(fileName)
        let res = jsObj.schema.literals.filter(item => values.includes(item.appX.model.value));
        return res.length === 1 ? res[0] : res;
    }
}