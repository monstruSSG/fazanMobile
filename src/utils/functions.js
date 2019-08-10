module.exports = {
    generateNotInQuery: values => {
        if (values.length < 1) return '()';
        if (values.length === 1) return `('${values[0]}')`;

        let result = '(';

        for (let i = 0; i < values.length; i++) { 
            if((i +  1) === values.length) {
                result += '\'' + values[i] + '\')';
                break;
            }
            
            result += '\'' + values[i] + '\',';
        }

        return result;
    }
}