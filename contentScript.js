
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
            unit.click = unit.element ? () => {
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
        'remove-shorts': () => RemoveShorts()
    }

    function RemoveShorts() {
        const URL = document.URL
        const newUrl = URL.split('shorts/')[0] + 'watch?v=' + URL.split('shorts/')[1]
        window.location.replace(newUrl)
    }
    
    chrome.runtime.onMessage.addListener( message => messageGate[message.type](message) )

    window.addEventListener('load', commandGate['toggle-sideBar'](), { once: true })
    // window.addEventListener('resize', () => {
    //     console.log(window.innerWidth)
    // })

    /*
        f.canFitPersistentGuide = function(a) {
        var b = ri("kevlar_persistent_guide_width_threshold", 1312);
        return -1 === b || "inactive" !== this.richGridWatchStatus ? !1 : a > b
    }

    window.PolymerFakeBaseClass

    Bfc
    */
})()