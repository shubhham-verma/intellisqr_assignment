import Log from "@/models/Logs";

export async function logError(error: any, route: string) {
    try {

        console.log("here");

        await Log.create({
            message: error?.message || "Unknown error",
            stack: error?.stack || "",
            route,
        });
    } catch (logErr) {
        console.error("Failed to write error log:", logErr);
    }
}
