
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

/*const onUpdatedListener = {
    'removeShorts': async () => {
        const { result, tab } = await InYoutube()
        result && tab.url.includes("youtube.com/shorts/") &&
        chrome.tabs.sendMessage(tab.id, { type: 'remove-shorts' })
    },
    'adjustMargin': async () => {
        const { result, tab } = await InYoutube()
        result && tab.url === 'https://www.youtube.com/' ?
        chrome.tabs.sendMessage(tab.id, { type: 'remove-margin' }) : 
        chrome.tabs.sendMessage(tab.id, { type: 'add-margin' })

    }
}*/

chrome.commands.onCommand.addListener( async command => {
    const { result, tab } = await InYoutube()
    result && chrome.tabs.sendMessage(tab.id, { type: 'command', command })
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

/*{
    const keys = Object.keys(onUpdatedListener)
    keys.map( key => {
        const listener = onUpdatedListener[key]
        chrome.tabs.onUpdated.addListener(listener)
    } )
}*/
