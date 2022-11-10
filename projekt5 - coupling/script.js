
// interval(arr);

class FuncLibrary{
    constructor(array){
        if(array != null){
            this.container = array;
        }else{
            this.container = [];
        }
        this.subscribers = [];
    }

    subscribe(subscriber){
        this.subscribers.push(subscriber);
    }

    notify(){
        this.subscribers.forEach(element => {
            element.update(this.container);
        });
    }

    addToLibrary(callback){
        this.container.push(callback);
        this.notify();
    }

}

class Subscriber{

    constructor(){
        this.functions = [];        
    }

    update(funcArray){
        funcArray.forEach(element => {
            this.functions.push(element);
        })
    }

}

let publisher = new FuncLibrary();
let subscriber = new Subscriber();
publisher.subscribe(subscriber);
publisher.addToLibrary(saveCToSessionStorage);
publisher.addToLibrary(discoverPowerBallNumber);

function interval(){
    let timer = 1;
    let arr = subscriber.functions;
    setInterval(
        () => {
        // mamy coupling - interval ma na sztywno zaszyte w sobie C i D (..i logger)
        arr.forEach(element => {
            element(timer);
        });
        timer++;
        }
        , 2000);
}

interval();


class Logger {
  static log(data) {
    console.log(data)
  }

  

}

function saveCToSessionStorage(data) {
  console.log('[reader C]', data)
  const storageData = { data }
  sessionStorage.setItem('C', JSON.stringify(storageData))
  // brudzimy funkcję loggerem - to nie jest jej funkcjonalność!
  //Logger.log(`[log from C] ${data}`)
}

function discoverPowerBallNumber(data) {
  const number = Math.floor(Math.random() * data * 100)
  console.log('[powerball number]', number)
}
