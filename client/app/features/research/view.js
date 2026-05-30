const entityTypes = {
  research: 'Investigación',
  methodology: 'Metodología',
  observation: 'Observación',
  dataset: 'Dataset',
  cohort: 'Cohorte',
  teacher: 'Docente / investigador',
  intelligence: 'Inteligencia múltiple',
  skill: 'Habilidad cognitiva',
  hypothesis: 'Hipótesis',
  law: 'Normativa',
  service: 'Servicio de apoyo',
  bibliography: 'Bibliografía',
  framework: 'Marco conceptual',
};

const entities = [
  {
    id: 'r-inclusive-transfer',
    type: 'research',
    title: 'Transferencia de apoyos inclusivos a secuencias de lectura inferencial',
    subtitle: 'Estudio longitudinal sobre ajustes razonables, autonomía lectora y participación sostenida.',
    status: 'Revisión metodológica',
    updated: '2026-05-18',
    owner: 'Equipo de Inclusión y Lenguaje',
    tags: ['inclusión', 'lectura inferencial', 'ajustes razonables', 'participación', 'metacognición'],
    section: 'Papers',
    summary: 'Analiza cómo los apoyos explícitos, la anticipación de barreras y las pausas metacognitivas modifican la participación de estudiantes con necesidades de acceso diversas en tareas de lectura profunda.',
    hypothesis: 'Cuando los ajustes razonables se diseñan desde la planificación y no como reacción, aumenta la participación sostenida y mejora la transferencia de estrategias inferenciales.',
    methodology: 'Observación mixta · 3 cohortes · rúbrica de participación · entrevistas breves · revisión quincenal por pares internos.',
    evidence: ['42 observaciones codificadas', '18 producciones estudiantiles anotadas', '6 entrevistas familiares', '3 reuniones de equipo interdisciplinario'],
    versions: [
      ['v0.1', '2026-03-04', 'Pregunta inicial y matriz de observación'],
      ['v0.2', '2026-04-10', 'Incorpora normativa y bibliografía de inclusión'],
      ['v0.3', '2026-05-18', 'Ajusta indicadores de participación y autonomía'],
    ],
    citations: ['law-18651', 'law-salamanca', 'book-index-inclusion', 'method-universal-design', 'dataset-inclusive-reading'],
  },
  {
    id: 'r-metacognitive-pauses',
    type: 'research',
    title: 'Micro-pausas metacognitivas y persistencia en tareas abiertas',
    subtitle: 'Paper vivo sobre continuidad atencional, verbalización de estrategia y feedback docente.',
    status: 'Replicación activa',
    updated: '2026-05-07',
    owner: 'Laboratorio de Aprendizaje Profundo',
    tags: ['metacognición', 'autonomía', 'feedback', 'persistencia', 'planificación'],
    section: 'Papers',
    summary: 'Documenta la evolución de una intervención breve de verbalización estratégica antes de resolver tareas abiertas en matemática y ciencias.',
    hypothesis: 'Una pausa de 90 segundos para nombrar estrategia aumenta la persistencia sin elevar carga afectiva percibida.',
    methodology: 'Diseño A/B pedagógico · 4 cohortes · diario docente · rúbrica de autonomía · revisión semanal.',
    evidence: ['64 registros de aula', '4 secuencias didácticas versionadas', '12 notas docentes', '2 réplicas parciales'],
    versions: [
      ['v1.0', '2026-02-16', 'Protocolo inicial'],
      ['v1.1', '2026-03-22', 'Agrega feedback diferido'],
      ['v1.2', '2026-05-07', 'Cruce con persistencia y autonomía'],
    ],
    citations: ['method-metacognitive-pause', 'dataset-c24-autonomy', 'skill-self-regulation', 'teacher-silva'],
  },
  {
    id: 'method-universal-design',
    type: 'methodology',
    title: 'Diseño Universal para el Aprendizaje como protocolo institucional',
    subtitle: 'Marco operativo para anticipar barreras y documentar apoyos antes de la clase.',
    status: 'Estándar interno',
    updated: '2026-04-28',
    owner: 'Coordinación pedagógica',
    tags: ['dua', 'accesibilidad', 'ajustes razonables', 'planificación', 'participación'],
    section: 'Methodologies',
    summary: 'Convierte principios de accesibilidad en decisiones de planificación, evidencias verificables y criterios de revisión docente.',
    citations: ['law-crpd', 'law-salamanca', 'guide-teleton-accessibility', 'r-inclusive-transfer'],
  },
  {
    id: 'method-metacognitive-pause',
    type: 'methodology',
    title: 'Pausa metacognitiva de 90 segundos',
    subtitle: 'Microprotocolo para explicitar estrategia, dificultad anticipada y siguiente acción observable.',
    status: 'En validación',
    updated: '2026-05-09',
    owner: 'Laboratorio de Aprendizaje Profundo',
    tags: ['metacognición', 'autonomía', 'feedback', 'persistencia'],
    section: 'Methodologies',
    summary: 'Plantilla breve para orientar la continuidad cognitiva en tareas abiertas y registrar evidencia comparable.',
    citations: ['r-metacognitive-pauses', 'dataset-c24-autonomy', 'skill-self-regulation'],
  },
  {
    id: 'obs-reading-042',
    type: 'observation',
    title: 'Observación 042 · barreras de consigna en lectura inferencial',
    subtitle: 'Registro cualitativo con evidencia de accesibilidad cognitiva y participación.',
    status: 'Codificada',
    updated: '2026-05-20',
    owner: 'Aula 3 · Lenguaje',
    tags: ['observación', 'lectura inferencial', 'accesibilidad cognitiva', 'participación'],
    section: 'Observations',
    summary: 'La reformulación visual de consignas redujo solicitudes de aclaración y aumentó turnos de participación entre pares.',
    citations: ['r-inclusive-transfer', 'method-universal-design', 'dataset-inclusive-reading'],
  },
  {
    id: 'dataset-inclusive-reading',
    type: 'dataset',
    title: 'Dataset IR-24 · lectura, apoyos y participación',
    subtitle: 'Repositorio estructurado de observaciones, adaptaciones y evidencias de aula.',
    status: 'Abierto internamente',
    updated: '2026-05-21',
    owner: 'Archivo institucional',
    tags: ['dataset', 'inclusión', 'lectura inferencial', 'participación', 'cohorte 2024'],
    section: 'Datasets',
    summary: 'Conjunto curado para rastrear relaciones entre apoyos planificados, barreras observadas y resultados pedagógicos.',
    citations: ['r-inclusive-transfer', 'obs-reading-042', 'cohort-2024-a'],
  },
  {
    id: 'dataset-c24-autonomy',
    type: 'dataset',
    title: 'Dataset C-24 · autonomía y persistencia',
    subtitle: 'Evidencias longitudinales de resolución abierta, feedback docente y autorregulación.',
    status: 'Curaduría activa',
    updated: '2026-05-12',
    owner: 'Archivo institucional',
    tags: ['dataset', 'autonomía', 'persistencia', 'feedback', 'cohorte 2024'],
    section: 'Datasets',
    summary: 'Matriz institucional para comparar señales de autonomía y continuidad de tarea entre secuencias didácticas.',
    citations: ['r-metacognitive-pauses', 'method-metacognitive-pause', 'cohort-2024-a'],
  },
  {
    id: 'cohort-2024-a',
    type: 'cohort',
    title: 'Cohorte 2024-A · ciclo básico',
    subtitle: 'Grupo longitudinal vinculado a lectura inferencial, autonomía y apoyos inclusivos.',
    status: 'Seguimiento longitudinal',
    updated: '2026-05-16',
    owner: 'Coordinación académica',
    tags: ['cohorte 2024', 'lectura inferencial', 'autonomía', 'participación'],
    section: 'Longitudinal Analysis',
    summary: 'Unidad de análisis institucional que permite conectar metodologías, observaciones y resultados a través del tiempo.',
    citations: ['dataset-inclusive-reading', 'dataset-c24-autonomy', 'teacher-silva'],
  },
  {
    id: 'teacher-silva',
    type: 'teacher',
    title: 'Prof. Mariana Silva · investigación de aula',
    subtitle: 'Docente investigadora vinculada a feedback, lectura y diseño de evidencias.',
    status: 'Investigadora interna',
    updated: '2026-05-02',
    owner: 'Departamento académico',
    tags: ['docente investigador', 'feedback', 'lectura inferencial', 'metacognición'],
    section: 'Researchers',
    summary: 'Nodo institucional para rastrear aportes docentes, observaciones producidas y metodologías replicadas.',
    citations: ['r-metacognitive-pauses', 'cohort-2024-a', 'obs-reading-042'],
  },
  {
    id: 'skill-self-regulation',
    type: 'skill',
    title: 'Autorregulación y monitoreo de estrategia',
    subtitle: 'Habilidad cognitiva transversal conectada con metacognición, feedback y autonomía.',
    status: 'Mapa cognitivo',
    updated: '2026-04-18',
    owner: 'Cognitive Maps',
    tags: ['habilidad cognitiva', 'autorregulación', 'metacognición', 'autonomía'],
    section: 'Cognitive Maps',
    summary: 'Habilidad usada como conector para navegar papers, metodologías y evidencia longitudinal.',
    citations: ['r-metacognitive-pauses', 'method-metacognitive-pause', 'dataset-c24-autonomy'],
  },
  {
    id: 'int-interpersonal',
    type: 'intelligence',
    title: 'Inteligencia interpersonal y participación',
    subtitle: 'Categoría de navegación para interacciones, apoyo entre pares y prácticas inclusivas.',
    status: 'Mapa institucional',
    updated: '2026-04-02',
    owner: 'Cognitive Maps',
    tags: ['inteligencias múltiples', 'participación', 'colaboración', 'inclusión'],
    section: 'Cognitive Maps',
    summary: 'Permite seguir relaciones entre participación social, apoyos, observaciones y resultados pedagógicos.',
    citations: ['r-inclusive-transfer', 'obs-reading-042', 'method-universal-design'],
  },
  {
    id: 'law-constitution',
    type: 'law',
    title: 'Constitución Nacional · derecho a la educación',
    subtitle: 'Entidad normativa para conectar derechos, prácticas pedagógicas e inclusión.',
    status: 'Normativa nacional',
    updated: '2026-03-14',
    owner: 'Legal Frameworks',
    tags: ['normativa nacional', 'derechos humanos', 'educación', 'accesibilidad'],
    section: 'Inclusive Education',
    summary: 'Base jurídica para interpretar obligaciones institucionales vinculadas al acceso, permanencia y participación educativa.',
    articles: ['Derecho a la educación', 'Igualdad ante la ley', 'Protección de derechos fundamentales'],
    citations: ['law-18651', 'law-crpd', 'method-universal-design'],
    official: 'https://www.impo.com.uy/',
  },
  {
    id: 'law-18651',
    type: 'law',
    title: 'Ley 18.651 · Protección Integral de Personas con Discapacidad',
    subtitle: 'Marco nacional para accesibilidad, apoyos, participación y derechos.',
    status: 'Normativa nacional',
    updated: '2026-03-14',
    owner: 'Legal Frameworks',
    tags: ['ley 18.651', 'discapacidad', 'accesibilidad', 'derechos humanos', 'ajustes razonables'],
    section: 'Inclusive Education',
    summary: 'Ordena responsabilidades públicas e institucionales sobre inclusión, accesibilidad y equiparación de oportunidades.',
    articles: ['Accesibilidad', 'Educación inclusiva', 'Prestaciones y apoyos', 'Participación social'],
    citations: ['r-inclusive-transfer', 'service-personal-assistant', 'service-disability-registry', 'law-crpd'],
    official: 'https://www.impo.com.uy/',
  },
  {
    id: 'law-general-education',
    type: 'law',
    title: 'Ley General de Educación',
    subtitle: 'Marco pedagógico nacional para derecho a la educación, inclusión y trayectorias.',
    status: 'Normativa nacional',
    updated: '2026-03-14',
    owner: 'Legal Frameworks',
    tags: ['normativa nacional', 'educación', 'trayectorias', 'inclusión'],
    section: 'Inclusive Education',
    summary: 'Conecta principios educativos con planificación institucional, participación y continuidad de trayectorias.',
    articles: ['Derecho a la educación', 'Diversidad educativa', 'Continuidad de trayectorias'],
    citations: ['law-18651', 'method-universal-design', 'r-inclusive-transfer'],
    official: 'https://www.impo.com.uy/',
  },
  {
    id: 'law-decree-350-22',
    type: 'law',
    title: 'Decreto 350/22 · apoyos y prestaciones',
    subtitle: 'Referencia normativa para orientar solicitudes, documentación y accesos estatales.',
    status: 'Normativa nacional',
    updated: '2026-03-14',
    owner: 'Legal Frameworks',
    tags: ['decreto 350/22', 'prestaciones estatales', 'apoyos', 'discapacidad'],
    section: 'Inclusive Education',
    summary: 'Entidad de consulta para vincular prestaciones, documentación requerida y acompañamiento institucional.',
    articles: ['Apoyos', 'Procedimientos', 'Organismos responsables'],
    citations: ['service-ayex', 'service-personal-assistant', 'service-disability-registry'],
    official: 'https://www.impo.com.uy/',
  },
  {
    id: 'law-salamanca',
    type: 'law',
    title: 'Declaración de Salamanca',
    subtitle: 'Marco internacional sobre escuelas inclusivas, barreras y participación.',
    status: 'Normativa internacional',
    updated: '2026-03-16',
    owner: 'Legal Frameworks',
    tags: ['normativa internacional', 'inclusión', 'participación', 'barreras'],
    section: 'Inclusive Education',
    summary: 'Orienta la lectura institucional de inclusión como transformación de entornos, prácticas y culturas escolares.',
    articles: ['Escuelas para todos', 'Necesidades educativas especiales', 'Participación comunitaria'],
    citations: ['r-inclusive-transfer', 'book-index-inclusion', 'method-universal-design'],
    official: 'https://unesdoc.unesco.org/',
  },
  {
    id: 'law-incheon',
    type: 'law',
    title: 'Declaración de Incheon · Educación 2030',
    subtitle: 'Referencia internacional para educación inclusiva, equitativa y de calidad.',
    status: 'Normativa internacional',
    updated: '2026-03-16',
    owner: 'Legal Frameworks',
    tags: ['normativa internacional', 'educación 2030', 'equidad', 'calidad'],
    section: 'Inclusive Education',
    summary: 'Conecta metas de equidad y calidad educativa con indicadores institucionales de participación y acceso.',
    articles: ['Equidad', 'Calidad educativa', 'Aprendizaje a lo largo de la vida'],
    citations: ['law-crpd', 'r-inclusive-transfer', 'framework-human-rights'],
    official: 'https://unesdoc.unesco.org/',
  },
  {
    id: 'law-crpd',
    type: 'law',
    title: 'Convención sobre los Derechos de las Personas con Discapacidad',
    subtitle: 'Marco de derechos humanos para accesibilidad, ajustes razonables y participación plena.',
    status: 'Normativa internacional',
    updated: '2026-03-16',
    owner: 'Legal Frameworks',
    tags: ['derechos humanos', 'discapacidad', 'ajustes razonables', 'accesibilidad'],
    section: 'Inclusive Education',
    summary: 'Permite conectar obligaciones legales, prácticas pedagógicas y decisiones de accesibilidad documentadas.',
    articles: ['Educación inclusiva', 'Accesibilidad', 'Igual reconocimiento', 'Participación'],
    citations: ['law-18651', 'method-universal-design', 'framework-human-rights'],
    official: 'https://www.ohchr.org/',
  },
  {
    id: 'service-ayex',
    type: 'service',
    title: 'AYEX · ayudas extraordinarias',
    subtitle: 'Orientación institucional para familias sobre apoyos y documentación.',
    status: 'Servicio de apoyo',
    updated: '2026-04-06',
    owner: 'Servicios de Apoyo',
    tags: ['ayex', 'prestaciones estatales', 'apoyos', 'familias', 'accesos rápidos'],
    section: 'Inclusive Education',
    summary: 'Ficha de orientación para entender propósito, elegibilidad, requisitos y derivaciones oficiales.',
    purpose: 'Apoyar situaciones que requieren recursos o prestaciones extraordinarias vinculadas a discapacidad o necesidades de apoyo.',
    responsible: 'Organismo estatal competente según prestación y territorio.',
    eligibility: 'Familias o personas que acrediten situación, documentación y criterios definidos por el organismo responsable.',
    requirements: ['Documentación personal', 'Informes técnicos', 'Constancias educativas o de salud', 'Formulario del organismo'],
    citations: ['law-decree-350-22', 'law-18651', 'service-disability-registry'],
    official: 'https://www.gub.uy/',
  },
  {
    id: 'service-personal-assistant',
    type: 'service',
    title: 'Asistente Personal',
    subtitle: 'Prestación de apoyo para autonomía, participación y vida cotidiana.',
    status: 'Servicio de apoyo',
    updated: '2026-04-06',
    owner: 'Servicios de Apoyo',
    tags: ['asistente personal', 'autonomía', 'prestaciones estatales', 'discapacidad'],
    section: 'Inclusive Education',
    summary: 'Entidad navegable para orientar requisitos, documentación relacionada y conexiones pedagógicas con autonomía.',
    purpose: 'Favorecer autonomía y participación mediante apoyo personal en actividades definidas por la normativa vigente.',
    responsible: 'Sistema Nacional de Cuidados u organismo público correspondiente.',
    eligibility: 'Personas que cumplen criterios de dependencia, discapacidad y evaluación definidos oficialmente.',
    requirements: ['Documento de identidad', 'Registro o certificación de discapacidad', 'Evaluación de dependencia', 'Solicitud formal'],
    citations: ['law-18651', 'law-decree-350-22', 'skill-self-regulation'],
    official: 'https://www.gub.uy/',
  },
  {
    id: 'service-disability-pension',
    type: 'service',
    title: 'Pensión por Invalidez',
    subtitle: 'Ficha de orientación para acceso, requisitos y documentación institucional asociada.',
    status: 'Servicio de apoyo',
    updated: '2026-04-06',
    owner: 'Servicios de Apoyo',
    tags: ['pensión por invalidez', 'prestaciones estatales', 'discapacidad', 'familias'],
    section: 'Inclusive Education',
    summary: 'Organiza información útil para acompañar consultas familiares sin reemplazar la orientación oficial.',
    purpose: 'Prestación económica orientada a situaciones de invalidez conforme a criterios estatales.',
    responsible: 'Banco de Previsión Social u organismo competente.',
    eligibility: 'Personas que cumplan criterios médicos, administrativos y socioeconómicos establecidos oficialmente.',
    requirements: ['Documento de identidad', 'Historia clínica o informes', 'Evaluación médica', 'Declaraciones requeridas'],
    citations: ['law-18651', 'service-disability-registry'],
    official: 'https://www.bps.gub.uy/',
  },
  {
    id: 'service-cenatt',
    type: 'service',
    title: 'CENATT · orientación y apoyo técnico',
    subtitle: 'Nodo institucional para derivaciones, recursos técnicos y acompañamiento.',
    status: 'Servicio de apoyo',
    updated: '2026-04-06',
    owner: 'Servicios de Apoyo',
    tags: ['cenatt', 'apoyos', 'orientación', 'accesibilidad'],
    section: 'Inclusive Education',
    summary: 'Ficha para centralizar documentación, accesos rápidos y relaciones con recursos educativos.',
    purpose: 'Brindar orientación técnica o derivación según el servicio disponible y el caso.',
    responsible: 'Organismo responsable según programa vigente.',
    eligibility: 'Personas, familias o instituciones que requieren orientación técnica sobre apoyos.',
    requirements: ['Consulta inicial', 'Documentación del caso', 'Informes disponibles'],
    citations: ['guide-teleton-accessibility', 'service-ayex', 'law-18651'],
    official: 'https://www.gub.uy/',
  },
  {
    id: 'service-family-allowance',
    type: 'service',
    title: 'Asignación Familiar',
    subtitle: 'Recurso de orientación para prestaciones, trayectorias y documentación familiar.',
    status: 'Servicio de apoyo',
    updated: '2026-04-06',
    owner: 'Servicios de Apoyo',
    tags: ['asignación familiar', 'familias', 'prestaciones estatales', 'trayectorias'],
    section: 'Inclusive Education',
    summary: 'Organiza información de consulta para orientar a familias hacia canales oficiales.',
    purpose: 'Apoyo económico familiar según condiciones definidas por la política pública vigente.',
    responsible: 'Banco de Previsión Social u organismo competente.',
    eligibility: 'Familias con niñas, niños o adolescentes que cumplan requisitos establecidos.',
    requirements: ['Documento de identidad', 'Constancias educativas', 'Declaraciones solicitadas', 'Datos del núcleo familiar'],
    citations: ['law-general-education', 'service-disability-pension'],
    official: 'https://www.bps.gub.uy/',
  },
  {
    id: 'service-disability-registry',
    type: 'service',
    title: 'Registro Nacional de Personas con Discapacidad',
    subtitle: 'Entidad clave para documentación, certificación y acceso a prestaciones.',
    status: 'Servicio de apoyo',
    updated: '2026-04-06',
    owner: 'Servicios de Apoyo',
    tags: ['registro discapacidad', 'documentación', 'prestaciones estatales', 'accesibilidad'],
    section: 'Inclusive Education',
    summary: 'Punto de conexión entre normativa, servicios, documentación familiar y accesos oficiales.',
    purpose: 'Registrar y acreditar información vinculada a discapacidad según criterios públicos.',
    responsible: 'Organismo público competente.',
    eligibility: 'Personas con documentación e informes requeridos para evaluación o registro.',
    requirements: ['Documento de identidad', 'Informes técnicos', 'Certificados médicos', 'Solicitud oficial'],
    citations: ['law-18651', 'service-ayex', 'service-personal-assistant'],
    official: 'https://www.gub.uy/',
  },
  {
    id: 'book-index-inclusion',
    type: 'bibliography',
    title: 'Booth & Ainscow · Index for Inclusion',
    subtitle: 'Material bibliográfico para culturas, políticas y prácticas inclusivas.',
    status: 'Bibliografía anotada',
    updated: '2026-04-22',
    owner: 'Bibliographic Materials',
    tags: ['booth ainscow', 'bibliografía', 'inclusión', 'culturas inclusivas', 'prácticas pedagógicas'],
    section: 'Inclusive Education',
    summary: 'Recurso editorial anotado para conectar reflexión institucional con observaciones y metodología inclusiva.',
    authors: 'Tony Booth, Mel Ainscow',
    isbn: 'Material en ediciones y traducciones múltiples',
    markdown: '### Nota editorial\nEl material funciona como una herramienta para revisar **culturas**, **políticas** y **prácticas**. En este repositorio se usa para formular preguntas de observación y criterios de revisión institucional.\n\n- ¿Qué barreras aparecen antes de la clase?\n- ¿Qué apoyos se documentan?\n- ¿Cómo se evidencia la participación?',
    citations: ['law-salamanca', 'method-universal-design', 'r-inclusive-transfer'],
  },
  {
    id: 'guide-eurosocial',
    type: 'bibliography',
    title: 'EUROsociAL+ · guías de inclusión y cohesión social',
    subtitle: 'Material académico aplicado a políticas, accesibilidad y derechos.',
    status: 'Bibliografía anotada',
    updated: '2026-04-22',
    owner: 'Bibliographic Materials',
    tags: ['eurosocial', 'bibliografía', 'derechos humanos', 'políticas públicas', 'inclusión'],
    section: 'Inclusive Education',
    summary: 'Puente entre marcos de política pública y decisiones escolares documentables.',
    authors: 'EUROsociAL+',
    isbn: 'Publicaciones institucionales',
    markdown: '### Uso institucional\nSe consulta para contrastar prácticas escolares con marcos de cohesión social, accesibilidad y políticas públicas. Las notas se conectan con normativa y servicios de apoyo.',
    citations: ['framework-human-rights', 'law-incheon', 'service-ayex'],
  },
  {
    id: 'guide-teleton-accessibility',
    type: 'bibliography',
    title: 'Teletón Uruguay · materiales de accesibilidad',
    subtitle: 'Guías prácticas para apoyos, accesibilidad y orientación familiar.',
    status: 'Recurso educativo',
    updated: '2026-04-22',
    owner: 'Bibliographic Materials',
    tags: ['teletón uruguay', 'accesibilidad', 'recursos educativos', 'familias', 'apoyos'],
    section: 'Inclusive Education',
    summary: 'Material de consulta para traducir necesidades de acceso a decisiones pedagógicas y derivaciones claras.',
    authors: 'Teletón Uruguay',
    isbn: 'Material institucional',
    markdown: '### Criterios de lectura\nEste recurso se indexa por barrera, apoyo, edad, accesibilidad física, comunicación y participación. Cada nota debe vincularse con una práctica pedagógica observable.',
    citations: ['method-universal-design', 'service-cenatt', 'law-18651'],
  },
  {
    id: 'framework-human-rights',
    type: 'framework',
    title: 'Derechos Humanos, inclusión y participación educativa',
    subtitle: 'Marco conceptual que conecta legislación, prácticas y trazabilidad pedagógica.',
    status: 'Marco conceptual',
    updated: '2026-03-30',
    owner: 'Institutional Intelligence',
    tags: ['derechos humanos', 'participación', 'inclusión', 'accesibilidad', 'normativa internacional'],
    section: 'Inclusive Education',
    summary: 'Capa conceptual para navegar entre normativas, servicios, bibliografía e investigaciones institucionales.',
    citations: ['law-crpd', 'law-incheon', 'guide-eurosocial', 'r-inclusive-transfer'],
  },
];

