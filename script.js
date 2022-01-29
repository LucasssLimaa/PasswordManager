const firebaseConfig = {
    apiKey: "AIzaSyA4Rw3QWS2JxMspAQlFH11euYvqArH3QRo",
    authDomain: "geradordesenhas-2518d.firebaseapp.com",
    projectId: "geradordesenhas-2518d",
    storageBucket: "geradordesenhas-2518d.appspot.com",
    messagingSenderId: "692681073146",
    appId: "1:692681073146:web:0af0de39649b69a3a5c443",
    measurementId: "G-FVXQELCJS8"
};
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

const PASSWORDS = "Passwords";

var createAccountArea = document.getElementById("createAccountArea");
var generatorArea = document.getElementById("generatorArea");
var failToCreateUser = document.getElementById("failToCreateUser");
var inputCreateUser = document.getElementById("inputCreateUser");
var errorCreatePassword = document.getElementById("errorCreatePassword");
var inputCreatePassword = document.getElementById("inputCreatePassword");
var goToLoginButton = document.getElementById("loginButton");

var userCreatedArea = document.getElementById("userCreatedArea");
var leaveToStartButton = document.getElementById("leaveToStartButton");
var makeLoginButton = document.getElementById("makeLoginButton");

var loginArea = document.getElementById("loginArea");
var putLogin = document.getElementById("putLogin");
var userNameInput = document.getElementById("userNameInput");
var userPasswordInput = document.getElementById("userPasswordInput");

var generatePassword = document.getElementById("generatePassword");
var welcome = document.getElementById("welcome");
var backToStartButton = document.getElementById("backToStartButton");
var passwordHTML = document.getElementById("passwordHTML");
var yourPassword = document.getElementById("yourPassword");
var savePasswordButton = document.getElementById("savePasswordButton");
var h2Message = document.getElementById("h2Message");
var passwordFunction = document.getElementById("passwordFunction");
var inputError = document.getElementById("inputError");
var backButton = document.getElementById("backButton");
var saveButton = document.getElementById("saveButton");
var successMessage = document.getElementById("successMessage");


var passwordsArea = document.getElementById("passwordsArea");
var myPasswords = document.getElementById("myPasswords");
var allPasswords = document.getElementById("allPasswords");

var password = "";

function createAccount() {

    //Calc
    let createUser = inputCreateUser.value;
    let createPassword = inputCreatePassword.value;

    if (createUser != "" && createPassword.length >= 6) {
        errorCreatePassword.style.display = "none";
        db.collection(PASSWORDS).doc(createUser).update({}).then(() => {}).catch(() => {
            createAccountArea.style.display = "none";
            userCreatedArea.style.display = "flex";
            db.collection(PASSWORDS).doc(createUser).set({
                Name: createUser,
                MasterPassword: createPassword,
            }).then(() => {
                console.log("Usuário criado com sucesso");
            }).catch(err => {
                console.log(err);
            })
        })
    }
    if (createUser == "") {
        failToCreateUser.innerHTML = "Este campo não pode ficar vazio";
    }
    if (createPassword.length < 6) {
        errorCreatePassword.innerHTML = "Senha deve ter pelo menos 6 digitos";
    }
    
    //Style

}

function goToLoginArea() {
    userCreatedArea.style.display = "none";
    putLogin.innerHTML = "Insira seu email e senha:"
    createAccountArea.style.display = "none";
    loginArea.style.display = "flex";
    loginArea.style.flexDirection = "column";
    loginArea.style.justifyContent = "center";

}

function backToCreateAccount() {
    loginArea.style.display = "none";
    createAccountArea.style.display = "flex";
}

