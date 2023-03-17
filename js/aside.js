class AsideEvent{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new AsideEvent();
        }
        return this.#instance;
    }

    addEventShowMenuButton() {
        const menuButton = document.querySelector(".menu-button");
        //querySelectorAll -> list로 가져옴.
        //querySelector -> 여러개가 있을땐 첫번째 쿼리 가져옴
        menuButton.onclick = () => {
            //객체들은 const로 작성
            const menuAside = document.querySelector(".menu-aside");
            if(menuAside.classList.contains("hidden-menu")){
                menuAside.classList.remove("hidden-menu");
                menuButton.textContent = "◀";
            }else{
                menuAside.classList.add("hidden-menu");
                menuButton.textContent = "▶";
            }

            
        }
    }

    addEventMainChange() {
        const menuItems = document.querySelectorAll(".menu-items");
        const menuButton = document.querySelector(".menu-button");
        //index를 가지고와줌
        menuItems.forEach((menuItem, index) => {
            menuItem.onclick = () => {
                const mainContainers = document.querySelectorAll(".main-container");
                const menuAside = document.querySelector(".menu-aside");
                mainContainers.forEach(mainContainer => {
                    mainContainer.classList.add("main-hidden");
                });
                mainContainers[index].classList.remove("main-hidden");
                menuAside.classList.add("hidden-menu");
                menuButton.textContent = "▶";
            }
        })
    }



}