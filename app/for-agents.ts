import { AGENT_RULES } from './agents';
import { ARTICLES } from './articles';
import { COPY, FLOWS, INSTALL, REPO, SKILL_NAMES, type Mode } from './content';
import { SITE_URL } from './site';

const WHEN: Record<string, string> = {
  'kero-method':
    'The Kero method for agents. Use when starting a product from zero, designing, redesigning or polishing any interface or visual piece with a human who directs the work, when orchestrating agents on it, and before saying a design is done. Decides which other Kero skill to load at each step.',
  'kero-research':
    'Research a product from zero and arrive at its thesis. Use when a project starts without an existing product to redesign, before scoping features or choosing references, and whenever a decision rests on what the market, the competition or the users actually do.',
  'kero-scope':
    'Turn a product thesis into the list of what the product does. Use after kero-research, when a client or a team needs to know what will be built, and whenever a feature list starts mixing in phases, owners or dependencies.',
  'kero-system':
    'Turn a design.md, a set of tokens or an existing codebase into a design skill that lives inside the project and governs every screen. Use when a project gets its visual system, when the system changes, or when a design document has drifted from the code.',
  'kero-audit':
    'Measure rendered screens in a real browser before anyone looks at them, with any browser tool or with Playwright. Use after any change to a web interface and before saying it is done.',
  'kero-blind':
    'Let a person judge two sets of designs side by side without knowing which is which. Use when choosing between two approaches, two models, two prompts or two versions of a skill, and whenever an agent is tempted to grade its own work.',
  'kero-orchestrate':
    'Decide whether to split work across agents and, when it pays, how. Use before delegating anything, when a task is large enough to parallelize, when running sub agents, Orca workers or other tools (Cursor, Codex, Grok, Gemini, image and video generators), and when integrating what they return. Delegation is always optional; the default is one agent doing the work well.',
};

const AGENTS = [
  ['Claude Code', '~/.claude/skills/', '.claude/skills/', 'claude-code'],
  ['Codex', '~/.agents/skills/', '.agents/skills/', 'codex'],
  ['Cursor', '~/.cursor/skills/', '.cursor/skills/', 'cursor'],
  ['Grok', '~/.grok/skills/', '.grok/skills/', 'grok'],
];

const ENTRIES: Record<Mode, string> = {
  zero: 'No product yet. Research what exists and why it fails, write the thesis in one sentence, list what the product does, then bring the direction and enter the loop.',
  redesign: 'The product exists. Write the project skill from what the code already says, bring the references and enter the loop at Direct. With no one to ask, continue from the code and say no references were given.',
  reference: 'Only a screenshot, a site or a Figma file. anydesign turns it into a design.md, checked against the images, and the loop starts from there.',
};

const ROLES = [
  'The person brings the direction: concept, references and taste. When a design task arrives without them, ask for the idea and the references and wait. Never offer a menu of aesthetics to pick from.',
  'The agent brings everything that can be checked: structure, states, code, measurement and the record of what was learned.',
  'Survey before asking. What the code already says (tokens, components, routes, existing rules) is never a question.',
  'Nothing reaches the person until it has been measured. The person\'s eye is the last check, never the first.',
];

const MEASURING = [
  'Before trusting a check, look at what it ran against. A 200 from a local server proves nothing about production.',
  'Report every count of faults with its denominator. "0 of 20" means something; "0" can mean nothing was looked at.',
  'Wait for fonts, measure at the real viewport, and compute contrast on the color as painted, after transparency and every layer behind it.',
  '"Fixed" is only said after it was seen.',
];

const ITERATING = [
  'Change only what was pointed at. What the person did not mention stays.',
  'When a word in a correction can be read two ways, ask with both readings before redoing anything.',
  'If something has to be cut to fit, cut what the person did not value and say what was cut.',
];

const list = (items: string[]) => items.map((i) => `- ${i}`).join('\n');

