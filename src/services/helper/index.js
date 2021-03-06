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

export {enumToOptions};