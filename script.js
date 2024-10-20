
const output = document.getElementById("out")
const buttons = document.getElementById("buttons")
const state = {
    screen: 0,
    current: "operand1",
    operator: null,
    operand1: 0,
    operand2: null,
    lastOperand: null,
}

updateScreen()

buttons.onclick = handleButtons

function updateScreen() {
    output.value = state.screen
}

function handleButtons(e) {
    if (e.target.localName != "button") return

    const btn = e.target

    if (btn.className == "digit") handleDigit(btn.value)
    if (btn.className == "operation") handleOperation(btn.value)
    if (btn.className == "equals") handleEquals()
    if (btn.className == "clear") handleClear()

    updateScreen()
}

function handleDigit(digit) {
    const { current } = state

    state[current] ||= 0 
    state[current] += digit
    state[current] = +state[current]
    state.screen = state[current]
}

function handleOperation(operator) {
    if (state.operator && state.operand2 !== null) handleCalculate()

    state.operator = operator
    state.current = "operand2"
    state.operand2 = null
}

function handleEquals() {
    state.operand2 ??= state.lastOperand
    handleCalculate()
    state.lastOperand = state.operand2
    state.operand2 = null
} 

function handleCalculate() {
    const {operand1, operand2, operator} = state
    const expression = operand1 + operator + (operand2 ?? operand1)
    const result = eval(expression)
    
    state.screen = result
    state.operand1 = result
}

function handleClear() {
    Object.assign(state,  {
        screen: 0,
        current: "operand1",
        operator: null,
        operand1: 0,
        operand2: null,
    })  
}