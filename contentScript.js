
(() => {
    const INTERACTUNITS = {
        'LOGO': { 
            selector: '#logo-icon',
            //dynamic adding properties: element, click
        },
        'SETTINGSBUTTON': {
            selector: '[data-tooltip-target-id="ytp-settings-button"]',
            //dynamic adding properties: element, click
        },
        'SIDEBARBUTTON': {
            //dynamic adding properties: element, click
            selector: '#guide-button',
        },
    }

    {
        const keys = Object.keys(INTERACTUNITS)
        keys.map( key => {
            const unit = INTERACTUNITS[key]
            unit.element = document.querySelector(unit.selector)
            unit.click = unit.element?.click ? () => {
                unit.element.click()
            } : () => {
                document.querySelector(unit.selector)?.click()
            }
        } )
    }
    
    const commandGate = {
        'go-homePage':
            () => INTERACTUNITS['LOGO'].click(),

        'toggle-setting-button':
            () => INTERACTUNITS['SETTINGSBUTTON'].click(),

        'toggle-sideBar':
            () => INTERACTUNITS['SIDEBARBUTTON'].click(),
    }

    const messageGate = {
        'command': message => commandGate[message[message.type]](),
    }
    
    chrome.runtime.onMessage.addListener( message => messageGate[message.type](message) )
    
    // window.addEventListener('load', commandGate['toggle-sideBar'](), { once: true })
})()