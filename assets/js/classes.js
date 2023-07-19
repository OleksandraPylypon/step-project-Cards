//
// imports
import {
  Form,
  ModalCardiologistForm,
  ModalDentistForm,
  ModalTherapistForm,
} from "./forms.js";
// import { shomMeMore } from "./functions.js";

// import { createWindowContent } from "./main.js";

// Classes for buttons
class Button {
  constructor(width = 140, height = 50, type = "button") {
    this.width = width;
    this.height = height;
    this.type = type;
  }

  createButton() {
    const buttonElement = document.createElement("button");
    buttonElement.style.width = `${this.width}px`;
    buttonElement.style.height = `${this.height}px`;
    buttonElement.type = this.type;
    buttonElement.classList.add("button");
    return buttonElement;
  }
}

//
// Modals
class Modal {
  constructor(element) {
    this.modalElement = document.createElement("div");
    this.modalElement.classList.add("window");
    element.append(this.modalElement);

    this.headline = document.createElement("h2");
    this.headline.classList.add("headline");
    this.modalElement.append(this.headline);
  }

  open() {
    this.modalElement.style.display = "flex";
  }

  close() {
    this.modalElement.remove();
  }
}

class ModalEnterWindow extends Modal {
  constructor(element, content) {
    super(element);
    this.headline.textContent = content;

    this.form = new Form("log-in-form");
    this.form.addInput("Введіть логін", "text", "login", "input-login");
    this.form.addInput(
      "Введіть пароль",
      "password",
      "password",
      "input-password"
    );
    this.form.addButton("УВІЙТИ", "enter-btn");
    this.modalElement.classList.add("window-log-in");

    this.modalElement.append(this.form.formElement);
  }
}

class ModalCardWindow extends Modal {
  constructor(element, content) {
    super(element);
    this.headline.textContent = content;

    this.form = new Form("visit-form");
    this.form.addSelect("changeDoctor", "select-main");

    const selectElement = this.form.formElement.querySelector("select");
    this.form.setSelectElement(selectElement);

    this.form.addOption("option", "-- none --");
    this.form.addOption("option", "Кардіолог");
    this.form.addOption("option", "Стоматолог");
    this.form.addOption("option", "Терапевт");
    this.form.addButton("ЗАКРИТИ", "close-card", "button");

    this.modalElement.classList.add("window-create-doctor");
    this.modalElement.append(this.form.formElement);

    selectElement.addEventListener(
      "change",
      this.handleSelectChange.bind(this)
    );

    const closeWindow = this.form.formElement.querySelector(".close-card");
    closeWindow.addEventListener("click", function () {
      this.form.remove();
    });
  }

  handleSelectChange(event) {
    const selectedOption = event.target.value;
    let modalForm;

    switch (selectedOption) {
      case "Кардіолог":
        modalForm = new ModalCardiologistForm();
        break;
      case "Стоматолог":
        modalForm = new ModalDentistForm();
        break;
      case "Терапевт":
        modalForm = new ModalTherapistForm();
        break;
      default:
        modalForm = null;
        break;
    }

    if (modalForm) {
      const selectElement = this.form.formElement.querySelector("select");
      const closeWindow = this.form.formElement.querySelector(".close-card");
      // const createCard = this.form.formElement.querySelector(".create-card");

      const noneOption = selectElement.querySelector(
        'option[value="-- none --"]'
      );
      if (noneOption) {
        noneOption.remove();
      }
      this.form.clearFormElement();
      this.form.formElement.append(
        selectElement,
        modalForm.form.formElement,
        closeWindow
      );

      const createButton =
        modalForm.form.formElement.querySelector(".create-card");
      createButton.addEventListener("click", () => {
        modalForm.form.sendData();

        // conteiner__cards is visiable after sending
        function closeWindow() {
          let conteinerCards = document.querySelector(".conteiner__cards");
          let filterWrapper = document.querySelector(".filter-wrapper");
          let button = document.querySelector(".button-create-visit");
          let window = document.querySelector(".window-create-doctor");

          window.remove();
          conteinerCards.style.display = "flex";
          filterWrapper.style.display = "flex";
          button.classList.remove("hidden");
        }
        closeWindow();
      });
    }
  }
}

