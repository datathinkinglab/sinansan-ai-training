# 신안산대학교 AI 활용 특강 · 강의 사이트

메인 페이지(`index.html`)에서 강사 소개, 공통 AI 윤리·보안, 학과별 강의 사이트로 들어갑니다.
© 2026 Data Thinking Lab. All rights reserved.

## 파일 구성

```
index.html                                   메인 (4장 슬라이드: 메인 · 강사 소개 · 공통 강의 · 학과별 강의)
신안산대학교_AI활용특강_강사소개.html
신안산대학교_AI활용특강_공통윤리보안.html      #1&s=1~7 로 회차별 사례 선택
뷰티디자인/신안산대학교_뷰티디자인과_AI활용특강_슬라이드.html
제과제빵/신안산대학교_호텔제과제빵과_AI활용특강_슬라이드.html   #1-1 = 1부, #2-1 = 2부
호텔조리/신안산대학교_호텔조리과_AI활용특강_슬라이드.html
호텔조리/신안산대학교_호텔조리과_빅데이터특강_슬라이드.html
.nojekyll
```

폴더 이름과 파일 이름은 서로 링크로 연결되어 있으므로 바꾸지 마세요.
학과 페이지의 "메인 H" 버튼(또는 H 키)은 `../index.html`로 돌아갑니다.

## 1. GitHub에 올리기

### 방법 A · 웹에서 올리기
1. github.com 로그인 → 오른쪽 위 **+** → **New repository**
2. Repository name: `sinansan-ai-training` (예시) · **Public** 선택 → **Create repository**
3. 새 저장소 화면에서 **uploading an existing file** 클릭
4. 이 폴더(`github_배포용`) **안의 파일과 폴더 전체**를 끌어다 놓기
   (폴더 자체가 아니라 안의 내용물. `index.html`이 저장소 맨 위에 있어야 합니다)
5. 아래 **Commit changes** 클릭

### 방법 B · 명령어로 올리기 (Git 설치된 경우)
```bash
cd github_배포용
git init
git add .
git commit -m "신안산대학교 AI 활용 특강 강의 사이트"
git branch -M main
git remote add origin https://github.com/datathinkinglab/sinansan-ai-training.git
git push -u origin main
```

## 2. GitHub Pages로 배포하기
1. 저장소 → **Settings** → 왼쪽 **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **/(root)** → **Save**
4. 1~2분 뒤 같은 화면 위쪽에 주소가 표시됩니다.

## 3. 배포 후 주소 (저장소 이름이 sinansan-ai-training인 경우)

| 페이지 | 주소 |
|---|---|
| 메인 | https://datathinkinglab.github.io/sinansan-ai-training/ |
| 강사 소개 | https://datathinkinglab.github.io/sinansan-ai-training/신안산대학교_AI활용특강_강사소개.html |
| 공통 AI 윤리·보안 | https://datathinkinglab.github.io/sinansan-ai-training/신안산대학교_AI활용특강_공통윤리보안.html |
| 뷰티디자인과 | https://datathinkinglab.github.io/sinansan-ai-training/뷰티디자인/신안산대학교_뷰티디자인과_AI활용특강_슬라이드.html |
| 호텔제과제빵과 | https://datathinkinglab.github.io/sinansan-ai-training/제과제빵/신안산대학교_호텔제과제빵과_AI활용특강_슬라이드.html |
| 호텔조리과 (메뉴·원가) | https://datathinkinglab.github.io/sinansan-ai-training/호텔조리/신안산대학교_호텔조리과_AI활용특강_슬라이드.html |
| 호텔조리과 (빅데이터) | https://datathinkinglab.github.io/sinansan-ai-training/호텔조리/신안산대학교_호텔조리과_빅데이터특강_슬라이드.html |

## 단축 링크 (TinyURL)

| 페이지 | 단축 링크 |
|---|---|
| 메인 | https://tinyurl.com/sau-ai |
| 뷰티디자인과 | https://tinyurl.com/sau-ai-beauty |
| 호텔제과제빵과 | https://tinyurl.com/sau-ai-bakery |
| 호텔조리과 (메뉴·원가) | https://tinyurl.com/sau-ai-cook |
| 호텔조리과 (빅데이터) | https://tinyurl.com/sau-ai-bigdata |
| 공통 AI 윤리·보안 | https://tinyurl.com/sau-ai-ethics |

## 4. 배포 후 확인할 것
- [ ] 메인에서 ← → 로 4장이 넘어가는지
- [ ] 학과 카드의 **강의 입장**, **공통 윤리·보안** 버튼이 열리는지
- [ ] 각 강의 사이트의 **메인 H** 버튼으로 메인에 돌아오는지
- [ ] 폰트(Paperlogy)·차트가 보이는지 (인터넷 연결 필요)
- [ ] QR 링크 입력 (각 강의 사이트 조작바의 **QR** 버튼 또는 Q 키)
  - 호텔제과제빵과: 수업 페이지 링크, 학교 만족도 조사 링크
  - 호텔조리과: 수업 페이지 링크
  - 뷰티디자인과: 만족도 조사 링크, Apps Script 웹앱 주소
  - QR 링크는 입력한 브라우저에만 저장됩니다. 강의 PC에서 입력하거나 주소 뒤에 `?page=링크` 등을 붙여 여세요.

## 5. 나중에 학과 사이트를 추가할 때 (아동보육과 · 부동산학과)
1. 학과 폴더를 만들어 강의 사이트 HTML을 넣습니다. 예: `아동보육/신안산대학교_아동보육과_AI활용특강_슬라이드.html`
2. `index.html`의 `const DEPTS` 설정에서 해당 학과의
   `href`를 실제 경로로 바꾸고 `ready:false` → `ready:true`
3. 같은 파일들을 저장소에 다시 올리면 1~2분 뒤 반영됩니다.
