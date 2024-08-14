window.addEventListener("DOMContentLoaded", function() {
    // 브라우저야, HTML 다 읽어들이고 나서 ~ {...} 안에 JS 실행해줘! 
    // 개발자 : 알고 있음
    // 브라우저 : 뭘 어떻게 하는지 모르는 상태
    // 자바스크립트 라는 언어로, 브라우저에게 언제 어느 때 무엇을 어떻게 해야할지 설명하면 됨
   
    // 누가
    const loadBtn = document.querySelector("#load_btn");
    const usersTbl = document.querySelector("#users_tbl");

    // 할일
    loadBtn.addEventListener("click", function() {
        // 데이터 수신 (=data fetching)
        const result = fetch("http://localhost:3000/getAllUsers").then((res) => res.json()).then((data) => {
            //console.log(data);
            data.forEach((el) => {
               // console.log(element);
               const row = document.createElement("tr");
               row.innerHTML = `
               <td>${el.id}</td>
               <td>${el.name}</td>
               <td>${el.email}</td>
               <td>${el.reg_date}</td>
               <td>${el.sns}</td>
               <td>${el.intro}</td>
               `;
               usersTbl.appendChild(row);
            });
            loadBtn.disabled = true; // 한 번 클릭한 이후에 다시 클릭하지 못하게 처리
        });
        
    });  
});