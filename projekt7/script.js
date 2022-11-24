const asyncAdd = async (a,b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return Promise.reject('Argumenty muszą mieć typ number!')
    }
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve(a+b)
      }, 100)
    })
}

function fillArray(array){
    for(let i = 0; i < 100; i++){
        let num = Math.floor(Math.random() * 10);
        array.push(num);
    }
    return array;

}



async function sumAll(array){
    const t0 = performance.now();
    let callCount = 0;
    let sum = 0;

    for(let i = 0; i < array.length; i++){
        await asyncAdd(sum, array[i]).then((val) => {
            sum=val;   
            callCount++;         
        });
    }

    const t1 = performance.now();
    const time = t1-t0;
    console.log('czas: '+time+' milisekund  ');
    console.log('ilosc operacji asynchronicznych: '+callCount);
    return sum;

}

//const arr = [5,7,3,4,9,2,1,8,5,3];

arr = fillArray([]);

let result = sumAll(arr);

result.then((value) => {
    console.log(value);
});
