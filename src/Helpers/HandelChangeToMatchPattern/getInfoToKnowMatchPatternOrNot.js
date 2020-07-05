
const formError = {
    name: '',
    email: '',
    password: ''
}

function getInfoToKnowMatchPatternOrNot(e) {
    // input name and value   
    const { name, value } = e.target

    // start paterns 
    const userNamePattern = /^[A-Za-z0-9_ ]{3,}/;
    const emailPattern = /^[a-zA-Z0-9._-]+@(gmail|yahoo|hotmail).[a-z]{2,}$/;
    const passwordPattern = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}/;
    //end patterns 
    
    if (name === 'name') {
        if (!value.match(userNamePattern)) {
            formError.name = ""
        } else
            formError.name = "correct name"

    }
    if (name === 'email') {
        if (!value.match(emailPattern)) {
            formError.email = ""
        } else
            formError.email = "valid email"

    }
    if (name === 'password') {
        if (!value.match(passwordPattern)) {
            formError.password = ""
        } else
            formError.password = "good password"

    }

    return formError

}

export default getInfoToKnowMatchPatternOrNot

