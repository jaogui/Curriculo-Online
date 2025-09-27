const { useState, useEffect, useCallback } = React;

const personalInfo = {
  name: "João Guilherme Faber",
  titles: ["Programador", "Cientista da Computação", "Entusiasta de Tecnologia"],
  about: "Olá! Sou João, estudante de Ciência da Computação na FEI, com grande interesse em tecnologia, desenvolvimento de software e resolução de problemas. Estou em busca de oportunidades para aplicar meus conhecimentos acadêmicos em projetos práticos e contribuir com dedicação e proatividade.",
  githubUrl: "https://github.com/jaogui",
  details: [
    { title: "Idade", value: "20" },
    { title: "Localização", value: "Jundiaí, SP" },
    { title: "E-mail", value: <a href="mailto:joaog.faber@gmail.com">joaog.faber@gmail.com</a> },
    { title: "LinkedIn", value: <a href="https://www.linkedin.com/in/jo%C3%A3o-guilherme-faber-80b485332" target="_blank" rel="noopener">João Faber</a> },
  ]
};

const resumeData = {
  education: [
     {
      title: "Participação na RoboFEI - @HOME",
      period: "2025 - Cursando",
      institution: "FEI",
      description: "Responsável por auxiliar na programação de robôs de serviço autônomos para tarefas domésticas, dentro do projeto de extensão da faculdade.",
    },
    {
      title: "Graduação em Ciência da Computação",
      period: "Previsão de término: 2027",
      institution: "FEI",
      description: "Aprendizado amplo no ramo da computação e diversas linguagens de programação, além do desenvolvimento do pensamento lógico e matemático.",
    },
    {
      title: "ILAC Intercâmbio",
      period: "2021/2022",
      institution: "ILAC Toronto, Canadá",
      description: "Curso de 3 meses com foco na proficiência da língua inglesa, atingindo o nível avançado.",
      image: "imagens/ILAC.PNG",
    },
    {
      title: "Curso de Excel Básico",
      period: "2024",
      institution: "Senai",
      description: "Curso com duração de 20 horas sobre os fundamentos do Excel.",
      image: "imagens/Excel_Basico.jpg",
    },
  ],
  hardSkills: ["Python", "HTML5", "CSS3", "JavaScript", "React", "SQL", "C", "Git", "GitHub","Java", "Linux", "ROS2"],
  languages: [
    { lang: "Português", level: "Nativo" },
    { lang: "Inglês", level: "Avançado (Certificado ILAC)" },
    { lang: "Espanhol", level: "Básico" },
  ],
  softSkills: [
    { title: "Autodidata & Curioso", description: "Facilidade em aprender por conta própria, impulsionado pela curiosidade de buscar constantemente novos conhecimentos." },
    { title: "Focado & Produtivo", description: "Quando me comprometo com uma atividade, me dedico ao máximo, o que reflete na minha produtividade e qualidade de entrega." },
    { title: "Organizado & Estruturado", description: "Priorizo a escrita de códigos limpos e legíveis, facilitando a manutenção e o trabalho em equipe." },
    { title: "Boa Comunicação", description: "Clareza e objetividade na comunicação para alinhar expectativas e resolver problemas de forma eficiente." },
  ]
};

const useTypingEffect = (words, typingSpeed = 150, delay = 1000) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[wordIndex];
    if (text !== currentWord) {
      const timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setText('');
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [text, words, wordIndex, typingSpeed, delay]);

  return text;
};

// ===================================================================
// COMPONENTES MENORES E REUTILIZÁVEIS
// ===================================================================

const AnimatedItem = ({ children, delay }) => (
  <div className="fade-in-up" style={{ animationDelay: delay }}>
    {children}
  </div>
);

const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    <h4 className="item-title">{data.title}</h4>
    <span className="item-period">{data.period}</span>
    <span className="item-small">{data.institution}</span>
    <p className="item-description">{data.description}</p>
    {data.image && <img src={data.image} alt={`Certificado de ${data.title}`} className="course-image" />}
  </div>
);

// ===================================================================
// COMPONENTES DE PÁGINA (Início e Currículo)
// ===================================================================

