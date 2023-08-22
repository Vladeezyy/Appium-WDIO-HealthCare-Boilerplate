import console from "console";

class AdbCommandsUtil {
    OPEN_DATETIME_SETTINGS = {"command": "am start", "args": ["-a", "android.settings.DATE_SETTINGS"]}
    OPEN_RECENT_APPS = {"command": "input keyevent", "args": ["187"]}

    async openDateTimeSettings() {
        await this.executeShellCommand(this.OPEN_DATETIME_SETTINGS)
    }

    async switchToPreviousApp() {
        await this.executeShellCommand(this.OPEN_RECENT_APPS)
        await driver.pause(800)
        await this.executeShellCommand(this.OPEN_RECENT_APPS)
    }

    async executeShellCommand(command) {
        console.log(await driver.executeScript("mobile: shell", [command]));
    }
}

export default new AdbCommandsUtil();