function validateForm(){
    var firstName = document.getElementById('firstName').value.trim();
    var lastName = document.getElementById('lastName').value.trim();
    var phoneNumber = document.getElementById('phoneNumber').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
 
    if (!/^[a-zA-Z]+$/.test(firstName)) {
        alert("First name should contain only alphabetical characters.");
        return false;
    }
 
    if (!/^[a-zA-Z]+$/.test(lastName)) {
        alert("Last name should contain only alphabetical characters.");
        return false;
    }
 
    if (!/^\d+$/.test(phoneNumber)) {
        alert("Phone number should contain only numerical characters.");
        return false;
    }
 
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
 
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return false;
    }
 
    if (!/[A-Z]/.test(password)) {
        alert("Password must contain at least one capital letter.");
        return false;
    }
 
    if (!/[@!]/.test(password)) {
        alert("Password must contain at least one special symbol like @ or !");
        return false;
    }
 
    return true;
}
 
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}