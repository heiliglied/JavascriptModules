# 드래그 가능한 모달 다중 생성 라이브러리 

## 사용법
let modals = new MultiModalControl(  
    {  
        bodyFix: 모달 생성시 스크롤이 생성된 상태일 때 스크롤 on/off 여부(true, false 기본값 true)  
        index: zIndex 값(number 기본값 10000)  
    }  
);  

### 모달 레이어만 생성 후, 모달 전체 element를 등록한다.
modals.setModal(  
    depth: 모달 단계. 나중에 생성되더라도 depth가 낮으면 아래에 생성됨(integer),  
    element: 모달로 생성할 element. element를 그대로 모달 안에 넣어줌.  
    vail: 모달 뒤쪽을 클릭하지 못하도록 전체를 덮는 vail을 생성해줌(true/false).  
    autoClose: 모달 영역 바깥 클릭 시 모달 닫기(true/false),  
    draggable: 모달 이동 가능여부(true/false).  
    dragArea: 드래그 가능한 영역 생성(true/false 기본값 false)  
);  

### 모달 영역을 생성 후, 영역 안에 content만 등록한다.
modals.setModalReference(
    depth: 모달 단계. 나중에 생성되더라도 depth가 낮으면 아래에 생성됨(integer),  
    vail: 모달 뒤쪽을 클릭하지 못하도록 전체를 덮는 vail을 생성해줌(true/false).  
    autoClose: 모달 영역 바깥 클릭 시 모달 닫기(true/false),  
    draggable: 모달 이동 가능여부(true/false).  
    contents: 모달 안에 넣을 element string값.
);
