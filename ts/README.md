# 체크박스 다중선택을 위한 스크립트.  
typescript 연습용으로 ts로 만들어 봄.  

### 사용법  
 - let checker = heiliglied.CheckboxChecker();
 - checker.changeStatus(전체선택 element ID, 다중선택 할 체크박스의 name값(배열[]));
 - addEventListener를 이용하기 때문에 항목이 수십, 수백건이 되면 약간의 부하가 생김.
