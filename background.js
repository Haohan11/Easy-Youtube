
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function InYoutube() {
    const currentTab = await getCurrentTab()
    return currentTab?.url && currentTab.url.includes("youtube.com") ?
    { result: true, tab: currentTab } : { result: false }
}

chrome.commands.onCommand.addListener( async command => {
    const { result, tab } = await InYoutube()
    result && tab.status === 'complete' && 
    chrome.tabs.sendMessage(tab.id, { type: 'command', command })
} )

chrome.tabs.onUpdated.addListener( async () => {
    const { result, tab } = await InYoutube()
    result && chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            files: ['handleUpdated.js']
        }
    )
    // result && chrome.tabs.sendMessage(tab.id, { type: 'tab-updated' })
} )
