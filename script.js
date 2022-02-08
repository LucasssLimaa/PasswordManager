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
const db = firebase.firestore();

const USERS = "Users";

var createAccountArea = document.getElementById("createAccountArea");
var generatorArea = document.getElementById("generatorArea");
var failToCreateUser = document.getElementById("failToCreateUser");
var inputCreateUser = document.getElementById("inputCreateUser");
var errorCreatePassword = document.getElementById("errorCreatePassword");
var inputCreatePassword = document.getElementById("inputCreatePassword");
var inputConfirmPassword = document.getElementById("inputConfirmPassword");
var goToLoginButton = document.getElementById("loginButton");

var userCreatedArea = document.getElementById("userCreatedArea");
var leaveToStartButton = document.getElementById("leaveToStartButton");
var makeLoginButton = document.getElementById("makeLoginButton");

var loginArea = document.getElementById("loginArea");
var putLogin = document.getElementById("putLogin");
var userNameInput = document.getElementById("userNameInput");
var userPasswordInput = document.getElementById("userPasswordInput");
var wrongPassword = document.getElementById("wrongPassword");

var generatePassword = document.getElementById("generatePassword");
var mainButtons = document.getElementById("mainButtons");
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

var deleteArea = document.getElementById("deleteArea");
var errorToDelete = document.getElementById("errorToDelete");
var deleteHeader = document.getElementById("deleteHeader");
var inputLoginError = document.getElementById("inputLoginError");
var outDeleteAreaButton = document.getElementById("outDeleteAreaButton");
var deleteAccountButton = document.getElementById("deleteAccountButton");

var passwordsArea = document.getElementById("passwordsArea");
var myPasswords = document.getElementById("myPasswords");
var noPasswords = document.getElementById("noPasswords");

var password = "";

function createAccount() {

    //Calc
    let createUser = inputCreateUser.value;
    let createPassword = inputCreatePassword.value;
    let confirmPassword = inputConfirmPassword.value;

    if (createUser != "" && createPassword.length >= 1 && confirmPassword == createPassword) {
        db.collection(USERS).doc(createUser).update({}).then(() => {
            failToCreateUser.innerHTML = "Este nome de usúario já está sendo usado";
        }).catch(() => {
            createAccountArea.style.display = "none";
            userCreatedArea.style.display = "flex";
            db.collection(USERS).doc(createUser).set({
                Name: createUser,
                MasterPassword: createPassword,
            }).then(() => {
                userNameInput.value = "";
                console.log("Usuário criado com sucesso");
            }).catch(err => {
                console.log(err);
            })
        })
    }
    if (createUser == "") {
        failToCreateUser.innerHTML = "Este campo não pode ficar vazio";
    } else {
        failToCreateUser.innerHTML = "";
    }
    if (createPassword.length < 6) {
        errorCreatePassword.innerHTML = "Senha deve ter pelo menos 6 digitos";
    } else {
        errorCreatePassword.innerHTML = "";
        if (confirmPassword != createPassword) {
            errorCreatePassword.innerHTML = "Senhas diferentes";
        } else {
            errorCreatePassword.innerHTML = "";
        }
    }

}

function backToStart() {
    userCreatedArea.style.display = "none";
    generatorArea.style.display = "none";
    mainButtons.style.display = "none";
    createAccountArea.style.display = "flex";
    passwordsArea.style.display = "none";
    myPasswords.innerHTML = "";
    errorToDelete.innerHTML = "";
    inputLoginError.innerHTML = "";
    wrongPassword.innerHTML = "";
    failToCreateUser.innerHTML = "";
    inputCreatePassword.value = "";
    inputCreateUser.value = "";
    inputConfirmPassword.value = "";
}

function enter() {
    userCreatedArea.style.display = "none";
    createAccountArea.style.display = "none";
    generatorArea.style.display = "block";
    welcome.innerHTML = "Bem Vindo(a), " + inputCreateUser.value;
    passwordsArea.style.display = "inline-block"
    mainButtons.style.display = "flex";
}

function goToLoginArea() {
    userCreatedArea.style.display = "none";
    putLogin.innerHTML = "Insira seu email e senha:"
    createAccountArea.style.display = "none";
    loginArea.style.display = "flex";
    loginArea.style.flexDirection = "column";
    loginArea.style.justifyContent = "center";
    failToCreateUser.innerHTML = "";
    errorCreatePassword.innerHTML = "";
    wrongPassword.innerHTML = "";
    userNameInput.value = "";
    userPasswordInput.value = "";
    inputCreateUser.value = "";
    inputCreatePassword.value = "";
    inputConfirmPassword.value = "";
}

