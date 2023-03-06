const addBoardForm=document.forms["addBoardForm"]; // 폼태그
const uidInput=addBoardForm["u_id"];
console.log(uidInput);
const uidMsg=document.getElementById("uidMsg");
const UID_CHECK_URL="/boards/uidCheck.do";
uidInput.addEventListener("change",uidHandler);
addBoardForm.addEventListener("submit",submitHandler);
async function submitHandler(e){
    e.preventDefault();
    let uidCheck=await uidHandler();
    if(uidCheck){
        addBoardForm.submit();
    }
}
async function uidHandler(){
    let val=(uidInput.value);
    let check=false;
    const res=await fetch(UID_CHECK_URL+"?u_id="+val); // then 실행 + 첫번째 매개변수를 받는다.
    try{
        const obj=await res.json(); // return을 안하고 await 한다 // JSON 오브젝트 // 프라미스를 반환!
        console.log(obj);
        if(obj.check){ // ob.check 가 true 일때
            uidMsg.innerText=`${obj.board.u_id}이(가) 사용 중인 참조가능 아이디입니다.`;
            return true
        }else{
            uidMsg.innerText="참조 불가 아이디입니다.";
        }
    }catch(e){
        console.error(e);
    }
    return check;
}