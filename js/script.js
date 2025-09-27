const { useState, useEffect, useCallback } = React;

// ===================================================================
// DADOS
// ===================================================================
const personalInfo = {
  name: "João Guilherme Faber",
  titles: ["Programador", "Cientista da Computação", "Entusiasta de Tecnologia"],
  about:
    "Olá! Sou João, estudante de Ciência da Computação na FEI, com grande interesse em tecnologia, desenvolvimento de software e resolução de problemas. Estou em busca de oportunidades para aplicar meus conhecimentos acadêmicos em projetos práticos e contribuir com dedicação e proatividade.",
  githubUrl: "https://github.com/jaogui",
  details: [
    { title: "Idade", value: "20" },
    { title: "Localização", value: "Jundiaí, SP" },
    {
      title: "E-mail",
      value: <a href="mailto:joaog.faber@gmail.com">joaog.faber@gmail.com</a>,
    },
    {
      title: "LinkedIn",
      value: (
        <a
          href="https://www.linkedin.com/in/jo%C3%A3o-guilherme-faber-80b485332"
          target="_blank"
          rel="noopener"
        >
          João Faber
        </a>
      ),
    },
  ],
};

const resumeData = {
  education: [
    {
      title: "Participação na RoboFEI - @HOME",
      period: "2025 - Cursando",
      institution: "FEI",
      description:
        "Auxílio na programação de robôs de serviço autônomos para tarefas domésticas no projeto de extensão da faculdade.",
    },
    {
      title: "Graduação em Ciência da Computação",
      period: "Previsão de término: 2027",
      institution: "FEI",
      description:
        "Aprendizado em diversas linguagens de programação, desenvolvimento de pensamento lógico e fundamentos de ciência da computação.",
    },
    {
      title: "ILAC Intercâmbio",
      period: "2021/2022",
      institution: "ILAC Toronto, Canadá",
      description:
        "Curso intensivo de 3 meses com foco na proficiência em inglês, atingindo o nível avançado.",
      image: "imagens/ILAC.PNG",
    },
    {
      title: "Curso de Excel Básico",
      period: "2024",
      institution: "Senai",
      description: "Curso de 20h sobre fundamentos de Excel.",
      image: "imagens/Excel_Basico.jpg",
    },
  ],
  hardSkills: [
    "Python",
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "SQL",
    "C",
    "Git",
    "GitHub",
    "Java",
    "Linux",
    "ROS2",
  ],
  languages: [
    { lang: "Português", level: "Nativo" },
    { lang: "Inglês", level: "Avançado (Certificado ILAC)" },
    { lang: "Espanhol", level: "Básico" },
  ],
  softSkills: [
    {
      title: "Autodidata & Curioso",
      description:
        "Facilidade em aprender por conta própria, buscando constantemente novos conhecimentos.",
    },
    {
      title: "Focado & Produtivo",
      description:
        "Alta dedicação às atividades, resultando em produtividade e entregas de qualidade.",
    },
    {
      title: "Organizado & Estruturado",
      description:
        "Priorizo a escrita de códigos limpos e legíveis, facilitando manutenção e colaboração.",
    },
    {
      title: "Boa Comunicação",
      description:
        "Clareza e objetividade ao alinhar expectativas e resolver problemas de forma eficiente.",
    },
  ],
};

// ===================================================================
// HOOK: efeito de digitação no título
// ===================================================================
const useTypingEffect = (words, speed = 120, delay = 1000) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const current = words[index];
    if (text !== current) {
      const timeout = setTimeout(() => {
        setText(current.substring(0, text.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setText("");
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [text, index, words, speed, delay]);

  return text;
};

// ===================================================================
// COMPONENTES
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
    {data.image && (
      <img
        src={data.image}
        alt={`Certificado de ${data.title}`}
        className="course-image"
      />
    )}
  </div>
);

const HomePage = () => {
  const typedTitle = useTypingEffect(personalInfo.titles);

  return (
    <div className="section-inner">
      <div className="page-header">
        <div className="row">
          <AnimatedItem delay="0.1s">
            <div className="col col-half">
              <div className="photo">
                <img src="imagens/perfil.jpg" alt="Foto de perfil" />
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
                <div className="block-title">
                  <h3>
                    Quem <span>Sou?</span>
                  </h3>
                </div>
                <p>{personalInfo.about}</p>
                <a href={personalInfo.githubUrl} className="btn" target="_blank">
                  Ver meu Github
                </a>
              </div>
            </AnimatedItem>
          </div>
          <div className="col col-half">
            <AnimatedItem delay="0.4s">
              <ul className="info-list">
                {personalInfo.details.map((item, idx) => (
                  <li key={idx}>
                    <span className="title">{item.title}:</span>{" "}
                    <span className="value">{item.value}</span>
                  </li>
                ))}
              </ul>
            </AnimatedItem>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResumePage = () => (
  <div className="section-inner">
    <AnimatedItem delay="0.1s">
      <div className="page-header">
        <h2>Currículo</h2>
      </div>
    </AnimatedItem>
    <div className="page-content">
      <div className="row">
        <div className="col col-half">
          <AnimatedItem delay="0.2s">
            <div className="block">
              <div className="block-title">
                <h3>Educação & Experiências</h3>
              </div>
              <div className="timeline">
                {resumeData.education.map((edu, i) => (
                  <TimelineItem key={i} data={edu} />
                ))}
              </div>
            </div>
          </AnimatedItem>
        </div>
        <div className="col col-half">
          <AnimatedItem delay="0.3s">
            <div className="block">
              <div className="block-title">
                <h3>
                  Hard <span>Skills</span>
                </h3>
              </div>
              <div className="skills-tags">
                {resumeData.hardSkills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </AnimatedItem>
          <AnimatedItem delay="0.4s">
            <div className="block">
              <div className="block-title">
                <h3>Idiomas</h3>
              </div>
              <div className="skills-info">
                {resumeData.languages.map((lang, i) => (
                  <p key={i}>
                    <strong>{lang.lang}:</strong> {lang.level}
                  </p>
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
              <div className="block-title">
                <h3>
                  Soft <span>Skills</span>
                </h3>
              </div>
              <div className="row">
                {resumeData.softSkills.map((skill, i) => (
                  <div className="col col-half soft-skill-card" key={i}>
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

const App = () => {
  const [page, setPage] = useState("home");
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.style.background = `
      radial-gradient(circle at 20% 30%, rgba(225, 0, 255, 0.05) 0%, transparent 60%),
      radial-gradient(circle at 80% 70%, rgba(127, 0, 255, 0.05) 0%, transparent 60%),
      var(--bg-dark)
    `;
  }, []);

  const navigateTo = useCallback(
    (p) => {
      if (p !== page) {
        setExiting(true);
        setTimeout(() => {
          setPage(p);
          setExiting(false);
        }, 300);
      }
    },
    [page]
  );

  return (
    <div id="page" className="page">
      <header className="site-header">
        <div className="site-title" onClick={() => navigateTo("home")}>
          João <span>Faber</span>
        </div>
        <nav className="site-nav">
          <ul className="site-main-menu">
            <li>
              <a
                className={page === "home" ? "active" : ""}
                onClick={() => navigateTo("home")}
              >
                Início
              </a>
            </li>
            <li>
              <a
                className={page === "resume" ? "active" : ""}
                onClick={() => navigateTo("resume")}
              >
                Currículo
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="site-main">
        <div className={`page-container ${exiting ? "exiting" : ""}`}>
          {page === "home" ? <HomePage /> : <ResumePage />}
        </div>
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