const HomePage = () => {
  const typedTitle = useTypingEffect(personalInfo.titles);

  return (
    <div className="section-inner">
      <div className="page-header">
        <div className="row">
          <AnimatedItem delay="0.1s">
            <div className="col col-half">
              <div className="photo">
                <img src="imagens/perfil.jpg" alt={`Foto de perfil de ${personalInfo.name}`} />
              </div>
            </div>
          </AnimatedItem>
          <AnimatedItem delay="0.2s">
            <div className="col col-half">
              <div className="title-block">
                <h1>{personalInfo.name}</h1>
                <div className="sp-subtitle">{typedTitle}</div>
              </div>
            </div>
          </AnimatedItem>
        </div>
      </div>

      <div className="page-content">
        <div className="row">
          <div className="col col-half">
            <AnimatedItem delay="0.3s">
              <div className="about-me">
                <div className="block-title"><h3>Quem <span>Sou?</span></h3></div>
                <p>{personalInfo.about}</p>
              </div>
              <div className="download-resume">
                <a href={personalInfo.githubUrl} rel="noopener" target="_blank" className="btn">Ver meu Github</a>
              </div>
            </AnimatedItem>
          </div>
          <div className="col col-half">
            <AnimatedItem delay="0.4s">
              <ul className="info-list">
                {personalInfo.details.map((item, index) => (
                  <li key={index}><span className="title">{item.title}</span><span className="value">{item.value}</span></li>
                ))}
              </ul>
            </AnimatedItem>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResumePage = () => {
  return (
    <div className="section-inner">
      <AnimatedItem delay="0.1s">
        <div className="page-header"><h2>Currículo</h2></div>
      </AnimatedItem>
      <div className="page-content">
        <div className="row">
          <div className="col col-half">
            <AnimatedItem delay="0.2s">
              <div className="block">
                <div className="block-title"><h3>Educação & Experiências</h3></div>
                <div className="timeline">
                  {resumeData.education.map((edu, index) => <TimelineItem key={index} data={edu} />)}
                </div>
              </div>
            </AnimatedItem>
          </div>
          <div className="col col-half">
            <AnimatedItem delay="0.3s">
              <div className="block">
                <div className="block-title"><h3>Hard <span>Skills</span></h3></div>
                <div className="skills-tags">
                  {resumeData.hardSkills.map(skill => <span key={skill}>{skill}</span>)}
                </div>
              </div>
            </AnimatedItem>
            <AnimatedItem delay="0.4s">
              <div className="block">
                <div className="block-title"><h3>Idiomas</h3></div>
                <div className="skills-info">
                  {resumeData.languages.map((lang, index) => (
                    <p key={index}><strong>{lang.lang}:</strong> {lang.level}</p>
                  ))}
                </div>
              </div>
            </AnimatedItem>
          </div>
        </div>
        <div className="row">
          <div className="col col-full">
            <AnimatedItem delay="0.5s">
              <div className="block">
                <div className="block-title"><h3>Soft <span>Skills</span></h3></div>
                <div className="row">
                  {resumeData.softSkills.map((skill, index) => (
                    <div className="col col-half soft-skill-card" key={index}>
                      <h4>{skill.title}</h4>
                      <p>{skill.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedItem>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===================================================================
// COMPONENTE PRINCIPAL (APP)
// Gerencia a navegação e as transições de página.
// ===================================================================

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isExiting, setIsExiting] = useState(false);

  // useCallback para evitar recriação da função em cada render
  const navigateTo = useCallback((page) => {
    if (page !== activePage) {
      setIsExiting(true);
      setTimeout(() => {
        setActivePage(page);
        setIsExiting(false);
      }, 300);
    }
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'resume':
        return <ResumePage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div id="page" className="page">
      <header id="site_header" className="header">
        <div className="header-content">
          <div className="site-title-block">
            <div className="site-title" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
              João <span>Faber</span>
            </div>
          </div>
          <nav className="site-nav">
            <ul id="nav" className="site-main-menu">
              <li>
                <a className={activePage === 'home' ? 'active' : ''} onClick={() => navigateTo('home')}>
                  Início
                </a>
              </li>
              <li>
                <a className={activePage === 'resume' ? 'active' : ''} onClick={() => navigateTo('resume')}>
                  Currículo
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main id="main" className="site-main">
        <div className={`page-container ${isExiting ? 'exiting' : ''}`}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

// Renderiza a aplicação
ReactDOM.render(<App />, document.getElementById('root'));