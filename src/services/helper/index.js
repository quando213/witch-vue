const enumToOptions = (obj) => {
    let result = [];
    Object.keys(obj).forEach(key => {
        result.push({
            label: key,
            value: obj[key]
        })
    })
    return result;
}

const getHeaders = () => {
    return {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        accept: 'application/json'
    }
}

const assignValuesToForm = (form, data) => {
    Object.keys(form).forEach(key => {
        form[key] = data[key];
    })
    return form;
}

export {enumToOptions, getHeaders, assignValuesToForm};