const hubSections = [
  ['Papers', 'Investigaciones vivas, hipótesis y evidencia revisable.'],
  ['Research', 'Preguntas, hallazgos, líneas activas y peer review interno.'],
  ['Observations', 'Registros de aula, codificación y trazabilidad pedagógica.'],
  ['Methodologies', 'Protocolos versionados y decisiones didácticas replicables.'],
  ['Planning Systems', 'Secuencias, criterios docentes y diseño de evidencias.'],
  ['Institutional Intelligence', 'Síntesis, patrones y memoria operativa institucional.'],
  ['Inclusive Education', 'Normativa, servicios, bibliografía y prácticas inclusivas conectadas.'],
  ['Bibliographic Materials', 'Lectura anotada, citas internas y relaciones temáticas.'],
  ['Legal Frameworks', 'Normas navegables conectadas a prácticas pedagógicas.'],
  ['Datasets', 'Conjuntos de evidencia, cohortes y observaciones relacionadas.'],
  ['Cognitive Maps', 'Habilidades, inteligencias múltiples y relaciones de aprendizaje.'],
  ['Educational Analytics', 'Indicadores interpretables vinculados a evidencia concreta.'],
  ['Open Archive', 'Archivo editorial de materiales, versiones y decisiones.'],
  ['Longitudinal Analysis', 'Evolución de cohortes, metodologías y resultados.'],
  ['Pedagogical Experiments', 'Experimentos, réplicas y criterios de validez.'],
];