class Visit {
  constructor(descriptionVisit, goalVisit, changeUrgency, namePatient) {
    (this.descriptionVisit = descriptionVisit),
      (this.goalVisit = goalVisit),
      (this.changeUrgency = changeUrgency),
      (this.namePatient = namePatient);
  }
  render() {}
}

class VisitCardiologist extends Visit {
  constructor(
    descriptionVisit,
    goalVisit,
    changeUrgency,
    namePatient,
    doc,
    pressure,
    bmi,
    heartDisease,
    age,
    id
  ) {
    super(descriptionVisit, goalVisit, changeUrgency, namePatient),
      (this.doc = doc),
      (this.pressure = pressure),
      (this.bmi = bmi),
      (this.heartDisease = heartDisease),
      (this.age = age),
      (this.id = id);
  }
  // ! Oleg
  // render() {
  //   let card = `
  //           <div class="card" id="${this.id}">
  //           <button class="card__delete">❌</button>
  //           <h4 class="card__title">ПІБ: ${this.namePatient}</h4>
  //           <h4 class="card__doc">Доктор: ${this.doc}</h4>
  //           <button class="card__btn-more">Показати більше</button>
  //           <div class="card__block" data-card-info= "${this.id}">
  //             <p class ="card__descriptionVisit">Опис візиту: ${this.descriptionVisit}</p>
  //             <p class="card__goalVisit">Мета визиту: ${this.goalVisit}</p>

  //             <p class="card__changeUrgency">Терміновість: ${this.changeUrgency}</p>
  //             <p class="card__pressure">Внутрішний тиск: ${this.pressure}</p>
  //             <p class="card__bmi">Індекс маси тіла: ${this.bmi}</p>
  //             <p class="card__heartDisease">Перенесені захворювання серцево-судинної системи: ${this.heartDisease}</p>
  //             <p class="card__age">Вік: ${this.age}</p>
  //             <button class="card__btn-rewrite" >Редагувати</button>
  //           </div>
  //           </div>`;

  //   let element = document.querySelector(".conteiner__cards");
  //   if (element) {
  //     element.insertAdjacentHTML("beforeend", card);
  //     // shomMeMore(".conteiner__cards");
  //   }
  // }

  // TODO
  render() {
    let element = document.querySelector(".conteiner__cards");

    let wrapper = document.createElement("div");
    let nameWrapper = document.createElement("div");
    let cross = document.createElement("div");
    let doc = document.createElement("h3");
    let name = document.createElement("h4");
    let moreBtn = document.createElement("div");
    let moreInfo = document.createElement("div");
    let desc = document.createElement("p");
    let goal = document.createElement("p");
    let urgency = document.createElement("p");
    let pressure = document.createElement("p");
    let bmi = document.createElement("p");
    let heartDisease = document.createElement("p");
    let age = document.createElement("p");
    let editBtn = document.createElement("button");

    wrapper.classList.add("card");
    nameWrapper.classList.add("card__name-wrapper");
    cross.classList.add("cross");
    doc.classList.add("card__doc");
    name.classList.add("card__title");
    moreBtn.classList.add("card__btn-more");
    moreInfo.classList.add("card__block");
    moreInfo.classList.add("hidden");
    desc.classList.add("card__descriptionVisit");
    goal.classList.add("card__goalVisit");
    urgency.classList.add("card__changeUrgency");
    pressure.classList.add("card__pressure");
    bmi.classList.add("card__bmi");
    heartDisease.classList.add("card__heartDisease");
    age.classList.add("card__age");
    editBtn.classList.add("card__btn-rewrite");

    doc.textContent = `${this.doc}`;
    name.textContent = `${this.namePatient}`;
    moreBtn.textContent = `показати / сховати`;
    desc.textContent = `Опис візиту: ${this.descriptionVisit}`;
    goal.textContent = `Мета візиту: ${this.goalVisit}`;
    urgency.textContent = `Терміновість: ${this.changeUrgency}`;
    pressure.textContent = `Звичайний тиск: ${this.pressure}`;
    bmi.textContent = `Індекс маси тіла: ${this.bmi}`;
    heartDisease.textContent = `Перенесенні захворювання: ${this.heartDisease}`;
    age.textContent = `Вік: ${this.age}`;
    editBtn.textContent = "Редагувати";

    wrapper.append(nameWrapper);
    nameWrapper.append(doc);
    doc.after(cross);
    nameWrapper.after(name);
    name.after(moreBtn);
    moreBtn.after(moreInfo);
    moreInfo.append(goal);
    goal.after(desc);
    desc.after(urgency);
    urgency.after(pressure);
    pressure.after(bmi);
    bmi.after(heartDisease);
    heartDisease.after(age);
    age.after(editBtn);
    element.prepend(wrapper);

    moreBtn.addEventListener("click", function () {
      moreInfo.classList.toggle("hidden");
    });
  }
}

