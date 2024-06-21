import {
    fetchRandomImage, isUserEmailAddressValid , updateCurrentUserInfo, 
    addRandomImageToCollection, displayUserNewCollection, clearCurrentUserCollectionDisplay
} from './js/utilities.js'

//fetch random image
const fetchRandomImageButton = document.querySelector('#fetch-random-image-button')
fetchRandomImageButton.addEventListener(
    'click', fetchRandomImage
)

const userEmail = document.querySelector('#user-email')
const submitUserEmailButton = document.querySelector('#submit-user-email-button')
const addRandomImageToCollectionButton = document.querySelector('#add-random-image-to-collection-button')
//
const currentImage = document.querySelector('#current-image')

/*store all user info in local storage for persistance*/
//check users exist in local storage
const savedUsers = localStorage.getItem('allUsers')
//store in all Users or start a new array 
let allUsers = JSON.parse(savedUsers) || []

//store current user email address
let currentUser = {
    imageCollection: []
}
//
addRandomImageToCollectionButton.addEventListener(
    'click', ()=>{
        addRandomImageToCollection(currentImage.src, currentUser.imageCollection)
    }
)
//submit, validate and (if valid) store user email
submitUserEmailButton.addEventListener(
    'click',
    ()=> {
        //validate user email address
        if(!isUserEmailAddressValid(userEmail.value)){
            //disable/keep disabled the 'add image to collection button'
            addRandomImageToCollectionButton.disabled = true
            //clear input field
            document.querySelector('#user-email').value = ''
            return alert(
                `Invalid email address! Email address must be 6 - 20 characters long,
                No meta-characters, such as ? - + #...`
            )
        }else if(userEmail.value === currentUser.email){
            return alert(
                "Your email address is the same as the current user's ! \nTo start or view another collection, enter a different email address."
            )
        }else{
            //enable the 'add image to collection button'
            if(addRandomImageToCollectionButton.disabled){
                addRandomImageToCollectionButton.disabled = false 
            }
            //check there's no other user in the current session
            if(currentUser.email){
                //there is another user (email address in session) already
                //update the current user's collection in allUsers array
                updateCurrentUserInfo(allUsers, currentUser)
                //save current user data before switching to new user image collection
                localStorage.setItem('allUsers', JSON.stringify(allUsers))
                //remove previous user's collection from DOM
                clearCurrentUserCollectionDisplay()
            }
            
            //switch to new user
            currentUser.email = userEmail.value
            //display user name
            document.querySelector('p#current-user-identifier').textContent = currentUser.email
            //clear input field
            document.querySelector('#user-email').value = ''
            //check if current user already exists in saved users
            const allUserEmails = allUsers.map(user => user.email)
            //if user exists
            if(allUserEmails.includes(currentUser.email)){
                //find new user in Users array
                const userIndexInAllUsersArray = allUserEmails.indexOf(currentUser.email)
                //get new user image collection
                currentUser.imageCollection = allUsers[userIndexInAllUsersArray].imageCollection
                // clearCurrentUserCollectionDisplay()
                //display user's collection
                displayUserNewCollection(currentUser)
            }else{
                allUsers.push(currentUser)
                //clear the user image collection array
                currentUser.imageCollection = []
                //display new user's collection (empty at first)
                displayUserNewCollection(currentUser)
            }
        }
    }
        
)