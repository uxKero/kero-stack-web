import type { Scene } from './content';

export type AgentRule = { rule: string; enforcedBy: { skill: string; what: string }[] };

export const AGENT_RULES: Record<Scene, AgentRule> = {
  state: {
    rule: `## State is shown by the content

- Mark the active item with its own fill, image or ground. Never with a stripe on one edge.
- The selected state must survive without color: add weight, a shape change or a label.
- Hover, focus, active, selected and disabled are five different states. Design each one.
- Before shipping, compare the active item with its neighbours in grayscale.`,
    enforcedBy: [
      { skill: 'BADESIGN', what: 'never marks state with a colored stripe on one side' },
      { skill: 'kero-audit', what: 'state contrast on hover and focus' },
    ],
  },
  size: {
    rule: `## Text that is read starts at 14px

- Body copy 15 to 17px. Secondary text 14px. Nothing a person must read goes below 14px.
- If a label does not fit at 14px, shorten the label or change the layout. Never shrink it.
- Below 24px (18.5px bold) text needs 4.5:1 contrast. Large text may use 3:1.
- Prices, limits and errors are never fine print.`,
    enforcedBy: [
      { skill: 'kero-audit', what: 'text under 14px, counted per screen' },
      { skill: 'kero-system', what: 'writes the type scale into the project skill' },
    ],
  },
  digits: {
    rule: `## Every digit has its own outline

- Numbers that must be read without doubt use a face where 0/O, 1/l and 3/8 cannot be confused.
- Columns of figures use tabular numerals: \`font-variant-numeric: tabular-nums\`.
- Write numbers as numerals, not words, in interfaces.
- Pixel and novelty faces are for words, never for prices, codes or counts.`,
    enforcedBy: [
      { skill: 'BADESIGN', what: 'tabular figures for compared numbers' },
      { skill: 'kero-system', what: 'records the numeric face and tabular figures' },
    ],
  },
  effect: {
    rule: `## The effect is seen, not explained

- Moving a control changes the thing itself, in place, while it moves.
- Respond within 100ms; anything slower shows progress where the change will appear.
- Replace "this setting changes X" captions with a live preview of X.
- Animate the change, not the control, and keep it under 300ms.`,
    enforcedBy: [
      { skill: 'BADESIGN', what: 'motion explains cause and effect' },
      { skill: 'emil', what: 'motion and interaction review' },
    ],
  },
  disabled: {
    rule: `## Unavailable stays visible

- Keep unavailable options on screen, disabled, with the reason written next to them.
- The reason says what unlocks it: "Add a payment method to export".
- Disabled controls still need 3:1 contrast for their outline to be found.
- Never hide an option only because the current user cannot use it yet.`,
    enforcedBy: [
      { skill: 'BADESIGN', what: 'hover, focus, pressed and disabled states' },
      { skill: 'kero-audit', what: 'control contrast, 3:1 under WCAG 1.4.11' },
    ],
  },
  info: {
    rule: `## Help lives behind an icon

- Simple interfaces carry no explanatory paragraphs.
- Clarifications go behind an info icon; long descriptions live in the detail panel of the option.
- The label itself must be enough for the common case. If it is not, rename it.
- Help that appears on hover or focus can be dismissed and stays while hovered.`,
    enforcedBy: [
      { skill: 'BADESIGN', what: 'the interface does not explain how to use it' },
      { skill: 'kero-method', what: 'keeps help behind an info icon' },
    ],
  },
  native: {
    rule: `## Native controls are designed too

- Set accent-color and scrollbar-color to the brand palette, keeping 3:1 between scrollbar thumb, track and page.
- Style the native <select>, checkbox and radio before replacing them; never build a dropdown out of divs.
- Never use appearance: none without drawing a visible replacement with a designed focus state.
- Style ::selection, and never hide scrollbars without another cue that the area scrolls.`,
    enforcedBy: [
      { skill: 'kero-audit', what: 'contrast of fields, checkboxes and switches' },
      { skill: 'kero-system', what: 'records control styles in the project skill' },
    ],
  },
  generic: {
    rule: `## A generic structure needs a reason

- A grid of thumbnails, or a list with a thumbnail and two lines, is the default every user has seen.
- Use it only when scanning many similar items is the task.
- Otherwise let the content decide the shape: one hero item, a comparison, a timeline.
- Write down why the structure was chosen in the project skill.`,
    enforcedBy: [
      { skill: 'BADESIGN', what: 'rejects rows of identical cards' },
      { skill: 'kero-blind', what: 'judges the generic version against the specific one, blind' },
    ],
  },
  ornament: {
    rule: `## Ornament that does not inform goes

- Every badge, icon, gradient and number must help someone decide. If not, remove it.
- Remove decoration before adding explanation.
- One accent color, used where action or state is.
- When in doubt, delete it and see if anyone misses it.`,
    enforcedBy: [
      { skill: 'BADESIGN', what: 'lists the decoration habits of generated interfaces' },
      { skill: 'kero-blind', what: 'judges with and without it, blind' },
    ],
  },

  radius: {
    rule: `## Radii are concentric

- Inner radius = outer radius minus padding minus border width.
- If padding is larger than the outer radius, the inner corner is square.
- Components that can stand alone get a fallback radius.
- Capsules keep a radius of half their height in any container.`,
    enforcedBy: [
      { skill: 'kero-audit', what: 'nested radii, outer minus inset' },
      { skill: 'BADESIGN', what: 'radii of nested elements shrink inward' },
    ],
  },
  space: {
    rule: `## Space separates before lines do

- Put more space between groups than inside them.
- If space is not enough, add one tool: a background change, a soft shadow or a line.
- Never combine a border, a shadow and a fill on the same edge.
- Keep visible edges on interactive controls.`,
    enforcedBy: [
      { skill: 'BADESIGN', what: 'one separation method per boundary' },
      { skill: 'kero-method', what: 'separates with space before lines' },
    ],
  },
  scale: {
    rule: `## Spacing comes from one scale

- Pick a base of 4 or 8 and a short scale: 4, 8, 12, 16, 24, 32, 48, 64.
- Use spacing tokens in code, never raw pixel values.
- Small steps inside a component, larger between components, largest between sections.
- Document any optical exception where it is used.`,
    enforcedBy: [
      { skill: 'kero-audit', what: 'spacing values off the scale' },
      { skill: 'kero-system', what: 'writes the spacing scale into the project skill' },
    ],
  },
  shadow: {
    rule: `## Shadows share one light

- Every shadow falls in the same direction.
- Define elevation levels as tokens; higher means more offset, more blur, less opacity.
- Layer at least two shadows per level: a close one and a soft one.
- On colored backgrounds, tint the shadow toward the same hue.`,
    enforcedBy: [
      { skill: 'kero-system', what: 'records elevation tokens with one light' },
      { skill: 'BADESIGN', what: 'shadows only on elements that float' },
    ],
  },
  measure: {
    rule: `## Line length is measured

- Running text sits between 45 and 75 characters per line.
- Set max-width in ch on text containers, around 65ch.
- Never exceed 80 characters per line.
- Extra width becomes margin or columns, not longer lines.`,
    enforcedBy: [
      { skill: 'kero-audit', what: 'characters per line, 45 to 80' },
      { skill: 'BADESIGN', what: '45 to 75 characters for running text' },
    ],
  },
  undo: {
    rule: `## Undo beats confirm

- For reversible actions, act immediately and show Undo in place for a few seconds.
- Keep the data until the Undo window closes.
- Confirm only actions that cannot be reversed.
- Label confirmation buttons with the outcome, never Yes and No.`,
    enforcedBy: [
      { skill: 'kero-method', what: 'undo instead of confirm for reversible actions' },
    ],
  },
  errors: {
    rule: `## An error says how to go on

- Say what happened in plain words and what to do next.
- Show the message next to the field or action that failed.
- Keep what the person already typed.
- Never blame the person; keep error codes out of the main sentence.`,
    enforcedBy: [
      { skill: 'typebien', what: 'errors say what happened and what to do' },
      { skill: 'BADESIGN', what: 'designed loading, empty and error states' },
    ],
  },

  optical: {
    rule: `## Align by eye, not by box

- Nudge asymmetric icons (play, download, arrows) toward their light side by 1 to 2px.
- Store the correction as padding in the icon asset, not as ad hoc offsets.
- Center icons on the cap height of adjacent text, not on the line box.
- Make round and pointed shapes slightly larger than square ones to match visually.`,
    enforcedBy: [
      { skill: 'BADESIGN', what: 'text and icons centered inside buttons' },
      { skill: 'kero-method', what: 'each correction becomes a project rule' },
    ],
  },
  primary: {
    rule: `## One primary action per view

- Only the most likely action gets the filled, accented style.
- Every other action is an outline button, a text button or a menu item.
- Label the primary with its result, never Continue or Submit.
- Destructive actions are never the styled primary by default.`,
    enforcedBy: [
      { skill: 'typebien', what: 'one primary action per page' },
      { skill: 'kero-audit', what: 'warns when more than one action looks primary' },
    ],
  },
};
