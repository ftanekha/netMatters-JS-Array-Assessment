import {
    fetchRandomImage, isUserEmailAddressValid , addRandomImageToCollection, 
    displayUserNewCollection, clearCurrentUserCollectionDisplay
} from './js/utilities.js'

//fetch random image
const fetchRandomImageButton = document.querySelector('#fetch-random-image-button')
fetchRandomImageButton.addEventListener(
    'click', fetchRandomImage
)
//
const userEmail = document.querySelector('#user-email')
const submitUserEmailButton = document.querySelector('#submit-user-email-button')
const addRandomImageToCollectionButton = document.querySelector('#add-random-image-to-collection-button')
//
const currentImage = document.querySelector('#current-image')
//
addRandomImageToCollectionButton.addEventListener(
    'click', ()=>{
        addRandomImageToCollection(currentImage.src, currentUser.imageCollection)
    }
)
/*store all user info in local storage for persistance*/
//check users exist in local storage
const savedUsers = localStorage.getItem('allUsers')
//store in all Users or start a new array 
let allUsers = JSON.parse(savedUsers) || []
console.log('saved users:', allUsers)
//clear local storage
localStorage.clear()
//store current user email address
let currentUser = {
    imageCollection: []
}
//submit, validate and (if valid) store user email
submitUserEmailButton.addEventListener(
    'click',
    (ev)=> {
        ev.preventDefault()
        //validate user email address
        if(!isUserEmailAddressValid(userEmail.value)){
            //disable/keep disabled the 'add image to collection button'
            addRandomImageToCollectionButton.disabled = true
            submitUserEmailButton.textContent = '🔒'
            addRandomImageToCollectionButton.textContent = '😴'
            //clear input field
            document.querySelector('#user-email').value = ''
            return alert(
                `Invalid email address! Email address must be 6 - 30 characters long,
                No meta-characters, such as ? - + #...`
            )
        }else if(userEmail.value === currentUser.email){
            return alert(
                "Your email address is the same as the current user's ! \nTo start or view another collection, enter a different email address."
            )
        }else{
            //
            submitUserEmailButton.textContent = '🔓'
            addRandomImageToCollectionButton.textContent = '🤗'
            //enable the 'add image to collection button'
            if(addRandomImageToCollectionButton.disabled){
                addRandomImageToCollectionButton.disabled = false 
            }
            //check there's no other user in the current session
            if(currentUser.email){
                //there is another user (email address in session) already
                //update the current user's collection in allUsers array
                console.log('current user:', currentUser.email)
                {{//if allUsers array isn't empty
                    if(allUsers.length){
                        const allUserEmails = allUsers.map(user => user.email)
                        //if user exists
                        if(allUserEmails.includes(currentUser.email)){
                            //find user in allUsers array
                            console.log('yes', currentUser.email, allUsers)
                            const userIndexInAllUsersArray = allUserEmails.indexOf(currentUser.email)
                            let currentUserImageCollection = allUsers[userIndexInAllUsersArray].imageCollection
                            //update current user image collection in allUsers array
                            currentUserImageCollection = [...currentUserImageCollection, ...currentUser.imageCollection]
                            //save current user data before switching to new user image collection
                            localStorage.setItem('allUsers', JSON.stringify(allUsers))
                            //remove previous user's collection from DOM
                            clearCurrentUserCollectionDisplay()
                        }else{
                            //store user data for the first time
                            allUsers.push(currentUser)
                            localStorage.setItem('allUsers', JSON.stringify(allUsers))
                        }
                    }
                }}
            } 
            //clear the user image collection array
            // currentUser.imageCollection = []
            //switch to new user
            currentUser.email = userEmail.value
            // console.log('new user',currentUser)
            //display user name
            const userId = document.querySelector('p#current-user-identifier')        
            userId.textContent = currentUser.email
            //clear input field
            document.querySelector('#user-email').value = ''
            //check if current user already exists in saved users
            const allUserEmails = allUsers.map(user => user.email)
            //if user exists
            if(allUserEmails.includes(currentUser.email)){   
                //get user data from local storage
                let usersInLocalStorage = localStorage.getItem('allUsers')  
                usersInLocalStorage = JSON.parse(usersInLocalStorage) 
                // console.log('localstorage:', usersInLocalStorage) 
                //locate user by email adress
                const userEmailAddresses = usersInLocalStorage.map(user => user.email) 
                //find new user in Users array
                const userIndexInAllUsersArray = userEmailAddresses.indexOf(currentUser.email)
                //get new user image collection
                currentUser.imageCollection =  usersInLocalStorage[userIndexInAllUsersArray].imageCollection
                // clearCurrentUserCollectionDisplay()
                //display user's collection
                // console.log('user in memory', currentUser)
                displayUserNewCollection(currentUser)
            }else{
                // allUsers.push(currentUser)
                // //clear the user image collection array
                // currentUser.imageCollection = [];
                (
                    //display new user's collection (empty at first)
                    ()=> {//only display when image array contains at least one image
                        if(currentUser.imageCollection.length) return displayUserNewCollection(currentUser)
                        return 
                    }
                )()
            }
        }
    }
        
)