export function forAgents(): string {
  const t = COPY.en;
  const own = t.cards.filter((c) => c.own);
  const rest = t.cards.filter((c) => !c.own);
  const steps = t.run.steps;
  const name = (k: string) => SKILL_NAMES[k] ?? k;

  const flows = (Object.keys(FLOWS) as Mode[])
    .map((mode) => {
      const rows = FLOWS[mode]
        .map((id, i) => {
          const s = steps[id];
          return `${i + 1}. **${s.name}** (${s.who === 'person' ? 'person' : 'agent'}). Skills: ${s.skills.map(name).join(', ')}. Out: ${s.out}.`;
        })
        .join('\n');
      return `### ${t.run.modes[mode]}\n\n${ENTRIES[mode]}\n\n${rows}`;
    })
    .join('\n\n');

  const skills = own
    .map((c) => `### ${c.name}\n\n- Does: ${c.detail}\n- In and out: ${c.io}\n- When: ${WHEN[c.id] ?? ''}\n- Source: ${REPO}/tree/main/skills/${c.id}`)
    .join('\n\n');

  const partners = rest
    .map((c) => `### ${c.name} (${c.by})\n\n- Does: ${c.detail}\n- In and out: ${c.io}\n- Link: ${c.href}\n- Install: \`${c.install}\``)
    .join('\n\n');

  const agents = AGENTS.map(([n, personal, project, id]) => `| ${n} | \`${personal}\` | \`${project}\` | \`${INSTALL} -a ${id}\` |`).join('\n');

  const principles = t.taste
    .map((p, i) => {
      const a = ARTICLES.en[p.scene];
      const r = AGENT_RULES[p.scene];
      const rule = r.rule.replace(/^## .*\n+/, '');
      const by = r.enforcedBy.map((e) => `${e.skill}: ${e.what}`).join('; ');
      const sources = a.sources.map((s) => `[${s.label}](${s.href})`).join(', ');
      return [
        `### ${String(i + 1).padStart(2, '0')}. ${p.title}`,
        `${p.body} ${a.lede}`,
        rule,
        `Do:\n${list(a.rules.do)}`,
        `Avoid:\n${list(a.rules.dont)}`,
        `Enforced by: ${by}.`,
        `Sources: ${sources}.`,
      ].join('\n\n');
    })
    .join('\n\n');

  return `# Kero-stack, for agents

Site: ${SITE_URL}
Repository: ${REPO}
License: MIT. Made by @uxKero.

## What it is

${t.hero.line}

${t.hero.before} ${t.hero.mark} A person directs, agents build, every screen is measured in a real browser before anyone looks at it, choices are judged blind, and each correction becomes a rule the project keeps. The skills are optional to each other: load the one the current step needs.

## Roles

${list(ROLES)}

## Three entries and the loop

Every entry starts by deciding in one sentence whether one agent does the work alone. Load kero-orchestrate only when the answer is to split it.

${flows}

## The seven skills

Install all of them with \`${INSTALL}\`.

${skills}

## The rest of the stack

The method calls these at the step where each fits. They are optional: if one is not installed, say so once, give its install command and continue with the principles below.

${partners}

## Where it runs: Orca

${t.orca.body.join('\n\n')}

Orca is open source, by stablyai: https://onorca.dev. Install its orchestration skills with \`orca skills install --skill orchestration --skill orca-cli\`. Check \`orca status\`, then load \`orca skills get orchestration\` for supervised parallel runs or \`orca skills get orca-cli\` to hand a task to an agent in its own worktree.

## Install

\`\`\`bash
${INSTALL}
\`\`\`

Or copy the folders inside \`skills\` where your agent reads skills, then restart it. Use \`-a <agent>\` to install for one agent.

| Agent | Personal | Per project | One agent |
|:--|:--|:--|:--|
${agents}

## kero-audit: two ways to run it

- Any browser tool that can evaluate JavaScript (Claude in Chrome, Chrome DevTools, agent-browser, the console): inject \`scripts/checks.js\`. It returns the report and leaves it in \`window.__keroAudit\`. What needs a driven browser is listed in \`notMeasured\`; report it as not checked, never as zero.
- With Playwright in the project (\`npm i -D playwright-core\`): \`node <skill-dir>/scripts/audit.mjs --routes /,/pricing --viewports 390x844,1440x900\`. It also walks keyboard focus, forces hover and focus states, reloads with reduced motion, collects console errors and saves a screenshot per screen. Exit code 1 on a hard fault, so it can gate CI. In Git Bash, write routes without the leading slash (\`home,pricing\`) and the script path as \`C:/...\`.
- It measures contrast on the painted color (opacity included, disabled controls exempt), control and state contrast, text under 14px, hit areas, focus, reduced motion, nested radii, spacing scale, line length, competing primary actions, heading balance, icon scale, zoom, overflow and console errors.

## Measuring

${list(MEASURING)}

## Iterating

${list(ITERATING)}

## Taste, as principles

${t.sections.tasteLine}

${principles}

## Done

A design is done when the audit passes with its denominators, the person has the files in front of them, and the corrections from this round are written into the project skill.
`;
}
