const missionCompleteScreen = document.getElementById('mission-complete-screen');
const missionFinalScore = document.getElementById('mission-final-score');
const missionRestartButton = document.getElementById('mission-restart-button');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const backgroundTitleVideo = document.querySelector('.background-title-video');

canvas.width = 600;  // Ширина остается такой же
canvas.height = 450; // Меняем с 600 на 500

let backgroundVideo;
let gameBackgroundVideo; // Новая переменная для видео-фона игры

// Функция для создания и инициализации видео фона игры
function initGameBackgroundVideo() {
    gameBackgroundVideo = document.createElement('video');
    gameBackgroundVideo.src = 'background.mp4';
    gameBackgroundVideo.autoplay = true;
    gameBackgroundVideo.loop = true;
    gameBackgroundVideo.muted = true;
    gameBackgroundVideo.id = 'game-background-video';
    gameBackgroundVideo.style.position = 'absolute';
    gameBackgroundVideo.style.top = '0';
    gameBackgroundVideo.style.left = '0';
    gameBackgroundVideo.style.width = '100%';
    gameBackgroundVideo.style.height = '100%';
    gameBackgroundVideo.style.objectFit = 'cover';
    gameBackgroundVideo.style.zIndex = '-1';
    document.getElementById('game-container').appendChild(gameBackgroundVideo);
}

function initBackgroundVideo() {
    backgroundVideo = document.createElement('video');
    backgroundVideo.src = 'title.mp4';
    backgroundVideo.autoplay = true;
    backgroundVideo.loop = true;
    backgroundVideo.muted = true;
    backgroundVideo.style.position = 'fixed';
    backgroundVideo.style.top = '0';
    backgroundVideo.style.left = '0';
    backgroundVideo.style.width = '20%';
    backgroundVideo.style.height = '100px';
    backgroundVideo.style.objectFit = 'cover';
    backgroundVideo.style.zIndex = '1';
    document.body.appendChild(backgroundVideo);
}

// Новые элементы управления
let gameStarted = false;
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const playButton = document.getElementById('play-button');
const restartButton = document.getElementById('restart-button');
const finalScoreElement = document.getElementById('final-score');
const nicknameInput = document.getElementById('nickname-input');
const nicknameError = document.getElementById('nickname-error');
let playerNickname = '';

// Загрузка звуков
const coinSound = new Audio('coin.mp3');
const backgroundMusic = new Audio('background-music.mp3');
const laserSound = new Audio('laser.mp3');
const explosionSound = new Audio('explosion.mp3');
const asteroidHitSound = new Audio('asteroid-hit.mp3');
const gameOverSound = new Audio('game-over.mp3');
const menuMusic = new Audio('menu-music.mp3');
const secondaryBackgroundMusic = new Audio('secondary-background.mp3'); // Новое аудио

coinSound.volume = 0.4;

// Настройка музыки меню
menuMusic.loop = false;
menuMusic.volume = 0.5;

// Настройка фоновой музыки
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;

// Настройка второй фоновой музыки
secondaryBackgroundMusic.loop = true;
secondaryBackgroundMusic.volume = 0.6; // Можете настроить громкость по вашему желанию

// Настройка звуковых эффектов
laserSound.volume = 0.1;
explosionSound.volume = 0.35;
asteroidHitSound.volume = 0.6;
gameOverSound.volume = 0.5;

// Автозапуск музыки
window.addEventListener('DOMContentLoaded', function() {
    // Пытаемся воспроизвести музыку сразу
    menuMusic.play().catch(function(error) {
        console.log('Не удалось автоматически воспроизвести музыку:', error);
        
        // Если не получилось, пробуем при первом взаимодействии с страницей
        document.addEventListener('click', function startMusic() {
            menuMusic.play();
            document.removeEventListener('click', startMusic);
        });
    });
});

// Убедимся, что видео воспроизводится даже с учетом ограничений браузеров
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('#right-video-container video');
    
    // Пытаемся запустить видео автоматически
    video.play().catch(function(error) {
        console.log('Автозапуск видео не удался:', error);
        
        // Если автозапуск не удался, запустим при первом взаимодействии
        document.addEventListener('click', function startVideo() {
            video.play();
            document.removeEventListener('click', startVideo);
        });
    });
});


// Функция для запуска фоновой музыки
function initBackgroundMusic() {
    backgroundMusic.play()
        .then(() => {
            console.log('Фоновая музыка запущена');
            // Запускаем вторую музыку сразу после первой
            secondaryBackgroundMusic.play()
                .then(() => {
                    console.log('Вторая фоновая музыка запущена');
                })
                .catch(error => {
                    console.log('Ошибка воспроизведения второй фоновой музыки:', error);
                });
        })
        .catch(error => {
            console.log('Ошибка воспроизведения фоновой музыки:', error);
        });
}

