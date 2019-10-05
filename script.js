/*
// Get all <p> elements in the document with class="example"
var x = document.querySelectorAll("p.example");

// Set the background color of the first <p> element with class="example" (index 0)
x[0].style.backgroundColor = "red"; 
*/

//we're going to store values with a class
 

class Calculator{
	constructor(previousOperandTextElement, currentOperandTextElement){
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear()
	}

	clear()
	{
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = undefined
	}

	delete()
	{
		this.currentOperand = this.currentOperand.toString().slice(0, -1) //we skip the last number
	} 

	appendNumber(number)
	{
		if (number === '.' && this.currentOperand.includes('.')) return
		this.currentOperand = this.currentOperand.toString() + number.toString()
 	}
	chooseOperation(operation)
	{
		if (this.currentOperand === '')return
		if (this.previousOperand !== '')
		{
			this.compute()
		}
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
	}

	compute()
	{
		let computation
		//parseFloat:parses a string and returns a floating point number.
		//return value: A Number. If the first character cannot be converted to a number, NaN is returned

		const prev = parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)

		if(isNaN(prev) || isNaN(current)) return
		switch(this.operation)
		{
			case '+':
				computation = prev + current
				break
			case '-':
				computation = prev - current
				break
			case '*':
				computation = prev * current
				break
			case '÷':
				computation = prev / current
				break
			default:
				return
		}
		this.currentOperand = computation
		this.operation = undefined //we clean it
		this.previousOperand = '' //we clean it
	}

	/*
	getDisplayNumber(number)
	{
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split('.')[0]) //split returns An Array, containing the splitted values
		const decimalDigits = stringNumber.split('.')[1]
		let integerDigits
		if(isNaN(integerDigits))
		{
			integerDigits = ''
		} 
		else
		{
			integerDisplay = integerDigits.toLocateString('en', {
				maximumFractionDigits: 0})
		}

		if(decimalDigits != null)
		{
			return `${integerDisplay}.${decimalDigits}`
		}
		else
		{
			return integerDisplay
		}


	}*/

	updateDisplay()
	{
		this.currentOperandTextElement.innerText = this.currentOperand
		this.previousOperandTextElement.innerText = this.previousOperand
		
	}
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationsButtons = document.querySelectorAll('[data-operation]') 
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay();
	})
});

operationsButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText)
		calculator.updateDisplay();
	})
});

equalsButton.addEventListener('click', button =>{
	calculator.compute()
	calculator.updateDisplay()
})

allClearButton.addEventListener('click', button =>{
	calculator.clear()
	calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
	calculator.delete()
	calculator.updateDisplay()
})