const inclusiveSections = [
  'Normativa Nacional',
  'Normativa Internacional',
  'Servicios de Apoyo y Prestaciones Estatales',
  'Material Bibliográfico',
  'Recursos Educativos',
  'Guías Pedagógicas',
  'Accesibilidad',
  'Derechos Humanos',
  'Inclusión y Participación',
];

const navItems = [
  ['knowledge-index', 'Índice'],
  ['research-archive', 'Archivo'],
  ['knowledge-graph', 'Grafo'],
  ['inclusive-education', 'Educación inclusiva'],
  ['research-reader', 'Lectura'],
];

const typeOrder = ['all', 'research', 'methodology', 'observation', 'dataset', 'cohort', 'teacher', 'intelligence', 'skill', 'law', 'service', 'bibliography', 'framework'];
const typeLabels = { all: 'Todo', ...entityTypes };
const selectedInitialId = 'r-inclusive-transfer';
const parseMarkdown = (text = '') => (window.marked?.parse ? window.marked.parse(text) : text.replace(/\n/g, '<br>'));
const byId = (id) => entities.find((entity) => entity.id === id);
const uniqueTags = [...new Set(entities.flatMap((entity) => entity.tags))].sort((a, b) => a.localeCompare(b, 'es'));

function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('es-UY', { day: '2-digit', month: 'short', year: 'numeric' });
}

