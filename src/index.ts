import { Command } from "@commander-js/extra-typings";
import { version } from "../package.json";
import { checkOutdatedPackage } from "./helpers/util/checkNewPackages";
import { createNextStrapApp } from "./create-next-strap-app";

let programCmd = new Command();

const program = programCmd
    .name("next-strap")
    .version(version)
    .option("--with-auth", "adds authentication to the bootstrapped Next.js project")
    .option("--ts", "adds TypeScript to the bootstrapped Next.js project")
    .argument("[project-name]", "name of the project to be bootstrapped", null)
    .action((projectName: string | null, options) => {
        // validate the project name
        
        if (projectName && !/^[a-z][a-z0-9-]{1,61}[a-z0-9]$/.test(projectName)) {
            console.error("\nInvalid project name. Please use a valid npm package name.\n");
            process.exit(1);
        }
        
        // delegate this to helper functions
        createNextStrapApp(projectName, options);

    });

const options = program.opts();

async function main () {
    await checkOutdatedPackage();
    program.parse();
}

main ();

export default program;
export type OptionType = typeof options;