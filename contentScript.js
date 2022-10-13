
(() => {
    const INTERACTBUTTONS = {
        'LOGO': { 
            selector: '#logo-icon',
            //dynamic adding properties: element, click
        },
        'SETTINGSBUTTON': {
            selector: '[data-tooltip-target-id="ytp-settings-button"]',
            //dynamic adding properties: element, click
        },
        'SIDEBARBUTTON': {
            selector: '#guide-button',
            //dynamic adding properties: element, click
        },
    }

    {
        const keys = Object.keys(INTERACTBUTTONS)
        keys.map( key => {
            const unit = INTERACTBUTTONS[key]
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
            () => INTERACTBUTTONS['LOGO'].click(),

        'toggle-setting-button':
            () => INTERACTBUTTONS['SETTINGSBUTTON'].click(),

        'toggle-sideBar':
            () => INTERACTBUTTONS['SIDEBARBUTTON'].click(),

        'video-repeat':
            () => {
                const video = document.querySelector('video')
                video !== undefined && video.hasAttribute('loop') ? 
                video.removeAttribute('loop') : video.setAttribute('loop', '')
            },
    }

    const messageGate = {
        'command': message => commandGate[message[message.type]](),
    }
    
    chrome.runtime.onMessage.addListener( message => messageGate[message.type](message) )

    document.querySelector("body").addEventListener("keydown", event => {
        event.ctrlKey && event.key === 'y' && (() => commandGate['go-homePage']())()
        // console.log(event)
    })

    {
        const defsTag = 
            `<defs>
            <linearGradient id="lgrad" x1="0%" y1="50%" x2="100%" y2="50%" >
                <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1.00" />
                <stop offset="20%" style="stop-color:rgb(255,164,0);stop-opacity:1.00" />
                <stop offset="40%" style="stop-color:rgb(255,237,64);stop-opacity:1.00" />
                <stop offset="60%" style="stop-color:rgb(104,228,53);stop-opacity:1.00" />
                <stop offset="80%" style="stop-color:rgb(3,169,244);stop-opacity:1.00" />
                <stop offset="100%" style="stop-color:rgb(149,59,255);stop-opacity:1.00" />
            </linearGradient>
            </defs>`
            const logoSvg = document.querySelector("#logo-icon svg").innerHTML
            document.querySelector("#logo-icon svg").innerHTML = defsTag + logoSvg
            document.querySelector("#logo-icon svg g g path").setAttribute('fill', 'url(#lgrad)')
            document.querySelector("#logo-icon svg g g path:last-child").setAttribute("fill", "#333333")
    }
    //#logo-icon svg.yt-icon g

})()