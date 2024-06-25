import {
    fetchRandomImage, isUserEmailAddressValid, createImage,
    displayNewUserCollection, clearCurrentUserCollectionDisplay
} from './js/utilities.js'

const userEmail = document.querySelector('#user-email')
const submitUserEmailButton = document.querySelector('#submit-user-email-button')
const currentUserImageCollectionContainer = document.querySelector('#current-user-image-collection-container')
const currentImage = document.querySelector('#current-image')
const addRandomImageToCollectionButton = document.querySelector('#add-random-image-to-collection-button')
const fetchRandomImageButton = document.querySelector('#fetch-random-image-button')
//fetch random image button
fetchRandomImageButton.addEventListener(
    'click', fetchRandomImage
)

/*store all user info in local storage for persistance*/
//check users exist in local storage
const savedUsers = localStorage.getItem('allUsers')
//store in all Users or start a new array 
const existingUsers = JSON.parse(savedUsers) || []
//store current user email address
let currentUser = {
    imageCollection: []
}
//
addRandomImageToCollectionButton.addEventListener(
    'click', () => {
        //add new image to user's collection
        currentUser['imageCollection'].push(currentImage.src)
        //display new image at the front of current user collection
        currentUserImageCollectionContainer.insertAdjacentElement('afterbegin', (createImage(currentImage.src)))
    }
)
//submit, validate and (if valid) store user email
submitUserEmailButton.addEventListener(
    'click',
    () => {
        if (!isUserEmailAddressValid(userEmail.value)) {
            addRandomImageToCollectionButton.disabled = true
            //clear input field
            document.querySelector('#user-email').value = ''
            return alert(
                `Invalid email address! Email address must be 6 - 30 characters long,
                No meta-characters, such as ? - + #...`
            )
        } else if (userEmail.value === currentUser.email) {
            return alert(
                "Your email address is the same as the current user's! \nTo start or view another collection, enter a different email address."
            )
        } else {
            addRandomImageToCollectionButton.disabled = false
            //check if there is a validated use already
            if (currentUser.email) {
                if (currentUser.imageCollection.length > 0) {
                    clearCurrentUserCollectionDisplay()
                    if (existingUserEmails.includes(currentUser.email)) {
                        //find user in existingUsers
                        const userIndexInExistingUsersArray = existingUserEmails.indexOf(currentUser.email)
                        //update current user image collection in existingUsers array
                        existingUsers[userIndexInExistingUsersArray].imageCollection = currentUser.imageCollection
                    } else {
                        existingUsers.push(currentUser)
                    }

                    localStorage.setItem('allUsers', JSON.stringify(existingUsers))
                }
            }
            //ENTER new user
            currentUser = {
                email: userEmail.value,
                imageCollection: []
            }
            //check if new user exists in storage
            const existingUserEmails = existingUsers.map(user => user.email)
            if (existingUserEmails.includes(currentUser.email)) {
                clearCurrentUserCollectionDisplay()
                const currentUserIndexInExistingUsersArray = existingUserEmails.indexOf(currentUser.email)
                currentUser.imageCollection = existingUsers[currentUserIndexInExistingUsersArray].imageCollection
            }

            displayNewUserCollection(currentUser)
        }
    }
)