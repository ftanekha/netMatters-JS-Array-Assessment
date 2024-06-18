function fetchRandomImage(){
    const randomImage = document.querySelector('#current-image-container img')

    fetch('https://picsum.photos/300/300')
    .then(img => randomImage.src = img.url)
    .catch(err => console.error(err))
}
function displayUserCollection(currentUserImageCollection){
    const currentUserImageCollectionContainer =  document.querySelector('#current-user-image-collection-container')
    //display user's collection
    currentUserImageCollection.forEach( imageURL =>
        currentUserImageCollectionContainer.innerHTML += (
            `
                <img src='${imageURL}' alt='random image' title='random image'/>
            `
        )
    )
}

export {fetchRandomImage, displayUserCollection}