class VisitDentist extends Visit {
  constructor(
    descriptionVisit,
    goalVisit,
    changeUrgency,
    namePatient,
    doc,
    id,
    lastDate
  ) {
    super(descriptionVisit, goalVisit, changeUrgency, namePatient),
      (this.doc = doc),
      (this.id = id),
      (this.lastDate = lastDate);
  }
  // ! Oleg
  // render() {
  //   let card = `
  //           <div class="card" id="${this.id}">
  //           <button class="card__delete">❌</button>
  //           <h4 class="card__title">ПІБ: ${this.namePatient}</h4>
  //           <h4 class="card__doc">Доктор: ${this.doc}</h4>
  //           <button class="card__btn-more">Показати більше</button>
  //           <div class="card__block" data-card-info= "${this.id}">
  //             <p class ="card__descriptionVisit">Опис візиту: ${this.descriptionVisit}</p>
  //             <p class="card__goalVisit">Мета визиту: ${this.goalVisit}</p>
  //             <p class="card__changeUrgency">Терміновість: ${this.changeUrgency}</p>
  //             <p class="card__age">Вік: ${this.age}</p>
  //             <p class="card__lastDate">Останній візит: ${this.lastDate}</p>
  //             <button class="card__btn-rewrite" >Редагувати</button>
  //           </div>
  //           </div>`;
  //   let element = document.querySelector(".conteiner__cards");
  //   if (element) {
  //     element.insertAdjacentHTML("beforeend", card);
  //     // shomMeMore(".conteiner__cards");
  //   }
  // }

  // TODO
  render() {
    let element = document.querySelector(".conteiner__cards");

    let wrapper = document.createElement("div");
    let nameWrapper = document.createElement("div");
    let cross = document.createElement("div");
    let doc = document.createElement("h3");
    let name = document.createElement("h4");
    let moreBtn = document.createElement("div");
    let moreInfo = document.createElement("div");
    let desc = document.createElement("p");
    let goal = document.createElement("p");
    let urgency = document.createElement("p");
    let lastDate = document.createElement("p");
    let editBtn = document.createElement("button");

    wrapper.classList.add("card");
    nameWrapper.classList.add("card__name-wrapper");
    cross.classList.add("cross");
    doc.classList.add("card__doc");
    name.classList.add("card__title");
    moreBtn.classList.add("card__btn-more");
    moreInfo.classList.add("card__block");
    moreInfo.classList.add("hidden");
    desc.classList.add("card__descriptionVisit");
    goal.classList.add("card__goalVisit");
    urgency.classList.add("card__changeUrgency");
    lastDate.classList.add("card__lastDate");
    editBtn.classList.add("card__btn-rewrite");

    doc.textContent = `${this.doc}`;
    name.textContent = `${this.namePatient}`;
    moreBtn.textContent = `показати / сховати`;
    desc.textContent = `${this.descriptionVisit}`;
    goal.textContent = `${this.goalVisit}`;
    urgency.textContent = `${this.changeUrgency}`;
    lastDate.textContent = `${this.lastDate}`;
    editBtn.textContent = "Редагувати";

    wrapper.append(nameWrapper);
    nameWrapper.append(doc);
    doc.after(cross);
    nameWrapper.after(name);
    name.after(moreBtn);
    moreBtn.after(moreInfo);
    moreInfo.append(desc);
    desc.after(goal);
    goal.after(urgency);
    urgency.after(lastDate);
    lastDate.after(editBtn);
    element.prepend(wrapper);

    moreBtn.addEventListener("click", function () {
      moreInfo.classList.toggle("hidden");
    });
  }
}

