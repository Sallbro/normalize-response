const { isEmpty } = require("./helper");

function normalizeData({
    data,
    isTrimmed = false,
    sliceTo = {},
    fieldsToNormalize = [],
    transformTo = "capitalize",
    replaceTo = []
}
) {
    if (typeof data === "string") {
        return normalizeString(data, isTrimmed, sliceTo, transformTo, replaceTo);
    } else if (Array.isArray(data)) {
        return normalizeArray(data, fieldsToNormalize, isTrimmed, sliceTo, transformTo, replaceTo);
    } else if (typeof data === "object" && data !== null) {
        return normalizeObject(data, fieldsToNormalize, isTrimmed, sliceTo, transformTo, replaceTo);
    } else {
        return data; // Return the original data for unsupported types
    }
}

// normalized string
function normalizeString(str, isTrimmed, sliceTo, transformTo, replaceTo) {
    // Check if str is a valid string
    if (typeof str !== "string") {
        return str; // Return an empty string or handle as needed
    }
    let normalized = str;
    // trimmed data
    if (isTrimmed) {
        normalized = normalized.trim().split(/\s/).filter((word) => {
            return word !== ""
        }).join(" ");
    }
    // replaceTo data
    for (const { from, to, scope } of replaceTo) {
        if (scope === "global") {
            normalized = normalized.replace(new RegExp(from, "g"), to);
        } else if (scope === "first") {
            normalized = normalized.replace(from, to);
        }
    }
    // transformTo data
    normalized = normalized
        .split(/\s/)
        .map((word) => {
            if (transformTo == "capitalize") {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            }
            else if (transformTo == "uppercase") {
                return word.toUpperCase()
            }
            else if (transformTo == "lowercase") {
                return word.toLowerCase()
            }
        })
        .join(" ");
    // slice data
    if (!isEmpty(sliceTo)) {
        normalized = `${normalized.slice(sliceTo.from, sliceTo.to)}${sliceTo.add}`
    }

    return normalized ? normalized : str;
}

// normalized array
function normalizeArray(arr, fieldsToNormalize, isTrimmed, sliceTo, transformTo, replaceTo) {
    return arr.map((item) => {
        if (typeof item === "string") {
            return normalizeString(item, isTrimmed, sliceTo, transformTo, replaceTo);
        } else if (Array.isArray(item)) {
            return normalizeArray(item, fieldsToNormalize, isTrimmed, sliceTo, transformTo, replaceTo);
        } else if (typeof item === "object" && item !== null) {
            return normalizeObject(item, fieldsToNormalize, isTrimmed, sliceTo, transformTo, replaceTo);
        } else {
            return item; // Return original item for unsupported types
        }
    });
}

// normalized object
function normalizeObject(obj, fieldsToNormalize, isTrimmed, sliceTo, transformTo, replaceTo) {
    const normalizedObj = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (fieldsToNormalize.includes(key)) {
                normalizedObj[key] = normalizeString(value, isTrimmed, sliceTo, transformTo, replaceTo);
            } else if (typeof value === "string") {
                normalizedObj[key] = value;
            } else if (Array.isArray(value)) {
                normalizedObj[key] = normalizeArray(
                    value,
                    fieldsToNormalize,
                    isTrimmed,
                    sliceTo,
                    transformTo,
                    replaceTo
                );
            } else if (typeof value === "object" && value !== null) {
                normalizedObj[key] = normalizeObject(
                    value,
                    fieldsToNormalize,
                    isTrimmed,
                    sliceTo,
                    transformTo,
                    replaceTo
                );
            } else {
                normalizedObj[key] = value; // Return original value for unsupported types
            }
        }
    }

    return normalizedObj;
}


module.exports = { normalizeData }