/*
# 체크박스 다중선택을 위한 스크립트.  
typescript 연습용으로 ts로 만들어 봄.  

### 사용법  
 - let checker = new heiliglied.CheckboxChecker();
 - checker.changeStatus(전체선택 selector, 다중선택 할 체크박스의 selector값);
 - addEventListener를 이용하기 때문에 항목이 수십, 수백건이 되면 약간의 부하가 생김.
*/

namespace heiliglied {
    export class CheckboxChecker {
        totalChecker: string;
        checkboxName: string;
        constructor() {}

        changeStatus(totalChecker: string, checkboxes: string) {
            this.totalChecker = totalChecker;
            this.checkboxes = checkboxes;
            let totalBox = <HTMLInputElement>document.querySelector(this.totalChecker);
            let checkbox = document.querySelectorAll(this.checkboxes);

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
