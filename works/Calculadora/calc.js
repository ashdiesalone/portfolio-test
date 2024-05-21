'use strict';

class Calculator {
    constructor(prevOperandText, currOperandText) {
        this.prevOperandText = prevOperandText
        this.currOperandText = currOperandText
        this.clear()
    }
    clear() {
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }
    addNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }
    operate(operation) {
        if (this.currOperand === '') return
        if (this.prevOperand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }
    calculate() {
        let calculation
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch(this.operation) {
            case '+':
                calculation = prev + curr
                break
            case '-':
                calculation = prev - curr
                break
            case '*':
                calculation = prev * curr
                break
            case '/':
                calculation = prev / curr
                break
            default:
                return
        }
        this.currOperand = calculation
        this.operation = undefined
        this.prevOperand = ''
    }
    updateDisplay() {
        this.currOperandText.textContent = this.currOperand
        this.prevOperandText.textContent = this.prevOperand
    }
}

const btnNumber = document.querySelectorAll('.number');
const btnOperation = document.querySelectorAll('.operation');
const btnClear = document.querySelector('.ac');
const btnDel = document.querySelector('.delete');
const btnEqual = document.querySelector('.equal');
const prevOperandText = document.querySelector('.previous');
const currOperandText = document.querySelector('.current');

const calculator = new Calculator(prevOperandText, currOperandText)

btnNumber.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.textContent)
        calculator.updateDisplay()
    })
})

btnOperation.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operate(button.textContent)
        calculator.updateDisplay()
    })
})

btnEqual.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

btnClear.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

btnDel.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})