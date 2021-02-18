module.exports = ({min, max}) => {
if(!min || !max)return{"error":"min and max are required."};

let amin;
let amax;

if(isNaN(min) || isNaN(max)){
    if(isNaN(parseInt(min, 10)) || isNaN(parseInt(max, 10)))return{"error":"min or max is NaN"};
    let amin = parseInt(min, 10);
    let amax = parseInt(max, 10);
}else{
    amin = min;
    amax = max;
}

if(min >= max)return{"error":"min>=max"};

const randomNumber = Math.floor(Math.random() * (amax - amin) + amin);
return randomNumber;
}
