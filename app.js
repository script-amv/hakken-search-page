function submitInputListener(e) {
    let input = e.target
    let tool = input.closest(".tool")

    if (e.key === 'Enter' && input.value.trim()) {
        let event = new CustomEvent("submitInput", {
            detail: {
                value: input.value
            }
        })

        tool.dispatchEvent(event)
    }
}

let inputs = document.querySelectorAll('.toolbar input')

inputs.forEach(input => {
    input.addEventListener('keydown', submitInputListener)
    input.addEventListener('input', e => {
        let tool = input.closest('.tool')
        updateToolClasses(tool)
    })
})



function addFilterValue(filter, valueContent) {
    let values = filter.querySelector(".values")
    let value = document.createElement("span")
    value.classList.add("value")
    value.textContent = valueContent
    values.appendChild(value)

    let input = filter.querySelector("input")
    input.value = ""
}

let filters = document.querySelectorAll(".toolbar .filter")

filters.forEach(filter => {
    filter.addEventListener("submitInput", e => addFilterValue(filter, e.detail.value))
})



function updateToolClasses(tool) {
    let hasValues = Boolean(tool.querySelector('.value'))
    let hasInput = Boolean(tool.querySelector('input').value)
    tool.classList.toggle('chosen', hasValues)
    tool.classList.toggle('hasInput', hasInput)
}

let tools = document.querySelectorAll(".toolbar .tool")
tools.forEach(tool => updateToolClasses(tool))