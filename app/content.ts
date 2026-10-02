export type Lang = 'en' | 'es';
export type Mode = 'zero' | 'redesign' | 'reference';

export const INSTALL = 'npx skills add uxKero/kero-stack';
export const REPO = 'https://github.com/uxKero/kero-stack';

export type StepId = 'orchestrate' | 'research' | 'scope' | 'direct' | 'survey' | 'extract' | 'systematize' | 'build' | 'measure' | 'judge' | 'record';
export type Who = 'person' | 'agent';
export type Visual = 'method' | 'research' | 'scope' | 'system' | 'audit' | 'blind' | 'orchestrate' | 'any' | 'bad' | 'motion' | 'type' | 'search' | 'orca';

export type Scene = 'state' | 'size' | 'digits' | 'effect' | 'disabled' | 'info' | 'native' | 'generic' | 'ornament' | 'radius' | 'space' | 'scale' | 'shadow' | 'measure' | 'undo' | 'errors' | 'optical' | 'primary';

export type Card = { id: string; name: string; by: string; href: string; io: string; detail: string; install: string; visual: Visual; own: boolean };
export type Step = { name: string; who: Who; skills: string[]; out: string };

export const FLOWS: Record<Mode, StepId[]> = {
  zero: ['orchestrate', 'research', 'scope', 'direct', 'extract', 'systematize', 'build', 'measure', 'judge', 'record'],
  redesign: ['orchestrate', 'direct', 'survey', 'extract', 'systematize', 'build', 'measure', 'judge', 'record'],
  reference: ['orchestrate', 'direct', 'extract', 'systematize', 'build', 'measure', 'judge', 'record'],
};

export const SKILL_NAMES: Record<string, string> = {
  'kero-method': 'kero-method',
  'kero-research': 'kero-research',
  'kero-scope': 'kero-scope',
  'kero-system': 'kero-system',
  'kero-audit': 'kero-audit',
  'kero-blind': 'kero-blind',
  'kero-orchestrate': 'kero-orchestrate',
  anydesign: 'anydesign',
  badesign: 'BADESIGN',
  emil: 'emil',
  typebien: 'typebien',
  saga: 'SAGA',
  orca: 'Orca',
};

export const AUDIT_LINES = [
  { text: '/ @ 390x844', state: 'head' },
  { text: 'contrast 1 low of 31 texts', state: 'fail' },
  { text: 'fixed: #8c8a83 → #57564f', state: 'fix' },
  { text: 'text under 14px 0', state: 'ok' },
  { text: 'focus missing 0 of 14 walked', state: 'ok' },
  { text: '/ @ 1440x900', state: 'head' },
  { text: 'overflow 0, console errors 0', state: 'ok' },
  { text: 'exit 0', state: 'ok' },
] as const;

export const DESIGN_MD = [
  { text: '# lumbre · design.md', kind: 'h' },
  { text: '## Tokens', kind: 'h2' },
  { text: 'paper    #efe7da', kind: 'tok', color: '#efe7da' },
  { text: 'ink      #1d1a16', kind: 'tok', color: '#1d1a16' },
  { text: 'accent   #b5562b', kind: 'tok', color: '#b5562b' },
  { text: 'serif    Georgia 32/1.1', kind: 'line' },
  { text: '## Components', kind: 'h2' },
  { text: 'Button, ProductCard, TasteChip', kind: 'line' },
] as const;

export const SWATCHES = ['#efe7da', '#1d1a16', '#b5562b', '#6b7b4c'];

export type Copy = {
  langSwitch: string;
  hero: { before: string; mark: string; line: string; copy: string; copied: string; github: string; where: string };
  agents: { agent: string; personal: string; project: string; note: string };
  run: {
    label: string;
    example: string;
    modes: Record<Mode, string>;
    tasks: Record<Mode, string>;
    agent: string;
    send: string;
    pause: string;
    resume: string;
    restart: string;
    paused: string;
    done: string;
    yourTurn: string;
    out: string;
    who: { person: string; agent: string };
    steps: Record<StepId, Step>;
    research: { findings: { text: string; src: string }[]; thesisLabel: string; thesis: string };
    scope: { head: [string, string, string]; rows: [string, string, string][] };
    direct: { refs: Record<Mode, string>; direction: string };
    survey: { found: { text: string; src: string }[] };
    extract: { from: Record<Mode, string> };
    system: { color: string; type: string; radius: string; file: string };
    build: { sections: string[]; notes: { skill: string; text: string }[] };
    judge: { prompt: string; one: string; two: string; reveal: (good: boolean) => string };
    record: { file: string; rule: string; reason: string };
  };
  mock: { brand: string; title: string; body: string; cta: string };
  sections: { run: string; taste: string; tasteLine: string; install: string };
  taste: { title: string; body: string; scene: Scene }[];
  band: { before: string; mark: string; after: string };
  rail: { top: string; bottom: string };
  menu: { go: string; top: string; method: string; taste: string; install: string; actions: string; copy: string; copied: string; lang: string; links: string; repo: string; profile: string; contact: string };
  paper: { read: string; close: string; do: string; dont: string; sources: string; people: string; example: string; why: string; how: string; edge: string; agents: string; copy: string; copied: string; enforced: string; prev: string; next: string };
  lumbre: { nav: string[]; hero: string; cta: string; products: { name: string; price: string }[]; spec: string; note: string; arrive: string };
  setup: { job: string; skills: string; ready: string };
  orca: { title: string; body: string[]; by: string; open: string; alt: string };
  links: { title: string; items: { label: string; href: string }[] }[];
  deck: { title: string; prev: string; next: string; flip: string; back: string; hint: string };
  cards: Card[];
  footer: string;
};

