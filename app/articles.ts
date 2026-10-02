import type { Lang, Scene } from './content';

export type Article = {
  kicker: string;
  title: string;
  lede: string;
  sections: { heading: string; body: string[] }[];
  rules: { do: string[]; dont: string[] };
  sources: { label: string; href: string; by: string; year: number }[];
};

const S = {
  useOfColor: { label: 'WCAG 2.2, 1.4.1 Use of Color', href: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html', by: 'W3C, WCAG 2.2', year: 2023 },
  contrast: { label: 'WCAG 2.2, 1.4.3 Contrast (Minimum)', href: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html', by: 'W3C, WCAG 2.2', year: 2023 },
  resize: { label: 'WCAG 2.2, 1.4.4 Resize Text', href: 'https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html', by: 'W3C, WCAG 2.2', year: 2023 },
  nonText: { label: 'WCAG 2.2, 1.4.11 Non-text Contrast', href: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html', by: 'W3C, WCAG 2.2', year: 2023 },
  hover: { label: 'WCAG 2.2, 1.4.13 Content on Hover or Focus', href: 'https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html', by: 'W3C, WCAG 2.2', year: 2023 },
  focusVisible: { label: 'WCAG 2.2, 2.4.7 Focus Visible', href: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html', by: 'W3C, WCAG 2.2', year: 2023 },
  focusAppearance: { label: 'WCAG 2.2, 2.4.13 Focus Appearance', href: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html', by: 'W3C, WCAG 2.2', year: 2023 },
  labels: { label: 'WCAG 2.2, 3.3.2 Labels or Instructions', href: 'https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html', by: 'W3C, WCAG 2.2', year: 2023 },
  status: { label: 'NN/g, Visibility of System Status', href: 'https://www.nngroup.com/articles/visibility-system-status/', by: 'Aurora Harley, Nielsen Norman Group', year: 2018 },
  youAreHere: { label: 'NN/g, Navigation: You Are Here', href: 'https://www.nngroup.com/articles/navigation-you-are-here/', by: 'Susan Farrell, Nielsen Norman Group', year: 2015 },
  buttonStates: { label: 'NN/g, Button States: Communicate Interaction', href: 'https://www.nngroup.com/articles/button-states-communicate-interaction/', by: 'Kelley Gordon, Nielsen Norman Group', year: 2025 },
  appleType: { label: 'Apple HIG, Typography', href: 'https://developer.apple.com/design/human-interface-guidelines/typography', by: 'Apple', year: 2025 },
  pointSize: { label: 'Butterick, Practical Typography: Point size', href: 'https://practicaltypography.com/point-size.html', by: 'Matthew Butterick', year: 2018 },
  figures: { label: 'Butterick, Practical Typography: Alternate figures', href: 'https://practicaltypography.com/alternate-figures.html', by: 'Matthew Butterick', year: 2018 },
  numeric: { label: 'MDN, font-variant-numeric', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric', by: 'MDN Web Docs', year: 2025 },
  vercel: { label: 'Web Interface Guidelines', href: 'https://vercel.com/design/guidelines', by: 'Vercel', year: 2025 },
  dm: { label: 'NN/g, Direct Manipulation: Definition', href: 'https://www.nngroup.com/articles/direct-manipulation/', by: 'Sherugar and Budiu, Nielsen Norman Group', year: 2016 },
  rail: { label: 'Measure performance with the RAIL model', href: 'https://web.dev/articles/rail', by: 'Google, web.dev', year: 2020 },
  dropdowns: { label: 'NN/g, Dropdowns: Design Guidelines', href: 'https://www.nngroup.com/articles/drop-down-menus/', by: 'Angie Li, Nielsen Norman Group', year: 2017 },
  hiddenDisabled: { label: 'Smashing Magazine, Hidden vs. Disabled in UX', href: 'https://www.smashingmagazine.com/2024/05/hidden-vs-disabled-ux/', by: 'Vitaly Friedman, Smashing Magazine', year: 2024 },
  disabledSuck: { label: 'Axess Lab, Disabled buttons suck', href: 'https://axesslab.com/disabled-buttons-suck/', by: 'Hampus Sethfors, Axess Lab', year: 2017 },
  tooltips: { label: 'NN/g, Tooltip Guidelines', href: 'https://www.nngroup.com/articles/tooltip-guidelines/', by: 'Alita Kendrick, Nielsen Norman Group', year: 2019 },
  help: { label: 'NN/g, Help and Documentation', href: 'https://www.nngroup.com/articles/help-and-documentation/', by: 'Alita Kendrick, Nielsen Norman Group', year: 2020 },
  caret: { label: 'MDN, caret-color', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color', by: 'MDN Web Docs', year: 2025 },
  appearance: { label: 'appearance', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/appearance', by: 'MDN Web Docs', year: 2026 },
  accentColor: { label: 'accent-color', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color', by: 'MDN Web Docs', year: 2026 },
  scrollbarColor: { label: 'scrollbar-color', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color', by: 'MDN Web Docs', year: 2026 },
  scrollbars: { label: 'Baseline Rules for Scrollbar Usability', href: 'https://adrianroselli.com/2019/01/baseline-rules-for-scrollbar-usability.html', by: 'Adrian Roselli', year: 2019 },
  customSelect: { label: 'A customizable select', href: 'https://developer.chrome.com/blog/a-customizable-select', by: 'Adam Argyle, Chrome for Developers', year: 2025 },
  soueidan: { label: 'Sara Soueidan, Focus indicators guide', href: 'https://www.sarasoueidan.com/blog/focus-indicators/', by: 'Sara Soueidan', year: 2021 },
  cards: { label: 'NN/g, Cards: UI-Component Definition', href: 'https://www.nngroup.com/articles/cards-component/', by: 'Page Laubheimer, Nielsen Norman Group', year: 2016 },
  thumbs: { label: 'NN/g, List Thumbnails on Mobile', href: 'https://www.nngroup.com/articles/mobile-list-thumbnail/', by: 'Aurora Harley, Nielsen Norman Group', year: 2015 },
  consistency: { label: 'NN/g, Consistency and Standards', href: 'https://www.nngroup.com/articles/consistency-and-standards/', by: 'Rachel Krause, Nielsen Norman Group', year: 2021 },
  jakob: { label: "Laws of UX, Jakob's Law", href: 'https://lawsofux.com/jakobs-law/', by: 'Jon Yablonski, Laws of UX', year: 2018 },
  minimalist: { label: 'NN/g, Aesthetic and Minimalist Design', href: 'https://www.nngroup.com/articles/aesthetic-minimalist-design/', by: 'Therese Fessenden, Nielsen Norman Group', year: 2021 },
  aesthetic: { label: 'NN/g, The Aesthetic-Usability Effect', href: 'https://www.nngroup.com/articles/aesthetic-usability-effect/', by: 'Kate Moran, Nielsen Norman Group', year: 2024 },
  flat: { label: 'NN/g, Flat UI Elements Attract Less Attention', href: 'https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/', by: 'Kate Moran, Nielsen Norman Group', year: 2017 },

  wwdcSystem: { label: 'Get to know the new design system, WWDC25', href: 'https://developer.apple.com/videos/play/wwdc2025/356/', by: 'Apple', year: 2025 },
  wwdcGlass: { label: 'Meet Liquid Glass, WWDC25', href: 'https://developer.apple.com/videos/play/wwdc2025/219/', by: 'Apple', year: 2025 },
  refactoring: { label: 'Refactoring UI', href: 'https://refactoringui.com/', by: 'Adam Wathan and Steve Schoger', year: 2018 },
  proximity: { label: 'NN/g, Proximity Principle in Visual Design', href: 'https://www.nngroup.com/articles/gestalt-proximity/', by: 'Aurora Harley, Nielsen Norman Group', year: 2020 },
  atlassianSpace: { label: 'Atlassian Design System, Spacing', href: 'https://atlassian.design/foundations/spacing', by: 'Atlassian', year: 2025 },
  shadows: { label: 'Designing Beautiful Shadows in CSS', href: 'https://www.joshwcomeau.com/css/designing-shadows/', by: 'Josh W. Comeau', year: 2021 },
  lineLength: { label: 'Butterick, Practical Typography: Line length', href: 'https://practicaltypography.com/line-length.html', by: 'Matthew Butterick', year: 2018 },
  baymardLine: { label: 'Readability: The Optimal Line Length', href: 'https://baymard.com/blog/line-length-readability', by: 'Edward Scott, Baymard Institute', year: 2022 },
  visual: { label: 'WCAG 2.2, 1.4.8 Visual Presentation', href: 'https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html', by: 'W3C, WCAG 2.2', year: 2023 },
  confirm: { label: 'NN/g, Confirmation Dialogs Can Prevent User Errors', href: 'https://www.nngroup.com/articles/confirmation-dialog/', by: 'Jakob Nielsen, Nielsen Norman Group', year: 2018 },
  control: { label: 'NN/g, User Control and Freedom', href: 'https://www.nngroup.com/articles/user-control-and-freedom/', by: 'Maria Rosala, Nielsen Norman Group', year: 2020 },
  errorMsg: { label: 'NN/g, Error-Message Guidelines', href: 'https://www.nngroup.com/articles/error-message-guidelines/', by: 'Neusesser and Sunwall, Nielsen Norman Group', year: 2023 },
  errorSuggestion: { label: 'WCAG 2.2, 3.3.3 Error Suggestion', href: 'https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html', by: 'W3C, WCAG 2.2', year: 2023 },

  appleIcons: { label: 'Apple HIG, Icons', href: 'https://developer.apple.com/design/human-interface-guidelines/icons', by: 'Apple', year: 2025 },
  sfSymbols: { label: 'Introducing SF Symbols, WWDC19', href: 'https://developer.apple.com/videos/play/wwdc2019/206/', by: 'Apple', year: 2019 },
  appleButtons: { label: 'Apple HIG, Buttons', href: 'https://developer.apple.com/design/human-interface-guidelines/buttons', by: 'Apple', year: 2025 },
};

const en: Record<Scene, Article> = {
  state: {
    kicker: 'Principle 01',
    title: 'State is shown by the content',
    lede: 'The selected tab, the current page or the active filter should look different in its own body: its fill, its weight, its image. A thin stripe on one side is the cheapest way to say this one, and it is the first thing that reads as generated.',
    sections: [
      {
        heading: 'Why',
        body: [
          'People need to know where they are and what is on. NN/g calls it visibility of system status and puts it first among the heuristics: "A lack of information often equates to a lack of control."',
          'For navigation, NN/g recommends that the selected element become more visually prominent, through color, through offsetting it in space, or both, because both together are more accessible.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'Change the item itself. Give the active row its ground, the active tab its weight and a filled shape, the active card its image or a stronger border all the way around.',
          'Never rely on hue alone. WCAG 1.4.1 says color cannot be the only visual means of distinguishing an element, so pair the color with shape, weight, an icon or text.',
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'Dense tables can use a filled row plus a check, not a colored edge. When two states coexist, such as hover and selected, each needs its own treatment so the selected one never looks like a hover.',
        ],
      },
    ],
    rules: {
      do: ['Fill, weight or enlarge the active item itself', 'Pair color with shape, icon or text', 'Keep the active item readable at 4.5:1', 'Make selected and hover look different'],
      dont: ['Mark state with a stripe on one side', 'Use hue as the only signal', 'Hide the current location', 'Reuse the hover style as the selected style'],
    },
    sources: [S.status, S.youAreHere, S.useOfColor, S.buttonStates],
  },
  size: {
    kicker: 'Principle 02',
    title: 'Text that is read starts at 14px',
    lede: 'Labels, captions and help that someone has to read are set at 14px or more. Smaller type looks tidy in a mockup and cramped in a hand, and it is the first thing people with weaker eyes zoom.',
    sections: [
      {
        heading: 'Why',
        body: [
          'Butterick recommends body text of 15 to 25 pixels on the web, because screens are read from farther away than paper. Apple sets a 17 pt default and an 11 pt minimum on iOS, and a 13 pt default on macOS.',
          'WCAG 1.4.4 asks that text can be resized up to 200 percent without losing content or function, which is far easier when the base size was sensible to begin with.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'Body copy at 15 to 17px, secondary text at 14px, and nothing a person needs below that. If a label does not fit at 14px, shorten the label or rethink the layout instead of shrinking it.',
          'Contrast depends on size too. WCAG treats about 24px, or 18.5px bold, as large text that can go down to 3:1; everything smaller needs 4.5:1.',
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'Legal fine print and incidental decoration can be smaller, but anything that changes a decision, such as a price, a limit or an error, is not fine print. Thin custom faces need more size, not less.',
        ],
      },
    ],
    rules: {
      do: ['Keep readable text at 14px or more', 'Shorten copy before shrinking it', 'Test at 200 percent zoom', 'Go larger with thin weights'],
      dont: ['Put prices, errors or limits in small print', 'Use 11 or 12px for labels', 'Lock zoom on mobile', 'Lower contrast on small text'],
    },
    sources: [S.pointSize, S.appleType, S.resize, S.contrast],
  },
  digits: {
    kicker: 'Principle 03',
    title: 'Every digit has its own outline',
    lede: 'Numbers people act on, such as prices, codes, times and balances, use a face where 0, O, 1, l and 8 never blur together. Pixel, condensed or novelty faces are for words, not for figures that must be read without doubt.',
    sections: [
      {
        heading: 'Why',
        body: [
          'Numbers are what people compare and act on. Vercel\'s Web Interface Guidelines ask for 8 deployments rather than eight deployments, and for tabular numerals wherever figures are compared. If the eye stops on a number, its shape must be unambiguous.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'Pick a text face with open, distinct figures and use lining figures in interfaces. When numbers sit in columns or change in place, turn on tabular figures with font-variant-numeric: tabular-nums, which MDN describes as figures that are all the same size so they align like a table.',
          'Butterick recommends tabular figures for vertically aligned columns and proportional figures for running text. Where O and 0 can be confused, such as in codes, slashed-zero helps.',
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'Counters and timers jump sideways without tabular figures. Large display numbers can be expressive, but the small price next to them cannot.',
          'In tables, right-align figures so units line up, and keep the same number of decimals within a column.',
        ],
      },
    ],
    rules: {
      do: ['Use tabular figures in tables, timers and totals', 'Prefer lining figures in UI', 'Disambiguate 0 and O in codes', 'Right-align columns of numbers'],
      dont: ['Set prices in a pixel or novelty face', 'Let a counter shift width as it changes', 'Use oldstyle figures in all caps', 'Write key figures as words'],
    },
    sources: [S.vercel, S.numeric, S.figures],
  },
  effect: {
    kicker: 'Principle 04',
    title: 'The effect is seen, not explained',
    lede: 'When someone moves a slider, toggles an option or drags a handle, the thing itself changes in place. A paragraph that describes what a control will do is a sign the control is not showing it.',
    sections: [
      {
        heading: 'Why',
        body: [
          'NN/g defines direct manipulation as acting on displayed objects "using physical, incremental, and reversible actions whose effects are immediately visible on the screen." Immediate feedback lets people spot a mistake and undo it without reading anything.',
          'Speed matters. Google\'s RAIL model says that responding within 100 ms makes the result feel immediate; under that, no special feedback is needed beyond the result itself.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'Preview on the real object: the photo crops as the handle moves, the price updates as the plan changes, the theme repaints as it is picked. Keep every step reversible.',
          'If the result takes longer than a second, show progress. RAIL notes that past one second people lose focus on the task, and past ten seconds they are likely to abandon it.',
          'Keep the control next to what it changes, so the eye does not travel between cause and effect.',
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'Destructive or costly actions still need a confirmation, but the confirmation should show what will change, not describe it.',
          'Sliders and toggles also work from the keyboard, with the same immediate result, so the preview is not reserved for pointer users.',
        ],
      },
    ],
    rules: {
      do: ['Update the object while the control moves', 'Keep each step reversible', 'Respond within 100 ms', 'Show progress past one second'],
      dont: ['Explain a control in a paragraph', 'Wait for Apply to show the result', 'Hide the result on another screen', 'Animate in place of the real feedback'],
    },
    sources: [S.dm, S.rail, S.status],
  },
  disabled: {
    kicker: 'Principle 05',
    title: 'Unavailable stays visible',
    lede: 'An option that cannot be used right now stays where it is, looks unavailable, and says why. Removing it makes people hunt for something that used to be there; disabling it without a reason leaves them stuck.',
    sections: [
      {
        heading: 'Why',
        body: [
          'NN/g advises to "gray out any unavailable options instead of removing them", so the layout stays stable and learnable, and suggests a short message explaining why the option is disabled and how to make it active.',
          'Vitaly Friedman draws the line clearly: disable what users should know exists, hide only what they will never be allowed to use, and always explain the reason.',
          'Axess Lab lists the cost of an unexplained disabled button: people try to click it, it often has poor contrast, and it gives no clue about what went wrong.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'Write the reason next to the control, not only in a tooltip: "Add a card to continue", "Available on Pro". For forms, Axess Lab recommends keeping the submit button enabled and showing what is missing when it is pressed.',
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'WCAG exempts disabled controls from contrast rules, but exempt is not readable. Keep the label legible, and mark the state in code with disabled or aria-disabled so screen readers announce it.',
        ],
      },
    ],
    rules: {
      do: ['Keep the option in place and dimmed', 'Write why it is unavailable', 'Say how to make it available', 'Expose the state to assistive tech'],
      dont: ['Remove options that come and go', 'Disable submit without saying what is missing', 'Fade the label until it is unreadable', 'Hide the reason only on hover'],
    },
    sources: [S.dropdowns, S.hiddenDisabled, S.disabledSuck, S.nonText, S.buttonStates],
  },
  info: {
    kicker: 'Principle 06',
    title: 'Help lives behind an icon',
    lede: 'A simple interface carries no paragraphs of explanation. The interface explains itself, and the extra detail waits behind an info icon or inside the detail view of the thing it explains.',
    sections: [
      {
        heading: 'Why',
        body: [
          'NN/g notes that every extra unit of information competes with the relevant ones and diminishes their visibility, and that proactive help distracts people from their core task, so it should be short and to the point.',
          'WCAG agrees from the other side: the intent of instructions "is not to clutter the page", because too much instruction can be as harmful as too little.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'Labels do the explaining. What remains goes behind an icon that opens on click or focus, and the content is brief and self-sufficient. NN/g warns against tooltips that repeat the obvious.',
          'Anything shown on hover or focus must be dismissible, hoverable and persistent, as WCAG 1.4.13 requires.',
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'Information needed to finish a task never hides. NN/g is explicit: do not use tooltips for information that is vital to task completion. Requirements, errors and prices stay on screen.',
          'The info icon itself needs an accessible name, such as “More about pricing”, and must be reachable with the keyboard like any other control.',
        ],
      },
    ],
    rules: {
      do: ['Let clear labels carry the meaning', 'Put the extra detail behind an icon', 'Make popovers dismissible and hoverable', 'Keep help to one or two sentences'],
      dont: ['Open screens with paragraphs of help', 'Hide required information in a tooltip', 'Repeat the label in the tooltip', 'Show help that vanishes when the pointer moves'],
    },
    sources: [S.minimalist, S.help, S.tooltips, S.hover, S.labels],
  },
  native: {
    kicker: 'Principle 07',
    title: 'Native controls are designed too',
    lede: 'Dropdowns, scrollbars, checkboxes, radios, date fields and text selection keep the look of the operating system unless someone decides otherwise. Left alone, they are the one part of the screen that belongs to nobody.',
    sections: [
      {
        heading: 'Why',
        body: [
          'A carefully built page with a default blue checkbox and a gray system scrollbar reads unfinished. The controls are where people touch the product, so they carry more of its character than most decoration does.',
          'The risk runs the other way too. MDN warns that appearance: none removes the native look and can leave some widgets, like checkboxes and radios, visually hidden while they still work, so whatever replaces them has to be drawn on purpose.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'Start with the light tools. accent-color tints checkboxes, radios, range inputs and progress bars, and MDN notes that browsers adjust it for legibility and contrast. scrollbar-color sets the thumb and the track; MDN asks authors to keep enough contrast between the two.',
          'For a select, keep the native element and style it. Adam Argyle describes appearance: base-select, which lets a select be styled with CSS, even with rich content in its options, while existing JavaScript keeps working. Style ::selection with the brand colors and keep a designed focus state on every control.',
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'Do not hide scrollbars without another cue. Adrian Roselli asks for at least 3:1 contrast between thumb, track and page, a width that scales with zoom, scrollbars that stay visible for mouse users, and keyboard scrolling that keeps working.',
          'If a native control truly cannot do the job, a custom one has to repeat its keyboard behavior and its semantics before it repeats its look.',
        ],
      },
    ],
    rules: {
      do: ['Set accent-color to the brand color', 'Color scrollbars with scrollbar-color', 'Style the native select before replacing it', 'Style ::selection and focus on every control'],
      dont: ['Use appearance: none without drawing a replacement', 'Hide scrollbars with no other cue', 'Build a fake dropdown out of divs', 'Leave default blue controls in a branded page'],
    },
    sources: [S.appearance, S.accentColor, S.scrollbarColor, S.scrollbars, S.customSelect],
  },
  generic: {
    kicker: 'Principle 08',
    title: 'A generic structure needs a reason',
    lede: 'A grid of cards or a list with a thumbnail and two lines is what every user has seen a thousand times. Sometimes it is right. It should be chosen for the task, not used because it is the default.',
    sections: [
      {
        heading: 'Why',
        body: [
          "Familiar patterns are an asset. Jakob's Law says users spend most of their time on other sites and prefer yours to work the same way, so convention lowers the cost of learning.",
          'But the pattern has to fit the job. NN/g finds that cards suit browsing mixed content and fall short when people search for a specific item or compare similar ones, where a list scans better.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'Start from the task. Comparing plans asks for a table, scanning names for a list, browsing photos for a grid. Thumbnails earn their space only when the image helps decide; NN/g notes that a tiny tea thumbnail rarely helps anyone choose a tea.',
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'When you break a convention, NN/g warns it adds cognitive load, so do it only where it clearly helps, and keep everything around it familiar.',
          'A grid can still be right for mixed content. The question is whether it helps the person decide or only fills the page.',
        ],
      },
    ],
    rules: {
      do: ['Choose the structure from the task', 'Use lists for search and comparison', 'Keep thumbnails that inform a choice', 'Break convention only with a reason'],
      dont: ['Default every collection to a card grid', 'Add stock filler images', 'Mix layouts for identical items', 'Invent new patterns for common tasks'],
    },
    sources: [S.cards, S.thumbs, S.consistency, S.jakob],
  },
  ornament: {
    kicker: 'Principle 09',
    title: 'Ornament that does not inform goes',
    lede: 'A gradient, a badge, a decorative number or an extra divider earns its place only if it helps someone understand or decide. Everything else is noise that dims what matters.',
    sections: [
      {
        heading: 'Why',
        body: [
          'NN/g states it plainly in its eighth heuristic: interfaces should not contain information which is irrelevant or rarely needed. "Every extra unit of information in an interface competes with the relevant units of information and diminishes their relative visibility."',
          'Beauty still matters. The aesthetic-usability effect means attractive products are perceived as easier to use, but NN/g adds that form and function must work together, and good looks cannot rescue a confusing screen.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'For every element ask what decision it supports. Remove values nobody acts on, merge repeated labels and let spacing replace lines. Spend the remaining emphasis on one thing per screen.',
          'Decoration that stays is marked as decoration in code, for example with empty alt text, so it also stays out of the way for people using screen readers.',
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'Do not strip signifiers. NN/g measured that flat, weak signifiers made users look at more elements and take 22% longer. Borders, fills and underlines that say clickable are information, not ornament.',
        ],
      },
    ],
    rules: {
      do: ['Ask what decision each element supports', 'Let spacing do the work of lines', 'Keep one point of emphasis per screen', 'Keep clear signifiers on interactive elements'],
      dont: ['Add badges and gradients for liveliness', 'Show metrics nobody acts on', 'Flatten buttons until they look like text', 'Decorate instead of fixing hierarchy'],
    },
    sources: [S.minimalist, S.aesthetic, S.flat],
  },
  radius: {
    kicker: 'Principle 10',
    title: 'Radii are concentric',
    lede: 'When a rounded shape sits inside another, its corners have to follow the same curve. The inner radius is the outer radius minus the space between them; anything else looks pinched or swollen at the corners.',
    sections: [
      {
        heading: 'Why',
        body: [
          'Two rounded rectangles only read as parallel when they share the center of their arcs. With the same radius inside and out, the gap at the corner grows and the inner shape seems to bulge.',
          'Apple built its 2025 design system around this. Its WWDC25 session describes concentric shapes that calculate their radius by subtracting padding from the parent, and warns to watch for corners that feel too pinched, because they create tension and break the sense of balance.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'Write the rule into the system: inner radius equals outer radius minus padding, counting the border too. A card with 24px corners and 8px of padding holds an image with 16px corners.',
          "Vercel's Web Interface Guidelines say the same in one line: the child radius is equal to or smaller than the parent's and concentric, so the curves align.",
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'When the padding is larger than the outer radius, the inner corner goes square. A component that can live inside or outside a container needs a fallback radius for when it stands alone. Capsules are the exception: their radius is half their height, wherever they sit.',
        ],
      },
    ],
    rules: {
      do: ['Subtract padding and border from the outer radius', 'Square the inner corner when padding is larger', 'Give standalone components a fallback radius', 'Keep capsules at half their height'],
      dont: ['Use one radius token for every nesting level', 'Round the inner element more than its container', 'Mix sharp and soft corners in one stack', 'Fix pinched corners by eye on each screen'],
    },
    sources: [S.wwdcSystem, S.wwdcGlass, S.vercel],
  },
  space: {
    kicker: 'Principle 11',
    title: 'Space separates before lines do',
    lede: 'Space is the quietest way to say these things belong together and those do not. Borders, shadows and fills are louder tools; use one of them at a time, and only when space is not enough.',
    sections: [
      {
        heading: 'Why',
        body: [
          'NN/g explains that items close together are perceived as one group, and that proximity can overpower competing cues such as similarity of color or shape. Space already does most of the separating.',
          'Refactoring UI makes the same point from the other side: borders are a good way to distinguish two elements, but using too many of them makes a design feel busy and cluttered.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'Start with more space between groups than inside them. If that is not enough, pick one tool: a different background, a soft shadow or a line. Refactoring UI lists exactly those three as the alternatives to a border.',
          'Never stack them. A border, a shadow and a fill on the same edge all repeat the same message and add weight without adding meaning.',
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'Dense tables and long forms may need lines, because space alone would make them too tall. Interactive controls still need visible edges so people can find them; separating content is not the same as marking what can be pressed.',
        ],
      },
    ],
    rules: {
      do: ['Put more space between groups than within them', 'Try space first, then one tool', 'Use a background change for large regions', 'Keep visible edges on controls'],
      dont: ['Box every element in a border', 'Combine border, shadow and fill on one edge', 'Separate with lines what space already groups', 'Shrink gaps to fit more and add dividers back'],
    },
    sources: [S.proximity, S.refactoring, S.minimalist],
  },
  scale: {
    kicker: 'Principle 12',
    title: 'Spacing comes from one scale',
    lede: 'Every margin, padding and gap is a step of the same scale. A screen built from a handful of values looks deliberate; one with 13px here and 17px there looks like a mistake, even when nobody can say why.',
    sections: [
      {
        heading: 'Why',
        body: [
          'Refactoring UI dedicates a chapter to establishing a spacing and sizing system, so each decision is a choice among a few values instead of a new guess.',
          'Atlassian builds its whole system on an 8 pixel base unit, with a limited set of values from 0 to 80px, and asks for its tokens instead of raw pixel values so spacing stays consistent across apps.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'Pick a base, usually 4 or 8, and a short scale that grows faster as it goes up: 4, 8, 12, 16, 24, 32, 48, 64. Name the steps as tokens and use only those in code.',
          'Choose by relationship, not by eye: the smallest steps inside a component, larger ones between components, the largest between sections. NN/g treats this kind of consistency as a core usability heuristic.',
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'Optical corrections are allowed, such as nudging an icon so it looks centered, but they stay local and documented. Borders add their width to the box, so a 1px border can be absorbed in the padding to keep the outside on the scale.',
        ],
      },
    ],
    rules: {
      do: ['Choose a base of 4 or 8', 'Name every step as a token', 'Use small steps inside, large steps between', 'Write optical exceptions down'],
      dont: ['Type raw pixel values in components', 'Add a new value for one screen', 'Use equal space inside and between groups', 'Let borders push the box off the scale'],
    },
    sources: [S.refactoring, S.atlassianSpace, S.consistency],
  },
  shadow: {
    kicker: 'Principle 13',
    title: 'Shadows share one light',
    lede: 'A shadow tells how high something sits. When every shadow on the screen falls in the same direction and grows with height, the interface feels like one physical space instead of stickers pasted on a page.',
    sections: [
      {
        heading: 'Why',
        body: [
          'Josh W. Comeau puts it simply: every shadow on the page should share the same ratio, so that every element looks lit from the same light source. Mixed directions read as noise.',
          'Refactoring UI has chapters on using shadows to convey elevation and on emulating a light source, because depth is information about what is in front.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'Define a few elevation levels and their shadows as tokens. As an element rises, Comeau says three things change together: the offset grows, the blur grows and the opacity drops.',
          "Layer at least two shadows per level, a close one and a soft one. Vercel's guidelines ask for the same, to mimic ambient and direct light.",
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'Dark themes hide shadows, so elevation there leans on lighter surfaces. On colored backgrounds tint the shadow toward the same hue instead of using pure black, which looks dirty.',
        ],
      },
    ],
    rules: {
      do: ['Keep one light direction everywhere', 'Grow offset and blur with elevation', 'Layer a close and a soft shadow', 'Tint shadows on colored grounds'],
      dont: ['Give each component its own shadow', 'Use the same shadow for every height', 'Cast shadows in two directions', 'Use pure black on colored backgrounds'],
    },
    sources: [S.shadows, S.refactoring, S.vercel],
  },
  measure: {
    kicker: 'Principle 14',
    title: 'Line length is measured',
    lede: 'Running text is easiest to read when a line holds about 45 to 75 characters. Wider lines make the eye lose its place on the way back; narrower ones break the rhythm every few words.',
    sections: [
      {
        heading: 'Why',
        body: [
          'Butterick explains that shorter lines are more comfortable because, as the line grows, the eye travels farther to the start of the next one and loses track. He recommends 45 to 90 characters.',
          'Baymard puts the optimum for body text at 50 to 75 characters, and WCAG 1.4.8 sets the accessible ceiling at 80. Aiming for 45 to 75 keeps text inside all three.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'Set a max width in ch on text containers, around 65ch, instead of letting paragraphs stretch to the layout. On wide screens the extra width becomes margin or a second column, not longer lines.',
          'Size and measure move together: larger type can take a slightly longer line, small text needs a shorter one.',
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'The rule is for running text. Headlines, labels, tables and code have their own logic. Captions and short notes can run narrower without trouble.',
        ],
      },
    ],
    rules: {
      do: ['Cap paragraphs at about 65ch', 'Turn extra width into margin or columns', 'Adjust measure with type size', 'Check measure on the widest screen'],
      dont: ['Let text span a full desktop width', 'Go past 80 characters', 'Squeeze body text under 45', 'Apply the rule to tables and code'],
    },
    sources: [S.lineLength, S.baymardLine, S.visual],
  },
  undo: {
    kicker: 'Principle 15',
    title: 'Undo beats confirm',
    lede: 'Asking are you sure before every action teaches people to click yes without reading. Doing the action and offering Undo is faster for the common case and safer for the mistake.',
    sections: [
      {
        heading: 'Why',
        body: [
          'Jakob Nielsen warns that if you cry wolf too many times, people stop paying attention to the question. A confirmation that appears for everything protects nothing.',
          'He also asks to offer undo whenever possible, as part of the user control and freedom heuristic. NN/g describes it as an emergency exit: people choose functions by mistake and need a clear way back.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'For reversible actions, act at once and show Undo in place for a few seconds: deleting a message, archiving, moving. Keep the data until the window closes.',
          "Save confirmations for actions with serious consequences that cannot be undone. Then label the buttons with the result, such as Delete project and Keep project, as Nielsen recommends, instead of Yes and No. Vercel's guidelines ask for exactly this choice: confirm or offer Undo with a safe window.",
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'Some actions leave the system and cannot be pulled back, like sending a payment. Those need a confirmation that restates what will happen. Undo must be easy to find; a hidden gesture does not count.',
        ],
      },
    ],
    rules: {
      do: ['Act first and offer Undo for reversible actions', 'Keep the data until Undo expires', 'Confirm only what cannot be undone', 'Label buttons with the outcome'],
      dont: ['Ask are you sure for every delete', 'Use Yes and No as answers', 'Hide undo behind a gesture', 'Confirm and then offer no way back'],
    },
    sources: [S.confirm, S.control, S.vercel],
  },
  errors: {
    kicker: 'Principle 16',
    title: 'An error says how to go on',
    lede: 'An error message has one job: to get the person moving again. It says what happened in plain words, next to where it happened, and what to do now.',
    sections: [
      {
        heading: 'Why',
        body: [
          'NN/g lists the guidelines: show the message close to the source of the error, use language familiar to the people using it, avoid blame and offer potential remedies.',
          'WCAG 3.3.3 makes the last one a requirement at level AA: when the system detects an input error and knows how to fix it, the suggestion has to be shown.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          "Write the fix, not just the fault. Vercel's guidelines give the example: instead of Invalid API key, say the key is incorrect or expired and where to generate a new one.",
          'Place the message by the field or the action that failed and keep what the person already typed, so they edit instead of starting over.',
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'Some failures have no fix on the user side, like an outage. Then say so and say what will happen next. Error codes can stay for support, out of the main sentence.',
        ],
      },
    ],
    rules: {
      do: ['Say what happened in plain words', 'Say what to do next', 'Show it next to the problem', 'Keep what was already typed'],
      dont: ['Show only a code', 'Blame the person', 'Clear the form after an error', 'Hide the message in a toast far from the field'],
    },
    sources: [S.errorMsg, S.errorSuggestion, S.vercel],
  },
  optical: {
    kicker: 'Principle 17',
    title: 'Align by eye, not by box',
    lede: 'Software centers bounding boxes; people see visual weight. A play triangle, an asymmetric icon or a round shape centered by the numbers looks off, and a nudge of a pixel or two is what makes it look right.',
    sections: [
      {
        heading: 'Why',
        body: [
          'Apple puts it directly in its icon guidelines: some icons, especially asymmetric ones, can look unbalanced when centered geometrically instead of optically. Its example is a download icon that carries more weight at the bottom and looks too low when centered by the box.',
          'The adjustments are tiny, Apple adds, but they have a big impact on how an app looks. A play triangle is the classic case: its weight sits on the flat side, so it has to move toward its point.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          "Bake the correction into the asset as padding, as Apple recommends, so the padded icon can be centered geometrically and the shape inside looks centered. Vercel's guidelines allow the same in one line: adjust by one pixel when perception beats geometry.",
          'Next to text, align icons to the text, not to the line box. Apple built SF Symbols so they center optically against the cap height of the text they sit beside.',
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'Round and pointed shapes need to be slightly larger than square ones to look the same size, the same reason round letters overshoot the baseline in type design. Keep corrections inside the component, so the layout grid stays clean.',
        ],
      },
    ],
    rules: {
      do: ['Nudge asymmetric icons toward their light side', 'Store the correction as padding in the asset', 'Center icons on the text, not the line box', 'Size circles slightly larger than squares'],
      dont: ['Trust the bounding box for triangles', 'Correct the same icon differently per screen', 'Move the grid to fix one icon', 'Leave a play icon leaning left'],
    },
    sources: [S.appleIcons, S.sfSymbols, S.vercel],
  },
  primary: {
    kicker: 'Principle 18',
    title: 'One primary action per view',
    lede: 'A screen should answer one question at a glance: what is the next step. When three buttons shout, none of them does, and the person has to stop and compare.',
    sections: [
      {
        heading: 'Why',
        body: [
          'Apple asks to keep the number of prominent buttons to one or two per view, because presenting too many increases cognitive load and makes people spend more time considering options before choosing.',
          'NN/g describes the hierarchy: primary buttons have the most visual emphasis to direct attention to an important or common action, and secondary buttons have medium emphasis for actions that are less important.',
        ],
      },
      {
        heading: 'How to apply it',
        body: [
          'Give the most likely action the filled, accented style, which is what Apple recommends for the most likely action in a view. Everything else goes to an outline, a text button or a menu.',
          "Refactoring UI calls this de-emphasize to emphasize: often the primary stands out because the rest stepped back, not because it got louder. Label it with what it does; Vercel's example is Save API Key instead of Continue.",
        ],
      },
      {
        heading: 'Edge cases',
        body: [
          'A destructive action is never the styled primary by default, even if it is common. Lists with an action per row keep those actions quiet, so the page still has one clear main step.',
        ],
      },
    ],
    rules: {
      do: ['Fill only the most likely action', 'Turn the rest into outline or text buttons', 'Label the primary with its result', 'Lower the others before raising the primary'],
      dont: ['Give two actions the same filled style', 'Style a destructive action as primary', 'Use Continue or Submit as the label', 'Repeat a loud button on every row'],
    },
    sources: [S.appleButtons, S.buttonStates, S.refactoring, S.vercel],
  },
};

const es: Record<Scene, Article> = {
  state: {
    kicker: 'Principio 01',
    title: 'El estado lo marca el contenido',
    lede: 'La pestaña elegida, la página actual o el filtro activo se ven distintos en su propio cuerpo: el relleno, el peso, la imagen. Una barra fina al costado es la forma más barata de decir este, y es lo primero que se lee como generado.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'La gente necesita saber dónde está y qué está activo. NN/g lo llama visibilidad del estado del sistema y lo pone primero entre las heurísticas: la falta de información suele equivaler a falta de control.',
          'Para la navegación, NN/g recomienda que el elemento elegido gane prominencia visual, con color, con un desplazamiento en el espacio o con ambos, porque los dos juntos son más accesibles.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Cambiar el elemento mismo. La fila activa lleva su fondo, la pestaña activa su peso y una forma rellena, la tarjeta activa su imagen o un borde más fuerte en todo el contorno.',
          'Nunca depender solo del tono. WCAG 1.4.1 dice que el color no puede ser el único medio visual para distinguir un elemento, así que se suma forma, peso, un ícono o texto.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'Las tablas densas pueden usar una fila rellena y un tilde, no un borde de color. Cuando conviven dos estados, como hover y seleccionado, cada uno tiene su propio tratamiento para que el elegido nunca parezca un hover.',
        ],
      },
    ],
    rules: {
      do: ['Rellenar, engrosar o agrandar el elemento activo', 'Sumar forma, ícono o texto al color', 'Mantener el activo legible a 4.5:1', 'Diferenciar seleccionado de hover'],
      dont: ['Marcar el estado con una barra al costado', 'Usar el tono como única señal', 'Ocultar la ubicación actual', 'Reusar el estilo de hover como seleccionado'],
    },
    sources: [S.status, S.youAreHere, S.useOfColor, S.buttonStates],
  },
  size: {
    kicker: 'Principio 02',
    title: 'El texto que se lee empieza en 14px',
    lede: 'Etiquetas, leyendas y ayudas que alguien tiene que leer van a 14px o más. La letra más chica se ve prolija en un mockup y apretada en la mano, y es lo primero que agranda quien ve menos.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'Butterick recomienda texto de 15 a 25 píxeles en la web, porque la pantalla se lee desde más lejos que el papel. Apple fija 17 pt por defecto y 11 pt como mínimo en iOS, y 13 pt por defecto en macOS.',
          'WCAG 1.4.4 pide que el texto pueda agrandarse hasta 200 por ciento sin perder contenido ni funciones, algo mucho más fácil cuando el tamaño base ya era razonable.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Cuerpo de 15 a 17px, texto secundario a 14px y nada de lo que una persona necesita por debajo. Si una etiqueta no entra a 14px, se acorta la etiqueta o se replantea el layout en lugar de achicarla.',
          'El contraste también depende del tamaño. WCAG considera texto grande a unos 24px, o 18,5px en negrita, que puede bajar a 3:1; todo lo más chico necesita 4.5:1.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'La letra chica legal y la decoración pueden ser menores, pero lo que cambia una decisión, como un precio, un límite o un error, no es letra chica. Las fuentes finas necesitan más tamaño, no menos.',
        ],
      },
    ],
    rules: {
      do: ['Mantener el texto legible en 14px o más', 'Acortar el texto antes de achicarlo', 'Probar con zoom al 200 por ciento', 'Subir el tamaño con pesos finos'],
      dont: ['Poner precios, errores o límites en letra chica', 'Usar 11 o 12px para etiquetas', 'Bloquear el zoom en el celular', 'Bajar el contraste en el texto chico'],
    },
    sources: [S.pointSize, S.appleType, S.resize, S.contrast],
  },
  digits: {
    kicker: 'Principio 03',
    title: 'Cada dígito tiene su forma',
    lede: 'Los números sobre los que se actúa, como precios, códigos, horarios y saldos, usan una fuente donde 0, O, 1, l y 8 nunca se confunden. Las fuentes pixeladas, condensadas o de fantasía son para palabras, no para cifras que se leen sin dudar.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'Los números son lo que se compara y sobre lo que se actúa. Las Web Interface Guidelines de Vercel piden escribir 8 despliegues y no ocho despliegues, y usar cifras tabulares donde se comparan valores. Si la vista se detiene en un número, la forma tiene que ser inequívoca.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Elegir una fuente de texto con cifras abiertas y distintas, y usar cifras de caja alta en la interfaz. Cuando los números van en columnas o cambian en su lugar, activar cifras tabulares con font-variant-numeric: tabular-nums, que MDN describe como cifras del mismo ancho que se alinean como en una tabla.',
          'Butterick recomienda cifras tabulares para columnas alineadas y proporcionales para el texto corrido. Donde O y 0 se pueden confundir, como en códigos, ayuda el cero barrado.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'Los contadores y relojes saltan de costado sin cifras tabulares. Un número grande de portada puede ser expresivo; el precio chico de al lado, no.',
        ],
      },
    ],
    rules: {
      do: ['Usar cifras tabulares en tablas, relojes y totales', 'Preferir cifras de caja alta en la interfaz', 'Distinguir 0 y O en códigos', 'Alinear a la derecha las columnas de números'],
      dont: ['Poner precios en una fuente pixelada o de fantasía', 'Dejar que un contador cambie de ancho', 'Usar cifras de estilo antiguo en mayúsculas', 'Escribir en palabras las cifras clave'],
    },
    sources: [S.vercel, S.numeric, S.figures],
  },
  effect: {
    kicker: 'Principio 04',
    title: 'El efecto se ve, no se explica',
    lede: 'Cuando alguien mueve un deslizador, activa una opción o arrastra un control, la cosa misma cambia en su lugar. Un párrafo que describe lo que hará un control es señal de que el control no lo está mostrando.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'NN/g define la manipulación directa como actuar sobre los objetos en pantalla con acciones físicas, graduales y reversibles cuyos efectos se ven de inmediato. La respuesta inmediata permite ver un error y deshacerlo sin leer nada.',
          'La velocidad importa. El modelo RAIL de Google dice que responder dentro de los 100 ms hace que el resultado se sienta inmediato; por debajo, no hace falta otra señal que el resultado mismo.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Previsualizar sobre el objeto real: la foto se recorta mientras se mueve el control, el precio cambia con el plan, el tema se repinta al elegirlo. Cada paso tiene que poder deshacerse.',
          'Si el resultado tarda más de un segundo, mostrar progreso. RAIL señala que pasado un segundo la gente pierde el foco en la tarea, y pasados diez segundos es probable que la abandone.',
          'El control va junto a lo que cambia, para que la vista no viaje entre la causa y el efecto.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'Las acciones destructivas o costosas siguen necesitando confirmación, pero la confirmación muestra lo que va a cambiar, no lo describe.',
          'Deslizadores e interruptores también funcionan con el teclado, con el mismo resultado inmediato, para que la vista previa no sea solo para el puntero.',
        ],
      },
    ],
    rules: {
      do: ['Actualizar el objeto mientras se mueve el control', 'Hacer cada paso reversible', 'Responder dentro de los 100 ms', 'Mostrar progreso pasado un segundo'],
      dont: ['Explicar un control en un párrafo', 'Esperar a Aplicar para mostrar el resultado', 'Mostrar el resultado en otra pantalla', 'Animar en lugar de dar la respuesta real'],
    },
    sources: [S.dm, S.rail, S.status],
  },
  disabled: {
    kicker: 'Principio 05',
    title: 'Lo no disponible sigue a la vista',
    lede: 'Una opción que no se puede usar ahora se queda donde está, se ve no disponible y dice por qué. Quitarla obliga a buscar algo que antes estaba; deshabilitarla sin motivo deja a la persona trabada.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'NN/g aconseja atenuar las opciones no disponibles en lugar de quitarlas, para que el layout se mantenga estable y aprendible, y sugiere un mensaje corto que explique por qué está deshabilitada y cómo activarla.',
          'Vitaly Friedman marca el límite con claridad: se deshabilita lo que el usuario debe saber que existe, se oculta solo lo que nunca va a poder usar, y siempre se explica el motivo.',
          'Axess Lab enumera el costo de un botón deshabilitado sin explicación: la gente intenta tocarlo, suele tener poco contraste y no da ninguna pista de qué salió mal.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Escribir el motivo junto al control, no solo en un tooltip: "Agrega una tarjeta para seguir", "Disponible en Pro". En formularios, Axess Lab recomienda dejar el botón de envío habilitado y mostrar qué falta al presionarlo.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'WCAG exime del contraste a los controles deshabilitados, pero exento no es legible. La etiqueta sigue siendo legible, y el estado se marca en el código con disabled o aria-disabled para que los lectores de pantalla lo anuncien.',
        ],
      },
    ],
    rules: {
      do: ['Dejar la opción en su lugar y atenuada', 'Escribir por qué no está disponible', 'Decir cómo habilitarla', 'Exponer el estado a la tecnología asistiva'],
      dont: ['Quitar opciones que van y vienen', 'Deshabilitar el envío sin decir qué falta', 'Atenuar la etiqueta hasta que no se lea', 'Ocultar el motivo solo en hover'],
    },
    sources: [S.dropdowns, S.hiddenDisabled, S.disabledSuck, S.nonText, S.buttonStates],
  },
  info: {
    kicker: 'Principio 06',
    title: 'La ayuda vive detrás de un ícono',
    lede: 'Una interfaz simple no lleva párrafos de explicación. La interfaz se explica sola, y el detalle extra espera detrás de un ícono de información o dentro de la vista de detalle de lo que explica.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'NN/g señala que cada unidad extra de información compite con las relevantes y les resta visibilidad, y que la ayuda proactiva distrae de la tarea principal, así que tiene que ser corta y concreta.',
          'WCAG coincide desde el otro lado: la intención de las instrucciones no es saturar la página, porque demasiada instrucción puede dañar tanto como muy poca.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Las etiquetas explican. Lo que queda va detrás de un ícono que se abre con clic o con foco, con un contenido breve y que se entienda solo. NN/g advierte contra los tooltips que repiten lo obvio.',
          'Todo lo que aparece con hover o foco tiene que poder cerrarse, poder recorrerse con el puntero y persistir, como pide WCAG 1.4.13.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'La información necesaria para terminar una tarea nunca se esconde. NN/g es explícito: no usar tooltips para información vital para completar la tarea. Requisitos, errores y precios quedan en pantalla.',
          'El ícono de información también necesita un nombre accesible, como “Más sobre precios”, y tiene que alcanzarse con el teclado como cualquier otro control.',
        ],
      },
    ],
    rules: {
      do: ['Dejar que etiquetas claras lleven el sentido', 'Poner el detalle extra detrás de un ícono', 'Hacer los popovers cerrables y recorribles', 'Limitar la ayuda a una o dos oraciones'],
      dont: ['Abrir pantallas con párrafos de ayuda', 'Esconder información obligatoria en un tooltip', 'Repetir la etiqueta en el tooltip', 'Mostrar ayuda que desaparece al mover el puntero'],
    },
    sources: [S.minimalist, S.help, S.tooltips, S.hover, S.labels],
  },
  native: {
    kicker: 'Principio 07',
    title: 'Los controles nativos también se diseñan',
    lede: 'Los dropdowns, las barras de scroll, los checkboxes, los radios, los campos de fecha y la selección de texto conservan el aspecto del sistema operativo si nadie decide otra cosa. Sin intervenir, son la única parte de la pantalla que no es de nadie.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'Una página cuidada con un checkbox azul por defecto y una barra de scroll gris del sistema se lee como inconclusa. Los controles son donde la gente toca el producto, así que cargan más carácter que la mayoría de los adornos.',
          'El riesgo también existe al revés. MDN advierte que appearance: none quita el aspecto nativo y puede dejar algunos controles, como checkboxes y radios, ocultos a la vista aunque sigan funcionando, así que lo que los reemplace tiene que dibujarse a propósito.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Empezar por las herramientas livianas. accent-color tiñe checkboxes, radios, controles de rango y barras de progreso, y MDN aclara que los navegadores lo ajustan para cuidar la legibilidad y el contraste. scrollbar-color define el color del indicador y del riel; MDN pide mantener suficiente contraste entre los dos.',
          'Para un select, conservar el elemento nativo y estilizarlo. Adam Argyle describe appearance: base-select, que permite estilizar un select con CSS, incluso con contenido enriquecido en sus opciones, sin romper el JavaScript existente. Estilizar ::selection con los colores de la marca y mantener un foco diseñado en cada control.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'No esconder la barra de scroll sin otra señal. Adrian Roselli pide al menos 3:1 de contraste entre indicador, riel y página, un ancho que crezca con el zoom, barras visibles para quien usa mouse y que el scroll con teclado siga funcionando.',
          'Si un control nativo de verdad no alcanza, el propio tiene que repetir su comportamiento de teclado y su semántica antes que su aspecto.',
        ],
      },
    ],
    rules: {
      do: ['Usar accent-color con el color de la marca', 'Colorear la barra de scroll con scrollbar-color', 'Estilizar el select nativo antes de reemplazarlo', 'Estilizar ::selection y el foco de cada control'],
      dont: ['Usar appearance: none sin dibujar un reemplazo', 'Esconder la barra de scroll sin otra señal', 'Armar un dropdown falso con divs', 'Dejar controles azules por defecto en una página con marca'],
    },
    sources: [S.appearance, S.accentColor, S.scrollbarColor, S.scrollbars, S.customSelect],
  },
  generic: {
    kicker: 'Principio 08',
    title: 'Una estructura genérica necesita un motivo',
    lede: 'Una grilla de tarjetas o una lista con miniatura y dos líneas es lo que todo usuario vio mil veces. A veces es lo correcto. Tiene que elegirse por la tarea, no usarse porque viene por defecto.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'Los patrones conocidos son un activo. La ley de Jakob dice que los usuarios pasan la mayor parte del tiempo en otros sitios y prefieren que el tuyo funcione igual, así que la convención baja el costo de aprender.',
          'Pero el patrón tiene que servir para el trabajo. NN/g encuentra que las tarjetas sirven para explorar contenido variado y fallan cuando se busca un elemento puntual o se comparan elementos parecidos, donde una lista se escanea mejor.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Empezar por la tarea. Comparar planes pide una tabla, escanear nombres una lista, recorrer fotos una grilla. Las miniaturas se ganan el espacio solo si la imagen ayuda a decidir; NN/g observa que una miniatura chica de té casi nunca ayuda a elegir un té.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'Romper una convención, advierte NN/g, suma carga cognitiva, así que se hace solo donde ayuda con claridad y con todo lo de alrededor conocido.',
          'Una grilla puede seguir siendo correcta para contenido variado. La pregunta es si ayuda a decidir o solo llena la página.',
        ],
      },
    ],
    rules: {
      do: ['Elegir la estructura según la tarea', 'Usar listas para buscar y comparar', 'Dejar miniaturas que ayudan a elegir', 'Romper la convención solo con un motivo'],
      dont: ['Convertir toda colección en grilla de tarjetas', 'Sumar imágenes de relleno', 'Mezclar layouts para elementos iguales', 'Inventar patrones para tareas comunes'],
    },
    sources: [S.cards, S.thumbs, S.consistency, S.jakob],
  },
  ornament: {
    kicker: 'Principio 09',
    title: 'El adorno que no informa se va',
    lede: 'Un degradé, un badge, un número decorativo o un divisor de más se ganan el lugar solo si ayudan a entender o a decidir. Todo lo demás es ruido que apaga lo que importa.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'NN/g lo dice sin vueltas: cada unidad extra de información en una interfaz compite con las relevantes y reduce su visibilidad relativa.',
          'La belleza igual importa. El efecto estética y usabilidad hace que los productos atractivos se perciban más fáciles de usar, pero NN/g agrega que forma y función tienen que ir juntas, y que verse bien no rescata una pantalla confusa.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Preguntar qué decisión apoya cada elemento. Quitar los valores sobre los que nadie actúa, unir etiquetas repetidas y dejar que el espacio reemplace a las líneas. El énfasis que queda va a una sola cosa por pantalla.',
          'La decoración que queda se marca como decoración en el código, por ejemplo con texto alternativo vacío, para que tampoco moleste a quien usa un lector de pantalla.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'No quitar los significantes. NN/g midió que los significantes planos y débiles hicieron mirar más elementos y tardar un 22% más. Los bordes, rellenos y subrayados que dicen que algo se puede tocar son información, no adorno.',
        ],
      },
    ],
    rules: {
      do: ['Preguntar qué decisión apoya cada elemento', 'Dejar que el espacio haga el trabajo de las líneas', 'Un solo punto de énfasis por pantalla', 'Mantener significantes claros en lo interactivo'],
      dont: ['Sumar badges y degradés para dar vida', 'Mostrar métricas sobre las que nadie actúa', 'Aplanar botones hasta que parezcan texto', 'Decorar en lugar de arreglar la jerarquía'],
    },
    sources: [S.minimalist, S.aesthetic, S.flat],
  },
  radius: {
    kicker: 'Principio 10',
    title: 'Los radios son concéntricos',
    lede: 'Cuando una forma redondeada va dentro de otra, sus esquinas tienen que seguir la misma curva. El radio de adentro es el de afuera menos el espacio entre las dos; cualquier otro valor se ve apretado o hinchado en la esquina.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'Dos rectángulos redondeados solo se leen paralelos cuando comparten el centro de sus arcos. Con el mismo radio adentro y afuera, el espacio en la esquina crece y la forma interna parece abultada.',
          'Apple armó su sistema de diseño de 2025 alrededor de esto. Su sesión de WWDC25 describe formas concéntricas que calculan su radio restando el padding del contenedor, y pide vigilar las esquinas demasiado apretadas, porque generan tensión y rompen el equilibrio.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Escribir la regla en el sistema: radio interno igual a radio externo menos padding, contando también el borde. Una tarjeta con esquinas de 24px y 8px de padding lleva una imagen con esquinas de 16px.',
          'Las Web Interface Guidelines de Vercel lo dicen en una línea: el radio del hijo es igual o menor que el del padre y concéntrico, para que las curvas se alineen.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'Si el padding es mayor que el radio externo, la esquina interna queda recta. Un componente que puede vivir dentro o fuera de un contenedor necesita un radio de respaldo para cuando está solo. Las cápsulas son la excepción: su radio es la mitad de su alto, estén donde estén.',
        ],
      },
    ],
    rules: {
      do: ['Restar padding y borde al radio externo', 'Dejar recta la esquina interna si el padding es mayor', 'Dar un radio de respaldo a los componentes sueltos', 'Mantener las cápsulas en la mitad de su alto'],
      dont: ['Usar un mismo radio en todos los niveles', 'Redondear el hijo más que su contenedor', 'Mezclar esquinas rectas y suaves en una pila', 'Corregir esquinas apretadas a ojo en cada pantalla'],
    },
    sources: [S.wwdcSystem, S.wwdcGlass, S.vercel],
  },
  space: {
    kicker: 'Principio 11',
    title: 'El espacio separa antes que las líneas',
    lede: 'El espacio es la forma más silenciosa de decir que estas cosas van juntas y aquellas no. Bordes, sombras y fondos hablan más fuerte; se usa uno por vez y solo cuando el espacio no alcanza.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'NN/g explica que los elementos cercanos se perciben como un grupo y que la proximidad puede imponerse a otras señales, como el color o la forma. El espacio ya hace casi todo el trabajo de separar.',
          'Refactoring UI lo dice desde el otro lado: los bordes sirven para distinguir dos elementos, pero usar demasiados hace que el diseño se vea cargado y desordenado.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Empezar con más espacio entre grupos que dentro de ellos. Si no alcanza, elegir una sola herramienta: un fondo distinto, una sombra suave o una línea. Refactoring UI propone exactamente esas tres como alternativas al borde.',
          'Nunca apilarlas. Borde, sombra y fondo en el mismo lado repiten el mismo mensaje y suman peso sin sumar significado.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'Las tablas densas y los formularios largos pueden necesitar líneas, porque solo con espacio quedarían demasiado altos. Los controles siguen necesitando bordes visibles para encontrarse; separar contenido no es lo mismo que marcar lo que se puede tocar.',
        ],
      },
    ],
    rules: {
      do: ['Poner más espacio entre grupos que dentro', 'Probar primero el espacio y después una herramienta', 'Usar un cambio de fondo para regiones grandes', 'Mantener bordes visibles en los controles'],
      dont: ['Encerrar cada elemento en un borde', 'Combinar borde, sombra y fondo en un lado', 'Separar con líneas lo que el espacio ya agrupa', 'Achicar espacios y después sumar divisores'],
    },
    sources: [S.proximity, S.refactoring, S.minimalist],
  },
  scale: {
    kicker: 'Principio 12',
    title: 'El espaciado sale de una escala',
    lede: 'Cada margen, padding y separación es un paso de la misma escala. Una pantalla hecha con pocos valores se ve deliberada; una con 13px acá y 17px allá se ve como un error, aunque nadie sepa decir por qué.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'Refactoring UI le dedica un capítulo a establecer un sistema de espaciado y tamaños, para que cada decisión sea elegir entre pocos valores y no una adivinanza nueva.',
          'Atlassian construye todo su sistema sobre una unidad base de 8 píxeles, con un conjunto limitado de valores de 0 a 80px, y pide usar sus tokens en lugar de píxeles sueltos para que el espaciado sea consistente entre aplicaciones.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Elegir una base, en general 4 u 8, y una escala corta que crece más rápido hacia arriba: 4, 8, 12, 16, 24, 32, 48, 64. Nombrar los pasos como tokens y usar solo esos en el código.',
          'Elegir por relación y no a ojo: los pasos chicos dentro de un componente, más grandes entre componentes, los mayores entre secciones. NN/g trata esta consistencia como una heurística central de usabilidad.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'Las correcciones ópticas se permiten, como mover un ícono para que se vea centrado, pero quedan locales y documentadas. Los bordes suman su ancho a la caja, así que un borde de 1px se puede absorber en el padding para que el exterior siga en la escala.',
        ],
      },
    ],
    rules: {
      do: ['Elegir una base de 4 u 8', 'Nombrar cada paso como token', 'Pasos chicos adentro, grandes entre grupos', 'Documentar las excepciones ópticas'],
      dont: ['Escribir píxeles sueltos en componentes', 'Sumar un valor nuevo para una pantalla', 'Usar el mismo espacio dentro y entre grupos', 'Dejar que el borde saque la caja de la escala'],
    },
    sources: [S.refactoring, S.atlassianSpace, S.consistency],
  },
  shadow: {
    kicker: 'Principio 13',
    title: 'Las sombras comparten una luz',
    lede: 'Una sombra dice a qué altura está algo. Cuando todas las sombras de la pantalla caen hacia el mismo lado y crecen con la altura, la interfaz se siente como un solo espacio físico y no como calcomanías pegadas.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'Josh W. Comeau lo resume así: todas las sombras de la página deberían compartir la misma proporción, para que cada elemento parezca iluminado por la misma fuente de luz. Las direcciones mezcladas se leen como ruido.',
          'Refactoring UI tiene capítulos sobre usar las sombras para mostrar elevación y sobre emular una fuente de luz, porque la profundidad es información sobre qué está adelante.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Definir pocos niveles de elevación y sus sombras como tokens. Cuando un elemento sube, Comeau dice que cambian tres cosas juntas: crece el desplazamiento, crece el desenfoque y baja la opacidad.',
          'Superponer al menos dos sombras por nivel, una cercana y una suave. Las guías de Vercel piden lo mismo, para imitar la luz ambiente y la directa.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'Los temas oscuros esconden las sombras, así que ahí la elevación se apoya en superficies más claras. Sobre fondos de color, la sombra se tiñe del mismo tono en lugar de usar negro puro, que se ve sucio.',
        ],
      },
    ],
    rules: {
      do: ['Mantener una sola dirección de luz', 'Crecer desplazamiento y desenfoque con la altura', 'Superponer una sombra cercana y una suave', 'Teñir las sombras sobre fondos de color'],
      dont: ['Dar a cada componente su propia sombra', 'Usar la misma sombra para toda altura', 'Proyectar sombras en dos direcciones', 'Usar negro puro sobre fondos de color'],
    },
    sources: [S.shadows, S.refactoring, S.vercel],
  },
  measure: {
    kicker: 'Principio 14',
    title: 'El largo de línea se mide',
    lede: 'El texto corrido se lee mejor cuando una línea tiene entre 45 y 75 caracteres. Las líneas más anchas hacen que el ojo se pierda al volver; las más angostas cortan el ritmo cada pocas palabras.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'Butterick explica que las líneas cortas son más cómodas porque, a medida que la línea crece, el ojo viaja más lejos hasta el comienzo de la siguiente y pierde el hilo. Recomienda de 45 a 90 caracteres.',
          'Baymard ubica el óptimo para texto corrido entre 50 y 75 caracteres, y WCAG 1.4.8 pone el techo accesible en 80. Apuntar a 45 a 75 deja el texto dentro de los tres.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Poner un ancho máximo en ch a los contenedores de texto, cerca de 65ch, en lugar de dejar que los párrafos se estiren con el layout. En pantallas anchas el ancho que sobra se vuelve margen o una segunda columna, no líneas más largas.',
          'Tamaño y largo van juntos: un texto más grande admite una línea algo más larga y uno chico necesita una más corta.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'La regla es para texto corrido. Títulos, etiquetas, tablas y código tienen su propia lógica. Los epígrafes y las notas cortas pueden ir más angostos sin problema.',
        ],
      },
    ],
    rules: {
      do: ['Limitar los párrafos a unos 65ch', 'Convertir el ancho que sobra en margen o columnas', 'Ajustar el largo con el tamaño de letra', 'Revisar el largo en la pantalla más ancha'],
      dont: ['Dejar el texto a todo el ancho de escritorio', 'Pasar de 80 caracteres', 'Apretar el texto corrido por debajo de 45', 'Aplicar la regla a tablas y código'],
    },
    sources: [S.lineLength, S.baymardLine, S.visual],
  },
  undo: {
    kicker: 'Principio 15',
    title: 'Deshacer antes que confirmar',
    lede: 'Preguntar si se está seguro antes de cada acción enseña a aceptar sin leer. Hacer la acción y ofrecer Deshacer es más rápido en el caso común y más seguro ante el error.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'Jakob Nielsen advierte que, si se da la alarma demasiadas veces, la gente deja de prestar atención a la pregunta. Una confirmación que aparece para todo no protege nada.',
          'También pide ofrecer deshacer siempre que se pueda, como parte de la heurística de control y libertad del usuario. NN/g lo describe como una salida de emergencia: la gente elige funciones por error y necesita una forma clara de volver.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Para acciones reversibles, actuar enseguida y mostrar Deshacer en el lugar durante unos segundos: borrar un mensaje, archivar, mover. Conservar los datos hasta que se cierre esa ventana.',
          'Reservar la confirmación para acciones con consecuencias serias que no se pueden revertir. Ahí los botones dicen el resultado, como Borrar proyecto y Conservar proyecto, según recomienda Nielsen, en lugar de Sí y No. Las guías de Vercel piden justamente esa elección: confirmar u ofrecer Deshacer con una ventana segura.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'Algunas acciones salen del sistema y no se pueden traer de vuelta, como enviar un pago. Esas necesitan una confirmación que repita lo que va a pasar. Deshacer tiene que ser fácil de encontrar; un gesto escondido no cuenta.',
        ],
      },
    ],
    rules: {
      do: ['Actuar y ofrecer Deshacer en lo reversible', 'Conservar los datos hasta que venza Deshacer', 'Confirmar solo lo que no se puede revertir', 'Nombrar los botones con el resultado'],
      dont: ['Preguntar si está seguro en cada borrado', 'Responder con Sí y No', 'Esconder deshacer detrás de un gesto', 'Confirmar y después no dar vuelta atrás'],
    },
    sources: [S.confirm, S.control, S.vercel],
  },
  errors: {
    kicker: 'Principio 16',
    title: 'El error dice cómo seguir',
    lede: 'Un mensaje de error tiene una sola tarea: que la persona vuelva a avanzar. Dice qué pasó en palabras simples, junto a donde pasó, y qué hacer ahora.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'NN/g enumera las pautas: mostrar el mensaje cerca del origen del error, usar un lenguaje familiar para quien lo lee, evitar culpar y ofrecer soluciones posibles.',
          'WCAG 3.3.3 vuelve obligatoria la última en el nivel AA: cuando el sistema detecta un error de ingreso y sabe cómo corregirlo, tiene que mostrar la sugerencia.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Escribir la solución, no solo la falla. Las guías de Vercel dan el ejemplo: en lugar de Clave de API inválida, decir que la clave es incorrecta o venció y dónde generar una nueva.',
          'Poner el mensaje junto al campo o la acción que falló y conservar lo que la persona ya escribió, para que edite en lugar de empezar de nuevo.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'Algunas fallas no tienen arreglo del lado de la persona, como una caída del servicio. Entonces se dice eso y qué va a pasar después. Los códigos de error pueden quedar para soporte, fuera de la oración principal.',
        ],
      },
    ],
    rules: {
      do: ['Decir qué pasó en palabras simples', 'Decir qué hacer ahora', 'Mostrarlo junto al problema', 'Conservar lo que ya se escribió'],
      dont: ['Mostrar solo un código', 'Culpar a la persona', 'Vaciar el formulario tras un error', 'Esconder el mensaje lejos del campo'],
    },
    sources: [S.errorMsg, S.errorSuggestion, S.vercel],
  },
  optical: {
    kicker: 'Principio 17',
    title: 'Se alinea con el ojo, no con la caja',
    lede: 'El software centra cajas; la gente ve peso visual. Un triángulo de play, un ícono asimétrico o una forma redonda centrados por los números se ven corridos, y un ajuste de uno o dos píxeles es lo que los hace verse bien.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'Apple lo dice en sus guías de íconos: algunos íconos, sobre todo los asimétricos, se ven desequilibrados cuando se centran geométricamente en lugar de ópticamente. Su ejemplo es un ícono de descarga que tiene más peso abajo y se ve demasiado bajo si se centra por la caja.',
          'Los ajustes son mínimos, agrega Apple, pero tienen un gran impacto en cómo se ve una app. El triángulo de play es el caso clásico: su peso está en el lado plano, así que hay que moverlo hacia la punta.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Guardar la corrección en el recurso como padding, como recomienda Apple, para que el ícono con padding se centre geométricamente y la forma de adentro se vea centrada. Las guías de Vercel lo permiten en una línea: ajustar un píxel cuando la percepción le gana a la geometría.',
          'Junto a un texto, alinear el ícono con el texto y no con la caja de línea. Apple diseñó SF Symbols para que se centren ópticamente con la altura de mayúsculas del texto que acompañan.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'Las formas redondas y en punta tienen que ser un poco más grandes que las cuadradas para verse del mismo tamaño, por la misma razón por la que las letras redondas sobrepasan la línea base en tipografía. Las correcciones quedan dentro del componente, así la grilla sigue limpia.',
        ],
      },
    ],
    rules: {
      do: ['Correr los íconos asimétricos hacia su lado liviano', 'Guardar la corrección como padding del recurso', 'Centrar los íconos con el texto, no con la línea', 'Hacer los círculos un poco más grandes que los cuadrados'],
      dont: ['Confiar en la caja para los triángulos', 'Corregir el mismo ícono distinto en cada pantalla', 'Mover la grilla para arreglar un ícono', 'Dejar el play inclinado a la izquierda'],
    },
    sources: [S.appleIcons, S.sfSymbols, S.vercel],
  },
  primary: {
    kicker: 'Principio 18',
    title: 'Una sola acción principal por vista',
    lede: 'Una pantalla tiene que responder de un vistazo cuál es el paso siguiente. Cuando tres botones gritan, ninguno se escucha, y la persona tiene que frenar a comparar.',
    sections: [
      {
        heading: 'Por qué',
        body: [
          'Apple pide limitar los botones destacados a uno o dos por vista, porque presentar demasiados aumenta la carga cognitiva y hace que la gente tarde más en evaluar opciones antes de elegir.',
          'NN/g describe la jerarquía: los botones primarios tienen el mayor énfasis visual para dirigir la atención a una acción importante o común, y los secundarios tienen un énfasis medio para acciones menos importantes.',
        ],
      },
      {
        heading: 'Cómo aplicarlo',
        body: [
          'Dar el estilo relleno y con acento a la acción más probable, que es lo que Apple recomienda para la acción más probable de una vista. Todo lo demás va a botones de contorno, de texto o a un menú.',
          'Refactoring UI lo llama quitar énfasis para dar énfasis: muchas veces el primario se destaca porque el resto bajó, no porque él subió. Su etiqueta dice lo que hace; el ejemplo de Vercel es Guardar clave de API en lugar de Continuar.',
        ],
      },
      {
        heading: 'Casos borde',
        body: [
          'Una acción destructiva nunca es el primario con estilo por defecto, aunque sea frecuente. Las listas con una acción por fila mantienen esas acciones discretas, así la página sigue teniendo un solo paso principal claro.',
        ],
      },
    ],
    rules: {
      do: ['Rellenar solo la acción más probable', 'Pasar el resto a contorno o texto', 'Nombrar el primario con su resultado', 'Bajar los demás antes de subir el primario'],
      dont: ['Dar el mismo relleno a dos acciones', 'Hacer primaria una acción destructiva', 'Usar Continuar o Enviar como etiqueta', 'Repetir un botón fuerte en cada fila'],
    },
    sources: [S.appleButtons, S.buttonStates, S.refactoring, S.vercel],
  },
};

export const ARTICLES: Record<Lang, Record<Scene, Article>> = { en, es };
