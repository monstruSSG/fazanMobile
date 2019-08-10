module.exports = {
    generateArrayOfValues: values => {
        let result = '(';

        if(values.length === 0) return `('')`;

        if(values.length === 1) return `('${values[0]}')`

        for (let i = 0; i < values.length; i++) {
            if ((i + 1) === values.length) return result += '\'' +values[i] + '\'' + ' )';
            result += '\'' +values[i] + '\'' + ' ,';
        }
        
        return result;
    }
}