import attackTypes from './attackTypes.json';
import attackTypesDetails from './attackTypesDetails.json';
import missionTypes from './missionTypes.json';
import safetyTypes from './safetyTypes.json';


const map = new Map([
    ['attackTypes', attackTypes],
    ['attackTypesDetails', attackTypesDetails],
    ['missionTypes', missionTypes],
    ['safetyTypes', safetyTypes],
])

export const ValueSet = {
    getLiterals: ({sname}) => {  
        
        const fileName = sname.split('.')[2];
        const jsObj = map.get(fileName)
        return jsObj.schema.literals;
    },
    getValue: ({sname}, code) => {
        const fileName = sname.split('.')[2];
        const jsObj = map.get(fileName)
        const literals = jsObj.schema.literals;
        let returnObj = null;
        Object.keys(literals).forEach( item => {
            if (literals[item].code === code) {
                returnObj = literals[item]
            };
        })
        return returnObj;
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