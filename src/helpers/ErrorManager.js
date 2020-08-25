export class ErrorManager {
  errors = [
    {
      code: "GenericError",
      title: "Si e' verificato un errore sconosciuto",
      message: "Si e' verificato un errore sconosciuto."
    },
    {
      code: "UserNotConfirmedException",
      title: "Account non ancora confermato",
      message: "Conferma questo account cliccando sul link inviato per email."
    },
    {
      code: "UserNotFoundException",
      title: "Account non trovato",
      message: "Email o password errati."
    },
    {
      code: "UsernameExistsException",
      title: "Email già usata",
      message: "Esiste già un account con l'e-mail fornita."
    }
  ];
  defaultError = this.errors[0];
  constructor() {}
  error(err) {
    console.log("errormanager", err);
    if (typeof err.code === "undefined" || err.code === "" || err.code === null) {
      return alert(this.defaultError.message);
    }
    for (let error of this.errors) {
      if (err.code === error.code){
        return alert(error.message);
      }
    }
    return alert(this.defaultError.message);
  }
}
