export const updateObject = (oldObject, newProps) => {
    return {
        ...oldObject,
        ...newProps
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    // Regex
/*    const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;


    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const onlyNumbers = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const email = /[^!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;
    const numbers = /[0-9]/;*/

    if (!rules) {
        return true;
    }

    if(rules.required && isValid) {
        isValid = value.trim() !== "";
    }

    if(rules.minLength && isValid) {
        isValid = value.length >= rules.minLength;
    }

    if(rules.maxLength && isValid) {
        isValid = value.length <= rules.maxLength;
    }

/*    if(rules.normalCharacters && isValid) {
        isValid = !specialCharacters.test(value);
    }

    if(rules.password && isValid) {
        isValid = specialCharacters.test(value) && numbers.test(value);
    }*/

    return isValid;
};
