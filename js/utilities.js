function fetchRandomImage(){
    const randomImage = document.querySelector('#current-image-container img')

    fetch('https://picsum.photos/300/300')
    .then(img => randomImage.src = img.url)
    .catch(err => console.error(err))
}

function isUserEmailAddressValid(userEmailAddress){
    /*checks*/
    //user email address:
    //comprises alphanumeric characters (dot excluded), and is 6 to 20 characters long (e.g. ghxnyab234)
    //followed by the @ symbol
    //followed by another series of alphanumeric characters, with a dot at the end (e.g. google.com or outlook.com)
    const regex = /^[\w-\.]{6,25}@([\w-]+\.)+[\w-]{2,4}$/g
    const result = regex.test(userEmailAddress)
    //returns a boolean value
    return result
}

function displayImageInMainFrame(target){
    const imageCurrentlyDisplayed = document.querySelector('#current-image')
    imageCurrentlyDisplayed.src = target.src
}

function createImage(src){
    const image = document.createElement('img')
    image.src = src
    image.alt = 'random image'
    image.title = image.alt
    image.classList += 'random image'
    image.addEventListener(
        'click', ({target})=> displayImageInMainFrame(target)
    )
    return image
}

function addRandomImageToCollection(imageSrc, collectionName){
    //add new image to user's collection
    collectionName.push(imageSrc)
    //display new image with rest of current user collection
    const currentUserImageCollectionContainer =  document.querySelector('#current-user-image-collection-container')
    currentUserImageCollectionContainer.appendChild(createImage(imageSrc))
}

function displayUserCollection(currentUserImageCollection){
    const currentUserImageCollectionContainer =  document.querySelector('#current-user-image-collection-container')
    //display user's collection
    currentUserImageCollection.forEach( imageSrc =>
        currentUserImageCollectionContainer.appendChild(createImage(imageSrc))
    )
}

function clearCurrentUserCollectionDisplay(){
    const currentUserImageCollectionContainer =  document.querySelector('#current-user-image-collection-container')
    currentUserImageCollectionContainer.innerHTML = ''
    alert('cleared')
}

export {fetchRandomImage, isUserEmailAddressValid ,addRandomImageToCollection, displayUserCollection, clearCurrentUserCollectionDisplay}
