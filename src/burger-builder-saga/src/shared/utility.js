export const updateObject = (oldObject, updatedValues) => {
	return {
			...oldObject,
			...updatedValues
		}
}; 

export const checkValidity = (value, rules) => {
    let isValid = true;

    if(!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.trim()) && isValid;
    }

    if (rules.isNumber) {
        isValid = /^\d+$/.test(value.trim()) && isValid;
    }

    return isValid;
}