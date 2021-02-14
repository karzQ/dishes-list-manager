export const idGenerator = () => {
    const idGenerated = Math.floor(Math.random() * (50000000 - 1 + 1) + 1);

    return idGenerated;
}