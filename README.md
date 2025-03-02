
# 🚀 NORMALIZE DATA BEFORE SENDING RESPONSE


## **📌 Features** 
✅ **Normalized Nested Data** — object, array and string.    
✅ **fieldsToNormalize** — normalized particular field only.         
✅ **Replace Data** — multiple at once.            
✅ **Trimmed Data** — deep trimmed data.         
✅ **Splice Data** — get the data u want to display.  


## **📖 Example Usage**  
Normalized Response with one function! 🎯  

### ** Install Dependencies**  
```sh
npm install normalize-response
```

### ** Basic Usecase**  
```sh
const { normalizeData } = require("normalize-response");
const data={...};
const normalizedData = normalizeData({
    data,
    isTrimmed: true,
    fieldsToNormalize: ["field1", "field2",...],
    transformTo: "capitalize"
});
```

### ** Advanced Usecase**  
```sh
const { normalizeData } = require("normalize-response");
const data={...};
const normalizedData = normalizeData({
    data,
    isTrimmed: true,
    fieldsToNormalize: ["field1", "field2",...],
    replaceTo: [{
        from: "-",
        to: "",
        scope: "global"
    },
    {
        from: "=",
        to: " ",
        scope: "first"
    }],
    transformTo: "capitalize",
    sliceTo = {
    from: 0,
    to: 3,
    add: ""
    }
});
```
## Configuration Table

| Type      | Value     | Description                                      |
|---------  |---------- |--------------------------------------------------|
| isTrimmed | `true`/`false`    | trimmed the field deeply if true.        |
| fieldsToNormalize | `["field1", "field2",...]` | normalized particular field only. |
| transformTo | `capitalize`/ `uppercase` / `lowercase` | transform the field. |
| replaceTo | `[{"from": "-", "to": "", "scope": "global"}, {"from": "=", "to": " ", "scope": "first"}]` | replace the field. |
| sliceTo | `{from: 0, to: 3, add: ""}` | slice the field. |
