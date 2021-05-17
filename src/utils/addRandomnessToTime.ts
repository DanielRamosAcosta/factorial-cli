export const addRandomnessToTime = (timeInMinutes: number, randomness: number) =>
    (Math.ceil(Math.random() * randomness) *
        (Math.round(Math.random()) ? 1 : -1)) + timeInMinutes;