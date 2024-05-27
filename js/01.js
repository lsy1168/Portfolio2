const container = document.querySelector('.rain-container');
const numRaindrops = 17; // 빗방울 개수
const minGap = 50; // 최소 간격 (px 단위)
const groupedRaindrops = 5; // 같은 줄에서 떨어질 빗방울 수
const groupChance = 0.3; // 그룹이 생성될 확률 (30%)
const reverseRaindropsCount = 9; // 아래에서 위로 올라갈 빗방울 개수

let lastPositions = [];

function getRandomPosition() {
  let position;
  let valid;
  do {
    position = Math.random() * window.innerWidth; // 랜덤 수평 위치 (px 단위)
    valid = lastPositions.every(lastPosition => Math.abs(position - lastPosition) >= minGap);
  } while (!valid);
  lastPositions.push(position);
  if (lastPositions.length > numRaindrops) {
    lastPositions.shift();
  }
  return position;
}

let reverseRaindrops = new Set();
while (reverseRaindrops.size < reverseRaindropsCount) {
  reverseRaindrops.add(Math.floor(Math.random() * numRaindrops));
}

// 고정된 라인 생성
for (let i = 0; i < numRaindrops; i++) {
  const position = getRandomPosition();

  const randomWidth = Math.random() * 6 + 1; // 1px에서 5px 사이의 랜덤 너비

  const line = document.createElement('div');
  line.classList.add('line');
  line.style.left = `${position}px`;
  line.style.width = `${randomWidth}px`;
  
  container.appendChild(line);

  const raindrop = document.createElement('div');
  raindrop.classList.add('raindrop');
  
  const randomHeight = Math.random() * 70 + 3; // 3px에서 73px 사이의 랜덤 높이
  raindrop.style.height = `${randomHeight}px`; // 빗방울 높이 설정
  raindrop.style.width = `${randomWidth}px`; // 빗방울 너비 설정
  raindrop.style.left = `${position}px`; // 랜덤 수평 위치 설정

  if (reverseRaindrops.has(i)) {
    raindrop.classList.add('reverse'); // 아래에서 위로 올라가는 클래스 추가
  }
  
  raindrop.style.setProperty('--duration', `${Math.random() * 15 + 1}s`);
  raindrop.style.setProperty('--delay', `${Math.random() * 20}s`); // 애니메이션 시작 시간 랜덤 설정
  
  container.appendChild(raindrop);
  
  // 그룹으로 빗방울 추가
  if (Math.random() < groupChance) {
    const groupDuration = `${Math.random() * 15 + 1}s`; // 그룹 내 같은 속도
    for (let j = 0; j < groupedRaindrops; j++) {
      const groupedRaindrop = document.createElement('div');
      groupedRaindrop.classList.add('raindrop');
      
      const groupedHeight = Math.random() * 70 + 3; // 다른 높이
      groupedRaindrop.style.height = `${groupedHeight}px`;
      groupedRaindrop.style.width = `${randomWidth}px`; // 동일한 너비
      groupedRaindrop.style.left = `${position}px`;
      groupedRaindrop.style.setProperty('--duration', groupDuration);
      groupedRaindrop.style.setProperty('--delay', `${Math.random() * 20}s`);

      if (reverseRaindrops.has(i)) {
        groupedRaindrop.classList.add('reverse'); // 아래에서 위로 올라가는 클래스 추가
      }
      
      container.appendChild(groupedRaindrop);
    }
  }
}



   const content = ["인간 챗 GPT", "신입 개발자 임성령입니다."];
   const text = document.querySelector(".text");
   let i = 0;
   let j = 0;
   
   function typing() {
     let txt = content[i][j++]; // 현재 텍스트의 한 글자를 가져옴
     text.textContent += txt === "\n" ? "<br/>" : txt; // 개행 문자면 <br/> 추가, 아니면 글자 추가
   
     if (j >= content[i].length) { // 텍스트 한 줄이 끝나면
       setTimeout(erase, 1000); // 1초 후에 지우기 함수 호출
     } else {
       setTimeout(typing, 200); // 아직 더 출력할 글자가 있으면 0.2초 후에 다음 글자 출력
     }
   }
   
   function erase() {
     let txt = text.textContent;
     text.textContent = txt.slice(0, -1); // 텍스트 한 글자씩 지우기
   
     if (txt.length === 0) { // 텍스트가 모두 지워졌을 때
       i = (i + 1) % content.length; // 다음 텍스트 준비
       j = 0;
       setTimeout(typing, 1000); // 1초 후에 다시 타이핑 시작
     } else {
       setTimeout(erase, 100); // 아직 더 지울 글자가 있으면 0.1초 후에 다음 글자 지우기
     }
   }
   
   typing(); // 타이핑 애니메이션 시작



function showProjectDetails(event, projectId) {
  event.preventDefault();
  const projectElement = document.getElementById(projectId);
  projectElement.style.display = 'flex';
  showSlide(0, projectId.replace('-details', ''));
}

function closeProjectDetails() {
  const projectDetails = document.querySelectorAll('.project-details');
  projectDetails.forEach(details => {
      details.style.display = 'none';
  });
}

