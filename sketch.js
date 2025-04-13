let questionData; // 儲存題目資料
let currentQuestionIndex = 0; // 當前題目索引
let correctCount = 0; // 答對題數
let incorrectCount = 0; // 答錯題數
let selectedOption = null; // 使用者選擇的選項
let options = []; // 當前題目的選項

function preload() {
  // 載入 Excel 檔案 (CSV 格式)
  questionData = loadTable("questions.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#fefae0");

  // 顯示第一題
  displayQuestion();
}

function displayQuestion() {
  // 清除畫布，避免重疊
  clear();
  background("#fefae0");

  // 取得當前題目資料
  let question = questionData.getString(currentQuestionIndex, "question");
  options = [
    questionData.getString(currentQuestionIndex, "option1"),
    questionData.getString(currentQuestionIndex, "option2"),
    questionData.getString(currentQuestionIndex, "option3"),
    questionData.getString(currentQuestionIndex, "option4"),
  ];

  // 顯示題目
  textSize(24);
  textAlign(CENTER, CENTER);
  text(question, width / 2, height / 2 - 150);

  // 顯示選項
  textSize(20);
  textAlign(LEFT, CENTER);
  for (let i = 0; i < options.length; i++) {
    let x = width / 2 - 200;
    let y = height / 2 - 50 + i * 50;

    // 繪製圓形模擬 radio 按鈕
    if (selectedOption === options[i]) {
      fill("#6c757d"); // 選中的顏色
      ellipse(x - 20, y, 20, 20); // 圓形
      fill(0); // 黑色文字
      text(`${i + 1}. ${options[i]}`, x, y);
    } else {
      fill("#ffffff"); // 預設顏色
      ellipse(x - 20, y, 20, 20); // 圓形
      fill(0); // 黑色文字
      text(`${i + 1}. ${options[i]}`, x, y);
    }
    stroke(0);
    noFill();
    ellipse(x - 20, y, 20, 20); // 外框
  }

  // 顯示送出按鈕
  fill("#6c757d");
  rect(width / 2 - 50, height / 2 + 150, 100, 40, 10); // 圓角矩形
  fill(255);
  textAlign(CENTER, CENTER);
  text("送出", width / 2, height / 2 + 170);
}

function mousePressed() {
  // 檢查是否點擊選項
  for (let i = 0; i < options.length; i++) {
    let x = width / 2 - 200;
    let y = height / 2 - 50 + i * 50;
    if (dist(mouseX, mouseY, x - 20, y) < 10) { // 檢查是否點擊圓形
      selectedOption = options[i]; // 更新選中的選項
      break; // 一旦選中，結束迴圈
    }
  }

  // 檢查是否按下送出按鈕
  if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 150 && mouseY < height / 2 + 190) {
    checkAnswer();
  }
}

function checkAnswer() {
  let correctAnswer = questionData.getString(currentQuestionIndex, "correct");

  if (selectedOption === correctAnswer) {
    correctCount++;
    alert("答對了！");
  } else {
    incorrectCount++;
    alert("答錯了！");
  }

  // 清除畫布並顯示新的背景
  clear();
  background("#fefae0");

  // 顯示下一題或結果
  currentQuestionIndex++;
  if (currentQuestionIndex < questionData.getRowCount()) {
    selectedOption = null; // 重置選擇
    displayQuestion();
  } else {
    displayResult();
  }
}

function displayResult() {
  // 清除畫布，顯示結果
  clear();
  background("#fefae0");
  textSize(32);
  textAlign(CENTER, CENTER);
  text(`測驗結束！`, width / 2, height / 2 - 50);
  text(`答對題數：${correctCount}`, width / 2, height / 2);
  text(`答錯題數：${incorrectCount}`, width / 2, height / 2 + 50);
}