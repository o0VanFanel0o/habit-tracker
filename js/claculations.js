export const getHabitTotals = (habits) => {
    const goodTime = habits
        .filter(h => h.type === "bueno")
        .reduce((sum, h) => sum + Number(h.time), 0);
    const badTime = habits
        .filter(h => h.type === "malo")
        .reduce((sum, h) => sum + Number(h.time), 0);
    return { goodTime, badTime };
}