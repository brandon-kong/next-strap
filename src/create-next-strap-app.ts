import fs from "fs";
import { OptionType } from '.';
import { execSync } from "child_process";
import prompts from "prompts";
import AllPrompts from "./helpers/util/prompts";

export const createNextStrapApp = async (projectName: string | null, {
    withAuth,
    ts
}: OptionType) => {
    // create-next-app first

    // ask the user for the project name if not provided
    if (!projectName) {
        const response = await prompts({
            type: "text",
            name: "projectName",
            message: "Enter the name of the project: ",
            validate: (value) => value.length > 0 ? true : "Project name cannot be empty"
        });

        projectName = response.projectName as string;
    }

    console.log("\n🚀 Creating Next.js project...")
    const createNextAppCommand = ts ? `npx create-next-app ${projectName} --ts` : `npx create-next-app ${projectName}`;

    // run the command
    console.log("\n🔥 Running command: ", createNextAppCommand, "\n");
    execSync(createNextAppCommand, { stdio: "inherit" });

    // change directory
    process.chdir(projectName);

    // get project properties
    const hasTypescript = fs.existsSync("tsconfig.json");
    const hasTailwindConfig = fs.existsSync("tailwind.config.js") || fs.existsSync("tailwind.config.ts");

    // add the packages
    const devPackages = ["jest", "react-testing-library", "husky", "prettier"]
    const addedPackages = [];
    
    // ask the user for the packages to install
    const promptsList = [];

    if (hasTailwindConfig) {
        // has tailwind, so ask for tailwind-specific packages
        promptsList.push(AllPrompts.withShadcn);
    }
    else {
        // no tailwind, so ask for other UI libraries
        promptsList.push(AllPrompts.withChakra);
    }

    promptsList.push(AllPrompts.withIcons);
    promptsList.push(AllPrompts.withTheme);

    if (!withAuth) {
        promptsList.push(AllPrompts.withAuth);
    }
    else {
        addedPackages.push("next-auth");
    }

    const response = await prompts(promptsList);

    for (const key in response) {
        if (response[key]) {
            switch (key) {
                case "withChakra":
                    addedPackages.push("@chakra-ui/react @emotion/react @emotion/styled framer-motion");
                    break;
                case "withShadcn":
                    addedPackages.push("");
                    break;
                case "withIcons":
                    addedPackages.push("react-icons");
                    break;
                case "withTheme":
                    addedPackages.push("next-themes");
                    break;
                case "withAuth":
                    addedPackages.push("next-auth");
                    break;
            }
        }
    }

    // install the packages
    console.log("\n📦 Installing packages...")
    const installPackagesCommand = `npm install ${addedPackages.join(" ")} ${devPackages.join(" -D ")}`;
    console.log("\n🔥 Running command: ", installPackagesCommand, "\n")
    execSync(installPackagesCommand, { stdio: "inherit" });

    // initialize jest
    console.log("\n🔧 Initializing jest...")
    const jestInitCommand = "npx jest --init";
    console.log("\n🔥 Running command: ", jestInitCommand, "\n")
    execSync(jestInitCommand, { stdio: "inherit" });

    // initialize prettier
    console.log("\n🔧 Initializing prettier...")

    fs.writeFileSync(".prettierrc", JSON.stringify({
        "semi": false,
        "singleQuote": true,
        "trailingComma": "es5",
        "tabWidth": 4,
    }, null, 2));

    execSync("npx prettier --write ./src", { stdio: "inherit" });

    // initialize git
    console.log("\n🔧 Initializing git...")
    const gitInitCommand = "git init";
    console.log("\n🔥 Running command: ", gitInitCommand, "\n")
    execSync(gitInitCommand, { stdio: "inherit" });

    // initialize husky
    console.log("\n🔧 Initializing husky...");
    const huskyInitCommand = "npx husky install";
    console.log("\n🔥 Running command: ", huskyInitCommand, "\n")
    execSync(huskyInitCommand, { stdio: "inherit" });

    // add the scripts
    console.log("\n📝 Adding scripts to package.json...")
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
    packageJson.scripts.test = "jest";
    packageJson.scripts["format-check"] = "prettier --check ./src";
    packageJson.scripts.format = "prettier --write ./src";
    fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
};