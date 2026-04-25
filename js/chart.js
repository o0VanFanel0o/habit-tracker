import {
    getHabitTotals,
    getNegativeCategories,
    getPositiveCategories
}
from "./calculations.js";

export const updateChart = (ctx, habits, currentChart) => {
    const { goodTime, badTime } = getHabitTotals(habits);
    if (currentChart) {
        currentChart.destroy();
    }
    return new Chart(ctx, {
        type:"doughnut",
        data: {
            labels: ["Bueno", "Malo"],
            datasets: [{
                label: "Tiempo en minutos",
                data: [goodTime, badTime],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(255, 99, 132, 0.2)"
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 99, 132, 1)"
                ],
                borderWidth: 2
            }]
        },
    });
}
export const updateNegativeChart = (ctx, habits, currentChart) => {
    const categoryData = getNegativeCategories(habits);
    const labels = Object.keys(categoryData);
    const data = Object.values(categoryData);
    if (currentChart) {
        currentChart.destroy();
    }
    return new Chart(ctx, {
        type: "doughnut",
        data: {
            labels,
            datasets: [{
                label: "Tiempo en minutos",
                data,
                backgroundColor: [
                    "#ff6384",
                    "#ffcd56",
                    "#36a2eb",
                    "#9966ff",
                    "#4bc0c0"
                ]
            }]
        },
    });
}
export const updatePositiveChart = (ctx, habits, currentChart) => {
    const categoryData = getPositiveCategories(habits);
    const labels = Object.keys(categoryData);
    const data = Object.values(categoryData);
    if (currentChart) {
        currentChart.destroy();
    }
    return new Chart(ctx, {
        type: "doughnut",
        data: {
            labels,
            datasets: [{
                label: "Tiempo en minutos",
                data,
                backgroundColor: [
                    "#36a2eb",
                    "#4bc0c0",
                    "#ffcd56",
                    "#ff6384",
                    "#9966ff"
                ]
            }]
        },
    });
}