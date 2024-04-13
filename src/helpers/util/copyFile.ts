import fs from 'fs';

export const copyFile = async (source: string, destination: string) => {
    try {
        const data = await fs.promises.readFile(source);
        await fs.promises.writeFile(destination, data);

        return true;
    } catch (error) {
        console.error("Error copying file: ", error);
        return false;
    }
};
