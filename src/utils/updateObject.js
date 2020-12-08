export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};


export const checkValidity = (value, rules) => {
    let isValid = true;
    let errorMsg = null;

    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }



    if (rules.isUserName) {

        if (value.length < rules.minLength) {
            return {
                valid: false,
                validationMsg: `Name is too short (Minimum ${rules.minLength} characters needed.)`
            }
        } else if (value.length > rules.maxLength) {
            return {
                valid: false,
                validationMsg: `Name is too long (Maximum ${rules.maxLength} characters allowed.)`
            }
        } else {
            return {
                valid: true,
                validationMsg: null,
            };
        }
    }

    if (rules.isMobileNo) {
        if (!value) {
            return {
                valid: false,
                validationMsg: "Mobile Number Required!"
            }
        }

        if (rules.isMobileNo) {
            const pattern = /^\d{10}$/;
            // isValid = pattern.test(value) && isValid
            return {
                valid: pattern.test(value) && isValid,
                validationMsg: "Only Numbers!"
            }
        }

        if (rules.isMobileNo && value.length > rules.maxLength) {
            return {
                valid: false,
                validationMsg: `Mobile Number is too long (Maximum ${rules.maxLength} characters allowed)`
            }
        }

        if (rules.isMobileNo) {
            const pattern = /^\d{10}$/;
            // isValid = pattern.test(value) && isValid
            return {
                valid: pattern.test(value) && isValid,
                validationMsg: "Only Numbers!"
            }
        }

        if (rules.isMobileNo && value.length !== rules.maxLength) {
            return {
                valid: false,
                validationMsg: `Mobile Number must (${rules.maxLength} digits.)`
            }
        }

        return {
            valid: true,
            validationMsg: null
        }
    }

    if (rules.isEmail) {
        if (!value) {
            return {
                valid: false,
                validationMsg: 'Email may not be empty'
            }
        }

        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!pattern.test(value)) {
            return {
                valid: false,
                validationMsg: 'Email not valid'
            }
        }

        if (value.length > rules.maxLength) {
            return {
                valid: false,
                validationMsg: `Email is too long (Maximum ${rules.maxLength} characters allowed)`
            }
        }
        return {
            valid: true,
            validationMsg: null
        }
    }

    if (rules.isPassword) {
        if (value.length < rules.minLength) {
            return {
                valid: false,
                validationMsg: `Password is too short (Minimum ${rules.minLength} characters needed.)`
            }
        } else if (value.length > rules.maxLength) {
            return {
                valid: false,
                validationMsg: `Password is too long (Maximum ${rules.maxLength} characters allowed.)`
            }
        } else {
            return {
                valid: true,
                validationMsg: null,
            };
        }
    }


    return {
        valid: isValid,
        validationMsg: errorMsg
    }
};
