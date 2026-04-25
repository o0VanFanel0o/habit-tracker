export const getHabitTotals = (habits) => {
    const goodTime = habits
        .filter(h => h.type === "bueno")
        .reduce((sum, h) => sum + Number(h.time), 0);
    const badTime = habits
        .filter(h => h.type === "malo")
        .reduce((sum, h) => sum + Number(h.time), 0);
    return { goodTime, badTime };
}
export const getNegativeCategories = (habits) => {
    const badHabits = habits.filter(h => h.type === "malo");

    return badHabits.reduce((acc, habit) => {
        if  (!acc[habit.category]) {
            acc[habit.category] = 0;
        }
        acc[habit.category] += Number(habit.time);
        return acc;
    }, {});
}
export const getPositiveCategories = (habits) => {
    const goodHabits = habits.filter(h => h.type === "bueno");

    return goodHabits.reduce((acc, habit) => {
        if  (!acc[habit.category]) {
            acc[habit.category] = 0;
        }
        acc[habit.category] += Number(habit.time);
        return acc;
    }, {});
}