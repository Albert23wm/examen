// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let currentSlide = 0;
    const slides = document.querySelectorAll('.gallery-slide');
    const planets = document.querySelectorAll('.planet');
    const planetInfo = document.getElementById('planetInfo');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Datos de los planetas
    const planetData = {
        mercury: {
            name: "Mercurio",
            description: "El planeta más pequeño de nuestro sistema solar y el más cercano al Sol. Su superficie está llena de cráteres y tiene temperaturas extremas que varían desde -173°C por la noche hasta 427°C durante el día.",
            distance: "57.9 millones km del Sol",
            diameter: "4,880 km",
            moons: 0
        },
        venus: {
            name: "Venus",
            description: "El segundo planeta desde el Sol y el más caliente del sistema solar debido a su densa atmósfera de dióxido de carbono que crea un efecto invernadero extremo.",
            distance: "108.2 millones km del Sol",
            diameter: "12,104 km",
            moons: 0
        },
        earth: {
            name: "Tierra",
            description: "Nuestro hogar. El único planeta conocido con vida. Tiene una superficie compuesta aproximadamente por 70% agua y una atmósfera rica en nitrógeno y oxígeno.",
            distance: "149.6 millones km del Sol",
            diameter: "12,742 km",
            moons: 1
        },
        mars: {
            name: "Marte",
            description: "Conocido como el 'Planeta Rojo' debido al óxido de hierro en su superficie. Tiene las montañas más altas y los valles más profundos del sistema solar.",
            distance: "227.9 millones km del Sol",
            diameter: "6,779 km",
            moons: 2
        },
        jupiter: {
            name: "Júpiter",
            description: "El planeta más grande del sistema solar, un gigante gaseoso con una famosa tormenta llamada la Gran Mancha Roja que lleva siglos activa.",
            distance: "778.5 millones km del Sol",
            diameter: "139,820 km",
            moons: 79
        },
        saturn: {
            name: "Saturno",
            description: "Conocido por sus espectaculares anillos compuestos principalmente de partículas de hielo y roca. Es el segundo planeta más grande del sistema solar.",
            distance: "1.43 billones km del Sol",
            diameter: "116,460 km",
            moons: 82
        },
        uranus: {
            name: "Urano",
            description: "Un gigante de hielo que gira sobre su lado, con un eje de rotación inclinado casi 98 grados. Tiene un color azul verdoso debido al metano en su atmósfera.",
            distance: "2.87 billones km del Sol",
            diameter: "50,724 km",
            moons: 27
        },
        neptune: {
            name: "Neptuno",
            description: "El planeta más ventoso del sistema solar, con vientos que pueden alcanzar los 2,100 km/h. Es el planeta más distante del Sol.",
            distance: "4.5 billones km del Sol",
            diameter: "49,244 km",
            moons: 14
        }
    };

    // Datos de las misiones
    const missionData = {
        apollo: {
            name: "Programa Apolo",
            years: "1961-1972",
            achievements: "6 alunizajes exitosos, 12 astronautas caminaron en la Luna",
            details: "El programa Apolo de la NASA fue diseñado para llevar humanos a la Luna y traerlos de vuelta a salvo a la Tierra. El Apolo 11 hizo historia el 20 de julio de 1969 cuando Neil Armstrong y Buzz Aldrin se convirtieron en los primeros humanos en caminar sobre la Luna."
        },
        voyager: {
            name: "Voyager 1 y 2",
            years: "Lanzadas en 1977",
            achievements: "Únicos objetos hechos por el hombre en el espacio interestelar",
            details: "Las sondas Voyager han explorado Júpiter, Saturno, Urano y Neptuno. Voyager 1 es el objeto humano más distante de la Tierra. Ambas llevan discos de oro con sonidos e imágenes de la vida en la Tierra."
        },
        mars: {
            name: "Misiones a Marte",
            years: "1960-presente",
            achievements: "Múltiples orbitadores, landers y rovers exitosos",
            details: "Desde el primer sobrevuelo exitoso por el Mariner 4 en 1965, numerosas misiones han explorado Marte. Los rovers como Spirit, Opportunity, Curiosity y Perseverance han revolucionado nuestro entendimiento del planeta rojo."
        },
        jameswebb: {
            name: "Telescopio Espacial James Webb",
            years: "Lanzado en 2021",
            achievements: "Telescopio más potente jamás lanzado",
            details: "El JWST observa el universo en infrarrojo, permitiéndole ver las primeras galaxias que se formaron después del Big Bang. Está ubicado en el punto L2 Lagrange, a 1.5 millones de km de la Tierra."
        }
    };

    // Función para mostrar información del planeta
    function showPlanetInfo(planet) {
        const data = planetData[planet];
        planetInfo.innerHTML = `
            <h3>${data.name}</h3>
            <p>${data.description}</p>
            <ul>
                <li><strong>Distancia al Sol:</strong> ${data.distance}</li>
                <li><strong>Diámetro:</strong> ${data.diameter}</li>
                <li><strong>Lunas:</strong> ${data.moons}</li>
            </ul>
        `;
    }

    // Función para mostrar información de la misión
    function showMissionInfo(mission) {
        const data = missionData[mission];
        Swal.fire({
            title: data.name,
            html: `
                <p><strong>Años:</strong> ${data.years}</p>
                <p><strong>Logros:</strong> ${data.achievements}</p>
                <p>${data.details}</p>
            `,
            icon: 'info',
            confirmButtonText: 'Cerrar',
            background: '#1e293b',
            color: '#e0e0e0'
        });
    }

    // Función para cambiar de slide en la galería
    function changeSlide(n) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Event Listeners

    // Menú móvil
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace (para móviles)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    });

    // Botón de exploración
    document.getElementById('exploreBtn').addEventListener('click', function() {
        document.getElementById('misiones').scrollIntoView({ behavior: 'smooth' });
    });

    // Planetas - mostrar información
    planets.forEach(planet => {
        planet.addEventListener('click', function() {
            const planetName = this.getAttribute('data-planet');
            showPlanetInfo(planetName);
        });
    });

    // Botones de información de misiones
    document.querySelectorAll('.info-button').forEach(button => {
        button.addEventListener('click', function() {
            const mission = this.getAttribute('data-mission');
            showMissionInfo(mission);
        });
    });

    // Controles de la galería
    document.getElementById('prevBtn').addEventListener('click', function() {
        changeSlide(currentSlide - 1);
    });

    document.getElementById('nextBtn').addEventListener('click', function() {
        changeSlide(currentSlide + 1);
    });

    // Formulario de contacto
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simular envío del formulario
        Swal.fire({
            title: '¡Mensaje enviado!',
            text: 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.',
            icon: 'success',
            confirmButtonText: 'OK',
            background: '#1e293b',
            color: '#e0e0e0'
        });
        
        this.reset();
    });

    // Efecto parallax para la sección hero
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // Inicializar el primer slide
    slides[0].classList.add('active');
    
    // Inicializar con información de la Tierra
    showPlanetInfo('earth');
});