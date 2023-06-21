const threadSectionDOM = document.querySelector(".thread-section");
const inputTextDOM = document.getElementById("inputTitle");
const inputContentDOM = document.getElementById("inputContent");
const formDOM = document.querySelector(".form-section");

let inputText = ""
let inputContentText = ""

//最初はThreadの全てを読み込む
const getAllThreads = async () => {
  try{
    let allThreads = await axios.get("/api/v1/threads");
    let { data } = allThreads;

    //出力
    allThreads = data.map((thread) => {
      const { title, content } = thread;
      return `
      <div class="single-thread">
      <h3>${title}</h3>
      <p>${content}</p>
      </div>
      `
    })
    .join("");
    threadSectionDOM.innerHTML = allThreads;
  } catch (err) {
    console.log(err);
  }
};

getAllThreads();

//postメソッド
inputTextDOM.addEventListener("change", (e) => {
  inputText = e.target.value;
});

inputContentDOM.addEventListener("change", (e) => {
  inputContentText = e.target.value;
});

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();

  if(inputText && inputContentText) {
    try{
      await axios.post("/api/v1/thread", {
        title: inputText,
        content: inputContentText,
      });
      getAllThreads();
    } catch (err) {
      console.log(err);
    }
  }
})