// Загрузка изображений
const backgroundImg = new Image();
backgroundImg.src = 'background.png';

const playerImg = new Image();
playerImg.src = 'player.png';

const asteroidImgs = [
    new Image(),
    new Image(),
    new Image(),
];
asteroidImgs[0].src = 'asteroid1.png';
asteroidImgs[1].src = 'asteroid2.png';
asteroidImgs[2].src = 'asteroid3.png';

const coinImgs = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    
];
coinImgs[0].src = 'coin1.png';
coinImgs[1].src = 'coin2.png';
coinImgs[2].src = 'coin3.png';
coinImgs[3].src = 'coin4.png';
coinImgs[4].src = 'coin5.png';
coinImgs[5].src = 'coin6.png';
coinImgs[6].src = 'coin7.png';
coinImgs[7].src = 'coin8.png';
coinImgs[8].src = 'coin9.png';
coinImgs[9].src = 'coin10.png';
coinImgs[10].src = 'coin11.png';
coinImgs[11].src = 'coin12.png';
coinImgs[12].src = 'coin13.png';
coinImgs[13].src = 'coin14.png';
coinImgs[14].src = 'coin15.png';
coinImgs[15].src = 'coin16.png';
coinImgs[16].src = 'coin17.png';
coinImgs[17].src = 'coin18.png';
coinImgs[18].src = 'coin19.png';
coinImgs[19].src = 'coin20.png';
coinImgs[20].src = 'coin21.png';
coinImgs[21].src = 'coin22.png';
coinImgs[22].src = 'coin23.png';
coinImgs[23].src = 'coin24.png';
coinImgs[24].src = 'coin25.png';
coinImgs[25].src = 'coin26.png';
coinImgs[26].src = 'coin27.png';
coinImgs[27].src = 'coin28.png';
coinImgs[28].src = 'coin29.png';
coinImgs[29].src = 'coin30.png';
coinImgs[30].src = 'coin31.png';
coinImgs[31].src = 'coin32.png';
coinImgs[32].src = 'coin33.png';
coinImgs[33].src = 'coin34.png';
coinImgs[34].src = 'coin35.png';
coinImgs[35].src = 'coin36.png';
coinImgs[36].src = 'coin37.png';
coinImgs[37].src = 'coin38.png';

const explosionImgs = [
    new Image(),
    new Image(),
];
explosionImgs[0].src = 'explosion1.png';
explosionImgs[1].src = 'explosion2.png';

// Параметры игрока
let player = { 
    x: 100, 
    y: 250, // Меняем с 300 на 250, чтобы игрок был ближе к центру 
    width: 55, 
    height: 55, 
    speedY: 0, 
    gravity: 0.3, 
    lift: -7, 
    drag: 0.98 
};

// Игровые объекты
let bullets = [];
let asteroids = [];
let coins = [];
let explosions = [];
let rocketTrail = [];
let collectedCoins = [];
let availableCoins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]; // Индексы доступных монет
let score = 0;
let isGameOver = false;
let backgroundX = 0;
let backgroundSpeed = 2;
let coinRotationAngle = 0;
let lastScoreUpdate = 0;
let lastCoinSpawnTime = 0;
let collisionPoint = null;
let explosionFinished = false;

// Модифицируем функцию startGame
function startGame() {
    // Проверка наличия никнейма при первом запуске
    if (!gameStarted && !nicknameInput.value.trim()) {
        nicknameError.style.display = 'block';
        nicknameInput.focus();
        return;
    }
    
    // Останавливаем музыку меню
    menuMusic.pause();
    menuMusic.currentTime = 0;
    
    // Сохраняем никнейм при первом запуске
    if (!gameStarted) {
        playerNickname = nicknameInput.value.trim();
    }
    
    // Показываем фоновое видео
    backgroundTitleVideo.style.display = 'block';
    
    nicknameError.style.display = 'none';
    gameStarted = true;
    
    // Инициализация видео фона игры
    if (!gameBackgroundVideo) {
        initGameBackgroundVideo();
    } else {
        gameBackgroundVideo.play();
    }
    
    isGameOver = false;
    startScreen.style.display = 'none';
    missionCompleteScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';

    // Сброс всех игровых переменных
    score = 0;
    player = { 
        x: 100, 
        y: 250, // Меняем с 300 на 250 
        width: 55, 
        height: 55, 
        speedY: 0, 
        gravity: 0.3, 
        lift: -7, 
        drag: 0.98 
    };
    bullets = [];
    asteroids = [];
    coins = [];
    explosions = [];
    rocketTrail = [];
    collectedCoins = [];
    availableCoins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]; // Сброс доступных монет
    collisionPoint = null;
    explosionFinished = false;
    lastScoreUpdate = 0;
    lastCoinSpawnTime = 0;
    
    // Запуск фоновой музыки
    backgroundMusic.currentTime = 0;
    initBackgroundMusic();
    
    requestAnimationFrame(gameLoop);
}

