module.exports = {
    generateID() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        let generatedId = "";
      
        for(let i = 0; i < 2; i++){
            generatedId += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return generatedId + randomNumber;
    }
};