import prompts from "prompts";

const promptList: {[key: string]: prompts.PromptObject} = {
    "withAuth": {
        type: "toggle",
        name: "withAuth",
        message: "Do you want to add authentication (next-auth) to your project?",
        active: "yes",
        inactive: "no",
        initial: true
    },
    "withTheme": {
        type: "toggle",
        name: "withTheme",
        message: "Do you want to add light and dark mode to your project?",
        active: "yes",
        inactive: "no",
        initial: true
    },
    "withChakra": {
        type: "toggle",
        name: "withChakra",
        message: "Do you want to add Chakra UI to your project?",
        active: "yes",
        inactive: "no",
        initial: true
    },
    "withShadcn": {
        type: "toggle",
        name: "withShadcn",
        message: "Do you want to add Shadcn UI to your project?",
        active: "yes",
        inactive: "no",
        initial: true
    },
    "withIcons": {
        type: "toggle",
        name: "withIcons",
        message: "Do you want to add Heroicons to your project?",
        active: "yes",
        inactive: "no",
        initial: true
    },
}

export default promptList;