const currentUserImageCollectionContainer =  document.querySelector('#current-user-image-collection-container')
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fetchRandomImage(){
    const randomImage = document.querySelector('img#current-image')

    fetch('https://picsum.photos/300/300')
    .then(img => randomImage.src = img.url)
    .catch(err => console.error(err))
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isUserEmailAddressValid(userEmailAddress){
    /*check that user email address:*/
    //comprises alphanumeric characters (dot excluded), and is 6 to 20 characters long (e.g. ghxnyab234)
    //followed by the @ symbol
    //followed by another series of alphanumeric characters, with a dot at the end (e.g. google.com or outlook.com)
    const regex = /^[\w-\.]{2,30}@([\w-]+\.)+[\w-]{2,10}$/g
    const result = regex.test(userEmailAddress)
    //returns a boolean value
    return result
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function displayWarning(msg){
    const genericMessage = document.querySelector('div#generic-warning')
    const sameAddressWarning = document.querySelector('div#same-address-warning')
    const imageAlreadyInCollection = document.querySelector('div#image-already-in-collection')
    const warningMessages = document.querySelectorAll('div.warning-message')
    if(!msg){
        warningMessages.forEach( msg => {
            if(msg.style.display === 'block') msg.style.display = 'none'
        })
        genericMessage.style.display = 'block'
    }else if(msg === 'same email address'){
        warningMessages.forEach( msg => {
            if(msg.style.display === 'block') msg.style.display = 'none'
        })
        sameAddressWarning.style.display = 'block'
    }else if(msg === 'image already in collection'){
        warningMessages.forEach( msg => {
            if(msg.style.display === 'block') msg.style.display = 'none'
        })
        imageAlreadyInCollection.style.display = 'block'
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function removeWarning(){
    const warningMessages = document.querySelectorAll('div.warning-message')
    warningMessages.forEach( msg => {
        if(msg.style.display === 'block') msg.style.display = 'none'
    })
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function displayImageInMainFrame(clickedImage){
    const imageCurrentlyDisplayed = document.querySelector('#current-image')
    imageCurrentlyDisplayed.src = clickedImage.src
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createImage(src){
    const image = document.createElement('img')
    image.src = src
    image.alt = 'random image'
    image.classList += image.alt
    image.addEventListener(
        'click', ({target})=> {
            displayImageInMainFrame(target)
            removeWarning()
        }
    )
    return image
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createDropDownMenuOption(userEmail){
    const option = document.createElement('option')
    option.value = userEmail
    option.textContent = userEmail
    option.selected = 'selected'
    //show user email address in drop down menu 
    const select = document.querySelector('select#current-user')
    select.insertAdjacentElement('afterbegin', option)
    //display current user as top option
    select.value = userEmail
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function displayNewUserCollection(currentUser){
    //display user's collection
    currentUser['imageCollection'].forEach( imageSrc =>
        currentUserImageCollectionContainer.appendChild(createImage(imageSrc))
    )
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function clearCurrentUserCollectionDisplay(){
    currentUserImageCollectionContainer.replaceChildren()
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export {
    fetchRandomImage, isUserEmailAddressValid,  displayWarning, removeWarning, createImage, 
    createDropDownMenuOption, displayNewUserCollection, clearCurrentUserCollectionDisplay
}