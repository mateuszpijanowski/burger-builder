export const updateObject = (oldObject, newProps) => {
    return {
        ...oldObject,
        ...newProps
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    // Regex
    const password = /(?=.*[\W])(?=.*[\d])(?=.*[\w])/;
    const email = /(?=.*[~`!#$%^&*()_\-+={}[\]:;"'|<>?,/])/;
    const street = /(?=.*[~`!@#$%^&*()_\-+={}[\]:;"'|<>?])/;
    const name = /(?=.*[\W])|(?=.*[\d])/;
    const number = /^\d+$/;
    const country = /(?=.*[\W])|(?=.*[\d])/;

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

    if(rules.password && isValid) {
        isValid = password.test(value);
    }

    if(rules.email && isValid) {
        isValid = !email.test(value);
    }

    if(rules.street && isValid) {
        isValid = !street.test(value);
    }

    if(rules.name && isValid) {
        isValid = !name.test(value);
    }

    if(rules.phone && isValid) {
        isValid = number.test(value);
    }

    if(rules.zipCode && isValid) {
        isValid = number.test(value);
    }

    if(rules.country && isValid) {
        isValid = !country.test(value);
    }

    return isValid;
};
