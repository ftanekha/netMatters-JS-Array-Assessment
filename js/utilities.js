function fetchRandomImage(){
    const randomImage = document.querySelector('#current-image-container img')

    fetch('https://picsum.photos/300/300')
    .then(img => randomImage.src = img.url)
    .catch(err => console.error(err))
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

export {fetchRandomImage, addRandomImageToCollection, displayUserCollection, displayImageInMainFrame}