function relationScore(a, b) {
  if (a.id === b.id) return 0;
  const sharedTags = a.tags.filter((tag) => b.tags.includes(tag)).length;
  const explicit = (a.citations || []).includes(b.id) || (b.citations || []).includes(a.id) ? 4 : 0;
  return sharedTags + explicit;
}

function relatedEntities(entity, limit = 8) {
  return entities
    .map((candidate) => ({ ...candidate, relationScore: relationScore(entity, candidate) }))
    .filter((candidate) => candidate.relationScore > 0)
    .sort((a, b) => b.relationScore - a.relationScore || a.title.localeCompare(b.title, 'es'))
    .slice(0, limit);
}

function graphEdges(scope = entities) {
  const scopedIds = new Set(scope.map((entity) => entity.id));
  const edges = [];
  scope.forEach((source) => {
    relatedEntities(source, 6).forEach((target) => {
      if (!scopedIds.has(target.id)) return;
      const key = [source.id, target.id].sort().join('|');
      if (edges.some((edge) => edge.key === key)) return;
      edges.push({ key, source, target, shared: source.tags.filter((tag) => target.tags.includes(tag)) });
    });
  });
  return edges.sort((a, b) => b.shared.length - a.shared.length).slice(0, 18);
}

export class ResearchView {
  constructor() {
    this.content = document.getElementById('content');
    this.activeTag = 'all';
    this.activeType = 'all';
    this.activeSection = 'all';
    this.query = '';
    this.selectedId = selectedInitialId;
  }