// Функция для окончания игры
function endGame() {
    if (!isGameOver) {
        isGameOver = true;
        gameOverScreen.style.display = 'block';
        finalScoreElement.textContent = `${playerNickname} - Score: ${score}`;
        backgroundMusic.pause();
        secondaryBackgroundMusic.pause();
        
        // Останавливаем видео фона
        if (gameBackgroundVideo) {
            gameBackgroundVideo.pause();
        }
        
        gameOverSound.currentTime = 0;
        gameOverSound.play();
        
        // Отображаем собранные монеты
        const coinsDisplay = document.getElementById('collected-coins-display');
        coinsDisplay.innerHTML = ''; // Очищаем предыдущее отображение
        
        // Отсортируем монеты по типу для красивого отображения
        const sortedCoins = [...collectedCoins].sort((a, b) => a - b);
        
        // Добавляем каждую собранную монету
        sortedCoins.forEach(coinType => {
            const coinImg = document.createElement('img');
            coinImg.src = coinImgs[coinType].src;
            coinsDisplay.appendChild(coinImg);
        });
        
        // Если монет нет, показываем сообщение
        if (sortedCoins.length === 0) {
            coinsDisplay.innerHTML = '<p style="color: white; grid-column: 1/-1; font-size: 2rem; text-align: center;">NOT ENOUGH, U HAVE TO LOCK IN!</p>';
        }
    }
}

// Функция для проверки завершения миссии
function checkMissionComplete() {
    console.log('Checking mission completion:');
    console.log('Collected coins:', collectedCoins.length, collectedCoins);
    console.log('Need to collect:', 38); // Всего нужно собрать 5 монет
    
    if (collectedCoins.length === 38 && !isGameOver) { // Проверяем именно количество собранных монет
        console.log('Mission complete triggered!');
        showMissionComplete();
        return true;
    }
    return false;
}
// Функция для отображения экрана завершения миссии
function showMissionComplete() {
    isGameOver = true;
    missionCompleteScreen.style.display = 'block';
    gameOverScreen.style.display = 'none'; // Убедимся, что экран game over скрыт
    missionFinalScore.textContent = `${playerNickname} - Score: ${score}`;
    backgroundMusic.pause();
    secondaryBackgroundMusic.pause();
    
    // Останавливаем видео фона
    if (gameBackgroundVideo) {
        gameBackgroundVideo.pause();
    }
    
    // Отображаем собранные монеты
    const coinsDisplay = document.getElementById('mission-collected-coins-display');
    if (coinsDisplay) { // Добавляем проверку на существование элемента
        coinsDisplay.innerHTML = ''; 
        
        const sortedCoins = [...collectedCoins].sort((a, b) => a - b);
        
        sortedCoins.forEach(coinType => {
            const coinImg = document.createElement('img');
            coinImg.src = coinImgs[coinType].src;
            coinsDisplay.appendChild(coinImg);
        });
    } else {
        console.error('mission-collected-coins-display element not found');
    }
}

// Управление игроком
window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp' && !collisionPoint) player.speedY += player.lift;
    if (e.code === 'Space' && !collisionPoint) {
        bullets.push({ x: player.x + player.width, y: player.y + player.height / 2, width: 10, height: 5, speed: 9 });
        laserSound.currentTime = 0;
        laserSound.play();
    }
});

// Спавн астероидов
function spawnAsteroid() {
    const size = Math.random() * 50 + 30; // размер астероида от 30 до 80
    const asteroidType = Math.floor(Math.random() * asteroidImgs.length);
    
    // Добавляем отступ от краёв равный размеру астероида
    const minY = size; // минимальная позиция Y (верхняя граница)
    const maxY = canvas.height - size; // максимальная позиция Y (нижняя граница)
    const safeY = Math.random() * (maxY - minY) + minY;
    
    asteroids.push({
        x: canvas.width,
        y: safeY,
        width: size,
        height: size,
        speed: Math.random() * 4 + 3,
        image: asteroidImgs[asteroidType],
    });
}

