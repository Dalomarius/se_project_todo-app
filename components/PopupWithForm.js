import Popup from "../components/Popup.js";

class popupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputvalues() {
    //TODO move to constructor
    this._inputList = this._popupForm.querySelectorAll(".popup__input");

    const values = {};
    this._inputList.forEach ((input) => {
        //TODO add a key/value pair to the values object for each input
        //TODO the key is input.name
        //TODO the value is input.value
        //TODO need to use brackets notation, not dot notation
    });
    return values;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();

      //TODO Pass result of _getInputValues to submission handlers
      this._handleFormSubmit(evt);
    });
  }
}
export default popupWithForm;
