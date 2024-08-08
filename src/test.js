var data = {
    'Alabama': [205, 251, 256, 334],
    'Alaska': [907],
    'Arizona': [480, 520, 602, 623, 928]
};

var targetNumber = 520; 



for (const key in data) {
    if (data[key].includes(targetNumber)) {
        return key;
         
    }
}


// if (foundKey !== null) {
//     console.log(`Number ${targetNumber} is found in key: ${foundKey}`);
// } else {
//     console.log(`Number ${targetNumber} is not found in any key`);
// }
