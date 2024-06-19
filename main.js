import {fetchRandomImage, addRandomImageToCollection, displayUserCollection} from './js/utilities.js'

//fetch random image
const fetchRandomImageButton = document.querySelector('#fetch-random-image-button')
fetchRandomImageButton.addEventListener(
    'click', fetchRandomImage
)
//store current user email address
const allUsers = []
let currentUser = {
    email: '',
    imageCollection: []
}
// const userEmailAddressForm = document.querySelector('#user-email-address-form')
const userEmail = document.querySelector('#user-email')
const submitUserEmailButton = document.querySelector('#submit-user-email-button')
const addRandomImageToCollectionButton = document.querySelector('#add-random-image-to-collection-button')
//
const currentImage = document.querySelector('#current-image')

//submit, validate and (if neccessary) store user email
submitUserEmailButton.addEventListener(
    'click',
    ()=> {
        //validate email
        if(userEmail.value === '') {
            //check if the user has already been recognized and wants to see a different collection
            //if the new email address is invalid
            if(addRandomImageToCollectionButton.disabled === false){
                // disable the 'add image to collection button'
                addRandomImageToCollectionButton.disabled = true
                // addRandomImageToCollectionButton.title = `This feature is only available to users with successfully validated email addresses :(
                //                                           You can use the email input field above to do so!`
                return alert('Please write your email address in the input field to proceed!')
            }else{
                return alert('Please write your email address in the input field to proceed!')
            }
        }
        //enable 'add image to collection button'
        addRandomImageToCollectionButton.disabled = false
        //check if user already exists
        const allUserEmails = allUsers.map(user => user.email)
        //if user exists
        if(allUserEmails.includes(userEmail)){
            //find user in Users array
            const userIndexInAllUsersArray = allUsers.indexOf(userEmail)
            // get users image collection
            const currentUserImageCollection = allUsers[userIndexInAllUsersArray].imageCollection
            //display user's collection
            displayUserCollection(currentUserImageCollection)
            //add random image to user collection
            addRandomImageToCollectionButton.addEventListener(
                'click', ()=>{
                    addRandomImageToCollection(currentImage.src, currentUserImageCollection)
                }
            )
        }else{
            // add user to users array
            currentUser.email = userEmail.value
            allUsers.push(currentUser)
            //find user index in user array
            const currentUserIndexInALlUserArray = allUsers.indexOf(currentUser)
            const currentUserImageCollection = allUsers[currentUserIndexInALlUserArray].imageCollection
            //display user's 
            displayUserCollection(currentUserImageCollection)
            
            //add random image to user collection
            addRandomImageToCollectionButton.addEventListener(
                'click', ()=>{
                    addRandomImageToCollection(currentImage.src, currentUserImageCollection)
                }
            )
        }
        //clear input field
        document.querySelector('#user-email').value = ''
    }
)