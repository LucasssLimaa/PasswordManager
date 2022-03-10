<div id="container">

<img src="assets/images/logo.svg">
<h1 id="header">Gerador de Senhas</h1>
<div id="createAccountArea">
    <h1 id="createYourAccount">Crie Sua Conta</h1>
    <p id="failToCreateUser"></p>
    <input id="inputCreateUser" type="text" placeholder="Nome de Usuário">
    <p id="errorCreatePassword"></p>
    <input id="inputCreatePassword" type="password" placeholder="Senha">
    <input id="inputConfirmPassword" type="password" placeholder="Confirmar Senha">
    <button id="crateAccountButton" onclick="createAccount()">Registrar</button>
    <h3>Já possui uma conta?</h3>
    <button id="goToLoginButton" onclick="goToLoginArea()">Login</button>
</div>
<div id="userCreatedArea">
    <h2>Usuário Criado Com Sucesso</h2>
    <button id="leaveToStartButton" onclick="backToStart()">Voltar</button>
    <button id="enterButton" onclick="enter()">Entrar</button>
</div>
<div id="loginArea">
    <h2 id="putLogin"></h2>
    <div id="loginInputs">
        <p id="inputLoginError"></p>
        <input id="userNameInput" type="text" placeholder="Nome de Usuário">
        <p id="wrongPassword"></p>
        <input id="userPasswordInput" type="password" placeholder="Senha">
    </div>
    <div>
        <button id="backToCreateAccountButton" onclick="backToCreateAccount()">Voltar</button>
        <button id="loginButton" onclick="login()">Login</button>
    </div>
</div>

<div id="generatorArea">
    <h2 id="welcome"></h2>
    <button id="generatePassword" onclick="createPassword()">Gerar Senha</button>
    <h2 id="yourPassword"></h2>
    <h2 id="passwordHTML"></h2>
    <button id="savePasswordButton" onclick="savePassword()">Salvar Senha</button>
    <h2 id="h2Message"></h2>
    <input id="passwordFunction" type="text" placeholder="Ex: Youtube">
    <p id="inputError"></p>
    <h2 id="successMessage"></h2>

    <div id="passwordsArea">
        <h2>Minhas Senhas:</h2>
        <h3 id="myPasswords"></h3>
        <!--h4 id="noPasswords"></h4-->
    </div>

    <div id="saveControls">
        <button id="backButton" onclick="back()">Voltar</button>
        <button id="saveButton" onclick="save()">Salvar</button>
    </div>
</div>
<div id="deleteArea">
    <h2 id="deleteHeader"></h2>
    <button id="outDeleteAreaButton" onclick="outDeleteArea()">Voltar</button>
    <p id="errorToDelete"></p>
    <input id="confirmDelete" type="text" placeholder="CONFIRMAR">
    <div id="allDeleteButtons">
        <button id="noDeleteButton" onclick="noDelete()">Voltar</button>
        <button id="deleteButton" onclick="deleteAccount()">Deletar Conta</button>
    </div>
</div>
<div id="mainButtons">
    <button id="backToStartButton" onclick="backToStart()">Voltar</button>
    <button id="deleteAccountButton" onclick="goToDeleteAccount()">Deletar Conta</button>
</div>
</div>