// Спавн монет
function spawnNextCoin(currentTime) {
    if (coins.length === 0 && currentTime - lastCoinSpawnTime > 8000) {
        if (availableCoins.length > 0) {
            // Вычисляем пропущенные монеты (те, которые не собраны)
            const missedCoins = availableCoins.filter(coinType => !collectedCoins.includes(coinType));
            
            let coinToSpawn;
            
            // Если есть пропущенные монеты и собрано больше 90% всех монет,
            // принудительно спавним одну из пропущенных
            if (missedCoins.length > 0 && collectedCoins.length >= availableCoins.length * 0.9) {
                const randomIndex = Math.floor(Math.random() * missedCoins.length);
                coinToSpawn = missedCoins[randomIndex];
            } else {
                // Обычный случайный выбор из всех доступных монет
                const randomIndex = Math.floor(Math.random() * availableCoins.length);
                coinToSpawn = availableCoins[randomIndex];
            }
            
            const coinSize = 40;
            const minY = coinSize;
            const maxY = canvas.height - coinSize; // Это автоматически адаптируется к новой высоте
            const safeY = Math.random() * (maxY - minY) + minY;
            
            coins.push({
                x: canvas.width,
                y: safeY,
                width: coinSize,
                height: coinSize,
                speed: 2,
                image: coinImgs[coinToSpawn],
                type: coinToSpawn,
            });
            lastCoinSpawnTime = currentTime;
        }
    }
}

// Создание взрыва
function createExplosion(x, y) {
    explosions.push({
        x: x,
        y: y,
        currentFrame: 0,
        startTime: performance.now(),
        isFinished: false,
    });
}

const rainbowColors = [
    '#ff3300', // красный
    '#ff9900', // оранжевый
    '#ffff00', // желтый
    '#33cc33', // зеленый
    '#3399ff', // голубой
    '#6633cc'  // фиолетовый
];

// Модифицированная функция создания частицы хвоста в виде пикселей
function createTrailParticle() {
    // Создаем по одной частице для каждого цвета радуги
    for (let i = 0; i < rainbowColors.length; i++) {
        rocketTrail.push({
            x: player.x - 7, // Увеличиваем расстояние от игрока (было player.x)
            y: player.y + player.height / 3,
            width: 12,      // Уменьшаем ширину прямоугольника (было 15)
            height: 6,      // Уменьшаем высоту прямоугольника (было 10)
            colorIndex: i,  // индекс цвета
            opacity: 1,
            fadeRate: 0.01, // медленное исчезновение
            offsetY: (i - rainbowColors.length / 2 + 0.5) * 5 // Уменьшаем вертикальный отступ (было * 8)
        });
    }
    
    // Ограничиваем максимальное количество частиц для производительности
    if (rocketTrail.length > 300) {
        rocketTrail.splice(0, rocketTrail.length - 300);
    }
}

// Обновленная функция обновления хвоста для пиксельного стиля
function updateTrail() {
    rocketTrail.forEach((particle, index) => {
        particle.opacity -= particle.fadeRate;
        particle.x -= 1.5; // Медленнее движение для более длинного хвоста
        
        if (particle.opacity <= 0) {
            rocketTrail.splice(index, 1);
        } else {
            // Рисуем прямоугольник вместо круга
            ctx.fillStyle = rainbowColors[particle.colorIndex].replace(')', `, ${particle.opacity})`).replace('rgb', 'rgba');
            
            // Добавляем небольшой эффект "ступенек" для пиксельного вида
            const xOffset = (particle.colorIndex % 2) * 3; // Уменьшаем смещение (было * 5)
            
            // Рисуем прямоугольник с небольшим смещением в зависимости от цвета
            ctx.fillRect(
                particle.x + xOffset, 
                particle.y + particle.offsetY, 
                particle.width, 
                particle.height
            );
        }
    });
}



// Обновление угла вращения монет
function updateCoinRotation() {
    coinRotationAngle += 5;
    if (coinRotationAngle >= 360) {
        coinRotationAngle = 0;
    }
}

// Отрисовка вращающейся монеты
function drawRotatingCoin(coin) {
    const centerX = coin.x + coin.width / 2;
    const centerY = coin.y + coin.height / 2;
    const scaleFactor = Math.abs(Math.cos((coinRotationAngle * Math.PI) / 180));
    const currentWidth = coin.width * scaleFactor;
    ctx.drawImage(coin.image, centerX - currentWidth / 2, coin.y, currentWidth, coin.height);
}

