const currentUserImageCollectionContainer =  document.querySelector('#current-user-image-collection-container')

function fetchRandomImage(){
    const randomImage = document.querySelector('img#current-image')

    fetch('https://picsum.photos/300/300')
    .then(img => randomImage.src = img.url)
    .catch(err => console.error(err))
}

function isUserEmailAddressValid(userEmailAddress){
    /*check that user email address:*/
    //comprises alphanumeric characters (dot excluded), and is 6 to 20 characters long (e.g. ghxnyab234)
    //followed by the @ symbol
    //followed by another series of alphanumeric characters, with a dot at the end (e.g. google.com or outlook.com)
    const regex = EMAIL_VALIDATOR_REGEX
    const result = regex.test(userEmailAddress)
    //returns a boolean value
    return result
}

function displayImageInMainFrame(clickedImage){
    const imageCurrentlyDisplayed = document.querySelector('#current-image')
    imageCurrentlyDisplayed.src = clickedImage.src
}

function createImage(src){
    const image = document.createElement('img')
    image.src = src
    image.alt = 'random image'
    image.classList += image.alt
    image.addEventListener(
        'click', ({target})=> displayImageInMainFrame(target)
    )
    return image
}

function displayNewUserCollection(currentUser){
    //display user's collection
    currentUser['imageCollection'].forEach( imageSrc =>
        currentUserImageCollectionContainer.appendChild(createImage(imageSrc))
    )
}

function clearCurrentUserCollectionDisplay(){
    currentUserImageCollectionContainer.replaceChildren()
}

export {
    fetchRandomImage, isUserEmailAddressValid, createImage, 
    displayNewUserCollection, clearCurrentUserCollectionDisplay
}
