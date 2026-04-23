const form = document.querySelector("#habits-form");
const habitName = document.querySelector("#habit-name");
const habitCategory = document.querySelector("#habit-category");
const habitTime = document.querySelector("#habit-time");
const habitType = document.querySelector("#habit-type");
const list = document.querySelector("#habits-list");
const summary = document.querySelector("#summary");

const habits = [];


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = Date.now()
    const name = habitName.value.trim();
    const category = habitCategory.value;
    const time = habitTime.value.trim();
    const type = habitType.value;
    if (!name || !category || isNaN(time) || Number(time) <= 0 || !type) {
        alert("Por favor, ingresa un hábito, categoría, tiempo y tipo válidos.");
        return;
    }
    const habit = { 
        id,
        name, 
        category, 
        time,
        type 
    };
    habits.push(habit);
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
    form.reset();
});
const renderHabits = () => {
    list.innerHTML = "";
    habits.forEach((habit) => {
        const li = document.createElement("li");
        li.innerHTML = `${habit.name} - ${habit.category} - ${habit.time} min - ${habit.type}
        <button data-id="${habit.id}">❌</button>`;
        list.appendChild(li);
    });
}
list.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON"){
        const id = Number(e.target.dataset.id);
        const index = habits.findIndex(habit => habit.id === id);
        if (index !== -1) {
            habits.splice(index, 1);
            localStorage.setItem("habits", JSON.stringify(habits));
            renderHabits();
        }   
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const data = localStorage.getItem("habits");
    if (data) {
        habits.push(...JSON.parse(data));
        renderHabits();
    }
});