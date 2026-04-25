import {
    saveHabits,
    loadHabits,
    saveNonNegotiables,
    loadNonNegotiables
} from "./storage.js";
import {
    renderNonNegotiables,
}
from "./ui.js";




const form = document.querySelector("#habits-form");
const habitName = document.querySelector("#habit-name");
const habitCategory = document.querySelector("#habit-category");
const habitTime = document.querySelector("#habit-time");
const habitType = document.querySelector("#habit-type");
const list = document.querySelector("#habits-list");
const summary = document.querySelector("#summary");
const nonNegotiableForm = document.querySelector("#non-negotiables-form");
const nonNegotiableInput = document.querySelector("#nn-input");
const nonNegotiableList = document.querySelector("#non-negotiables-list");
const nnInProgress = document.querySelector("#nn-in-progress");

const habits = [];
const nonNegotiables = [];
let chart = null;

nonNegotiableForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = Date.now()
    const name = nonNegotiableInput.value.trim();
    if (!name) {
        alert("Por favor, ingresa un hábito no negociable válido.");
        return;
    }
    const nnHabits = { 
        id,
        name,
        completed: false
    };
    nonNegotiables.push(nnHabits);
    saveNonNegotiables(nonNegotiables);
    nonNegotiableInput.value = "";
    renderNonNegotiables(nonNegotiableList, nonNegotiables, nnInProgress);
    nonNegotiableForm.reset();
});

nonNegotiableList.addEventListener("change", (e) => {
    if (e.target.tagName === "INPUT") {
        const id = Number(e.target.dataset.id);
        const index = nonNegotiables.findIndex(nn => nn.id === id);
        if (index !== -1) {
            nonNegotiables[index].completed = e.target.checked;
            saveNonNegotiables(nonNegotiables);
            renderNonNegotiables(nonNegotiableList, nonNegotiables, nnInProgress);
        } 
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = Date.now()
    const name = habitName.value.trim();
    const category = habitCategory.value;
    const time = Number(habitTime.value.trim());
    const type = habitType.value;
    if (!name || !category || isNaN(time) || time <= 0 || !type) {
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
    saveHabits(habits);
    renderHabits();
    updateSummary();
    updateChart();
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
    updateSummary();
    updateChart();
}
list.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON"){
        const id = Number(e.target.dataset.id);
        const index = habits.findIndex(habit => habit.id === id);
        if (index !== -1) {
            habits.splice(index, 1);
            saveHabits(habits);
            renderHabits();
            updateSummary();
            updateChart();
        }   
    }
});
document.addEventListener("DOMContentLoaded", () => {
    habits.push(...loadHabits());
    nonNegotiables.push(...loadNonNegotiables());
    renderHabits();
    renderNonNegotiables(nonNegotiableList, nonNegotiables, nnInProgress);
});
const updateSummary = () => {
    const goodTime = habits
        .filter(h => h.type === "bueno")
        .reduce((sum, h) => sum + Number(h.time), 0);
    const badTime = habits
        .filter(h => h.type === "malo")
        .reduce((sum, h) => sum + Number(h.time), 0);
    summary.textContent = `Tiempo total en hábitos buenos: ${goodTime} min | Tiempo total en hábitos malos: ${badTime} min`;
};
const updateChart = () => {

    const grupedHabits = habits.reduce((acc, habit) => {
        if (!acc[habit.type]) {
            acc[habit.type] = 0;
        }
        acc[habit.type] += Number(habit.time);
        return acc;
    }, {});
    const labels = Object.keys(grupedHabits);
    const data = Object.values(grupedHabits);
    const ctx = document.querySelector("#habits-chart").getContext("2d");
    if (chart) {
        chart.destroy()
    }
    chart = new Chart(ctx, {
        type:"doughnut",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ["#4caf50", "#f44336"]
            }]
        }
    })
}