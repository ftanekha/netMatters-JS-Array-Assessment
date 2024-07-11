import {
    fetchRandomImage, isUserEmailAddressValid,  displayWarning, removeWarning, createImage, 
    createDropDownMenuOption, displayNewUserCollection, clearCurrentUserCollectionDisplay
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

//
const currentSessionUsers = []
//

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
        if (!currentUser['imageCollection'].includes(currentImage.src)){
            currentUser['imageCollection'].push(currentImage.src)
            //display new image at the front of current user collection
            currentUserImageCollectionContainer.insertAdjacentElement('afterbegin', (createImage(currentImage.src)))
        }else{
            displayWarning('image already in collection')
        }
    }
)
//submit, validate and (if valid) store user email
submitUserEmailButton.addEventListener(
    'click',
    () => {
        if (!isUserEmailAddressValid(userEmail.value)) {
            //only disable image collection button if the current user isn't already validated
            if(!currentUser.email){
                addRandomImageToCollectionButton.disabled = true
            }
            return displayWarning()
        } else if (userEmail.value === currentUser.email) {
            return displayWarning('same email address')
        } else {
            removeWarning()
            addRandomImageToCollectionButton.disabled = false
            //check if there is a validated use already
            if (currentUser.email) {
                if (currentUser.imageCollection.length) {
                    clearCurrentUserCollectionDisplay()
                    const existingUserEmails = existingUsers.map(user => user.email)
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
            //clear input field
            document.querySelector('#user-email').value = ''
            //check if new user exists in storage
            const existingUserEmails = existingUsers.map(user => user.email)
            if (existingUserEmails.includes(currentUser.email)) {
                clearCurrentUserCollectionDisplay()
                const currentUserIndexInExistingUsersArray = existingUserEmails.indexOf(currentUser.email)
                currentUser.imageCollection = existingUsers[currentUserIndexInExistingUsersArray].imageCollection
            }
            if(!currentSessionUsers.includes(currentUser.email)){
                currentSessionUsers.push(currentUser.email)
                createDropDownMenuOption(currentUser.email)
            }
            displayNewUserCollection(currentUser)
            document.querySelector('#current-user-identifier').textContent = currentUser.email
            const select = document.querySelector('select#current-user')
            select.addEventListener(
                'change',
                (ev)=> {
                    //persist current user image collection
                    if (currentUser.imageCollection.length) {
                        const existingUserEmails = existingUsers.map(user => user.email)
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
                    //switch to new user image collection
                    if(currentUser.email !== ev.target.value){
                        removeWarning()
                        clearCurrentUserCollectionDisplay()
                    }
                    currentUser.email = ev.target.value
                    //check that user email is not already listed in drop down menu
                    if (!currentSessionUsers.includes(currentUser.email)){
                        currentSessionUsers.push(currentUser.email)
                        createDropDownMenuOption(currentUser.email)
                    }
                    //check if user already has image collection
                    if (existingUserEmails.includes(currentUser.email)) {
                        //find user in existingUsers
                        const userIndexInExistingUsersArray = existingUserEmails.indexOf(currentUser.email)
                        //update current user image collection in existingUsers array
                        currentUser.imageCollection = existingUsers[userIndexInExistingUsersArray].imageCollection
                    } 
                    else {
                        // existingUsers.push(currentUser)
                        clearCurrentUserCollectionDisplay()
                        displayNewUserCollection(currentUser)
                    }
                    //update the UI
                    // clearCurrentUserCollectionDisplay()
                    document.querySelector('#current-user-identifier').textContent = currentUser.email
                    if (currentUser.imageCollection.length) displayNewUserCollection(currentUser)
                }
            )
        }
    }
)