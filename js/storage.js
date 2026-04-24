export const saveHabits = (habits) => {
    localStorage.setItem(
    "habits",
    JSON.stringify(habits)
    );
};
export const loadHabits = () => {
    return JSON.parse(
    localStorage.getItem("habits")
    ) || [];
};
export const saveNonNegotiables = (nonNegotiables) => {
    localStorage.setItem(
    "nonNegotiables",
    JSON.stringify(nonNegotiables)
    );
};
export const loadNonNegotiables = () => {
    return JSON.parse(
    localStorage.getItem("nonNegotiables")
    ) || [];
};