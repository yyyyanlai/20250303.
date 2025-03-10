let input;
let slider;
let button;
let dropdown;
let iframe;
let isBouncing = false;
let offsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(20, 20);
  input.size(200, 40); // 放大文字框
  //文字框文字大小
  input.style('font-size', '20px');

  slider = createSlider(28, 50, 32); // 創建滑桿，範圍從28到50，初始值為32
  slider.position(input.x + input.width + 10, 33); // 將滑桿放在文字框右側

  button = createButton('跳動文字');
  button.position(slider.x + slider.width + 10, 33); // 將按鈕放在滑桿右側
  button.size(90, 30); // 放大按鈕
  //按紐文字大小
  button.style('font-size', '16px');
  button.mousePressed(toggleBounce);

  dropdown = createSelect();
  dropdown.position(button.x + button.width + 10, 33); // 將下拉式選單放在按鈕右側
  dropdown.size(100, 30); // 放大下拉式選單
  //下拉式選單文字大小
  dropdown.style('font-size', '16px');
  dropdown.option('測驗題');
  dropdown.option('第三週作品');
  dropdown.option('第三週講義');
  dropdown.changed(handleDropdownChange);

  // 初始化每個文字的偏移量
  for (let i = 0; i < 1000; i++) {
    offsets.push(random(0, 1000));
  }

  // 創建 iframe
  iframe = createElement('iframe');
  iframe.position(100, 100);
  iframe.size(windowWidth - 200, windowHeight - 200);
  iframe.hide(); // 初始隱藏
}

function draw() {
  background("#ffe5ec");
  let txt = input.value();
  let txtSize = slider.value(); // 根據滑桿的值調整文字大小
  textSize(txtSize);
  let txtWidth = textWidth(txt + " ");
  let x = (width - txtWidth * Math.floor(width / txtWidth)) / 2;
  let y = input.y + input.height + textAscent(); // 從文字框下方開始

  for (let j = 0; j < Math.floor(height / textAscent()); j++) {
    for (let i = 0; i < Math.floor(width / txtWidth); i++) {
      let yOffset = isBouncing ? sin(frameCount * 0.1 + offsets[i + j * Math.floor(width / txtWidth)]) * 10 : 0;
      text(txt, x + i * txtWidth, y + j * textAscent() + yOffset);
    }
  }
}

function toggleBounce() {
  isBouncing = !isBouncing;
}

function handleDropdownChange() {
  let selected = dropdown.value();
  if (selected === '測驗題') {
    iframe.attribute('src', 'https://yyyyanlai.github.io/20250310/');
    iframe.show();
  } else if (selected === '第三週作品') {
    iframe.attribute('src', 'https://yyyyanlai.github.io/20250303/');
    iframe.show();
  } else if (selected === '第三週講義') {
    iframe.attribute('src', 'https://hackmd.io/@cXBDz1qJRdCeONnktZ5UqA/HyWumtziyg');
    iframe.show();
  }
}
