### 사용법.

매우 간단합니다.

var foo = custom.modal(element, {'bodyFix': 'on or off'});  
foo.on(); //dimm, vail 레이어를 열어서 음영과 뒷단을 조절할 수 없게 변경 후 element를 염.  
foo.off(); //dimm, vail 레이어 및 element를 닫는다.  
foo.only(); //mimm, valil 레이어만 띄운다.

두번째 파라미터는 옵션입니다.  
on일 경우 뒷쪽 문서의 스크롤을 없앱니다.  
off일경우 기존에 늘어나 있는 스크롤을 그대로 둡니다.  
