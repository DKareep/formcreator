
export const checkValidation = (value, rules,dealForm) => {

    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required && value) {
        isValid =  value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.greaterThan) {
        isValid = parseInt(value,10) > parseInt(dealForm['amount'].value,10) && isValid;
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }
   if (rules.isText) {
        const pattern = /^[A-Za-z]*$/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.isEmail) {
        const pattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
}