const cards = (es: boolean): Card[] => [
  {
    id: 'kero-method',
    name: 'kero-method',
    by: '@uxKero',
    href: REPO,
    io: es ? 'pedido → qué skill sigue' : 'request → which skill is next',
    detail: es
      ? 'Las tres entradas, desde cero, rediseño y desde una referencia, los roles, cómo orquestar agentes, cómo medir y el criterio que lo sostiene.'
      : 'The three entries, from zero, redesign and from a reference, the roles, how to orchestrate agents, how to measure and the taste behind it.',
    install: INSTALL,
    visual: 'method',
    own: true,
  },
  {
    id: 'kero-research',
    name: 'kero-research',
    by: '@uxKero',
    href: REPO,
    io: es ? 'idea → diagnóstico y tesis' : 'idea → findings and a thesis',
    detail: es
      ? 'Hechos con fuente que se verifican en un minuto, lo que dicen los usuarios de la competencia y una tesis de una oración: por qué falla lo que existe.'
      : 'Sourced facts anyone can check in a minute, what competitors’ users say, and a one sentence thesis: why what exists fails.',
    install: INSTALL,
    visual: 'research',
    own: true,
  },
  {
    id: 'kero-scope',
    name: 'kero-scope',
    by: '@uxKero',
    href: REPO,
    io: es ? 'tesis → lista de funciones' : 'thesis → list of features',
    detail: es
      ? 'Qué hace el producto, función por función, cada una atada a la tesis. Sin fases, sin quién y sin dependencias.'
      : 'What the product does, feature by feature, each tied to the thesis. No phases, no owners, no dependencies.',
    install: INSTALL,
    visual: 'scope',
    own: true,
  },
  {
    id: 'kero-system',
    name: 'kero-system',
    by: '@uxKero',
    href: REPO,
    io: es ? 'código o design.md → skill del proyecto' : 'code or design.md → project skill',
    detail: es
      ? 'Convierte un design.md, unos tokens o el código que ya corre en una skill dentro del proyecto que manda sobre el código y crece con cada corrección.'
      : 'Turns a design.md, tokens or a running codebase into a skill inside the project that overrules the code and grows with every correction.',
    install: INSTALL,
    visual: 'system',
    own: true,
  },
  {
    id: 'kero-audit',
    name: 'kero-audit',
    by: '@uxKero',
    href: REPO,
    io: es ? 'pantallas → fallas medidas' : 'screens → measured faults',
    detail: es
      ? 'Contraste de texto, controles y estados, tamaño de texto, áreas táctiles, foco, radios anidados, escala de espaciado, largo de línea, movimiento reducido, desbordes y consola. Una captura por pantalla y un código de salida.'
      : 'Contrast of text, controls and states, text size, hit areas, focus, nested radii, spacing scale, line length, reduced motion, overflow and console. A screenshot per screen and an exit code.',
    install: INSTALL,
    visual: 'audit',
    own: true,
  },
  {
    id: 'kero-blind',
    name: 'kero-blind',
    by: '@uxKero',
    href: REPO,
    io: es ? 'dos versiones → un voto a ciegas' : 'two versions → a blind vote',
    detail: es
      ? 'Dos carpetas de diseños emparejados por nombre, mezclados lado a lado, con una línea de por qué en cada voto. Los totales aparecen al final.'
      : 'Two folders of designs paired by name, shuffled side by side, with one line of why per vote. Totals only appear at the end.',
    install: INSTALL,
    visual: 'blind',
    own: true,
  },
  {
    id: 'kero-orchestrate',
    name: 'kero-orchestrate',
    by: '@uxKero',
    href: REPO,
    io: es ? 'tarea grande → agentes en paralelo' : 'big task → agents in parallel',
    detail: es
      ? 'Decide si conviene repartir y cómo: encargos autosuficientes, trabajo aislado, revisión con evidencia. Corre mejor en Orca. Delega en subagentes propios, workers de Orca, Cursor, Codex, Grok o generadores de imagen y video, siempre de forma opcional.'
      : 'Decides whether splitting pays and how: self contained briefs, isolated work, review with evidence. Runs best in Orca. Delegates to native sub agents, Orca workers, Cursor, Codex, Grok or image and video tools, always optional.',
    install: INSTALL,
    visual: 'orchestrate',
    own: true,
  },
  {
    id: 'orca',
    name: 'Orca',
    by: '@stablyai',
    href: 'https://onorca.dev',
    io: es ? 'agentes → worktrees en paralelo' : 'agents → parallel worktrees',
    detail: es
      ? 'Donde corre el stack. Claude Code, Codex y otros agentes lado a lado, cada uno en su worktree y a la vista en un solo lugar. kero-orchestrate usa su skill de orquestación cuando está instalado.'
      : 'Where the stack runs. Claude Code, Codex and other agents side by side, each in its own worktree, tracked in one place. kero-orchestrate uses its orchestration skill when it is installed.',
    install: 'orca skills install --skill orchestration',
    visual: 'orca',
    own: false,
  },
  {
    id: 'anydesign',
    name: 'anydesign',
    by: '@uxKero',
    href: 'https://github.com/uxKero/anydesign',
    io: es ? 'captura → design.md' : 'screenshot → design.md',
    detail: es
      ? 'Convierte una captura, un sitio o un Figma en un design.md con tokens y componentes.'
      : 'Turns a screenshot, a website or a Figma file into a design.md with tokens and components.',
    install: 'npx skills add uxKero/anydesign',
    visual: 'any',
    own: false,
  },
  {
    id: 'badesign',
    name: 'BADESIGN',
    by: '@uxKero',
    href: 'https://github.com/uxKero/badesign-skill',
    io: es ? 'pantalla → composición con criterio' : 'screen → composition with judgment',
    detail: es
      ? 'Composición, tipografía, color, estados y los hábitos de las interfaces generadas.'
      : 'Composition, type, color, states and the habits of generated interfaces.',
    install: 'npx skills add uxKero/badesign-skill',
    visual: 'bad',
    own: false,
  },
  {
    id: 'emil',
    name: es ? 'Skills de Emil' : "Emil's skills",
    by: '@emilkowalski',
    href: 'https://github.com/emilkowalski/skills',
    io: es ? 'interacción → movimiento' : 'interaction → motion',
    detail: es
      ? 'Animación, revisión de animaciones, sensación nativa en el celular y elección de librerías.'
      : 'Animation, animation reviews, native feel on phones and picking the right library.',
    install: 'npx skills add emilkowalski/skills',
    visual: 'motion',
    own: false,
  },
  {
    id: 'typebien',
    name: 'typebien',
    by: '@uxKero',
    href: 'https://github.com/uxKero/typebien',
    io: es ? 'borrador → copy de persona' : 'draft → copy a person wrote',
    detail: es ? 'Copy de landing que se lee como escrito por una persona.' : 'Landing copy that reads like a person wrote it.',
    install: 'npx skills add uxKero/typebien',
    visual: 'type',
    own: false,
  },
  {
    id: 'saga',
    name: 'SAGA',
    by: '@uxKero',
    href: 'https://github.com/uxKero/optimize-search-answers-agents',
    io: es ? 'producto → qué se encuentra' : 'product → what gets found',
    detail: es ? 'Decide qué tiene que ser cierto y encontrable del producto antes de escribir.' : 'Decides what has to be true and findable about the product before writing.',
    install: 'npx skills add uxKero/optimize-search-answers-agents',
    visual: 'search',
    own: false,
  },
];