// Обновление и отрисовка взрывов
function updateExplosions(currentTime) {
    explosions.forEach((explosion) => {
        const elapsedTime = currentTime - explosion.startTime;
        if (elapsedTime < 250) {
            ctx.drawImage(explosionImgs[0], explosion.x, explosion.y, 80, 80);
        } else {
            // Всегда показываем второй кадр взрыва после 250мс
            ctx.drawImage(explosionImgs[1], explosion.x, explosion.y, 80, 80);
            explosion.isFinished = true;
            explosionFinished = true;
        }
    });
}

// Проверка столкновений
function checkCollision(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

// Отображение трофеев
function drawCollectedCoins() {
    const startX = 50;
    const startY = canvas.height - 50;
    collectedCoins.forEach((coinType, index) => {
        ctx.drawImage(coinImgs[coinType], startX + index * 40, startY, 30, 30);
    });
}

// Игровой цикл
// Игровой цикл
function gameLoop(currentTime) {
    if (!gameStarted) return;

    if (isGameOver) {
        endGame();
        return;
    }

    // Очищаем canvas полностью перед отрисовкой нового кадра
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateCoinRotation();
    
    if (!collisionPoint && currentTime - lastScoreUpdate >= 100) {
        score += 1;
        lastScoreUpdate = currentTime;
    }

    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px ByteBounce';
    ctx.fillText(`${playerNickname} - Score: ${score}`, 20, 40);

    
    if (!collisionPoint) {
        player.speedY += player.gravity;
        player.speedY *= player.drag;
        player.y += player.speedY;

        if (player.y < 0) player.y = 0;
        if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
    }

    if (!collisionPoint) {
        createTrailParticle();
    }

    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

    updateTrail();

    bullets.forEach((bullet, bulletIndex) => {
        bullet.x += bullet.speed;
        ctx.fillStyle = '#ff0';
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        if (bullet.x > canvas.width) bullets.splice(bulletIndex, 1);
    });

    asteroids.forEach((asteroid, asteroidIndex) => {
        if (!collisionPoint) {
            asteroid.x -= asteroid.speed;
        }
        ctx.drawImage(asteroid.image, asteroid.x, asteroid.y, asteroid.width, asteroid.height);

        if (!collisionPoint && checkCollision(player, asteroid)) {
            createExplosion(player.x, player.y);
            collisionPoint = { x: player.x, y: player.y };
            explosionSound.currentTime = 0;
            explosionSound.play();
            backgroundMusic.pause();
        }

        bullets.forEach((bullet, bulletIndex) => {
            if (checkCollision(bullet, asteroid)) {
                bullets.splice(bulletIndex, 1);
                asteroids.splice(asteroidIndex, 1);
                asteroidHitSound.currentTime = 0;
                asteroidHitSound.play();
            }
        });

        if (asteroid.x + asteroid.width < 0) asteroids.splice(asteroidIndex, 1);
    });

    coins.forEach((coin, coinIndex) => {
        // Движение монеты
        if (!collisionPoint) {
            coin.x -= coin.speed;
        }
        
        // Отрисовка монеты
        drawRotatingCoin(coin);
    
        // Проверка столкновения с игроком
        if (checkCollision(player, coin)) {
            // Если такая монета ещё не собрана
            if (!collectedCoins.includes(coin.type)) {
                score += 100;
                collectedCoins.push(coin.type);
                availableCoins = availableCoins.filter(type => type !== coin.type);
                
                // Проверяем завершение миссии
                if (collectedCoins.length === 38) {
                    showMissionComplete();
                    coins.splice(coinIndex, 1);
                    return;
                }
            }
            
            // Удаляем монету и проигрываем звук
            coins.splice(coinIndex, 1);
            coinSound.currentTime = 0;
            coinSound.play();
        }
    
        // Если монета ушла за пределы экрана
        if (coin.x + coin.width < 0) {
            coins.splice(coinIndex, 1);
        }
    });

    updateExplosions(currentTime);
    spawnNextCoin(currentTime);

    if (Math.random() < 0.03 && !collisionPoint) spawnAsteroid();

    // Проверка завершения миссии
    if (checkMissionComplete()) {
        return;
    }

    if (collisionPoint && explosionFinished) {
        endGame();
        return;
    }

    requestAnimationFrame(gameLoop);
}

// Добавляем обработчики событий для кнопок
playButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
missionRestartButton.addEventListener('click', startGame);

// Инициализация игры
startScreen.style.display = 'block';
gameOverScreen.style.display = 'none';