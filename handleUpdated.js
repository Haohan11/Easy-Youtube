{
    const URL = document.URL
    
    URL.includes('/shorts/') && RemoveShorts(URL)
    
    function RemoveShorts(url) {
        const newUrl = url.split('shorts/')[0] + 'watch?v=' + url.split('shorts/')[1]
        window.location.replace(newUrl)
    }
}