  render() {
    this.content.innerHTML = `
      <main class="research-page" aria-labelledby="research-title">
        <nav class="research-system-header" aria-label="Navegación del repositorio de investigación">
          ${navItems.map(([id, label]) => `<a href="#${id}" data-research-jump="${id}">${label}</a>`).join('')}
        </nav>

        <section class="research-hero" aria-labelledby="research-title">
          <div class="research-hero-copy">
            <span class="research-kicker">Infraestructura institucional de conocimiento</span>
            <h1 id="research-title">Ecosistema de Investigación Educativa Continua</h1>
            <p>La escuela no solo enseña. Produce, conecta y versiona conocimiento sobre cómo aprenden las personas.</p>
          </div>
          <aside class="research-hero-index" aria-label="Resumen del sistema">
            <a href="#research-archive" data-filter-type="research"><strong>${entities.filter((entity) => entity.type === 'research').length}</strong><span>papers vivos</span></a>
            <a href="#knowledge-graph"><strong>${graphEdges().length}</strong><span>relaciones semánticas</span></a>
            <a href="#inclusive-education" data-filter-section="Inclusive Education"><strong>${entities.filter((entity) => entity.section === 'Inclusive Education').length}</strong><span>recursos de inclusión</span></a>
          </aside>
        </section>

        <section class="research-index" id="knowledge-index" aria-labelledby="knowledge-index-title">
          <div class="research-section-header">
            <div>
              <span class="research-kicker">Arquitectura de información</span>
              <h2 id="knowledge-index-title">Sub-vistas especializadas interconectadas</h2>
            </div>
            <p>El repositorio se organiza como una biblioteca viva: cada sub-vista comparte entidades, tags, citas internas y relaciones de evidencia.</p>
          </div>
          <div class="research-hub-grid">
            ${hubSections.map(([title, desc]) => `
              <button class="research-hub-card" type="button" data-filter-section="${title}">
                <span>${title}</span>
                <small>${desc}</small>
              </button>
            `).join('')}
          </div>
        </section>

        <section class="research-archive" id="research-archive" aria-labelledby="archive-title">
          <div class="research-section-header">
            <div>
              <span class="research-kicker">Repositorio navegable</span>
              <h2 id="archive-title">Descubrimiento, filtros y trazabilidad</h2>
            </div>
            <p>Buscar por hipótesis, normativa, docente, cohorte, dataset, habilidad cognitiva o relación conceptual.</p>
          </div>

          <form class="research-controls" role="search" aria-label="Búsqueda contextual del repositorio">
            <label class="research-search">
              <span>Buscar</span>
              <input id="research-query" type="search" autocomplete="off" placeholder="Ej. Salamanca, metacognición, AYEX, cohorte 2024…" />
            </label>
            <label class="research-select">
              <span>Tipo de entidad</span>
              <select id="research-type">
                ${typeOrder.map((type) => `<option value="${type}">${typeLabels[type]}</option>`).join('')}
              </select>
            </label>
            <label class="research-select">
              <span>Sub-vista</span>
              <select id="research-section">
                <option value="all">Todas</option>
                ${hubSections.map(([title]) => `<option value="${title}">${title}</option>`).join('')}
              </select>
            </label>
          </form>

          <div class="research-tag-rail" role="group" aria-label="Tags semánticos">
            <button class="is-active" type="button" data-filter-tag="all">Todos los tags</button>
            ${uniqueTags.map((tag) => `<button type="button" data-filter-tag="${tag}">${tag}</button>`).join('')}
          </div>

          <p class="research-results-count" id="research-results-count" aria-live="polite"></p>
          <div class="research-results" id="research-results"></div>
        </section>

        <section class="research-graph-section" id="knowledge-graph" aria-labelledby="graph-title">
          <div class="research-section-header">
            <div>
              <span class="research-kicker">Knowledge graph real</span>
              <h2 id="graph-title">Mapa epistemológico navegable</h2>
            </div>
            <p>Cada nodo representa una entidad del repositorio. Las conexiones se calculan por citas internas explícitas y tags compartidos.</p>
          </div>
          <div class="research-graph-layout">
            <div class="research-node-list" id="research-node-list" aria-label="Nodos del grafo"></div>
            <div class="research-edge-list" aria-labelledby="edge-title">
              <h3 id="edge-title">Relaciones detectadas</h3>
              <div id="research-edge-list"></div>
            </div>
            <aside class="research-entity-panel" id="research-entity-panel" aria-live="polite"></aside>
          </div>
        </section>

        <section class="research-inclusive" id="inclusive-education" aria-labelledby="inclusive-title">
          <div class="research-section-header">
            <div>
              <span class="research-kicker">Sub-vista especializada</span>
              <h2 id="inclusive-title">Educación Inclusiva como biblioteca jurídica viva</h2>
            </div>
            <p>Normativa, prestaciones estatales, bibliografía y recursos pedagógicos conectados con investigaciones y observaciones.</p>
          </div>
          <div class="inclusive-sections" aria-label="Secciones de educación inclusiva">
            ${inclusiveSections.map((section) => `<button type="button" data-inclusive-section="${section}">${section}</button>`).join('')}
          </div>
          <div class="inclusive-grid" id="inclusive-grid"></div>
        </section>

        <section class="research-reader" id="research-reader" aria-labelledby="reader-title">
          <div class="research-section-header">
            <div>
              <span class="research-kicker">Experiencia de lectura</span>
              <h2 id="reader-title">Paper interactivo, versionado y citable</h2>
            </div>
            <p>Lectura larga con hipótesis, metodología, evidencia, timeline, datasets, normativa y bibliografía relacionada.</p>
          </div>
          <div class="research-reader-shell" id="research-reader-shell"></div>
        </section>
      </main>
    `;

    this.updateResults();
    this.updateGraph();
    this.updateInclusive();
    this.updateReader();
  }