function login() {

    inputLoginError.innerHTML = "";
    wrongPassword.innerHTML = "";

    let userName = userNameInput.value;
    let userPassword = userPasswordInput.value;

    if (userName == "" || userPassword == "") {
        inputLoginError.innerHTML = "Preencha todos os campos";
    } else {
        inputLoginError.innerHTML = "";
    }

    db.collection(USERS).doc(userName).get().then((doc) => {
        let masterPassword = doc.data().MasterPassword;
        if (userName != "" || userPassword != "" && userPassword != masterPassword) {
            wrongPassword.innerHTML = "Senha incorreta";
        }
    }).catch(() => {
        inputLoginError.innerHTML = "Usúario não existe";
    })

    let docRef = db.collection(USERS).doc(userName);
    docRef.get().then((doc) => {
        let name = doc.data().Name;
        let masterPassword = doc.data().MasterPassword;
        if (name == userName && masterPassword == userPassword) {
            console.log("Usuário logado com sucesso");
            //Style
            loginArea.style.display = "none";
            generatorArea.style.display = "block";
            mainButtons.style.display = "flex";
            welcome.innerHTML = "Bem Vindo(a), " + userName;
            passwordsArea.style.display = "inline-block";
            db.collection(USERS).where("Name", "==", userName).get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    let passwordArray = doc.data().Passwords;
                    for (let i = 0; i < passwordArray.length; i++) {
                        console.log(passwordArray[i]);
                        let h4 = document.createElement("h4");
                        h4.innerHTML = passwordArray[i];
                        myPasswords.appendChild(h4);
                    }
                })
            })
        }
    })
}

function backToCreateAccount() {
    loginArea.style.display = "none";
    createAccountArea.style.display = "flex";
}

function goToDeleteAccount() {
    generatorArea.style.display = "none";
    mainButtons.style.display = "none";
    deleteArea.style.display = "block";
    deleteHeader.innerHTML = "Digite 'CONFIRMAR' para deletar sua conta:"
}

function noDelete() {
    deleteArea.style.display = "none";
    generatorArea.style.display = "block";
    mainButtons.style.display = "flex"
    errorToDelete.innerHTML = "";
    deleteHeader.innerHTML = "";
}

function deleteAccount() {
    let confirmDelete = document.getElementById("confirmDelete");
    let allDeleteButtons = document.getElementById("allDeleteButtons");

    if (confirmDelete.value == "CONFIRMAR") {
        db.collection(USERS).doc(userNameInput.value).delete().then(() => {
            console.log("Usuário deletado com sucesso");
            deleteHeader.innerHTML = "Conta deletada com sucesso!";
            confirmDelete.style.display = "none";
            allDeleteButtons.style.display = "none";
            outDeleteAreaButton.style.display = "block";
        }).catch((err) => {
            console.log(err);
        })
    } else {
        errorToDelete.innerHTML = "Texto incorreto";
    }
}

function outDeleteArea() {
    deleteArea.style.display = "none";
    createAccountArea.style.display = "flex";
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
    generatePassword.style.display = "none";
    passwordHTML.style.display = "inline";
    mainButtons.style.display = "none";
    backButton.style.display = "block";
    welcome.style.display = "none";
    yourPassword.style.display = "block";
    passwordHTML.style.display = "block";
    yourPassword.innerHTML = "Sua senha:";
    passwordHTML.innerHTML = password;
    h2Message.innerHTML = "Para qual app ou site essa senha vai servir?";
    passwordFunction.style.display = "inline";
    saveButton.style.display = "inline-block";
}

function savePassword() {
    passwordFunction.style.display = "inline-block";
    savePasswordButton.style.display = "none";
    backButton.style.display = "inline-block";
    generatePassword.style.display = "none";
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
    generatePassword.style.display = "block";
    h2Message.innerHTML = "";
    successMessage.innerHTML = "";
    mainButtons.style.display = "flex";
    welcome.style.display = "block";
    inputError.innerHTML = "";
}

function save() {

    //Calcs
    let userName = userNameInput.value;
    let siteName = passwordFunction.value;

    if (userName == "") {
        userName = inputCreateUser.value;
    } else {
        userName = userNameInput.value;
    }

    if (siteName == "") {
        inputError.innerHTML = "Esse campo não pode ficar vazio";
    } else {
        db.collection(USERS)
            .doc(userName).update({
                Passwords: firebase.firestore.FieldValue.arrayUnion(siteName + " - " + password)
            }).then(() => {
                console.log("Documento atualizado com sucesso");
                db.collection(USERS).where("Name", "==", userName).get().then((snapshot) => {
                    snapshot.forEach((doc) => {
                        let passwordArray = doc.data().Passwords;
                        myPasswords.innerHTML = "";
                        for (let i = 0; i < passwordArray.length; i++) {
                            console.log(passwordArray[i]);
                            let h4 = document.createElement("h4");
                            h4.innerHTML = passwordArray[i];
                            myPasswords.appendChild(h4);
                        }
                    })
                })
            }).catch(err => {
                console.log(err);
            })

        inputError.innerHTML = "";

        //Style
        generatePassword.style.display = "none";
        passwordHTML.style.display = "none";
        yourPassword.style.display = "none";
        savePasswordButton.style.display = "none";
        h2Message.innerHTML = "";
        passwordFunction.style.display = "none";
        successMessage.innerHTML = "Sua senha foi salvada com sucesso!";
        saveButton.style.display = "none";
    }
}