function changeSlide(n, projectClass) {
  const slides = document.querySelectorAll(`.${projectClass} .slide`);
  const activeIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
  if (activeIndex === -1) {
      console.error(`No active slide found in project ${projectClass}`);
      return;
  }
  slides[activeIndex].classList.remove('active');
  const newIndex = (activeIndex + n + slides.length) % slides.length;
  slides[newIndex].classList.add('active');
}

function showSlide(index, projectClass) {
  const slides = document.querySelectorAll(`.${projectClass} .slide`);
  if (slides.length === 0) {
      console.error(`No slides found in project ${projectClass}`);
      return;
  }
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}




document.addEventListener('DOMContentLoaded', () => {
    let map;
  
    function initMap() {
        const mapContainer = document.getElementById('map');
        const mapOptions = {
            center: new kakao.maps.LatLng(37.661638321507, 127.24058837384),
            level: 4
        };
  
        map = new kakao.maps.Map(mapContainer, mapOptions);
  
        const markerPosition = new kakao.maps.LatLng(37.65779196218, 127.24856969696);
  
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });
  
        marker.setMap(map);
  
        kakao.maps.event.addListener(map, 'idle', function() {
            map.relayout();
        });
  
        setTimeout(() => {
            map.relayout();
        }, 100);
    }
  
    function resizeMap() {
        map.relayout();
    }
  
    const mapContainer = document.getElementById('map');
    const observer = new MutationObserver(resizeMap);
    observer.observe(mapContainer, { attributes: true, childList: true, subtree: true });
  
    initMap();
    window.addEventListener('resize', resizeMap);
  
    const menuItems = document.querySelectorAll('.gnb-menu .menu li a');
    const contentSections = document.querySelectorAll('.card-inner');
    const menuListItems = document.querySelectorAll('.gnb-menu .menu li');
  
    const initialSectionId = 'about';
    const initialSection = document.getElementById(initialSectionId);
    const initialMenuItem = document.querySelector(`.gnb-menu .menu li a[data-target="${initialSectionId}"]`);
  
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
  
    if (initialSection) {
        initialSection.style.display = 'block';
        initialSection.classList.add('active');
    }
  
    if (initialMenuItem) {
        initialMenuItem.parentElement.classList.add('active');
        const imgElement = initialMenuItem.querySelector('img');
        imgElement.src = imgElement.getAttribute('data-hover-src');
    }
  
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
  
            const targetId = item.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            const activeSection = document.querySelector('.card-inner.active');
  
            if (activeSection) {
                activeSection.classList.remove('active');
                activeSection.classList.add('fade-out');
                activeSection.addEventListener('transitionend', function onFadeOut() {
                    activeSection.classList.remove('fade-out');
                    activeSection.style.display = 'none';
                    activeSection.removeEventListener('transitionend', onFadeOut);
  
                    targetSection.style.display = 'block';
                    setTimeout(() => {
                        targetSection.classList.add('active');
                        if (targetId === 'contact') {
                            setTimeout(() => {
                                map.relayout();
                            }, 0);
                        }
                    }, 10);
                });
            } else {
                targetSection.style.display = 'block';
                setTimeout(() => {
                    targetSection.classList.add('active');
                    if (targetId === 'contact') {
                        setTimeout(() => {
                            map.relayout();
                        }, 0);
                    }
                }, 10);
            }
  
            menuListItems.forEach(menuItem => {
                const imgElement = menuItem.querySelector('img');
                if (menuItem.querySelector('a').getAttribute('data-target') === targetId) {
                    menuItem.classList.add('active');
                    imgElement.src = imgElement.getAttribute('data-hover-src');
                } else {
                    menuItem.classList.remove('active');
                    imgElement.src = imgElement.getAttribute('data-original-src');
                }
            });
        });
    });
  
    const toggleButton = document.getElementById('toggleMode');
    const allImages = document.querySelectorAll('img');
  
    allImages.forEach(img => {
        if (!img.closest('#map')) {
            img.addEventListener('click', () => {
                img.classList.toggle('enlarged');
            });
        }
    });
  
    const updateImages = () => {
        allImages.forEach(imgElement => {
            if (!imgElement.closest('#map')) {
                if (document.body.classList.contains('light-mode')) {
                    imgElement.src = imgElement.getAttribute('data-light-src');
                } else {
                    imgElement.src = imgElement.getAttribute('data-dark-src');
                }
            }
        });
    };
  
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        updateImages();
    });
  
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
  
            const targetId = item.getAttribute('data-target');
            const menuListItems = document.querySelectorAll('.gnb-menu .menu li');
  
            menuListItems.forEach(menuItem => {
                const imgElement = menuItem.querySelector('img');
                if (menuItem.querySelector('a').getAttribute('data-target') === targetId) {
                    menuItem.classList.add('active');
                    if (!imgElement.closest('#map')) {
                        imgElement.src = document.body.classList.contains('light-mode') ? imgElement.getAttribute('data-light-hover-src') : imgElement.getAttribute('data-hover-src');
                    }
                } else {
                    menuItem.classList.remove('active');
                    if (!imgElement.closest('#map')) {
                        imgElement.src = document.body.classList.contains('light-mode') ? imgElement.getAttribute('data-light-src') : imgElement.getAttribute('data-dark-src');
                    }
                }
            });
        });
    });
  
    updateImages();
  });
  