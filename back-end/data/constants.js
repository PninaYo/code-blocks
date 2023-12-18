
const initiateData = [
    {   title: 'Async case',
        code: 'async function fetchData() {\n' +
            '    try {\n' +
            '        const response = await fetch(\'https://api.example.com/data\');\n' +
            '        const data = await response.json();\n' +
            '    } catch (error) {\n' +
            '        console.error(\'Error fetching data:\', error);\n' +
            '    }\n' +
            '}\n' +
            'fetchData()',
        correctCode: 'async function fetchData() {\n' +
            '    try {\n' +
            '        const response = await fetch(\'https://api.example.com/data\');\n' +
            '        const data = await response.json();\n' +
            '    } catch (error) {\n' +
            '        console.error(\'Error fetching data:\', error);\n' +
            '    }\n' +
            '}\n' +
            'fetchData();'
    },
    {   title: 'Recursive case',
        code: 'function factorial(n) {\n' +
            '    if (n <= 1) {\n' +
            '        return 1;\n' +
            '    } else {\n' +
            '        return n * factorial(n - 1)',

        correctCode: 'function factorial(n) {\n' +
            '    if (n <= 1) {\n' +
            '        return 1;\n' +
            '    } else {\n' +
            '        return n * factorial(n - 1);'

    },
    {   title: 'Pointer Case',
        code: 'let x = 10, y = x;\n' +
            'x = 20;\n' +
            'console.lg(y);',
        correctCode: 'let x = 10, y = x;\n' +
            'x = 20;\n' +
            'console.log(y);'
    },
    {   title: 'Quick Sort Case',
        code: 'const quickSort = (arr) => arr.lngth <= 1 ? arr : [...quickSort(arr.slice(1).filter(el => el < arr[0])), arr[0], ...quickSort(arr.slice(1).filter(el => el >= arr[0]))];\n' +
            'cnst numbers = [4, 2, 7, 1, 9, 3];',
        correctCode: 'const quickSort = (arr) => arr.length <= 1 ? arr : [...quickSort(arr.slice(1).filter(el => el < arr[0])), arr[0], ...quickSort(arr.slice(1).filter(el => el >= arr[0]))];\n' +
            'const numbers = [4, 2, 7, 1, 9, 3];'

    },
    {   title: 'Smallest case',
        code: 'const findSmallest = (ar) => arr.reduce((smallest, current) => current < smallest ? current : smallest, arr[0]);\n' +
            'cnst numbers = [7, 3, 10, 2, 5];',
        correctCode: 'const findSmallest = (arr) => arr.reduce((smallest, current) => current < smallest ? current : smallest, arr[0]);\n' +
            'const numbers = [7, 3, 10, 2, 5];'
    },
    {   title: 'Palindrome case',
        code: 'const isPalindrome = (str) => {\n' +
            '    const cleanStr = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, \'\');\n' +
            '    const reversedStr = cleanStr.split(\'\').reverse().join(\'\');\n' +
            '    return cleanStr === reversedStr;\n' +
            '};\n' +
            '\n' +
            'cnst word = \'level\'',
        correctCode: 'const isPalindrome = (str) => {\n' +
            '    const cleanStr = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, \'\');\n' +
            '    const reversedStr = cleanStr.split(\'\').reverse().join(\'\');\n' +
            '    return cleanStr === reversedStr;\n' +
            '};\n' +
            '\n' +
            'const word = \'level\';'
    },
];

module.exports = {
    initiateData,
};
