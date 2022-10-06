addEventListener('load', (event) => {
    const button = document.querySelector('#add_number_button');
    const numbersDiv = document.querySelector('.numbers');
    const resultsDiv = document.querySelector('.results');
    let inputs = numbersDiv.querySelectorAll('input');

    inputs.forEach(function(elem) {
        elem.addEventListener("input", function() {
            calculate();
        });
    });

    button.addEventListener('click', () => {
        const highestId = getHighestNumberId();
        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'n' + highestId.toString();
        input.placeholder = 'number ' + highestId.toString();
        const delButton = document.createElement('button');
        delButton.id = 'del' + highestId.toString();
        delButton.addEventListener('click', deleteInput);
        delButton.innerHTML = "delete";
        numbersDiv.appendChild(input);
        numbersDiv.appendChild(delButton);
        numbersDiv.appendChild(document.createElement('br'));
        input.addEventListener("input", function() {
            calculate();
        });
    
    });

    function deleteInput(button){
        console.log('del');
    }

    function getHighestNumberId(){
        inputs = numbersDiv.querySelectorAll('input');
        const lastInput = inputs[inputs.length - 1];
        let highestId = lastInput.id;
        highestId = highestId.slice(1);
        highestId = parseInt(highestId, 10);
        highestId++;
        
        return highestId;
        
    }

    function calculate(){
        const numbers = [];
        inputs = numbersDiv.querySelectorAll('input');
        inputs.forEach(function(elem) {
            let value = elem.value;
            value = parseInt(value, 10);
            if((typeof value == 'number') && (Number.isNaN(value) == false)) {
                
                numbers.push(value);
            }           
            
        });
        let sum = 0;
        numbers.forEach(function(elem) {
            sum+= elem;
        });

        let avg = sum / numbers.length;
        let min = Math.min(...numbers);
        let max = Math.max(...numbers);

        document.querySelector('#sum').innerHTML = sum;
        document.querySelector('#avg').innerHTML = avg;
        document.querySelector('#min').innerHTML = min;
        document.querySelector('#max').innerHTML = max;
    }


    
});     

