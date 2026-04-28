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
    getHabitTotals,
    getTopHabits
} from "./calculations.js";
import {
    updateNegativeChart,
    updatePositiveChart,
    updateTopHabitsChart
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
//const ctx = document.querySelector("#habits-chart").getContext("2d");
const goodctx = document.querySelector("#positive-chart").getContext("2d");
const badctx = document.querySelector("#negative-chart").getContext("2d");
const topHabitsCtx = document.querySelector("#top-habits-chart").getContext("2d");
const dayButtons = document.querySelectorAll(".day")

const habits = [];
const nonNegotiables = [];
//let chart = null;
let positiveChart = null;
let negativeChart = null;
let topHabitsChart = null;
let selectedDay = "L"

dayButtons.forEach(button => {
    button.addEventListener("click", () =>{
    dayButtons.forEach(btn =>
        btn.classList.remove("active"));
    button.classList.add("active");
    selectedDay = button.textContent;
    renderSelectedDay();
    });
});

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
        type,
        day : selectedDay
    };
    habits.push(habit);
    saveHabits(habits);
    renderSelectedDay();
    form.reset();
});

list.addEventListener("click", (e) => {
    const button = e.target.closest(".deleteButton");
    if (button) {
        const id = Number(e.target.dataset.id);
        const index = habits.findIndex(habit => habit.id === id);
        if (index !== -1) {
            habits.splice(index, 1);
            saveHabits(habits);
            renderSelectedDay();
        }   
    }
});
document.addEventListener("DOMContentLoaded", () => {
    habits.push(...loadHabits());
    nonNegotiables.push(...loadNonNegotiables());
    renderSelectedDay();
    renderHabits(list, habits);
    renderNonNegotiables(nonNegotiableList, nonNegotiables, nnInProgress);
    // chart = updateChart(ctx, habits, chart);
    updateSummary();
    positiveChart = updatePositiveChart(goodctx, habits, positiveChart);
    negativeChart = updateNegativeChart(badctx, habits, negativeChart);
    topHabitsChart = updateTopHabitsChart(topHabitsCtx, habits, topHabitsChart);
});

const updateSummary = (habitData = habits) => {
    const { goodTime, badTime } =
    getHabitTotals(habitData);
    const total = goodTime + badTime;
    const percentage =total === 0? 0: (goodTime / total) * 100;
    summary.textContent =`Positivo ${Math.round(percentage)}% | ${goodTime} min vs ${badTime} min`;
    document.querySelector("#progress-fill").style.width =`${percentage}%`;
}
const renderSelectedDay = () => {
    const filterHabits = habits.filter(h => h.day === selectedDay);
    renderHabits(list,filterHabits);
    updateSummary(filterHabits);
    positiveChart = updatePositiveChart(
        goodctx, filterHabits, positiveChart);
    negativeChart = updateNegativeChart(
        badctx, filterHabits, negativeChart);
    topHabitsChart = updateTopHabitsChart(
        topHabitsCtx, filterHabits, topHabitsChart);
}