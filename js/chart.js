import {
    getHabitTotals
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
                borderWidth: 1
            }]
        },
    });
}