  bindInteractions() {
    this.content.querySelectorAll('[data-research-jump]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        this.content.querySelector(`#${link.dataset.researchJump}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    this.content.querySelector('#research-query')?.addEventListener('input', (event) => {
      this.query = event.target.value.trim().toLowerCase();
      this.updateResults();
      this.updateGraph();
    });

    this.content.querySelector('#research-type')?.addEventListener('change', (event) => {
      this.activeType = event.target.value;
      this.updateResults();
      this.updateGraph();
    });

    this.content.querySelector('#research-section')?.addEventListener('change', (event) => {
      this.activeSection = event.target.value;
      this.updateResults();
      this.updateGraph();
    });

    this.content.querySelectorAll('[data-filter-tag]').forEach((button) => {
      button.addEventListener('click', () => {
        this.activeTag = button.dataset.filterTag;
        this.content.querySelectorAll('[data-filter-tag]').forEach((item) => item.classList.toggle('is-active', item === button));
        this.updateResults();
        this.updateGraph();
      });
    });

    this.content.querySelectorAll('[data-filter-type]').forEach((button) => {
      button.addEventListener('click', () => {
        this.activeType = button.dataset.filterType;
        const select = this.content.querySelector('#research-type');
        if (select) select.value = this.activeType;
        this.updateResults();
        this.updateGraph();
      });
    });

