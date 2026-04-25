const updateNNProgress = (nonNegotiables, progressElement) => {
    const completed = nonNegotiables.filter(nn => nn.completed).length;

    progressElement.textContent =
        `${completed} de ${nonNegotiables.length} completados`;
        if (nonNegotiables.length > 0 && completed === nonNegotiables.length) {
            progressElement.textContent += " - ¡Todos completados!";
        }
}
export const renderNonNegotiables = (list, items, progressElement,) => {
    list.innerHTML = "";
    items.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} <input type="checkbox" data-id="${item.id}" ${item.completed ? "checked" : ""}>`;
        list.appendChild(li);
    });
    updateNNProgress(items, progressElement);
}
export const renderHabits = (list, habits) => {
    list.innerHTML = "";
    habits.forEach((habit) => {
        const li = document.createElement("li");
        li.innerHTML = `${habit.name} - ${habit.category} - ${habit.time} min - ${habit.type}
        <button data-id="${habit.id}">❌</button>`;
        list.appendChild(li);
    });
}
