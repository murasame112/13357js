async function funcName(url){
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);
    }

funcName('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=b32d84d770907c0b3e954927aed7ea88')