    this.content.querySelectorAll('[data-filter-section]').forEach((button) => {
      button.addEventListener('click', () => {
        this.activeSection = button.dataset.filterSection;
        const select = this.content.querySelector('#research-section');
        if (select) select.value = this.activeSection;
        this.updateResults();
        this.updateGraph();
      });
    });

    this.content.querySelectorAll('[data-inclusive-section]').forEach((button) => {
      button.addEventListener('click', () => {
        const query = button.dataset.inclusiveSection.toLowerCase();
        const input = this.content.querySelector('#research-query');
        this.activeSection = 'Inclusive Education';
        this.query = query.includes('normativa nacional') ? 'normativa nacional' : query.includes('normativa internacional') ? 'normativa internacional' : query.includes('servicios') ? 'servicio de apoyo' : query.includes('bibliográfico') ? 'bibliografía' : query;
        if (input) input.value = this.query;
        const select = this.content.querySelector('#research-section');
        if (select) select.value = this.activeSection;
        this.updateResults();
        this.updateGraph();
        this.content.querySelector('#research-archive')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  filteredEntities() {
    return entities.filter((entity) => {
      const haystack = [entity.title, entity.subtitle, entity.summary, entity.status, entity.owner, entity.section, entity.hypothesis, entity.methodology, ...(entity.tags || []), ...(entity.articles || []), ...(entity.requirements || [])].join(' ').toLowerCase();
      const matchesQuery = !this.query || haystack.includes(this.query);
      const matchesType = this.activeType === 'all' || entity.type === this.activeType;
      const matchesSection = this.activeSection === 'all' || entity.section === this.activeSection;
      const matchesTag = this.activeTag === 'all' || entity.tags.includes(this.activeTag);
      return matchesQuery && matchesType && matchesSection && matchesTag;
    });
  }

  updateResults() {
    const results = this.filteredEntities();
    const count = this.content.querySelector('#research-results-count');
    const container = this.content.querySelector('#research-results');
    if (!container) return;
    if (count) count.textContent = `${results.length} entidad${results.length === 1 ? '' : 'es'} en la vista actual`;
    container.innerHTML = results.length ? results.map((entity) => this.renderEntityCard(entity)).join('') : '<div class="research-empty">No se encontraron entidades. Ajustá búsqueda, tags o sub-vista.</div>';
    container.querySelectorAll('[data-open-entity]').forEach((button) => {
      button.addEventListener('click', () => this.openEntity(button.dataset.openEntity));
    });
  }

  updateGraph() {
    const scoped = this.filteredEntities().slice(0, 18);
    const nodes = this.content.querySelector('#research-node-list');
    const edges = this.content.querySelector('#research-edge-list');
    if (!nodes || !edges) return;
    nodes.innerHTML = scoped.map((entity) => `
      <button class="research-node" type="button" data-open-entity="${entity.id}">
        <span>${entityTypes[entity.type]}</span>
        <strong>${entity.title}</strong>
        <small>${entity.tags.slice(0, 3).join(' · ')}</small>
      </button>
    `).join('');
    const scopedEdges = graphEdges(scoped);
    edges.innerHTML = scopedEdges.length ? scopedEdges.map(({ source, target, shared }) => `
      <button class="research-edge" type="button" data-open-entity="${source.id}">
        <span>${source.title}</span>
        <em>↔ ${target.title}</em>
        <small>${shared.length ? shared.join(' · ') : 'cita interna explícita'}</small>
      </button>
    `).join('') : '<p class="research-empty">No hay relaciones suficientes con los filtros actuales.</p>';
    [...nodes.querySelectorAll('[data-open-entity]'), ...edges.querySelectorAll('[data-open-entity]')].forEach((button) => {
      button.addEventListener('click', () => this.openEntity(button.dataset.openEntity));
    });
    this.renderEntityPanel(byId(this.selectedId) || scoped[0] || entities[0]);
  }

  updateInclusive() {
    const container = this.content.querySelector('#inclusive-grid');
    if (!container) return;
    const inclusive = entities.filter((entity) => entity.section === 'Inclusive Education');
    container.innerHTML = inclusive.map((entity) => this.renderInclusiveCard(entity)).join('');
    container.querySelectorAll('[data-open-entity]').forEach((button) => {
      button.addEventListener('click', () => this.openEntity(button.dataset.openEntity));
    });
  }

  updateReader() {
    const shell = this.content.querySelector('#research-reader-shell');
    const selected = byId(this.selectedId) || byId(selectedInitialId);
    if (!shell || !selected) return;
    const related = relatedEntities(selected, 10);
    shell.innerHTML = `
      <aside class="reader-rail" aria-label="Metadatos del documento">
        <span>${entityTypes[selected.type]}</span>
        <strong>${selected.status}</strong>
        <small>Actualizado ${formatDate(selected.updated)}</small>
        <small>${selected.owner}</small>
        <div>${selected.tags.map((tag) => `<button type="button" data-filter-tag-reader="${tag}">${tag}</button>`).join('')}</div>
      </aside>
      <article class="reader-document">
        <header>
          <p class="research-kicker">${selected.id}</p>
          <h3>${selected.title}</h3>
          <p>${selected.subtitle}</p>
        </header>
        <section>
          <h4>Resumen contextual</h4>
          <p>${selected.summary}</p>
        </section>
        ${selected.hypothesis ? `<section><h4>Hipótesis</h4><p>${selected.hypothesis}</p></section>` : ''}
        ${selected.methodology ? `<section><h4>Metodología</h4><p>${selected.methodology}</p></section>` : ''}
        ${selected.evidence ? `<section><h4>Evidencia y datasets</h4><ul>${selected.evidence.map((item) => `<li>${item}</li>`).join('')}</ul></section>` : ''}
        ${selected.articles ? `<section><h4>Artículos / ejes relevantes</h4><ul>${selected.articles.map((item) => `<li>${item}</li>`).join('')}</ul></section>` : ''}
        ${selected.requirements ? `<section><h4>Requisitos orientativos</h4><ul>${selected.requirements.map((item) => `<li>${item}</li>`).join('')}</ul></section>` : ''}
        ${selected.purpose ? `<section><h4>Propósito y elegibilidad</h4><p>${selected.purpose}</p><p><strong>Organismo:</strong> ${selected.responsible}</p><p><strong>Elegibilidad:</strong> ${selected.eligibility}</p></section>` : ''}
        ${selected.authors ? `<section><h4>Ficha bibliográfica</h4><p><strong>Autores:</strong> ${selected.authors}</p><p><strong>ISBN / referencia:</strong> ${selected.isbn}</p></section>` : ''}
        ${selected.markdown ? `<section class="reader-markdown"><h4>Lectura enriquecida</h4>${parseMarkdown(selected.markdown)}</section>` : ''}
        ${selected.versions ? `<section><h4>Timeline de evolución</h4><ol class="reader-timeline">${selected.versions.map(([version, date, note]) => `<li><time>${formatDate(date)}</time><strong>${version}</strong><span>${note}</span></li>`).join('')}</ol></section>` : ''}
        <section>
          <h4>Referencias cruzadas y citación interna</h4>
          <div class="reader-relations">
            ${related.map((entity) => `<button type="button" data-open-entity="${entity.id}"><span>${entityTypes[entity.type]}</span><strong>${entity.title}</strong><small>${entity.tags.filter((tag) => selected.tags.includes(tag)).join(' · ') || 'cita interna'}</small></button>`).join('')}
          </div>
        </section>
        ${selected.official ? `<a class="reader-official" href="${selected.official}" target="_blank" rel="noopener noreferrer">Abrir referencia oficial</a>` : ''}
      </article>
    `;
    shell.querySelectorAll('[data-open-entity]').forEach((button) => {
      button.addEventListener('click', () => this.openEntity(button.dataset.openEntity));
    });
    shell.querySelectorAll('[data-filter-tag-reader]').forEach((button) => {
      button.addEventListener('click', () => {
        this.activeTag = button.dataset.filterTagReader;
        this.content.querySelectorAll('[data-filter-tag]').forEach((item) => item.classList.toggle('is-active', item.dataset.filterTag === this.activeTag));
        this.updateResults();
        this.updateGraph();
      });
    });
  }

  openEntity(id) {
    this.selectedId = id;
    const entity = byId(id);
    if (!entity) return;
    this.renderEntityPanel(entity);
    this.updateReader();
    this.content.querySelector('#research-reader')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  renderEntityPanel(entity) {
    const panel = this.content.querySelector('#research-entity-panel');
    if (!panel || !entity) return;
    const related = relatedEntities(entity, 6);
    panel.innerHTML = `
      <span class="research-kicker">Entidad seleccionada</span>
      <h3>${entity.title}</h3>
      <p>${entity.summary}</p>
      <dl>
        <div><dt>Tipo</dt><dd>${entityTypes[entity.type]}</dd></div>
        <div><dt>Estado</dt><dd>${entity.status}</dd></div>
        <div><dt>Responsable</dt><dd>${entity.owner}</dd></div>
        <div><dt>Actualización</dt><dd>${formatDate(entity.updated)}</dd></div>
      </dl>
      <div class="panel-tags">${entity.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
      <h4>Conexiones próximas</h4>
      ${related.map((item) => `<button type="button" data-open-entity="${item.id}">${item.title}<small>${entity.tags.filter((tag) => item.tags.includes(tag)).join(' · ') || 'cita interna'}</small></button>`).join('')}
    `;
    panel.querySelectorAll('[data-open-entity]').forEach((button) => {
      button.addEventListener('click', () => this.openEntity(button.dataset.openEntity));
    });
  }

  renderEntityCard(entity) {
    const related = relatedEntities(entity, 4);
    return `
      <article class="research-entity-card">
        <div class="entity-meta">
          <span>${entityTypes[entity.type]}</span>
          <time>${formatDate(entity.updated)}</time>
        </div>
        <h3>${entity.title}</h3>
        <p>${entity.summary}</p>
        <dl>
          <div><dt>Estado</dt><dd>${entity.status}</dd></div>
          <div><dt>Responsable</dt><dd>${entity.owner}</dd></div>
          <div><dt>Sub-vista</dt><dd>${entity.section}</dd></div>
        </dl>
        <div class="entity-tags">${entity.tags.slice(0, 6).map((tag) => `<span>${tag}</span>`).join('')}</div>
        <div class="entity-relations" aria-label="Relaciones principales">
          ${related.map((item) => `<button type="button" data-open-entity="${item.id}">${item.title}</button>`).join('')}
        </div>
        <button class="entity-open" type="button" data-open-entity="${entity.id}">Abrir lectura y trazabilidad</button>
      </article>
    `;
  }

  renderInclusiveCard(entity) {
    const details = entity.type === 'law' ? (entity.articles || []).slice(0, 3) : entity.type === 'service' ? (entity.requirements || []).slice(0, 3) : entity.authors ? [entity.authors, entity.isbn] : entity.tags.slice(0, 3);
    return `
      <article class="inclusive-card">
        <span>${entityTypes[entity.type]}</span>
        <h3>${entity.title}</h3>
        <p>${entity.summary}</p>
        <ul>${details.map((item) => `<li>${item}</li>`).join('')}</ul>
        <button type="button" data-open-entity="${entity.id}">Explorar entidad conectada</button>
      </article>
    `;
  }
}
