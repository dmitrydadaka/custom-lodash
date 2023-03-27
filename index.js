const mergeDeep = (target, ...sources) => {
    if (!sources.length) return target;
    const source = sources.shift();
    if (target instanceof Object && source instanceof Object) {
        for (const key in source) {
            if (source[key] instanceof Object) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return mergeDeep(target, ...sources);
}
class Lodash {

    chunk(arr, length) {
        const result = [];
        let array = [];
        let iResult = 0;
        let iArray = 0;
        for (let i = 0; i < arr.length; i++) {
            if (array.length < length) {
                array[iArray] = arr[i];
                iArray++;
            } else {
                result[iResult] = array;
                iResult++;
                array = [];
                --i;
                iArray = 0;
            }
        }
        if (array.length > 0) {
            result[result.length] = array
            array = []
            iArray = 0
        }
        return result
    }

    compact(arr) {
        return this.filter(arr, (el) => (el == false || el === undefined || (isNaN(arr[i]) && typeof el == 'number')) !== true)
    }

    drop(arr, n = 1) {
        return this.dropWhile(arr, (el) => arr.indexOf(el) < n);
    }

    dropWhile(arr, func = (el) => el) {
        const result = [];
        let iResult = 0;
        for (let i = 0; i < arr.length; i++) {
            if (func(arr[i]) == true) {
                continue;
            }
            result[iResult] = typeof arr[i] == 'object' ? Object.values(arr[i])[0] : arr[i];
            iResult++;
        }
        return result;
    }

    take(arr, n = 1) {
        if (arr.length <= n) {
            return arr;
        }
        const result = [];
        let iResult = 0;
        for (let i = 0; i < n; i++) {
            result[iResult] = arr[i]
            iResult++;
        }
        return result;
    }

    filter(arr, func = (el) => el) {
        const result = [];
        let iResult = 0;
        for (let i = 0; i < arr.length; i++) {
            if (func(arr[i]) !== true) continue;
            result[iResult] = Object.values(arr[i])[0];
            iResult++;
        }
        return result;
    }

    find(arr, func) {
        for (let i = 0; i < arr.length; i++) {
            if (func(arr[i]) === true) {
                return Object.values(arr[i])[0];
            }
        }
        return;
    }
    includes(arr, value, fromIndex) {
        for (let i = fromIndex ? fromIndex : 0; i < arr.length; i++) {
            if (arr[i] === value) return true;
        }
        return false;
    }

    map(arr, func) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            result[i] = func(arr[i]);
        }
        return result;
    }

    zip(...arr) {
        let result = [];
        let iResult = 0;
        for (let i = 0; i < Math.max(...this.map(arr, e => e.length)); i++) {
            let array = []
            for (let j = 0; j < arr.length; j++) {
                array[j] = arr[j][i];
            }
            result[iResult] = array;
            iResult++
            array = [];
        }
        return result;
    }

    merge(target, ...sources) {
        return mergeDeep(target, ...sources);
    }

    omit(obj, sources) {
        return this.omitBy(obj, (el) => {
            for (let i = 0; i < sources.length; i++) {
                if (obj[sources[i]] == el) {
                    return true;
                }
            }
            return false;
        })
    }

    omitBy(obj, func) {
        return this.pickBy(obj, (el) => {
            if (func(el)) {
                return false;
            }
            return true;
        })
    }

    pick(obj, sources) {
        return this.pickBy(obj, (el) => {
            for (let i = 0; i < sources.length; i++) {
                if (obj[sources[i]] == el) {
                    return true;
                }
            }
            return false;
        })
    }

    pickBy(obj, func) {
        let newObj = {};
        for (let i of Object.entries(obj)) {
            let value = i[1];
            let key = i[0];
            if (func(value)) {
                newObj[key] = value;
            }
        }
        return newObj;
    }

    toPairs(obj) {
        return Object.entries(obj);
    }
}
let _ = new Lodash();
