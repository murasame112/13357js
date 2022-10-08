window.addEventListener('DOMContentLoaded', (event) => {
    const button = document.querySelector('#add_number_button');
    const numbersDiv = document.querySelector('.numbers');
    const resultsDiv = document.querySelector('.results');
    let inputs = numbersDiv.querySelectorAll('input');    
    let delButtons = document.querySelectorAll('.delete_button');
    calculate();

    inputs.forEach(function(elem) {
        elem.addEventListener("input", function() {
            calculate();
        });
        elem.style.width = '75px';
    });

    delButtons.forEach(function(elem) {
        elem.addEventListener('click', deleteInput);
        elem.style.width = '45px';
        elem.style.marginBottom = '10px';
    });

    button.addEventListener('click', () => {
        const highestId = getHighestNumberId();
        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'n' + highestId.toString();
        input.placeholder = 'number ' + highestId.toString();
        input.style.width = '75px';
        const delButton = document.createElement('button');
        delButton.id = 'del' + highestId.toString();
        delButton.className = 'delete_button';
        delButton.addEventListener('click', deleteInput);
        delButton.innerHTML = "delete";
        delButton.style.width = '45px';
        delButton.style.marginBottom = '10px';
        numbersDiv.appendChild(input);
        numbersDiv.appendChild(delButton);
        numbersDiv.appendChild(document.createElement('br'));
        input.addEventListener("input", function() {
            calculate();
        });
    
    });

    function deleteInput(){
        let buttonId = this.id.slice(3);
        numbersDiv.querySelector('#n' + buttonId).remove();
        this.remove();
        calculate();
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

        let numLength = numbers.length;
        let min = Math.min(...numbers);
        let max = Math.max(...numbers);

        
        if(numLength < 1){
            numLength = 1;
            min = 0;
            max = 0;
        }
        let avg = sum / numLength;


        
        resultsDiv.querySelector('#sum').innerHTML = sum;
        resultsDiv.querySelector('#avg').innerHTML = avg;
        resultsDiv.querySelector('#min').innerHTML = min;
        resultsDiv.querySelector('#max').innerHTML = max;
    }


    
});     

