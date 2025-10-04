// 참고 코드 : https://openprocessing.org/sketch/1232809
// 키보드를 누르면 애니메이션을 일시정지 시킬 수 있습니다

let message = "한"; // 텍스트 메시지
let fontFile = "NanumMyeongjoExtraBold.ttf"; // 사용할 폰트 파일
let font;
let fontSize = 500; // 텍스트 크기
let textAlpha = 1; // 텍스트 투명도

let backgroundColor = 0; // 배경색
let strokeAlpha = 10; // 선의 투명도
let strokeColor = 255; // 선의 색상

let points = []; // 포인트 배열
let fontSampleFactor = 0.3; // 텍스트의 포인트 개수
let noiseZoom = 0.006; // 펄린 노이즈의 확대 비율
let noiseOctaves = 4; // 노이즈의 옥타브 개수
let noiseFalloff = 0.5; // 노이즈 계층의 감쇠 정도
let lineSpeed = 0.2; // 각 포인트가 한 프레임에 이동할 수 있는 최대 거리

let isLooping = true; // 루프 여부

function preload() { // 폰트 불러오기
  font = loadFont(fontFile);
}



function setup() {
  createCanvas(windowWidth, windowHeight); // 캔버스 생성
  background(backgroundColor); // 배경색 설정
  textFont(font); // 폰트 설정
  textSize(fontSize); // 폰트 크기 설정
  fill(backgroundColor, textAlpha); // 텍스트 설정
  stroke(strokeColor, strokeAlpha); // 선 설정
  noiseDetail(noiseOctaves, noiseFalloff); // 노이즈 설정

  // 시작 포인트 설정
  points = font.textToPoints(
    message,
    width / 2 - textWidth(message) / 2,
    height / 2.2 + textWidth(message) / 2,
    fontSize,
    { sampleFactor: fontSampleFactor } );
}



function draw() {
  if (keyIsPressed === false) { // 키보드를 누르고 있을 때 일시정지
    for (let pt = 0; pt < points.length; pt++) {
      let p = points[pt];
      let noiseX = p.x * noiseZoom;
      let noiseY = p.y * noiseZoom;
      let noiseZ = 0;

      let newPX = p.x + map(noise(noiseX, noiseY, noiseZ), 0, 1, -lineSpeed, lineSpeed);
      let newPY = p.y + map(noise(noiseX, noiseY, noiseZ + 214), 0, 1, -lineSpeed, lineSpeed);

      line(p.x, p.y, newPX, newPY);
      p.x = newPX;
      p.y = newPY;
    }
  }
}


function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function keyPressed() {
  // 특정 키를 눌렀을 때 프로그램을 재시작
  setup();
}