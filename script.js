
const output = document.getElementById("out")
const buttons = document.getElementById("buttons")
const state = {
    screen: 0,
    current: "operand1",
    operator: null,
    operand1: 0,
    operand2: null,
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

    updateScreen()
}
function handleDigit(digit) {
    const { current } = state

    state[current] += digit
    state[current] = +state[current]
    state.screen = state[current]
}