export const COPY: Record<Lang, Copy> = {
  en: {
    langSwitch: 'Leer en español',
    hero: {
      before: 'Agents build. Nothing ships',
      mark: 'unmeasured.',
      line: 'The method behind every product I direct with AI agents, from the first question to the last screen, packaged as skills your agent loads by itself.',
      copy: 'Copy install command',
      copied: 'Copied',
      github: 'GitHub',
      where: 'Where the skills go',
    },
    agents: { agent: 'Agent', personal: 'Personal', project: 'Per project', note: 'kero-audit runs in any browser tool. Playwright adds focus, states and screenshots.' },
    run: {
      label: 'The method, running',
      example: 'Example run · Lumbre is a fictional brand',
      modes: { zero: 'From zero', redesign: 'Redesign', reference: 'From a reference' },
      tasks: {
        zero: 'A web shop for Lumbre, a tea brand that only sells at fairs',
        redesign: "Redesign Lumbre's home from these three references",
        reference: "Lumbre's landing, built from this Figma file",
      },
      agent: 'Agent',
      send: 'Run',
      pause: 'Pause',
      resume: 'Resume',
      restart: 'Restart',
      paused: 'Paused at',
      done: 'Shipped, measured, recorded',
      yourTurn: 'Your turn',
      out: 'Out',
      who: { person: 'Person', agent: 'Agent' },
      steps: {
        orchestrate: { name: 'Orchestrate', who: 'agent', skills: ['kero-orchestrate', 'orca'], out: 'one agent, or who does what' },
        research: { name: 'Research', who: 'agent', skills: ['kero-research'], out: 'findings and a thesis' },
        scope: { name: 'Scope', who: 'agent', skills: ['kero-scope', 'saga'], out: 'what the product does' },
        direct: { name: 'Direct', who: 'person', skills: ['kero-method'], out: 'references and direction' },
        survey: { name: 'Survey', who: 'agent', skills: ['kero-system'], out: 'what the code already says' },
        extract: { name: 'Extract', who: 'agent', skills: ['anydesign'], out: 'a design.md with tokens and components' },
        systematize: { name: 'Systematize', who: 'agent', skills: ['kero-system'], out: 'the project skill' },
        build: { name: 'Build', who: 'agent', skills: ['badesign', 'emil', 'typebien'], out: 'screens, in small pieces' },
        measure: { name: 'Measure', who: 'agent', skills: ['kero-audit'], out: 'faults, measured and fixed' },
        judge: { name: 'Judge', who: 'person', skills: ['kero-blind'], out: 'a blind vote' },
        record: { name: 'Record', who: 'agent', skills: ['kero-method'], out: 'a rule with its reason' },
      },
      research: {
        findings: [
          { text: '4 tea shops surveyed: all open with a discount banner', src: 'their sites' },
          { text: '31 of 50 competitor reviews talk about shipping, not tea', src: 'reviews' },
          { text: 'A fair customer buys 2.4 packs and asks for the one they tasted', src: 'Lumbre sales' },
        ],
        thesisLabel: 'Thesis',
        thesis: 'People come back for the tea they tasted. The shop has to find it in one tap and get it there fast.',
      },
      scope: {
        head: ['Code', 'Feature', 'What it does'],
        rows: [
          ['T1', 'Taste search', 'Finds a tea by how it was remembered'],
          ['T2', 'Arrival day', 'Shows the delivery day before paying'],
          ['T3', 'Reorder', 'Repeats the last order in one tap'],
          ['T4', 'Fairs', 'Says where the stand is this week'],
        ],
      },
      direct: {
        refs: { zero: '3 references', redesign: '3 references', reference: '1 Figma file' },
        direction: 'Warm paper, a serif that sounds like a label, one terracotta accent.',
      },
      survey: {
        found: [
          { text: '14 colors in use, 6 of them the same gray', src: 'globals.css' },
          { text: '23 components, 3 different buttons', src: 'components/' },
          { text: '7 routes, the checkout outside the system', src: 'app/' },
        ],
      },
      extract: { from: { zero: 'from 3 references', redesign: 'from 3 references', reference: 'from the Figma file' } },
      system: { color: 'Color', type: 'Type', radius: 'Radius', file: 'skill written: lumbre-design' },
      build: {
        sections: ['Hero', 'Taste search', 'Catalog', 'Checkout'],
        notes: [
          { skill: 'BADESIGN', text: '2 generic patterns removed' },
          { skill: 'emil', text: 'cart drawer eased out, 240ms' },
          { skill: 'typebien', text: 'hero copy rewritten' },
        ],
      },
      judge: {
        prompt: 'Better one, or two?',
        one: 'One',
        two: 'Two',
        reveal: (good) => (good ? 'You picked the one made with kero-stack.' : 'You picked the one made without it. That vote counts too.'),
      },
      record: { file: '.claude/skills/lumbre-design', rule: 'The price reads before the photo.', reason: 'Chosen blind over the version that led with the image.' },
    },
    mock: { brand: 'Lumbre Tea', title: 'High mountain leaves, roasted on Tuesday.', body: 'Ships in 48 hours.', cta: 'See the teas' },
    sections: {
      run: 'The method, running',
      taste: 'Taste, as principles',
      tasteLine: 'Each one is a default with its reason, so a project can replace it with a better one.',
      install: 'Install',
    },
    taste: [
      { title: 'State is shown by the content', body: 'The active item gets its color, image or ground. A stripe on one side is what generated interfaces do.', scene: 'state' },
      { title: 'Text that is read starts at 14px', body: 'Below that a product looks cramped and cheap.', scene: 'size' },
      { title: 'Every digit has its own outline', body: 'Numbers that must be read without doubt never use a novelty face.', scene: 'digits' },
      { title: 'The effect is seen, not explained', body: 'Moving a control changes the thing itself, in place.', scene: 'effect' },
      { title: 'Unavailable stays visible', body: 'Disabled, with the reason written next to it.', scene: 'disabled' },
      { title: 'Help lives behind an icon', body: 'Simple interfaces carry no paragraphs of explanation.', scene: 'info' },
      { title: 'Native controls are designed too', body: 'Dropdowns, scrollbars, checkboxes and date fields follow the system unless someone styles them.', scene: 'native' },
      { title: 'A generic structure needs a reason', body: 'A grid of thumbnails is what every user has seen a thousand times.', scene: 'generic' },
      { title: 'Ornament that does not inform goes', body: 'If a value does not help someone decide, it is removed.', scene: 'ornament' },
      { title: 'Radii are concentric', body: 'The inner radius is the outer radius minus the padding, so nested corners stay parallel.', scene: 'radius' },
      { title: 'Space separates before lines do', body: 'One way to separate at a time. A border, a shadow and a fill on the same edge is noise.', scene: 'space' },
      { title: 'Spacing comes from one scale', body: 'Every gap is a step of the same scale. Loose values read as mistakes.', scene: 'scale' },
      { title: 'Shadows share one light', body: 'Every shadow falls the same way and grows with elevation.', scene: 'shadow' },
      { title: 'Line length is measured', body: 'Running text sits between 45 and 75 characters per line.', scene: 'measure' },
      { title: 'Undo beats confirm', body: 'A reversible action with Undo is better than a dialog everyone accepts without reading.', scene: 'undo' },
      { title: 'An error says how to go on', body: 'It says what happened and what to do, next to the problem, without blame or codes.', scene: 'errors' },
      { title: 'Align by eye, not by box', body: 'Icons, play triangles and round shapes are nudged until they look centered.', scene: 'optical' },
      { title: 'One primary action per view', body: 'Only one thing on screen looks like the next step. Everything else steps back.', scene: 'primary' },
    ],
    band: { before: 'What can be', mark: 'measured', after: 'is never asked.' },
    rail: { top: 'Agents build.', bottom: 'Nothing ships unmeasured.' },
    menu: { go: 'Go to', top: 'Start', method: 'The method', taste: 'Taste', install: 'Install', actions: 'Actions', copy: 'Copy install command', copied: 'Copied', lang: 'Leer en español', links: 'Links', repo: 'Kero-stack on GitHub', profile: '@uxKero on GitHub', contact: 'Write to @uxKero on X' },
    paper: { read: 'Read the principle', close: 'Close', do: 'Do', dont: 'Avoid', sources: 'Sources', people: 'For people', example: 'In a real interface', why: 'Why', how: 'How to apply it', edge: 'Edge cases', agents: 'For agents', copy: 'Copy for your agent', copied: 'Copied', enforced: 'Enforced by', prev: 'Previous principle', next: 'Next principle' },
    lumbre: {
      nav: ['Teas', 'Fairs', 'Reorder'],
      hero: 'High mountain leaves, roasted on Tuesday.',
      cta: 'Find my tea',
      products: [
        { name: 'Smoked', price: '$ 9.800' },
        { name: 'Citrus', price: '$ 8.400' },
        { name: 'Floral', price: '$ 8.900' },
      ],
      spec: 'Lumbre · features',
      note: 'Direction',
      arrive: 'Arrives Thursday',
    },
    setup: { job: 'Installing kero-stack', skills: '7 skills', ready: 'Restart your agent and bring your references.' },
    orca: {
      title: 'Where it runs',
      body: [
        'Orca is the tool I use the most. Every run of this stack happens there: Claude Code, Codex and the rest side by side, each agent in its own worktree, and every task in one place, on the desktop or from the phone.',
        'When the method splits work, kero-orchestrate hands it to Orca. Without it the skills still work with a single agent; with it, the parallel part of the method stops being a juggling act.',
      ],
      by: 'Open source, by stablyai',
      open: 'Get Orca',
      alt: 'Orca running Claude Code and Codex in separate worktrees, with its mobile app beside the desktop window',
    },
    links: [
      {
        title: 'Kero-stack',
        items: [
          { label: 'kero-method', href: REPO },
          { label: 'kero-research', href: REPO },
          { label: 'kero-scope', href: REPO },
          { label: 'kero-system', href: REPO },
          { label: 'kero-audit', href: REPO },
          { label: 'kero-blind', href: REPO },
          { label: 'kero-orchestrate', href: REPO },
        ],
      },
      {
        title: 'The rest of the stack',
        items: [
          { label: 'anydesign', href: 'https://github.com/uxKero/anydesign' },
          { label: 'BADESIGN', href: 'https://github.com/uxKero/badesign-skill' },
          { label: "Emil's skills", href: 'https://github.com/emilkowalski/skills' },
          { label: 'typebien', href: 'https://github.com/uxKero/typebien' },
          { label: 'SAGA', href: 'https://github.com/uxKero/optimize-search-answers-agents' },
          { label: 'Orca', href: 'https://onorca.dev' },
        ],
      },
      {
        title: '@uxKero',
        items: [
          { label: 'GitHub', href: 'https://github.com/uxKero' },
          { label: 'X', href: 'https://x.com/uxKero' },
        ],
      },
    ],
    deck: { title: 'The stack', prev: 'Previous skill', next: 'Next skill', flip: 'Show details', back: 'Back to front', hint: 'Drag, scroll or use ← →' },
    cards: cards(false),
    footer: 'Made by @uxKero. MIT License.',
  },
  es: {
    langSwitch: 'Read in English',
    hero: {
      before: 'Los agentes construyen. Nada sale',
      mark: 'sin medirse.',
      line: 'El método detrás de cada producto que dirijo con agentes de IA, de la primera pregunta a la última pantalla, empaquetado en skills que tu agente carga solo.',
      copy: 'Copiar comando de instalación',
      copied: 'Copiado',
      github: 'GitHub',
      where: 'Dónde van las skills',
    },
    agents: { agent: 'Agente', personal: 'Personal', project: 'Por proyecto', note: 'kero-audit funciona con cualquier navegador. Playwright suma foco, estados y capturas.' },
    run: {
      label: 'El método, corriendo',
      example: 'Ejemplo · Lumbre es una marca ficticia',
      modes: { zero: 'Desde cero', redesign: 'Rediseño', reference: 'Desde una referencia' },
      tasks: {
        zero: 'Una tienda online para Lumbre, una marca de té que hoy vende solo en ferias',
        redesign: 'Rediseñar la home de Lumbre con estas tres referencias',
        reference: 'La landing de Lumbre, a partir de este archivo de Figma',
      },
      agent: 'Agente',
      send: 'Correr',
      pause: 'Pausar',
      resume: 'Seguir',
      restart: 'Reiniciar',
      paused: 'Pausado en',
      done: 'Salió medido y registrado',
      yourTurn: 'Te toca',
      out: 'Sale',
      who: { person: 'Persona', agent: 'Agente' },
      steps: {
        orchestrate: { name: 'Orquestar', who: 'agent', skills: ['kero-orchestrate', 'orca'], out: 'un solo agente, o quién hace qué' },
        research: { name: 'Investigar', who: 'agent', skills: ['kero-research'], out: 'hallazgos y una tesis' },
        scope: { name: 'Enlistar', who: 'agent', skills: ['kero-scope', 'saga'], out: 'qué hace el producto' },
        direct: { name: 'Dirigir', who: 'person', skills: ['kero-method'], out: 'referencias y dirección' },
        survey: { name: 'Relevar', who: 'agent', skills: ['kero-system'], out: 'lo que el código ya dice' },
        extract: { name: 'Extraer', who: 'agent', skills: ['anydesign'], out: 'un design.md con tokens y componentes' },
        systematize: { name: 'Sistematizar', who: 'agent', skills: ['kero-system'], out: 'la skill del proyecto' },
        build: { name: 'Construir', who: 'agent', skills: ['badesign', 'emil', 'typebien'], out: 'pantallas, en piezas chicas' },
        measure: { name: 'Medir', who: 'agent', skills: ['kero-audit'], out: 'fallas medidas y corregidas' },
        judge: { name: 'Juzgar', who: 'person', skills: ['kero-blind'], out: 'un voto a ciegas' },
        record: { name: 'Registrar', who: 'agent', skills: ['kero-method'], out: 'una regla con su motivo' },
      },
      research: {
        findings: [
          { text: '4 tiendas de té relevadas: todas abren con un banner de descuento', src: 'sus sitios' },
          { text: '31 de 50 reseñas de la competencia hablan del envío, no del té', src: 'reseñas' },
          { text: 'En la feria se llevan 2,4 paquetes y piden el que probaron', src: 'ventas de Lumbre' },
        ],
        thesisLabel: 'Tesis',
        thesis: 'La gente vuelve por el té que probó. La tienda tiene que encontrarlo en un toque y hacerlo llegar rápido.',
      },
      scope: {
        head: ['Código', 'Función', 'Qué hace'],
        rows: [
          ['T1', 'Búsqueda por sabor', 'Encuentra el té por cómo se recuerda'],
          ['T2', 'Día de llegada', 'Muestra el día de entrega antes de pagar'],
          ['T3', 'Repetir', 'Repite el último pedido en un toque'],
          ['T4', 'Ferias', 'Dice dónde está el puesto esta semana'],
        ],
      },
      direct: {
        refs: { zero: '3 referencias', redesign: '3 referencias', reference: '1 archivo de Figma' },
        direction: 'Papel cálido, una serif con aire de etiqueta, un solo acento terracota.',
      },
      survey: {
        found: [
          { text: '14 colores en uso, 6 son el mismo gris', src: 'globals.css' },
          { text: '23 componentes, 3 botones distintos', src: 'components/' },
          { text: '7 rutas, el checkout fuera del sistema', src: 'app/' },
        ],
      },
      extract: { from: { zero: 'desde 3 referencias', redesign: 'desde 3 referencias', reference: 'desde el archivo de Figma' } },
      system: { color: 'Color', type: 'Tipografía', radius: 'Radio', file: 'skill escrita: lumbre-design' },
      build: {
        sections: ['Hero', 'Búsqueda por sabor', 'Catálogo', 'Pago'],
        notes: [
          { skill: 'BADESIGN', text: '2 patrones genéricos fuera' },
          { skill: 'emil', text: 'carrito con salida suave, 240ms' },
          { skill: 'typebien', text: 'copy del hero reescrito' },
        ],
      },
      judge: {
        prompt: '¿Mejor uno, o dos?',
        one: 'Uno',
        two: 'Dos',
        reveal: (good) => (good ? 'Elegiste el hecho con kero-stack.' : 'Elegiste el hecho sin kero-stack. Ese voto también cuenta.'),
      },
      record: { file: '.claude/skills/lumbre-design', rule: 'El precio se lee antes que la foto.', reason: 'Elegido a ciegas sobre la versión que abría con la imagen.' },
    },
    mock: { brand: 'Té Lumbre', title: 'Hojas de altura, tostadas el martes.', body: 'Envíos en 48 horas.', cta: 'Ver los tés' },
    sections: {
      run: 'El método, corriendo',
      taste: 'El criterio, en principios',
      tasteLine: 'Cada uno es un valor por defecto con su motivo, para que un proyecto lo cambie por uno mejor.',
      install: 'Instalar',
    },
    taste: [
      { title: 'El estado lo marca el contenido', body: 'El elemento activo lleva su color, su imagen o su fondo. Una barra al costado es lo que hacen las interfaces generadas.', scene: 'state' },
      { title: 'El texto que se lee empieza en 14px', body: 'Por debajo, un producto se ve apretado y barato.', scene: 'size' },
      { title: 'Cada dígito tiene su forma', body: 'Los números que se leen sin dudar nunca van en una fuente de fantasía.', scene: 'digits' },
      { title: 'El efecto se ve, no se explica', body: 'Mover un control cambia la cosa misma, en su lugar.', scene: 'effect' },
      { title: 'Lo no disponible sigue a la vista', body: 'Deshabilitado, con el motivo escrito al lado.', scene: 'disabled' },
      { title: 'La ayuda vive detrás de un ícono', body: 'Las interfaces simples no llevan párrafos de explicación.', scene: 'info' },
      { title: 'Los controles nativos también se diseñan', body: 'Dropdowns, barras de scroll, checkboxes y campos de fecha quedan como los del sistema si nadie los estiliza.', scene: 'native' },
      { title: 'Una estructura genérica necesita un motivo', body: 'Una grilla de miniaturas es lo que todo usuario vio mil veces.', scene: 'generic' },
      { title: 'El adorno que no informa se va', body: 'Si un valor no ayuda a decidir, se quita.', scene: 'ornament' },
      { title: 'Los radios son concéntricos', body: 'El radio de adentro es el de afuera menos el padding, así las esquinas anidadas quedan paralelas.', scene: 'radius' },
      { title: 'El espacio separa antes que las líneas', body: 'Una forma de separar por vez. Borde, sombra y fondo en el mismo borde es ruido.', scene: 'space' },
      { title: 'El espaciado sale de una escala', body: 'Cada espacio es un paso de la misma escala. Los valores sueltos se leen como errores.', scene: 'scale' },
      { title: 'Las sombras comparten una luz', body: 'Todas las sombras caen hacia el mismo lado y crecen con la elevación.', scene: 'shadow' },
      { title: 'El largo de línea se mide', body: 'El texto corrido va entre 45 y 75 caracteres por línea.', scene: 'measure' },
      { title: 'Deshacer antes que confirmar', body: 'Una acción reversible con Deshacer es mejor que un diálogo que todos aceptan sin leer.', scene: 'undo' },
      { title: 'El error dice cómo seguir', body: 'Dice qué pasó y qué hacer, junto al problema, sin culpar ni usar códigos.', scene: 'errors' },
      { title: 'Se alinea con el ojo, no con la caja', body: 'Íconos, triángulos de play y formas redondas se corren hasta que se vean centrados.', scene: 'optical' },
      { title: 'Una sola acción principal por vista', body: 'Solo una cosa en pantalla parece el paso siguiente. Lo demás se corre atrás.', scene: 'primary' },
    ],
    band: { before: 'Lo que se puede', mark: 'medir', after: 'no se pregunta.' },
    rail: { top: 'Los agentes construyen.', bottom: 'Nada sale sin medirse.' },
    menu: { go: 'Ir a', top: 'Inicio', method: 'El método', taste: 'El criterio', install: 'Instalar', actions: 'Acciones', copy: 'Copiar comando de instalación', copied: 'Copiado', lang: 'Read in English', links: 'Enlaces', repo: 'Kero-stack en GitHub', profile: '@uxKero en GitHub', contact: 'Escribir a @uxKero en X' },
    paper: { read: 'Leer el principio', close: 'Cerrar', do: 'Sí', dont: 'Evitar', sources: 'Fuentes', people: 'Para personas', example: 'En una interfaz real', why: 'Por qué', how: 'Cómo aplicarlo', edge: 'Casos borde', agents: 'Para agentes', copy: 'Copiar para tu agente', copied: 'Copiado', enforced: 'Lo hacen cumplir', prev: 'Principio anterior', next: 'Principio siguiente' },
    lumbre: {
      nav: ['Tés', 'Ferias', 'Repetir'],
      hero: 'Hojas de altura, tostadas el martes.',
      cta: 'Encontrar mi té',
      products: [
        { name: 'Ahumado', price: '$ 9.800' },
        { name: 'Cítrico', price: '$ 8.400' },
        { name: 'Floral', price: '$ 8.900' },
      ],
      spec: 'Lumbre · funciones',
      note: 'Dirección',
      arrive: 'Llega el jueves',
    },
    setup: { job: 'Instalando kero-stack', skills: '7 skills', ready: 'Reinicia tu agente y trae tus referencias.' },
    orca: {
      title: 'Dónde corre',
      body: [
        'Orca es la herramienta que más uso. Cada corrida de este stack pasa ahí: Claude Code, Codex y el resto lado a lado, cada agente en su worktree y todas las tareas en un solo lugar, en el escritorio o desde el teléfono.',
        'Cuando el método reparte el trabajo, kero-orchestrate se lo pasa a Orca. Sin Orca las skills funcionan igual con un solo agente; con Orca, la parte en paralelo del método deja de ser malabarismo.',
      ],
      by: 'Código abierto, de stablyai',
      open: 'Bajar Orca',
      alt: 'Orca con Claude Code y Codex en worktrees separados, con su app para el teléfono al lado de la ventana de escritorio',
    },
    links: [
      {
        title: 'Kero-stack',
        items: [
          { label: 'kero-method', href: REPO },
          { label: 'kero-research', href: REPO },
          { label: 'kero-scope', href: REPO },
          { label: 'kero-system', href: REPO },
          { label: 'kero-audit', href: REPO },
          { label: 'kero-blind', href: REPO },
          { label: 'kero-orchestrate', href: REPO },
        ],
      },
      {
        title: 'El resto del stack',
        items: [
          { label: 'anydesign', href: 'https://github.com/uxKero/anydesign' },
          { label: 'BADESIGN', href: 'https://github.com/uxKero/badesign-skill' },
          { label: 'Skills de Emil', href: 'https://github.com/emilkowalski/skills' },
          { label: 'typebien', href: 'https://github.com/uxKero/typebien' },
          { label: 'SAGA', href: 'https://github.com/uxKero/optimize-search-answers-agents' },
          { label: 'Orca', href: 'https://onorca.dev' },
        ],
      },
      {
        title: '@uxKero',
        items: [
          { label: 'GitHub', href: 'https://github.com/uxKero' },
          { label: 'X', href: 'https://x.com/uxKero' },
        ],
      },
    ],
    deck: { title: 'El stack', prev: 'Skill anterior', next: 'Skill siguiente', flip: 'Ver detalle', back: 'Volver al frente', hint: 'Arrastra, desliza o usa ← →' },
    cards: cards(true),
    footer: 'Hecho por @uxKero. Licencia MIT.',
  },
};