function login() {

    //Calc
    let userName = userNameInput.value;
    let userPassword = userPasswordInput.value;

    db.collection(PASSWORDS).doc(userName).update({}).then(() => {
        db.collection(PASSWORDS).where("MasterPassword", "==", userPassword).get().then((snapshot) => {
            snapshot.forEach(() => {
                console.log("Usuário logado com sucesso");

                //Style
                loginArea.style.display = "none";
                generatorArea.style.display = "block";
                welcome.innerHTML = "Bem Vindo, " + userName;
                passwordsArea.style.display = "inline-block";
                db.collection(PASSWORDS).where("Name", "==", userName).get().then((snapshot) => {
                    snapshot.forEach((doc) => {
                        let passwordArray = doc.data().Passwords;
                        for (let i = 0; i < passwordArray.length; i++) {
                            console.log(passwordArray[i]);
                            let h4 = document.createElement("h4");
                            h4.innerHTML = passwordArray[i];
                            passwordsArea.appendChild(h4);
                        }
                    })
                })

            })
        })
    }).catch((err) => {
        console.log(err);
    })
}

function backToStart() {
    userCreatedArea.style.display = "none";
    generatorArea.style.display = "none";
    createAccountArea.style.display = "flex";
    passwordsArea.style.display = "none";
    passwordsArea.innerHTML = "";
}

function createPassword() {

    //Calcs
    password = "";
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var aux = 0;

    while (aux <= 20) {
        var random = Math.floor(Math.random() * 61);
        var char = chars.substring(random, random + 1);
        password += char;
        aux += 1;
    }

    //Style
    backToStartButton.style.display = "none";
    yourPassword.style.display = "block";
    passwordHTML.style.display = "block";
    generatePassword.innerHTML = "Gerar Nova Senha";
    yourPassword.innerHTML = "Sua senha:";
    passwordHTML.innerHTML = password;
    savePasswordButton.style.display = "inline";
}

function savePassword() {
    passwordFunction.style.display = "inline-block";
    savePasswordButton.style.display = "none";
    backButton.style.display = "inline-block";
    saveButton.style.display = "inline-block";
    generatePassword.style.display = "none";
    h2Message.innerHTML = "Para qual app ou site essa senha vai servir?"

}

function back() {
    backToStartButton.style.display = "inline-block";
    passwordHTML.style.display = "none";
    yourPassword.style.display = "none";
    savePasswordButton.style.display = "none";
    passwordFunction.style.display = "none";
    passwordFunction.value = "";
    backButton.style.display = "none";
    saveButton.style.display = "none";
    generatePassword.innerHTML = "Gerar Senha";
    generatePassword.style.display = "inline";
    h2Message.innerHTML = ""
    successMessage.innerHTML = "";
}

function save() {

    //Calc
    if (passwordFunction.value == "") {
        inputError.innerHTML = "Esse campo não pode ficar vazio";
    } else {
        //Calc
        let userName = userNameInput.value;
        let siteName = passwordFunction.value;
        
        db.collection(PASSWORDS)
            .doc(userName).update({
                Passwords: firebase.firestore.FieldValue.arrayUnion(siteName + " - " + password)
            }).then(() => {
                console.log("Documento atualizado com sucesso");
                db.collection(PASSWORDS).get().then((snapshot) => {
                    snapshot.forEach((doc) => {
                        passwordsArea.innerHTML = "";
                        let passwordArray = doc.data().Passwords;
                        for (let i = 0; i < passwordArray.length; i++) {
                            console.log(passwordArray[i]);
                            let h4 = document.createElement("h4");
                            h4.innerHTML = passwordArray[i];
                            passwordsArea.appendChild(h4);
                        }
                    })
                })
            }).catch(err => {
                console.log(err);
            })

        //Style
        generatePassword.style.display = "none";
        passwordHTML.style.display = "none";
        yourPassword.style.display = "none";
        savePasswordButton.style.display = "none";
        h2Message.style.display = "none";
        passwordFunction.style.display = "none";
        successMessage.innerHTML = "Sua senha foi salvada com sucesso!";
        saveButton.style.display = "none";
    }
}
