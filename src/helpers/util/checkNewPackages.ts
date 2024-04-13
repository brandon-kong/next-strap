import { execSync } from "child_process";

export const checkOutdatedPackage = async () => {
	try {
		// success command
		console.log("\n⏳ Checking for new updates...");
		const command = "npm outdated --location=global";
		const output = execSync(command);
	} catch (error: any) {
		if (error.stdout.toString().includes("next-strap")) {
			console.log(
				"\nThe version of this package is outdated.\nRun npx next-strap@latest to always use the latest version. Ignore this message if already used.\n"
			);
		}
	}
};