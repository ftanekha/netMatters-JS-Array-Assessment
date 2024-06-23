const currentUserImageCollectionContainer =  document.querySelector('#current-user-image-collection-container')

function fetchRandomImage(){
    const randomImage = document.querySelector('img#current-image')

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

function updateCurrentUserInfo(allUsers, currentUser ){
    const allUserEmails = allUsers.map(user => user.email)
    //if user exists
    if(allUserEmails.includes(currentUser.email)){
        //find user in allUsers array
        const userIndexInAllUsersArray = allUserEmails.indexOf(currentUser.email)
        let currentUserImageCollection = allUsers[userIndexInAllUsersArray].imageCollection
        //update current user image collection in allUsers array
        currentUserImageCollection = [...currentUserImageCollection, ...currentUser.imageCollection]
    }
}

function displayImageInMainFrame(clickedImage){
    const imageCurrentlyDisplayed = document.querySelector('#current-image')
    imageCurrentlyDisplayed.src = clickedImage.src
}

function createImage(src){
    const image = document.createElement('img')
    image.src = src
    image.alt = 'random image'
    image.classList += `random image`
    image.addEventListener(
        'click', ({target})=> displayImageInMainFrame(target)
    )
    return image
}

function addRandomImageToCollection(imageSrc, userImageCollection){
    //add new image to user's collection
    userImageCollection.push(imageSrc)
    //display new image at the front of current user collection
    currentUserImageCollectionContainer.insertAdjacentElement('afterbegin', (createImage(imageSrc)))
}

function displayUserNewCollection(currentUser){
    //display user's collection
    currentUser['imageCollection'].forEach( imageSrc =>
        currentUserImageCollectionContainer.appendChild(createImage(imageSrc))
    )
}

function clearCurrentUserCollectionDisplay(){
    currentUserImageCollectionContainer.replaceChildren()
    console.log('cleared')
}

export {fetchRandomImage, isUserEmailAddressValid , updateCurrentUserInfo, addRandomImageToCollection, displayUserNewCollection, clearCurrentUserCollectionDisplay}
