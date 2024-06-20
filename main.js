import {fetchRandomImage, isUserEmailAddressValid ,addRandomImageToCollection, displayUserCollection, clearCurrentUserCollectionDisplay} from './js/utilities.js'

//fetch random image
const fetchRandomImageButton = document.querySelector('#fetch-random-image-button')
fetchRandomImageButton.addEventListener(
    'click', fetchRandomImage
)

/*store all user info in local storage for persistance*/
//check users exist in local storage
const savedUsers = localStorage.getItem('allUsers')
//store in all Users or start a new array 
let allUsers = JSON.parse(savedUsers) || []

//store current user email address
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

//submit, validate and (if provided and valid) store user email
submitUserEmailButton.addEventListener(
    'click',
    ()=> {
        //validate user email address
        if(!isUserEmailAddressValid(userEmail.value)){
            //disable the 'add image to collection button'
            addRandomImageToCollectionButton.disabled = true
            //clear input field
            document.querySelector('#user-email').value = ''
            return alert(
                `Invalid email address! Email address must be 6 - 20 characters long,
                No meta-characters, such as ? - + #...`
            )
        }else{
            // if(userEmail.value === currentUser.email) return//do nothing
            //enable the 'add image to collection button'
            if(addRandomImageToCollectionButton.disabled){
                addRandomImageToCollectionButton.disabled = false 
            }
            //check there's no other user in the current session
            if(!currentUser.email === ''){
                //there is another user (email address in session)
                //save current user data before switching to new user image collection
                allUsers = [...allUsers, currentUser]
                localStorage.setItem('allUsers', JSON.stringify(allUsers))
                console.log(allUsers)
                console.log(localStorage.getItem('allUsers'))
            }
            //switch to new user
            currentUser.email = userEmail.value
            console.log(userEmail.value)
            //clear input field
            document.querySelector('#user-email').value = ''
            //check if current user already exists in saved users
            const allUserEmails = allUsers.map(user => user.email)
            //if user exists
            if(allUserEmails.includes(currentUser.email)){
                console.log('user already saved!!!!!')
                //clear current display
                document.querySelector('#current-user-image-collection-container').innerHTML = ''
                //find user in Users array
                const userIndexInAllUsersArray = allUserEmails.indexOf(currentUser.email)
                //get users image collection
                currentUser.imageCollection = allUsers[userIndexInAllUsersArray].imageCollection
                //display user's collection
                displayUserCollection(currentUser.imageCollection)
                //add random image to user collection
                addRandomImageToCollectionButton.addEventListener(
                    'click', ()=>{
                        addRandomImageToCollection(currentImage.src, currentUser.imageCollection)
                    }
                )
            }else{
                allUsers.push(currentUser)
                //clear current display
                document.querySelector('#current-user-image-collection-container').innerHTML = ''
                //display user's collection
                displayUserCollection(currentUser.imageCollection)
                //add random image to user collection
                addRandomImageToCollectionButton.addEventListener(
                    'click', ()=>{
                        addRandomImageToCollection(currentImage.src, currentUser.imageCollection)
                    }
                )
            }
        }
    }
        
)