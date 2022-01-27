namespace heiliglied {
    export class CheckboxChecker {
        totalChecker: string;
        checkboxName: string;
        constructor() {}

        changeStatus(totalChecker: string, checkboxName: string) {
            this.totalChecker = totalChecker;
            this.checkboxName = checkboxName;
            let totalBox = <HTMLInputElement>document.getElementById(this.totalChecker);
            let checkbox = document.getElementsByName(this.checkboxName);

            totalBox.addEventListener('change', function(){
	            let checked;
	            if(this.checked == true) {
		            checked = true;
	            } else {
		            checked = false;
	            }

	            for(let i = 0; i < checkbox.length; i++) {
                    let checklist = <HTMLInputElement>checkbox[i];
                    checklist.checked = checked;
                }
            });

            Array.from(checkbox).forEach((el, index)=>{
                el.addEventListener('change', ()=>{
                    let checkedCount: number = 0;
                    Array.from(checkbox).forEach((el, index) => {
                        let checkboxes = <HTMLInputElement>el;
                        if(checkboxes.checked == true) {
                            checkedCount++;
                        }
                    });
                    if(checkedCount >= checkbox.length) {
                        totalBox.checked = true;
                    } else {
                        totalBox.checked = false;
                    }
                });
            });
        }
    }
}
