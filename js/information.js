class InformationEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new InformationEvent();
        }
        return this.#instance;
    }

    addEventPhotoChangeClick() {
        const infoPhoto = document.querySelector(".info-photo");
        infoPhoto.onclick = () => {
            const photoFile = document.querySelector(".photo-file");
            photoFile.click(); //click 하게 만듬.
        }
    }

    addEventPhotoChange() {
        const photoFile = document.querySelector(".photo-file");
        photoFile.onchange = () => {
            FileService.getInstance().changePhoto();
        } 
    }

    addEventAboutMeModifyClick() {
        const aboutMeModifyButton = document.querySelector(".m-aboutme")
        aboutMeModifyButton.onclick = () => {
            const aboutMeSaveButton = document.querySelector(".s-aboutme");
            aboutMeSaveButton.classList.remove("button-hidden");
            aboutMeModifyButton.classList.add("button-hidden");
           
            const infoInputContainers = document.querySelectorAll(".info-input-container");
            infoInputContainers.forEach(infoInputContainer => {
                infoInputContainer.querySelector(".info-input").disabled = false;
            });            
        }
    }
    
    addEventAboutMeSaveClick() {
        const aboutMeSaveButton = document.querySelector(".s-aboutme");
        aboutMeSaveButton.onclick = () => {
            const aboutMeModifyButton = document.querySelector(".m-aboutme")
            aboutMeSaveButton.classList.add("button-hidden");
            aboutMeModifyButton.classList.remove("button-hidden"); 
           
            const infoInputContainers = document.querySelectorAll(".info-input-container");
            const userInfo = InformationService.getInstance().userInfo; //userInfo가 주소를 가지고 있기에 알아서 빈 객체에 값이 들어감.
            
            infoInputContainers.forEach(infoInputContainer => {
                const infoInput = infoInputContainer.querySelector(".info-input");
                userInfo[infoInput.id] = infoInput.value; //반복으로 key value 자동으로  잡음
                infoInput.disabled = true;
            });       
            
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
    }

    addEventIntroduceModifyClick() {
        const introduceModifyButton = document.querySelector(".m-introduce")
        introduceModifyButton.onclick = () => {
            const introduceSaveButton = document.querySelector(".s-introduce");
            introduceSaveButton.classList.remove("button-hidden");
            introduceModifyButton.classList.add("button-hidden");
            const introduceInput = document.querySelector(".introduce-input");
            introduceInput.disabled = false;
        }
    }
    
    addEventIntroduceSaveClick() {
        const introduceSaveButton = document.querySelector(".s-introduce");
        introduceSaveButton.onclick = () => {
            const introduceModifyButton = document.querySelector(".m-introduce")
            introduceSaveButton.classList.add("button-hidden");
            introduceModifyButton.classList.remove("button-hidden"); 
            const introduceInput = document.querySelector(".introduce-input");
            introduceInput.disabled = true;

            const userInfo = InformationService.getInstance().userInfo; //userInfo가 주소를 가지고 있기에 알아서 빈 객체에 값이 들어감.
            userInfo["introduce"] = introduceInput.value;

            localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
    }
}

class InformationService{
    static #instance = null;
    static getInstance(){
        if(this.#instance == null){
            this.#instance = new InformationService();
        }
        return this.#instance;
    }

    userInfo = {}

    loadInfo() {
        this.loadInfoPhoto();
        this.loadInfoUser();
    }

    loadInfoPhoto() {
        const infoPhotoImg = document.querySelector(".info-photo img");
        const infoPhoto = localStorage.getItem("infoPhoto");
        if(infoPhoto == null) {
            infoPhotoImg.src = "./images/noimage.jpeg";
        }else {
            infoPhotoImg.src = infoPhoto;
        }
    }

    loadInfoUser() {
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));//문자열을 객체로 다시 변환
        if(this.userInfo == null) {
            this.userInfo = {};
            return;
        }
        Object.keys(this.userInfo).forEach(key => {
            const infoInput = document.querySelectorAll(".info-input");
            infoInput.forEach(input => {
                if(input.id == key){
                    input.value = this.userInfo[key];
                }
            })
        });
        if(typeof this.userInfo.introduce == 'undefined'){
            return;
        }
        const introduceInput = document.querySelector(".introduce-input")
        introduceInput.value = this.userInfo.introduce;
    }
}

class FileService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new FileService();
        }
        return this.#instance;
    }

    changePhoto() {
        const photoForm = document.querySelector(".photo-form");
        const formData = new FormData(photoForm);
        const fileValue = formData.get("file");
        
        if(fileValue.size == 0){
            return;
        }

        this.showPreview(fileValue);
    }

    showPreview(fileValue) {
        const fileReader = new FileReader();
        
        fileReader.readAsDataURL(fileValue);

        fileReader.onload = (e) => {
            const photoImg = document.querySelector(".info-photo img");
            photoImg.src = e.target.result;
            localStorage.setItem("infoPhoto", photoImg.src);
        }
    }
}
