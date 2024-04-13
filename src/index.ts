import { Command } from "@commander-js/extra-typings";
import { version } from "../package.json";
import { checkOutdatedPackage } from "./helpers/util/checkNewPackages";

let programCmd = new Command();

const program = programCmd
    .name("my-cli")
    .version(version)
    .option("--with-auth", "adds authentication to the bootstrapped Next.js project")
    .argument("[project-name]", "name of the project to be bootstrapped", null)
    .action((projectName: string | null, { withAuth }) => {
        // delegate this to helper functions
        console.log("Project Name:", projectName);
        console.log("With Auth:", withAuth);


    });

async function main () {
    await checkOutdatedPackage();
    program.parse();
}

main ();

export default programCmd;