import {
    saveHabits,
    loadHabits,
    saveNonNegotiables,
    loadNonNegotiables
} from "./storage.js";
import {
    renderNonNegotiables,
    renderHabits
}
from "./ui.js";
import {
    getHabitTotals
} from "./calculations.js";
import {
    updateChart
} from "./chart.js";


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
const ctx = document.querySelector("#habits-chart").getContext("2d");

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
    renderHabits(list, habits);
    updateSummary();
    chart = updateChart(ctx, habits, chart);
    form.reset();
});

list.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON"){
        const id = Number(e.target.dataset.id);
        const index = habits.findIndex(habit => habit.id === id);
        if (index !== -1) {
            habits.splice(index, 1);
            saveHabits(habits);
            renderHabits(list, habits);
            updateSummary();
            chart = updateChart(ctx, habits, chart);
        }   
    }
});
document.addEventListener("DOMContentLoaded", () => {
    habits.push(...loadHabits());
    nonNegotiables.push(...loadNonNegotiables());
    renderHabits(list, habits);
    renderNonNegotiables(nonNegotiableList, nonNegotiables, nnInProgress);
    chart = updateChart(ctx, habits, chart);
});
const updateSummary = () => {
    const { goodTime, badTime } = getHabitTotals(habits);
    summary.textContent = `Tiempo total en hábitos buenos: ${goodTime} min | Tiempo total en hábitos malos: ${badTime} min`;
};