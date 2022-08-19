{
    const URL = document.URL
    
    URL.includes('/shorts/') && ( () => {
        const newUrl = URL.split('shorts/')[0] + 'watch?v=' + URL.split('shorts/')[1]
        window.location.replace(newUrl)
    } )()
}
