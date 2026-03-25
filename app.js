const toolbar = document.querySelector('.toolbar');

function updateTool(tool) {
    tool.classList.toggle('hasValue', !!tool.querySelector('.value'));
    tool.classList.toggle('hasInput', !!tool.querySelector('input').value);
    tool.classList.toggle('hasIcon',  !!tool.querySelector('.icon'));
}

function addFilterValue(filter, valueContent) {
    const value = document.createElement('span');
    value.className = 'value';
    value.textContent = valueContent
    filter.querySelector('.values').appendChild(value);
    filter.querySelector('input').value = '';
}

toolbar.querySelectorAll('input').forEach(input => {
    const tool = input.closest('.tool');

    input.addEventListener('input', () => updateTool(tool));

    input.addEventListener('keydown', e => {
        if (e.key !== 'Enter' || !input.value.trim()) return;
        tool.dispatchEvent(new CustomEvent('submitInput', { detail: { value: input.value } }));
    });
});

toolbar.querySelectorAll('.filter').forEach(filter => {
    filter.addEventListener('submitInput', e => {
        valueContent = e.detail.value;
        addFilterValue(filter, valueContent);
        updateTool(filter);
    });
});

toolbar.addEventListener("click", e => {
    const value = e.target.closest(".value");
    const tool = value.closest(".tool")
    value.remove();
    updateTool(tool);

})

toolbar.querySelectorAll('.tool').forEach(updateTool);