class VisitTherapist extends Visit {
  constructor(
    descriptionVisit,
    goalVisit,
    changeUrgency,
    namePatient,
    doc,
    age,
    id
  ) {
    super(descriptionVisit, goalVisit, changeUrgency, namePatient),
      (this.doc = doc),
      (this.age = age),
      (this.id = id);
  }
  // ! Oleg
  // render() {
  //   let card = `
  //           <div class="card" id="${this.id}">
  //           <button class="card__delete">❌</button>
  //           <h4 class="card__title">ПІБ: ${this.namePatient}</h4>
  //           <h4 class="card__doc">Доктор: ${this.doc}</h4>
  //           <button class="card__btn-more">Показати більше</button>
  //           <div class="card__block" data-card-info= "${this.id}">
  //             <p class ="card__descriptionVisit">Опис візиту: ${this.descriptionVisit}</p>
  //             <p class="card__goalVisit">Мета визиту: ${this.goalVisit}</p>
  //             <p class="card__changeUrgency">Терміновість: ${this.changeUrgency}</p>
  //             <p class="card__age">Вік: ${this.age}</p>
  //             <button class="card__btn-rewrite" >Редагувати</button>
  //           </div>
  //           </div>`;
  //   let element = document.querySelector(".conteiner__cards");
  //   if (element) {
  //     element.insertAdjacentHTML("beforeend", card);
  //     // shomMeMore(".conteiner__cards");
  //   }
  // }

  render() {
    let element = document.querySelector(".conteiner__cards");

    let wrapper = document.createElement("div");
    let nameWrapper = document.createElement("div");
    let cross = document.createElement("div");
    let doc = document.createElement("h3");
    let name = document.createElement("h4");
    let moreBtn = document.createElement("div");
    let moreInfo = document.createElement("div");
    let desc = document.createElement("p");
    let goal = document.createElement("p");
    let urgency = document.createElement("p");
    let age = document.createElement("p");
    let editBtn = document.createElement("button");

    wrapper.classList.add("card");
    nameWrapper.classList.add("card__name-wrapper");
    cross.classList.add("cross");
    doc.classList.add("card__doc");
    name.classList.add("card__title");
    moreBtn.classList.add("card__btn-more");
    moreInfo.classList.add("card__block");
    moreInfo.classList.add("hidden");
    desc.classList.add("card__descriptionVisit");
    goal.classList.add("card__goalVisit");
    urgency.classList.add("card__changeUrgency");
    age.classList.add("card__age");
    editBtn.classList.add("card__btn-rewrite");

    doc.textContent = `${this.doc}`;
    name.textContent = `${this.namePatient}`;
    moreBtn.textContent = `показати / сховати`;
    desc.textContent = `${this.descriptionVisit}`;
    goal.textContent = `${this.goalVisit}`;
    urgency.textContent = `${this.changeUrgency}`;
    age.textContent = `${this.age}`;
    editBtn.textContent = "Редагувати";

    wrapper.append(nameWrapper);
    nameWrapper.append(doc);
    doc.after(cross);
    nameWrapper.after(name);
    name.after(moreBtn);
    moreBtn.after(moreInfo);
    moreInfo.append(desc);
    desc.after(goal);
    goal.after(urgency);
    urgency.after(age);
    age.after(editBtn);
    element.prepend(wrapper);

    moreBtn.addEventListener("click", function () {
      moreInfo.classList.toggle("hidden");
    });
  }
}

export {
  Button,
  ModalEnterWindow,
  ModalCardWindow,
  VisitCardiologist,
  VisitDentist,
  VisitTherapist,
};
