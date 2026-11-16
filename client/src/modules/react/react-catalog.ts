import type { ReactLesson } from './react-types';

export const reactCatalog: ReactLesson[] = [
  {
    "id": "react-001",
    "description": "JSX describes React elements using JavaScript expressions; interpolated text is escaped, not interpreted as HTML.",
    "when": "Build component trees with readable declarative markup.",
    "avoid": "Avoid inserting untrusted HTML or expecting JSX expressions to be string templates.",
    "tradeoff": "JSX compiles to element creation; React then reconciles those elements with the DOM.",
    "mistakes": [
      {
        "problem": "Treating an interpolated string as executable markup.",
        "fix": "Use normal text interpolation for untrusted input and keep events as functions."
      }
    ],
    "examples": [
      {
        "title": "Escaped JSX text",
        "expected": "The literal angle-bracket text appears as text, with no bold element created.",
        "steps": [
          "The expression inserts a string child.",
          "React escapes the text before updating the DOM."
        ],
        "test": [
          {
            "action": "clear",
            "label": "JSX text"
          },
          {
            "action": "type",
            "label": "JSX text",
            "value": "<i>Grace</i>",
            "expect": "<i>Grace</i>"
          }
        ],
        "id": "react-001.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Expressions produce live elements",
        "expected": "Increment changes both rendered expressions without manually editing DOM nodes.",
        "steps": [
          "The event updates state.",
          "The next component call computes fresh expressions for the element tree."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change JSX expression",
            "expect": "\"doubled\": 4"
          }
        ],
        "id": "react-001.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-001.q01",
        "level": "Beginner",
        "question": "What does JSX mean?",
        "answer": "JSX describes React elements using JavaScript expressions; interpolated text is escaped, not interpreted as HTML."
      },
      {
        "id": "react-001.q02",
        "level": "Beginner",
        "question": "When would you use JSX?",
        "answer": "Build component trees with readable declarative markup."
      },
      {
        "id": "react-001.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Escaped JSX text”.",
        "answer": "The literal angle-bracket text appears as text, with no bold element created."
      },
      {
        "id": "react-001.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Treating an interpolated string as executable markup.",
        "answer": "Use normal text interpolation for untrusted input and keep events as functions."
      },
      {
        "id": "react-001.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using JSX in production?",
        "answer": "JSX compiles to element creation; React then reconciles those elements with the DOM."
      },
      {
        "id": "react-001.q06",
        "level": "Scenario",
        "question": "How would you verify “Expressions produce live elements” in a real application?",
        "answer": "Increment changes both rendered expressions without manually editing DOM nodes. Observe the actual controls and committed output. The event updates state. The next component call computes fresh expressions for the element tree."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-002",
    "description": "A function component returns a React element tree. React invokes it during rendering and owns its state by tree identity.",
    "when": "Split UI into reusable functions with clear inputs.",
    "avoid": "Avoid calling components as ordinary functions or defining stateful component types inside another render.",
    "tradeoff": "Rendering is not mounting; React may call render functions without committing their output.",
    "mistakes": [
      {
        "problem": "Sharing one variable and assuming each component instance has independent state.",
        "fix": "Put local state inside the component and render separate instances."
      }
    ],
    "examples": [
      {
        "title": "Reusable function component",
        "expected": "Changing the parent input supplies a new prop and updates Greeting.",
        "steps": [
          "The parent produces an element with a new name prop.",
          "React calls the child component to compute its result."
        ],
        "test": [
          {
            "action": "clear",
            "label": "Greeting name"
          },
          {
            "action": "type",
            "label": "Greeting name",
            "value": "Grace",
            "expect": "Hi Grace"
          }
        ],
        "id": "react-002.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Independent component instances",
        "expected": "Incrementing First counter leaves Second counter at zero.",
        "steps": [
          "Each mounted position has its own state slot.",
          "The same component function does not imply shared component state."
        ],
        "test": [
          {
            "action": "click",
            "label": "First counter increment",
            "expect": "\"count\": 1"
          }
        ],
        "id": "react-002.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-002.q01",
        "level": "Beginner",
        "question": "What does Functional components mean?",
        "answer": "A function component returns a React element tree. React invokes it during rendering and owns its state by tree identity."
      },
      {
        "id": "react-002.q02",
        "level": "Beginner",
        "question": "When would you use Functional components?",
        "answer": "Split UI into reusable functions with clear inputs."
      },
      {
        "id": "react-002.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Reusable function component”.",
        "answer": "Changing the parent input supplies a new prop and updates Greeting."
      },
      {
        "id": "react-002.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Sharing one variable and assuming each component instance has independent state.",
        "answer": "Put local state inside the component and render separate instances."
      },
      {
        "id": "react-002.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Functional components in production?",
        "answer": "Rendering is not mounting; React may call render functions without committing their output."
      },
      {
        "id": "react-002.q06",
        "level": "Scenario",
        "question": "How would you verify “Independent component instances” in a real application?",
        "answer": "Incrementing First counter leaves Second counter at zero. Observe the actual controls and committed output. Each mounted position has its own state slot. The same component function does not imply shared component state."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-003",
    "description": "Props are read-only inputs supplied by the parent; a new parent render can supply different values.",
    "when": "Pass data and callbacks down a component boundary.",
    "avoid": "Avoid mutating props or expecting destructuring defaults to replace explicit null.",
    "tradeoff": "Props describe one render’s input snapshot; they are separate from persistent local state.",
    "mistakes": [
      {
        "problem": "Assuming a child owns or may overwrite its parent-provided value.",
        "fix": "Request changes through a callback or keep the parent as the data owner."
      }
    ],
    "examples": [
      {
        "title": "Parent changes a child prop",
        "expected": "The child displays the latest score without its own duplicate state.",
        "steps": [
          "The parent updates its state.",
          "The child receives the next value prop and renders it."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change parent score",
            "expect": "\"score\": 2"
          }
        ],
        "id": "react-003.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Default prop versus explicit null",
        "expected": "An omitted prop uses Guest; explicit null remains null.",
        "steps": [
          "JavaScript parameter defaults apply only to undefined.",
          "A nullish fallback would be a separate deliberate policy."
        ],
        "test": [
          {
            "action": "click",
            "label": "Toggle explicit null",
            "expect": "null"
          }
        ],
        "id": "react-003.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-003.q01",
        "level": "Beginner",
        "question": "What does Props mean?",
        "answer": "Props are read-only inputs supplied by the parent; a new parent render can supply different values."
      },
      {
        "id": "react-003.q02",
        "level": "Beginner",
        "question": "When would you use Props?",
        "answer": "Pass data and callbacks down a component boundary."
      },
      {
        "id": "react-003.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Parent changes a child prop”.",
        "answer": "The child displays the latest score without its own duplicate state."
      },
      {
        "id": "react-003.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Assuming a child owns or may overwrite its parent-provided value.",
        "answer": "Request changes through a callback or keep the parent as the data owner."
      },
      {
        "id": "react-003.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Props in production?",
        "answer": "Props describe one render’s input snapshot; they are separate from persistent local state."
      },
      {
        "id": "react-003.q06",
        "level": "Scenario",
        "question": "How would you verify “Default prop versus explicit null” in a real application?",
        "answer": "An omitted prop uses Guest; explicit null remains null. Observe the actual controls and committed output. JavaScript parameter defaults apply only to undefined. A nullish fallback would be a separate deliberate policy."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-004",
    "description": "children is a prop containing nested React content. Slots can also be passed through explicitly named props.",
    "when": "Build containers that wrap caller-provided content.",
    "avoid": "Avoid assuming children is always a string or an array.",
    "tradeoff": "Composition does not transfer ownership of a child’s local state to the wrapper.",
    "mistakes": [
      {
        "problem": "Hardcoding content into a layout that should accept composition.",
        "fix": "Render children or explicit ReactNode slots and let the caller own behavior."
      }
    ],
    "examples": [
      {
        "title": "Interactive children inside a panel",
        "expected": "The nested button works through the children slot while its state belongs to the caller.",
        "steps": [
          "The wrapper renders its children prop.",
          "The callback still closes over the caller’s state setter."
        ],
        "test": [
          {
            "action": "click",
            "label": "Increment slotted child",
            "expect": "\"count\": 1"
          }
        ],
        "id": "react-004.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Named content slots",
        "expected": "Named slots render real elements and callbacks without a fixed layout-specific behavior.",
        "steps": [
          "The caller creates the slot elements.",
          "The layout places them without manually invoking or cloning their components."
        ],
        "test": [
          {
            "action": "click",
            "label": "Update slot",
            "expect": "\"label\": \"Updated\""
          }
        ],
        "id": "react-004.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-004.q01",
        "level": "Beginner",
        "question": "What does Children props mean?",
        "answer": "children is a prop containing nested React content. Slots can also be passed through explicitly named props."
      },
      {
        "id": "react-004.q02",
        "level": "Beginner",
        "question": "When would you use Children props?",
        "answer": "Build containers that wrap caller-provided content."
      },
      {
        "id": "react-004.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Interactive children inside a panel”.",
        "answer": "The nested button works through the children slot while its state belongs to the caller."
      },
      {
        "id": "react-004.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Hardcoding content into a layout that should accept composition.",
        "answer": "Render children or explicit ReactNode slots and let the caller own behavior."
      },
      {
        "id": "react-004.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Children props in production?",
        "answer": "Composition does not transfer ownership of a child’s local state to the wrapper."
      },
      {
        "id": "react-004.q06",
        "level": "Scenario",
        "question": "How would you verify “Named content slots” in a real application?",
        "answer": "Named slots render real elements and callbacks without a fixed layout-specific behavior. Observe the actual controls and committed output. The caller creates the slot elements. The layout places them without manually invoking or cloning their components."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-005",
    "description": "Fragments group sibling React elements without adding a wrapper DOM element. Explicit Fragment can carry a key.",
    "when": "Return sibling nodes or keyed groups without unwanted wrappers.",
    "avoid": "Avoid assuming the short fragment syntax accepts a key.",
    "tradeoff": "Fragments affect the React tree while avoiding an extra host element.",
    "mistakes": [
      {
        "problem": "Adding a div solely to satisfy one return value and changing DOM structure.",
        "fix": "Use a fragment for grouping and a keyed Fragment for mapped groups."
      }
    ],
    "examples": [
      {
        "title": "No extra host wrapper",
        "expected": "The measured div has two direct children, not a fragment wrapper element.",
        "steps": [
          "JSX creates a Fragment element.",
          "React places its two host children directly inside the div."
        ],
        "test": [
          {
            "action": "click",
            "label": "Inspect fragment DOM",
            "expect": "\"directDOMChildren\": 2"
          }
        ],
        "id": "react-005.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Keyed fragment groups",
        "expected": "Each keyed group moves its term and description together.",
        "steps": [
          "Explicit Fragment accepts the stable domain key.",
          "The mapped group produces two siblings without an extra dl child wrapper."
        ],
        "test": [
          {
            "action": "click",
            "label": "Reverse fragment groups",
            "expect": "\"g\""
          }
        ],
        "id": "react-005.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-005.q01",
        "level": "Beginner",
        "question": "What does Fragments mean?",
        "answer": "Fragments group sibling React elements without adding a wrapper DOM element. Explicit Fragment can carry a key."
      },
      {
        "id": "react-005.q02",
        "level": "Beginner",
        "question": "When would you use Fragments?",
        "answer": "Return sibling nodes or keyed groups without unwanted wrappers."
      },
      {
        "id": "react-005.q03",
        "level": "Intermediate",
        "question": "Predict the result of “No extra host wrapper”.",
        "answer": "The measured div has two direct children, not a fragment wrapper element."
      },
      {
        "id": "react-005.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Adding a div solely to satisfy one return value and changing DOM structure.",
        "answer": "Use a fragment for grouping and a keyed Fragment for mapped groups."
      },
      {
        "id": "react-005.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Fragments in production?",
        "answer": "Fragments affect the React tree while avoiding an extra host element."
      },
      {
        "id": "react-005.q06",
        "level": "Scenario",
        "question": "How would you verify “Keyed fragment groups” in a real application?",
        "answer": "Each keyed group moves its term and description together. Observe the actual controls and committed output. Explicit Fragment accepts the stable domain key. The mapped group produces two siblings without an extra dl child wrapper."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-006",
    "description": "Conditional rendering selects which elements exist in the React tree. false/null render nothing, while numeric zero is rendered.",
    "when": "Represent mutually exclusive UI states explicitly.",
    "avoid": "Avoid relying on a numeric value as an && guard when zero should display nothing.",
    "tradeoff": "Removing a stateful branch unmounts it; hiding a DOM node is a different operation.",
    "mistakes": [
      {
        "problem": "Rendering count && element and unexpectedly displaying a stray zero.",
        "fix": "Compare count > 0 or use an explicit conditional."
      }
    ],
    "examples": [
      {
        "title": "Mount and remove a conditional branch",
        "expected": "Toggle switches actual mounted elements.",
        "steps": [
          "The condition selects one element branch.",
          "React updates the host tree for that selected result."
        ],
        "test": [
          {
            "action": "click",
            "label": "Toggle conditional greeting",
            "expect": "\"visible\": true"
          }
        ],
        "id": "react-006.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Zero guard bug and boolean correction",
        "expected": "At zero the numeric guard renders 0; the boolean guard renders no badge. Both show a badge after increment.",
        "steps": [
          "&& returns an operand, not necessarily a boolean.",
          "React renders zero but suppresses the false result of the corrected guard."
        ],
        "test": [
          {
            "action": "click",
            "label": "Increase guarded count",
            "expect": "\"numericGuard\": \"Badge\""
          }
        ],
        "id": "react-006.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-006.q01",
        "level": "Beginner",
        "question": "What does Conditional rendering mean?",
        "answer": "Conditional rendering selects which elements exist in the React tree. false/null render nothing, while numeric zero is rendered."
      },
      {
        "id": "react-006.q02",
        "level": "Beginner",
        "question": "When would you use Conditional rendering?",
        "answer": "Represent mutually exclusive UI states explicitly."
      },
      {
        "id": "react-006.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Mount and remove a conditional branch”.",
        "answer": "Toggle switches actual mounted elements."
      },
      {
        "id": "react-006.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Rendering count && element and unexpectedly displaying a stray zero.",
        "answer": "Compare count > 0 or use an explicit conditional."
      },
      {
        "id": "react-006.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Conditional rendering in production?",
        "answer": "Removing a stateful branch unmounts it; hiding a DOM node is a different operation."
      },
      {
        "id": "react-006.q06",
        "level": "Scenario",
        "question": "How would you verify “Zero guard bug and boolean correction” in a real application?",
        "answer": "At zero the numeric guard renders 0; the boolean guard renders no badge. Both show a badge after increment. Observe the actual controls and committed output. && returns an operand, not necessarily a boolean. React renders zero but suppresses the false result of the corrected guard."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-007",
    "description": "Lists are rendered by mapping data to elements with stable sibling keys. Filtering changes the rendered membership.",
    "when": "Render repeated records from data rather than duplicate markup.",
    "avoid": "Avoid missing keys or treating an empty result as an exception.",
    "tradeoff": "Filtering is O(n); React keys describe identity, not a lookup value passed as a prop.",
    "mistakes": [
      {
        "problem": "Using array position as identity when item membership or order changes.",
        "fix": "Prefer stable record IDs and render a clear empty state."
      }
    ],
    "examples": [
      {
        "title": "Filter and map a real list",
        "expected": "Typing Grace leaves only its matching record in the DOM and output.",
        "steps": [
          "Filtering derives a new membership list.",
          "Mapping supplies a stable key for each remaining row."
        ],
        "test": [
          {
            "action": "type",
            "label": "Filter names",
            "value": "Grace",
            "expect": "\"Grace\""
          }
        ],
        "id": "react-007.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Empty-list rendering",
        "expected": "Removing all rows displays an explicit empty state; restoring produces keyed rows again.",
        "steps": [
          "An empty array maps to no rows.",
          "A separate condition communicates the empty state."
        ],
        "test": [
          {
            "action": "click",
            "label": "Remove all rows",
            "expect": "\"count\": 0"
          },
          {
            "action": "click",
            "label": "Restore rows",
            "expect": "\"count\": 2"
          }
        ],
        "id": "react-007.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-007.q01",
        "level": "Beginner",
        "question": "What does List rendering mean?",
        "answer": "Lists are rendered by mapping data to elements with stable sibling keys. Filtering changes the rendered membership."
      },
      {
        "id": "react-007.q02",
        "level": "Beginner",
        "question": "When would you use List rendering?",
        "answer": "Render repeated records from data rather than duplicate markup."
      },
      {
        "id": "react-007.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Filter and map a real list”.",
        "answer": "Typing Grace leaves only its matching record in the DOM and output."
      },
      {
        "id": "react-007.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Using array position as identity when item membership or order changes.",
        "answer": "Prefer stable record IDs and render a clear empty state."
      },
      {
        "id": "react-007.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using List rendering in production?",
        "answer": "Filtering is O(n); React keys describe identity, not a lookup value passed as a prop."
      },
      {
        "id": "react-007.q06",
        "level": "Scenario",
        "question": "How would you verify “Empty-list rendering” in a real application?",
        "answer": "Removing all rows displays an explicit empty state; restoring produces keyed rows again. Observe the actual controls and committed output. An empty array maps to no rows. A separate condition communicates the empty state."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-008",
    "description": "Keys identify siblings across reconciliation. Stable IDs preserve the state belonging to an item when its position changes.",
    "when": "Use stable data IDs for editable or reorderable lists.",
    "avoid": "Avoid index keys for reorderable stateful rows and random keys that reset every render.",
    "tradeoff": "Keys are local to a sibling collection; changing one intentionally resets that subtree.",
    "mistakes": [
      {
        "problem": "Editing one row and seeing its draft move to another person after reordering.",
        "fix": "Use the person ID as key; the key is for React and must be passed separately if the child needs it."
      }
    ],
    "examples": [
      {
        "title": "Index-key state ownership bug",
        "expected": "Edit Ada then reverse: the draft stays at index zero and now appears under Grace.",
        "steps": [
          "React matches the same index key after reversal.",
          "The row’s local state is preserved at the wrong domain item."
        ],
        "test": [
          {
            "action": "clear",
            "label": "Draft Ada"
          },
          {
            "action": "type",
            "label": "Draft Ada",
            "value": "Edited"
          },
          {
            "action": "click",
            "label": "Reverse rows",
            "expect": "\"person\": \"Grace\""
          }
        ],
        "id": "react-008.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Stable-key correction",
        "expected": "Edit Ada then reverse: the edited draft stays attached to Ada.",
        "steps": [
          "React matches the person ID instead of the old position.",
          "The row moves while its component state remains with its person."
        ],
        "test": [
          {
            "action": "clear",
            "label": "Draft Ada"
          },
          {
            "action": "type",
            "label": "Draft Ada",
            "value": "Edited"
          },
          {
            "action": "click",
            "label": "Reverse rows",
            "expect": "Edited"
          }
        ],
        "id": "react-008.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-008.q01",
        "level": "Beginner",
        "question": "What does Keys mean?",
        "answer": "Keys identify siblings across reconciliation. Stable IDs preserve the state belonging to an item when its position changes."
      },
      {
        "id": "react-008.q02",
        "level": "Beginner",
        "question": "When would you use Keys?",
        "answer": "Use stable data IDs for editable or reorderable lists."
      },
      {
        "id": "react-008.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Index-key state ownership bug”.",
        "answer": "Edit Ada then reverse: the draft stays at index zero and now appears under Grace."
      },
      {
        "id": "react-008.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Editing one row and seeing its draft move to another person after reordering.",
        "answer": "Use the person ID as key; the key is for React and must be passed separately if the child needs it."
      },
      {
        "id": "react-008.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Keys in production?",
        "answer": "Keys are local to a sibling collection; changing one intentionally resets that subtree."
      },
      {
        "id": "react-008.q06",
        "level": "Scenario",
        "question": "How would you verify “Stable-key correction” in a real application?",
        "answer": "Edit Ada then reverse: the edited draft stays attached to Ada. Observe the actual controls and committed output. React matches the person ID instead of the old position. The row moves while its component state remains with its person."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-009",
    "description": "React handlers are callback functions invoked for events. Synthetic events expose the origin and the current handler owner.",
    "when": "Update state from explicit user actions and inspect event fields within the handler.",
    "avoid": "Avoid invoking a state-changing handler during rendering or retaining currentTarget for later reads.",
    "tradeoff": "Handlers observe their render’s state snapshot; batch updates or functional updaters apply normally.",
    "mistakes": [
      {
        "problem": "Passing the result of a function call instead of a callback.",
        "fix": "Pass the function reference or an arrow that calls it when the event occurs."
      }
    ],
    "examples": [
      {
        "title": "Handler runs only on a click",
        "expected": "Nothing increments until the user clicks.",
        "steps": [
          "Rendering creates a callback value.",
          "The browser event causes React to invoke it later."
        ],
        "test": [
          {
            "action": "click",
            "label": "Invoke event handler",
            "expect": "\"count\": 1"
          }
        ],
        "id": "react-009.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Capture event fields synchronously",
        "expected": "currentTarget is BUTTON; target depends on the actual clicked node. The handler stores plain strings immediately.",
        "steps": [
          "target identifies the origin of the event.",
          "currentTarget is assigned for this handler and should be read before returning."
        ],
        "test": [
          {
            "action": "click",
            "label": "Inspect React event",
            "expect": "\"currentTarget\": \"BUTTON\""
          }
        ],
        "id": "react-009.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-009.q01",
        "level": "Beginner",
        "question": "What does Event handling mean?",
        "answer": "React handlers are callback functions invoked for events. Synthetic events expose the origin and the current handler owner."
      },
      {
        "id": "react-009.q02",
        "level": "Beginner",
        "question": "When would you use Event handling?",
        "answer": "Update state from explicit user actions and inspect event fields within the handler."
      },
      {
        "id": "react-009.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Handler runs only on a click”.",
        "answer": "Nothing increments until the user clicks."
      },
      {
        "id": "react-009.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Passing the result of a function call instead of a callback.",
        "answer": "Pass the function reference or an arrow that calls it when the event occurs."
      },
      {
        "id": "react-009.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Event handling in production?",
        "answer": "Handlers observe their render’s state snapshot; batch updates or functional updaters apply normally."
      },
      {
        "id": "react-009.q06",
        "level": "Scenario",
        "question": "How would you verify “Capture event fields synchronously” in a real application?",
        "answer": "currentTarget is BUTTON; target depends on the actual clicked node. The handler stores plain strings immediately. Observe the actual controls and committed output. target identifies the origin of the event. currentTarget is assigned for this handler and should be read before returning."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-010",
    "description": "A controlled input gets its value or checked state from React and reports changes through an event handler.",
    "when": "Keep form UI synchronized with application state.",
    "avoid": "Avoid switching between undefined and defined values or omitting the change handler.",
    "tradeoff": "Text value, checkbox checked and select value have different native control contracts.",
    "mistakes": [
      {
        "problem": "Supplying a value without updating state on user input.",
        "fix": "Initialize with a defined value and update it in onChange."
      }
    ],
    "examples": [
      {
        "title": "Controlled text input",
        "expected": "Every edit appears in React state and the rendered output.",
        "steps": [
          "The event supplies the current input text.",
          "React commits that state back to value."
        ],
        "test": [
          {
            "action": "clear",
            "label": "Controlled name"
          },
          {
            "action": "type",
            "label": "Controlled name",
            "value": "Grace",
            "expect": "\"name\": \"Grace\""
          }
        ],
        "id": "react-010.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Controlled checkbox and select",
        "expected": "Checkbox uses checked; select uses value. Both update the actual React state.",
        "steps": [
          "Read target.checked for the boolean control.",
          "Read target.value for the selected option."
        ],
        "test": [
          {
            "action": "click",
            "label": "Notifications",
            "expect": "\"notifications\": true"
          },
          {
            "action": "select",
            "label": "Theme",
            "value": "dark",
            "expect": "\"theme\": \"dark\""
          }
        ],
        "id": "react-010.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-010.q01",
        "level": "Beginner",
        "question": "What does Controlled components mean?",
        "answer": "A controlled input gets its value or checked state from React and reports changes through an event handler."
      },
      {
        "id": "react-010.q02",
        "level": "Beginner",
        "question": "When would you use Controlled components?",
        "answer": "Keep form UI synchronized with application state."
      },
      {
        "id": "react-010.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Controlled text input”.",
        "answer": "Every edit appears in React state and the rendered output."
      },
      {
        "id": "react-010.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Supplying a value without updating state on user input.",
        "answer": "Initialize with a defined value and update it in onChange."
      },
      {
        "id": "react-010.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Controlled components in production?",
        "answer": "Text value, checkbox checked and select value have different native control contracts."
      },
      {
        "id": "react-010.q06",
        "level": "Scenario",
        "question": "How would you verify “Controlled checkbox and select” in a real application?",
        "answer": "Checkbox uses checked; select uses value. Both update the actual React state. Observe the actual controls and committed output. Read target.checked for the boolean control. Read target.value for the selected option."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-011",
    "description": "Uncontrolled inputs keep their current value in the DOM. defaultValue initializes the field; refs or FormData read it when needed.",
    "when": "Read a native form on submit or integrate an imperative DOM control.",
    "avoid": "Avoid mixing a controlled value prop with an uncontrolled defaultValue contract.",
    "tradeoff": "DOM state can differ from React state until the chosen read/submit event.",
    "mistakes": [
      {
        "problem": "Expecting defaultValue to overwrite user edits on every parent render.",
        "fix": "Choose one ownership model and read DOM values at the explicit boundary."
      }
    ],
    "examples": [
      {
        "title": "Read an uncontrolled ref on demand",
        "expected": "Editing changes the DOM input immediately; captured stays unchanged until Read DOM value.",
        "steps": [
          "defaultValue supplies only the initial field value.",
          "The event handler reads the live DOM ref and then updates output state."
        ],
        "test": [
          {
            "action": "clear",
            "label": "Uncontrolled name"
          },
          {
            "action": "type",
            "label": "Uncontrolled name",
            "value": "Grace"
          },
          {
            "action": "click",
            "label": "Read DOM value",
            "expect": "\"captured\": \"Grace\""
          }
        ],
        "id": "react-011.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Collect FormData on submit",
        "expected": "Submitting reads the actual form controls, not a duplicate React copy of every field.",
        "steps": [
          "Native controls retain their values.",
          "FormData collects successful named controls at submit time."
        ],
        "test": [
          {
            "action": "select",
            "label": "Form role",
            "value": "reviewer"
          },
          {
            "action": "click",
            "label": "Read form data",
            "expect": "\"role\": \"reviewer\""
          }
        ],
        "id": "react-011.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-011.q01",
        "level": "Beginner",
        "question": "What does Uncontrolled components mean?",
        "answer": "Uncontrolled inputs keep their current value in the DOM. defaultValue initializes the field; refs or FormData read it when needed."
      },
      {
        "id": "react-011.q02",
        "level": "Beginner",
        "question": "When would you use Uncontrolled components?",
        "answer": "Read a native form on submit or integrate an imperative DOM control."
      },
      {
        "id": "react-011.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Read an uncontrolled ref on demand”.",
        "answer": "Editing changes the DOM input immediately; captured stays unchanged until Read DOM value."
      },
      {
        "id": "react-011.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Expecting defaultValue to overwrite user edits on every parent render.",
        "answer": "Choose one ownership model and read DOM values at the explicit boundary."
      },
      {
        "id": "react-011.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Uncontrolled components in production?",
        "answer": "DOM state can differ from React state until the chosen read/submit event."
      },
      {
        "id": "react-011.q06",
        "level": "Scenario",
        "question": "How would you verify “Collect FormData on submit” in a real application?",
        "answer": "Submitting reads the actual form controls, not a duplicate React copy of every field. Observe the actual controls and committed output. Native controls retain their values. FormData collects successful named controls at submit time."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-012",
    "description": "Props are supplied by a parent for a render; state belongs to the mounted component instance and persists between its renders.",
    "when": "Keep an explicit owner for each piece of data.",
    "avoid": "Avoid copying a prop into state unless later independence is intentional.",
    "tradeoff": "Duplicated ownership creates synchronization problems; derived render values often need no extra state.",
    "mistakes": [
      {
        "problem": "Expecting a useState initial value to synchronize automatically when the prop changes.",
        "fix": "Render the prop directly or intentionally reset/remount or control the value from the parent."
      }
    ],
    "examples": [
      {
        "title": "Initialized local state is independent from later props",
        "expected": "The seed prop becomes three while existing local state stays two until its own update.",
        "steps": [
          "Initial state uses the prop once for that instance.",
          "Later props do not overwrite existing state."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change seed prop",
            "expect": "\"local\": 2"
          },
          {
            "action": "click",
            "label": "Increment child local",
            "expect": "\"local\": 3"
          }
        ],
        "id": "react-012.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Parent-owned value stays synchronized",
        "expected": "Both parent and child actions update the one parent-owned value.",
        "steps": [
          "The child receives a value and a callback.",
          "It requests a new value instead of maintaining a second copy."
        ],
        "test": [
          {
            "action": "click",
            "label": "Increment parent value",
            "expect": "\"value\": 3"
          },
          {
            "action": "click",
            "label": "Increment controlled child",
            "expect": "\"value\": 4"
          }
        ],
        "id": "react-012.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-012.q01",
        "level": "Beginner",
        "question": "What does State vs props mean?",
        "answer": "Props are supplied by a parent for a render; state belongs to the mounted component instance and persists between its renders."
      },
      {
        "id": "react-012.q02",
        "level": "Beginner",
        "question": "When would you use State vs props?",
        "answer": "Keep an explicit owner for each piece of data."
      },
      {
        "id": "react-012.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Initialized local state is independent from later props”.",
        "answer": "The seed prop becomes three while existing local state stays two until its own update."
      },
      {
        "id": "react-012.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Expecting a useState initial value to synchronize automatically when the prop changes.",
        "answer": "Render the prop directly or intentionally reset/remount or control the value from the parent."
      },
      {
        "id": "react-012.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using State vs props in production?",
        "answer": "Duplicated ownership creates synchronization problems; derived render values often need no extra state."
      },
      {
        "id": "react-012.q06",
        "level": "Scenario",
        "question": "How would you verify “Parent-owned value stays synchronized” in a real application?",
        "answer": "Both parent and child actions update the one parent-owned value. Observe the actual controls and committed output. The child receives a value and a callback. It requests a new value instead of maintaining a second copy."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-013",
    "description": "Lifting state moves shared data to the nearest common parent so several children render a consistent source of truth.",
    "when": "Coordinate related controls or sibling views.",
    "avoid": "Avoid keeping independent copies of data that must agree.",
    "tradeoff": "Lifting improves consistency but can broaden the subtree affected by updates.",
    "mistakes": [
      {
        "problem": "Changing one field while a sibling continues using a separate stale state value.",
        "fix": "Keep one canonical value and derive the sibling representation."
      }
    ],
    "examples": [
      {
        "title": "Shared Celsius and Fahrenheit inputs",
        "expected": "Celsius 30 derives Fahrenheit 86. Invalid numeric text is handled without passing NaN to an input.",
        "steps": [
          "Only the last edited scale/text is stored.",
          "The other scale is derived during rendering."
        ],
        "test": [
          {
            "action": "clear",
            "label": "Celsius"
          },
          {
            "action": "type",
            "label": "Celsius",
            "value": "30",
            "expect": "\"fahrenheit\": 86"
          }
        ],
        "id": "react-013.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Sibling controls share one counter",
        "expected": "Clicking either sibling updates the value passed to both.",
        "steps": [
          "The common parent owns count.",
          "Both callbacks request changes to that same owner."
        ],
        "test": [
          {
            "action": "click",
            "label": "Left sibling",
            "expect": "\"count\": 1"
          },
          {
            "action": "click",
            "label": "Right sibling",
            "expect": "\"count\": 2"
          }
        ],
        "id": "react-013.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-013.q01",
        "level": "Beginner",
        "question": "What does Lifting state up mean?",
        "answer": "Lifting state moves shared data to the nearest common parent so several children render a consistent source of truth."
      },
      {
        "id": "react-013.q02",
        "level": "Beginner",
        "question": "When would you use Lifting state up?",
        "answer": "Coordinate related controls or sibling views."
      },
      {
        "id": "react-013.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Shared Celsius and Fahrenheit inputs”.",
        "answer": "Celsius 30 derives Fahrenheit 86. Invalid numeric text is handled without passing NaN to an input."
      },
      {
        "id": "react-013.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Changing one field while a sibling continues using a separate stale state value.",
        "answer": "Keep one canonical value and derive the sibling representation."
      },
      {
        "id": "react-013.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Lifting state up in production?",
        "answer": "Lifting improves consistency but can broaden the subtree affected by updates."
      },
      {
        "id": "react-013.q06",
        "level": "Scenario",
        "question": "How would you verify “Sibling controls share one counter” in a real application?",
        "answer": "Clicking either sibling updates the value passed to both. Observe the actual controls and committed output. The common parent owns count. Both callbacks request changes to that same owner."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-014",
    "description": "Composition builds a component from smaller components and caller-provided elements instead of an inheritance hierarchy.",
    "when": "Reuse layout while keeping content and behavior with their owners.",
    "avoid": "Avoid layouts that must know every possible child’s private state.",
    "tradeoff": "Composition preserves ordinary tree identity rules; passing children does not automatically memoize them.",
    "mistakes": [
      {
        "problem": "Changing a wrapper’s component type unintentionally and resetting descendants.",
        "fix": "Keep stable component types and vary props or children deliberately."
      }
    ],
    "examples": [
      {
        "title": "Compose a configurable shell",
        "expected": "The shell updates its title while rendering caller content through children.",
        "steps": [
          "The caller chooses content and state.",
          "The wrapper supplies only layout."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change shell title",
            "expect": "\"title\": \"Settings\""
          }
        ],
        "id": "react-014.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Change layout props without resetting a child",
        "expected": "Increment the child, then change panel appearance: the child count stays one.",
        "steps": [
          "The wrapper’s type and the child position remain the same.",
          "A changed presentation prop does not create a new child identity."
        ],
        "test": [
          {
            "action": "click",
            "label": "Composition child increment",
            "expect": "\"count\": 1"
          },
          {
            "action": "click",
            "label": "Toggle panel appearance",
            "expect": "\"count\": 1"
          }
        ],
        "id": "react-014.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-014.q01",
        "level": "Beginner",
        "question": "What does Component composition mean?",
        "answer": "Composition builds a component from smaller components and caller-provided elements instead of an inheritance hierarchy."
      },
      {
        "id": "react-014.q02",
        "level": "Beginner",
        "question": "When would you use Component composition?",
        "answer": "Reuse layout while keeping content and behavior with their owners."
      },
      {
        "id": "react-014.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Compose a configurable shell”.",
        "answer": "The shell updates its title while rendering caller content through children."
      },
      {
        "id": "react-014.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Changing a wrapper’s component type unintentionally and resetting descendants.",
        "answer": "Keep stable component types and vary props or children deliberately."
      },
      {
        "id": "react-014.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Component composition in production?",
        "answer": "Composition preserves ordinary tree identity rules; passing children does not automatically memoize them."
      },
      {
        "id": "react-014.q06",
        "level": "Scenario",
        "question": "How would you verify “Change layout props without resetting a child” in a real application?",
        "answer": "Increment the child, then change panel appearance: the child count stays one. Observe the actual controls and committed output. The wrapper’s type and the child position remain the same. A changed presentation prop does not create a new child identity."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-015",
    "description": "Parent-child communication uses props for input and callback props for requests back to the owner.",
    "when": "Keep a clear one-way data flow across component boundaries.",
    "avoid": "Avoid mutating a parent object through a child prop.",
    "tradeoff": "The parent owns the update; the child can remain a reusable view.",
    "mistakes": [
      {
        "problem": "Trying to assign a received prop instead of requesting an owner update.",
        "fix": "Provide an explicit callback describing the allowed action."
      }
    ],
    "examples": [
      {
        "title": "A child renders changing parent data",
        "expected": "The child follows parent data without storing a second name.",
        "steps": [
          "The parent input updates its state.",
          "React passes the new name into the child render."
        ],
        "test": [
          {
            "action": "clear",
            "label": "Parent name"
          },
          {
            "action": "type",
            "label": "Parent name",
            "value": "Grace",
            "expect": "\"childName\": \"Grace\""
          }
        ],
        "id": "react-015.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "A child requests a parent quantity change",
        "expected": "The child’s request changes quantity and the parent’s derived subtotal.",
        "steps": [
          "The child invokes its onIncrease contract.",
          "The parent updates the canonical state and derives subtotal."
        ],
        "test": [
          {
            "action": "click",
            "label": "Request another item (1)",
            "expect": "\"subtotal\": 10"
          }
        ],
        "id": "react-015.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-015.q01",
        "level": "Beginner",
        "question": "What does Parent-child communication mean?",
        "answer": "Parent-child communication uses props for input and callback props for requests back to the owner."
      },
      {
        "id": "react-015.q02",
        "level": "Beginner",
        "question": "When would you use Parent-child communication?",
        "answer": "Keep a clear one-way data flow across component boundaries."
      },
      {
        "id": "react-015.q03",
        "level": "Intermediate",
        "question": "Predict the result of “A child renders changing parent data”.",
        "answer": "The child follows parent data without storing a second name."
      },
      {
        "id": "react-015.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Trying to assign a received prop instead of requesting an owner update.",
        "answer": "Provide an explicit callback describing the allowed action."
      },
      {
        "id": "react-015.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Parent-child communication in production?",
        "answer": "The parent owns the update; the child can remain a reusable view."
      },
      {
        "id": "react-015.q06",
        "level": "Scenario",
        "question": "How would you verify “A child requests a parent quantity change” in a real application?",
        "answer": "The child’s request changes quantity and the parent’s derived subtotal. Observe the actual controls and committed output. The child invokes its onIncrease contract. The parent updates the canonical state and derives subtotal."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-016",
    "description": "A callback prop lets a child report an event or validated value to its parent without owning parent state.",
    "when": "Report a selected record or a completed child form.",
    "avoid": "Avoid invoking a callback while rendering or relying on a component return value as an event channel.",
    "tradeoff": "The callback can close over parent state; use updater functions when appropriate.",
    "mistakes": [
      {
        "problem": "Calling the parent callback as part of JSX evaluation.",
        "fix": "Invoke it from an event handler after the user action."
      }
    ],
    "examples": [
      {
        "title": "Report a selected record",
        "expected": "Choosing Grace reports its ID/name to the parent’s selected state.",
        "steps": [
          "The child handles a real click.",
          "Its callback passes a specific value to the parent."
        ],
        "test": [
          {
            "action": "click",
            "label": "Choose Grace",
            "expect": "\"selected\": \"Grace\""
          }
        ],
        "id": "react-016.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Report a child-owned draft only on submit",
        "expected": "Typing edits the child’s local draft; only Send to parent changes the parent result.",
        "steps": [
          "The child owns temporary editing state.",
          "Submission crosses the boundary through a typed callback."
        ],
        "test": [
          {
            "action": "clear",
            "label": "Child draft"
          },
          {
            "action": "type",
            "label": "Child draft",
            "value": "Reviewed"
          },
          {
            "action": "click",
            "label": "Send to parent",
            "expect": "\"submitted\": \"Reviewed\""
          }
        ],
        "id": "react-016.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-016.q01",
        "level": "Beginner",
        "question": "What does Child-to-parent callbacks mean?",
        "answer": "A callback prop lets a child report an event or validated value to its parent without owning parent state."
      },
      {
        "id": "react-016.q02",
        "level": "Beginner",
        "question": "When would you use Child-to-parent callbacks?",
        "answer": "Report a selected record or a completed child form."
      },
      {
        "id": "react-016.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Report a selected record”.",
        "answer": "Choosing Grace reports its ID/name to the parent’s selected state."
      },
      {
        "id": "react-016.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Calling the parent callback as part of JSX evaluation.",
        "answer": "Invoke it from an event handler after the user action."
      },
      {
        "id": "react-016.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Child-to-parent callbacks in production?",
        "answer": "The callback can close over parent state; use updater functions when appropriate."
      },
      {
        "id": "react-016.q06",
        "level": "Scenario",
        "question": "How would you verify “Report a child-owned draft only on submit” in a real application?",
        "answer": "Typing edits the child’s local draft; only Send to parent changes the parent result. Observe the actual controls and committed output. The child owns temporary editing state. Submission crosses the boundary through a typed callback."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-017",
    "description": "Form handling combines input ownership, submit events and validation. Client checks improve feedback but do not establish server trust.",
    "when": "Give clear local feedback before an operation and validate again at server boundaries.",
    "avoid": "Avoid treating a simple email check as a complete address validator or a security boundary.",
    "tradeoff": "These examples are client form behavior; later full-stack phases add persistence and server-side business validation.",
    "mistakes": [
      {
        "problem": "Submitting invalid input or relying on browser-required validation while custom tests never reach the handler.",
        "fix": "Choose explicit native or custom validation and expose an accessible error state."
      }
    ],
    "examples": [
      {
        "title": "Controlled form with explicit validation",
        "expected": "An empty submit is rejected; a name and ordinary valid email are accepted. No form data is sent externally.",
        "steps": [
          "The handler prevents native navigation.",
          "Explicit validation sets an error or accepted state."
        ],
        "test": [
          {
            "action": "click",
            "label": "Validate form",
            "expect": "\"accepted\": false"
          },
          {
            "action": "type",
            "label": "Display name",
            "value": "Ada"
          },
          {
            "action": "type",
            "label": "Email address",
            "value": "ada@example.test"
          },
          {
            "action": "click",
            "label": "Validate form",
            "expect": "\"accepted\": true"
          }
        ],
        "id": "react-017.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Browser constraint validation",
        "expected": "The native validity API returns false for an empty required email and true for a valid address.",
        "steps": [
          "noValidate lets the handler inspect the validity result explicitly.",
          "checkValidity evaluates the real DOM control constraints."
        ],
        "test": [
          {
            "action": "click",
            "label": "Check native constraints",
            "expect": "\"valid\": false"
          },
          {
            "action": "type",
            "label": "Required email",
            "value": "ada@example.test"
          },
          {
            "action": "click",
            "label": "Check native constraints",
            "expect": "\"valid\": true"
          }
        ],
        "id": "react-017.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-017.q01",
        "level": "Beginner",
        "question": "What does Forms and validation mean?",
        "answer": "Form handling combines input ownership, submit events and validation. Client checks improve feedback but do not establish server trust."
      },
      {
        "id": "react-017.q02",
        "level": "Beginner",
        "question": "When would you use Forms and validation?",
        "answer": "Give clear local feedback before an operation and validate again at server boundaries."
      },
      {
        "id": "react-017.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Controlled form with explicit validation”.",
        "answer": "An empty submit is rejected; a name and ordinary valid email are accepted. No form data is sent externally."
      },
      {
        "id": "react-017.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Submitting invalid input or relying on browser-required validation while custom tests never reach the handler.",
        "answer": "Choose explicit native or custom validation and expose an accessible error state."
      },
      {
        "id": "react-017.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Forms and validation in production?",
        "answer": "These examples are client form behavior; later full-stack phases add persistence and server-side business validation."
      },
      {
        "id": "react-017.q06",
        "level": "Scenario",
        "question": "How would you verify “Browser constraint validation” in a real application?",
        "answer": "The native validity API returns false for an empty required email and true for a valid address. Observe the actual controls and committed output. noValidate lets the handler inspect the validity result explicitly. checkValidity evaluates the real DOM control constraints."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-018",
    "description": "A committed component can mount, update and unmount. Effects synchronize functional components; class lifecycles offer a useful historical comparison.",
    "when": "Understand ownership and when cleanup occurs.",
    "avoid": "Avoid equating every function invocation with a mount or assuming an effect is identical to a class lifecycle method.",
    "tradeoff": "Render may be restarted; these observations are emitted from committed lifecycle work.",
    "mistakes": [
      {
        "problem": "Releasing resources only on dependency changes but forgetting unmount cleanup.",
        "fix": "Return effect cleanup or implement the appropriate class unmount cleanup."
      }
    ],
    "examples": [
      {
        "title": "Function component lifecycle trace",
        "expected": "Changing the prop cleans up the previous effect then sets up the new value; unmount also cleans up.",
        "steps": [
          "React first commits the changed UI.",
          "The previous effect’s cleanup and next setup record their captured values."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change lifecycle prop",
            "expect": "\"value\": 1",
            "trace": "function cleanup"
          }
        ],
        "id": "react-018.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Class lifecycle comparison",
        "expected": "The actual class records mount/update/unmount lifecycle methods. This does not claim identical scheduling to passive effects.",
        "steps": [
          "React calls class lifecycle methods for committed work.",
          "The update method can inspect the previous props."
        ],
        "test": [
          {
            "action": "click",
            "label": "Update class child",
            "expect": "\"value\": 1",
            "trace": "class update"
          }
        ],
        "id": "react-018.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-018.q01",
        "level": "Beginner",
        "question": "What does Component lifecycle behavior mean?",
        "answer": "A committed component can mount, update and unmount. Effects synchronize functional components; class lifecycles offer a useful historical comparison."
      },
      {
        "id": "react-018.q02",
        "level": "Beginner",
        "question": "When would you use Component lifecycle behavior?",
        "answer": "Understand ownership and when cleanup occurs."
      },
      {
        "id": "react-018.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Function component lifecycle trace”.",
        "answer": "Changing the prop cleans up the previous effect then sets up the new value; unmount also cleans up."
      },
      {
        "id": "react-018.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Releasing resources only on dependency changes but forgetting unmount cleanup.",
        "answer": "Return effect cleanup or implement the appropriate class unmount cleanup."
      },
      {
        "id": "react-018.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Component lifecycle behavior in production?",
        "answer": "Render may be restarted; these observations are emitted from committed lifecycle work."
      },
      {
        "id": "react-018.q06",
        "level": "Scenario",
        "question": "How would you verify “Class lifecycle comparison” in a real application?",
        "answer": "The actual class records mount/update/unmount lifecycle methods. This does not claim identical scheduling to passive effects. Observe the actual controls and committed output. React calls class lifecycle methods for committed work. The update method can inspect the previous props."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-019",
    "description": "Unmounting removes a component instance and its state. Hiding a mounted DOM subtree preserves the component’s state.",
    "when": "Choose between ending ownership and merely hiding presentation.",
    "avoid": "Avoid expecting removed component state to survive a fresh mount automatically.",
    "tradeoff": "A hidden component can still own effects, so hiding alone is not resource cleanup.",
    "mistakes": [
      {
        "problem": "Confusing hidden content with an unmounted component.",
        "fix": "Conditionally render to unmount; use hidden only when retained state is intended."
      }
    ],
    "examples": [
      {
        "title": "Conditional removal resets local state",
        "expected": "Increment, remove, then remount: the new child starts at zero.",
        "steps": [
          "Conditional absence unmounts the old instance.",
          "A later instance receives fresh state."
        ],
        "test": [
          {
            "action": "click",
            "label": "Mounted child increment",
            "expect": "\"count\": 1"
          },
          {
            "action": "click",
            "label": "Toggle mounted child"
          },
          {
            "action": "click",
            "label": "Toggle mounted child",
            "expect": "\"count\": 0"
          }
        ],
        "id": "react-019.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Hidden DOM preserves the mounted state",
        "expected": "Increment, hide, then show: the retained child still has count one.",
        "steps": [
          "hidden changes DOM visibility rather than removing the React instance.",
          "Its state and effects remain owned while hidden."
        ],
        "test": [
          {
            "action": "click",
            "label": "Mounted child increment"
          },
          {
            "action": "click",
            "label": "Toggle hidden child"
          },
          {
            "action": "click",
            "label": "Toggle hidden child",
            "expect": "\"count\": 1"
          }
        ],
        "id": "react-019.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-019.q01",
        "level": "Beginner",
        "question": "What does Mounting and unmounting mean?",
        "answer": "Unmounting removes a component instance and its state. Hiding a mounted DOM subtree preserves the component’s state."
      },
      {
        "id": "react-019.q02",
        "level": "Beginner",
        "question": "When would you use Mounting and unmounting?",
        "answer": "Choose between ending ownership and merely hiding presentation."
      },
      {
        "id": "react-019.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Conditional removal resets local state”.",
        "answer": "Increment, remove, then remount: the new child starts at zero."
      },
      {
        "id": "react-019.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Confusing hidden content with an unmounted component.",
        "answer": "Conditionally render to unmount; use hidden only when retained state is intended."
      },
      {
        "id": "react-019.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Mounting and unmounting in production?",
        "answer": "A hidden component can still own effects, so hiding alone is not resource cleanup."
      },
      {
        "id": "react-019.q06",
        "level": "Scenario",
        "question": "How would you verify “Hidden DOM preserves the mounted state” in a real application?",
        "answer": "Increment, hide, then show: the retained child still has count one. Observe the actual controls and committed output. hidden changes DOM visibility rather than removing the React instance. Its state and effects remain owned while hidden."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-020",
    "description": "React preserves state for matching component identity at a tree position. Changing a key or component type intentionally resets that subtree.",
    "when": "Reset entity-specific drafts or preserve state while changing presentation props.",
    "avoid": "Avoid random keys and nested component definitions that create accidental new identities.",
    "tradeoff": "State belongs to the tree identity, not to a JSX source-line label.",
    "mistakes": [
      {
        "problem": "Keeping another entity’s local draft because the component identity did not change.",
        "fix": "Use an entity key when a new entity should receive a fresh draft."
      }
    ],
    "examples": [
      {
        "title": "Stable position versus explicit key reset",
        "expected": "Without an entity key, changing person preserves the old draft. With the key enabled, changing person initializes its own draft.",
        "steps": [
          "The stable key preserves the same editor instance.",
          "An entity-specific key creates a new instance when its value changes."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change editor person",
            "expect": "\"draft\": \"Ada\""
          },
          {
            "action": "click",
            "label": "Reset with entity key",
            "expect": "\"draft\": \"Grace\""
          }
        ],
        "id": "react-020.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Different component types reset at the same position",
        "expected": "Increment the first type then switch: the other component type starts at zero.",
        "steps": [
          "React sees a different element type at the matched position.",
          "It removes the old subtree and mounts the new one."
        ],
        "test": [
          {
            "action": "click",
            "label": "Type counter increment",
            "expect": "\"count\": 1"
          },
          {
            "action": "click",
            "label": "Switch component type",
            "expect": "\"count\": 0"
          }
        ],
        "id": "react-020.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-020.q01",
        "level": "Beginner",
        "question": "What does State preservation and resetting mean?",
        "answer": "React preserves state for matching component identity at a tree position. Changing a key or component type intentionally resets that subtree."
      },
      {
        "id": "react-020.q02",
        "level": "Beginner",
        "question": "When would you use State preservation and resetting?",
        "answer": "Reset entity-specific drafts or preserve state while changing presentation props."
      },
      {
        "id": "react-020.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Stable position versus explicit key reset”.",
        "answer": "Without an entity key, changing person preserves the old draft. With the key enabled, changing person initializes its own draft."
      },
      {
        "id": "react-020.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Keeping another entity’s local draft because the component identity did not change.",
        "answer": "Use an entity key when a new entity should receive a fresh draft."
      },
      {
        "id": "react-020.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using State preservation and resetting in production?",
        "answer": "State belongs to the tree identity, not to a JSX source-line label."
      },
      {
        "id": "react-020.q06",
        "level": "Scenario",
        "question": "How would you verify “Different component types reset at the same position” in a real application?",
        "answer": "Increment the first type then switch: the other component type starts at zero. Observe the actual controls and committed output. React sees a different element type at the matched position. It removes the old subtree and mounts the new one."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-021",
    "description": "Rendering computes a new element description; reconciliation decides which committed DOM nodes can be reused.",
    "when": "Understand why updating text need not replace a whole DOM node.",
    "avoid": "Avoid equating React render calls with full DOM replacement.",
    "tradeoff": "These examples inspect real DOM references, not a fabricated virtual-tree diff.",
    "mistakes": [
      {
        "problem": "Assuming every state update creates a new host element.",
        "fix": "Observe actual node identity and distinguish element type changes from text/prop changes."
      }
    ],
    "examples": [
      {
        "title": "Text updates reuse a DOM node",
        "expected": "Remember the node, update text and compare: the same span node is retained.",
        "steps": [
          "React produces a new element description.",
          "A matching host type/position can update the existing node."
        ],
        "test": [
          {
            "action": "click",
            "label": "Remember DOM node"
          },
          {
            "action": "click",
            "label": "Update node content"
          },
          {
            "action": "click",
            "label": "Compare DOM node",
            "expect": "\"sameNode\": true"
          }
        ],
        "id": "react-021.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Changing the host type replaces the node",
        "expected": "Remember a span, switch it to strong and compare: node identity differs.",
        "steps": [
          "The host element type changes.",
          "React commits a different DOM node for the replacement type."
        ],
        "test": [
          {
            "action": "click",
            "label": "Remember DOM node"
          },
          {
            "action": "click",
            "label": "Update node content"
          },
          {
            "action": "click",
            "label": "Compare DOM node",
            "expect": "\"sameNode\": false"
          }
        ],
        "id": "react-021.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-021.q01",
        "level": "Beginner",
        "question": "What does React rendering and reconciliation mean?",
        "answer": "Rendering computes a new element description; reconciliation decides which committed DOM nodes can be reused."
      },
      {
        "id": "react-021.q02",
        "level": "Beginner",
        "question": "When would you use React rendering and reconciliation?",
        "answer": "Understand why updating text need not replace a whole DOM node."
      },
      {
        "id": "react-021.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Text updates reuse a DOM node”.",
        "answer": "Remember the node, update text and compare: the same span node is retained."
      },
      {
        "id": "react-021.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Assuming every state update creates a new host element.",
        "answer": "Observe actual node identity and distinguish element type changes from text/prop changes."
      },
      {
        "id": "react-021.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using React rendering and reconciliation in production?",
        "answer": "These examples inspect real DOM references, not a fabricated virtual-tree diff."
      },
      {
        "id": "react-021.q06",
        "level": "Scenario",
        "question": "How would you verify “Changing the host type replaces the node” in a real application?",
        "answer": "Remember a span, switch it to strong and compare: node identity differs. Observe the actual controls and committed output. The host element type changes. React commits a different DOM node for the replacement type."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-022",
    "description": "React elements are declarative JavaScript descriptions, not live DOM nodes. React uses them as input to reconciliation.",
    "when": "Understand JSX/createElement output without pretending to inspect private Fiber internals.",
    "avoid": "Avoid manually mutating React elements or treating them as DOM elements.",
    "tradeoff": "Development may freeze element objects; production freezing is not a public correctness guarantee.",
    "mistakes": [
      {
        "problem": "Calling DOM APIs on a React element description.",
        "fix": "Use refs for DOM nodes and treat element descriptions as immutable inputs."
      }
    ],
    "examples": [
      {
        "title": "Inspect an actual React element",
        "expected": "The description’s type is span and it is not an HTMLElement. The rendered span is a separate DOM node.",
        "steps": [
          "JSX creates a React element object.",
          "The event reads its public type/props and observes actual freezing in this build."
        ],
        "test": [
          {
            "action": "click",
            "label": "Inspect React element",
            "expect": "\"isDOMNode\": false"
          }
        ],
        "id": "react-022.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "JSX and createElement produce equivalent descriptions",
        "expected": "Both descriptions render the same text, but they are separate element objects.",
        "steps": [
          "The two creation syntaxes produce compatible type/props shapes.",
          "React independently renders both descriptions."
        ],
        "test": [
          {
            "action": "clear",
            "label": "Shared element text"
          },
          {
            "action": "type",
            "label": "Shared element text",
            "value": "Lab",
            "expect": "\"sameObject\": false"
          }
        ],
        "id": "react-022.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-022.q01",
        "level": "Beginner",
        "question": "What does Virtual DOM concepts mean?",
        "answer": "React elements are declarative JavaScript descriptions, not live DOM nodes. React uses them as input to reconciliation."
      },
      {
        "id": "react-022.q02",
        "level": "Beginner",
        "question": "When would you use Virtual DOM concepts?",
        "answer": "Understand JSX/createElement output without pretending to inspect private Fiber internals."
      },
      {
        "id": "react-022.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Inspect an actual React element”.",
        "answer": "The description’s type is span and it is not an HTMLElement. The rendered span is a separate DOM node."
      },
      {
        "id": "react-022.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Calling DOM APIs on a React element description.",
        "answer": "Use refs for DOM nodes and treat element descriptions as immutable inputs."
      },
      {
        "id": "react-022.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Virtual DOM concepts in production?",
        "answer": "Development may freeze element objects; production freezing is not a public correctness guarantee."
      },
      {
        "id": "react-022.q06",
        "level": "Scenario",
        "question": "How would you verify “JSX and createElement produce equivalent descriptions” in a real application?",
        "answer": "Both descriptions render the same text, but they are separate element objects. Observe the actual controls and committed output. The two creation syntaxes produce compatible type/props shapes. React independently renders both descriptions."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-023",
    "description": "React dispatches capture and bubble handlers through its event system. target is the origin; currentTarget is the component’s handler node.",
    "when": "Coordinate nested controls with deliberate propagation behavior.",
    "avoid": "Avoid assuming stopPropagation cancels default browser actions.",
    "tradeoff": "Synthetic event phases reflect the delegated native event; this lab logs actual values rather than inventing target-phase numbers.",
    "mistakes": [
      {
        "problem": "Expecting a parent capture handler to be undone by a later child stop.",
        "fix": "Separate capture, bubble and default-action requirements."
      }
    ],
    "examples": [
      {
        "title": "React capture and bubbling order",
        "expected": "Click records parent capture, child handler, then parent bubble.",
        "steps": [
          "The capture handler is reached first.",
          "The child and ancestor bubble handlers then run in order."
        ],
        "test": [
          {
            "action": "click",
            "label": "Dispatch React click",
            "trace": "parent bubble"
          }
        ],
        "id": "react-023.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Stop bubble without undoing capture",
        "expected": "Capture and child handlers run, but the parent bubble handler is suppressed.",
        "steps": [
          "Capture already occurred.",
          "The child stops subsequent propagation before the parent bubble callback."
        ],
        "test": [
          {
            "action": "click",
            "label": "Dispatch React click",
            "trace": "child handler"
          }
        ],
        "id": "react-023.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-023.q01",
        "level": "Beginner",
        "question": "What does Event propagation mean?",
        "answer": "React dispatches capture and bubble handlers through its event system. target is the origin; currentTarget is the component’s handler node."
      },
      {
        "id": "react-023.q02",
        "level": "Beginner",
        "question": "When would you use Event propagation?",
        "answer": "Coordinate nested controls with deliberate propagation behavior."
      },
      {
        "id": "react-023.q03",
        "level": "Intermediate",
        "question": "Predict the result of “React capture and bubbling order”.",
        "answer": "Click records parent capture, child handler, then parent bubble."
      },
      {
        "id": "react-023.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Expecting a parent capture handler to be undone by a later child stop.",
        "answer": "Separate capture, bubble and default-action requirements."
      },
      {
        "id": "react-023.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Event propagation in production?",
        "answer": "Synthetic event phases reflect the delegated native event; this lab logs actual values rather than inventing target-phase numbers."
      },
      {
        "id": "react-023.q06",
        "level": "Scenario",
        "question": "How would you verify “Stop bubble without undoing capture” in a real application?",
        "answer": "Capture and child handlers run, but the parent bubble handler is suppressed. Observe the actual controls and committed output. Capture already occurred. The child stops subsequent propagation before the parent bubble callback."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-024",
    "description": "React batches compatible state updates from an event or asynchronous continuation into fewer commits. Rendering and committing are separate observations.",
    "when": "Queue related updates without assuming every setter must commit separately.",
    "avoid": "Avoid counting setter calls as render counts or using batching as a correctness substitute for updater functions.",
    "tradeoff": "React 18+ modern roots support automatic batching; separate intentional user events remain distinct.",
    "mistakes": [
      {
        "problem": "Reading the current render’s state immediately after a setter as if it were changed.",
        "fix": "Use the queued-state model and observe actual committed values."
      }
    ],
    "examples": [
      {
        "title": "Batch updates from one event",
        "expected": "One button updates two fields, and the commit probe records their actual pair.",
        "steps": [
          "Both setters run in one event.",
          "The post-commit observer sees the committed state rather than predicting render calls."
        ],
        "test": [
          {
            "action": "click",
            "label": "Update both fields",
            "expect": "\"active\": true",
            "trace": "batch commit"
          }
        ],
        "id": "react-024.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Batch updates after a promise continuation",
        "expected": "After the real promise continuation, both counters become one and the committed pair is traced.",
        "steps": [
          "Await resumes in an asynchronous continuation.",
          "The modern root batches compatible state updates in that continuation."
        ],
        "test": [
          {
            "action": "click",
            "label": "Update after await"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"right\": 1",
            "trace": "async batch commit"
          }
        ],
        "id": "react-024.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-024.q01",
        "level": "Beginner",
        "question": "What does Automatic batching mean?",
        "answer": "React batches compatible state updates from an event or asynchronous continuation into fewer commits. Rendering and committing are separate observations."
      },
      {
        "id": "react-024.q02",
        "level": "Beginner",
        "question": "When would you use Automatic batching?",
        "answer": "Queue related updates without assuming every setter must commit separately."
      },
      {
        "id": "react-024.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Batch updates from one event”.",
        "answer": "One button updates two fields, and the commit probe records their actual pair."
      },
      {
        "id": "react-024.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Reading the current render’s state immediately after a setter as if it were changed.",
        "answer": "Use the queued-state model and observe actual committed values."
      },
      {
        "id": "react-024.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Automatic batching in production?",
        "answer": "React 18+ modern roots support automatic batching; separate intentional user events remain distinct."
      },
      {
        "id": "react-024.q06",
        "level": "Scenario",
        "question": "How would you verify “Batch updates after a promise continuation” in a real application?",
        "answer": "After the real promise continuation, both counters become one and the committed pair is traced. Observe the actual controls and committed output. Await resumes in an asynchronous continuation. The modern root batches compatible state updates in that continuation."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-025",
    "description": "StrictMode enables development checks for render purity, effect cleanup and ref cleanup. It does not duplicate production effects.",
    "when": "Find missing cleanup and impure assumptions during development.",
    "avoid": "Avoid removing StrictMode merely to hide a lifecycle bug or claiming replay happens in production.",
    "tradeoff": "The comparison uses separate real roots so the parent application’s StrictMode does not contaminate the ordinary-root control.",
    "mistakes": [
      {
        "problem": "Counting development setup calls as separate user mounts.",
        "fix": "Use cleanup-correct logic and describe the current environment explicitly."
      }
    ],
    "examples": [
      {
        "title": "Actual strict versus ordinary root comparison",
        "expected": "Development replays the strict root’s effect; production disables that development replay.",
        "steps": [
          "Each root mounts the same effect probe.",
          "Observed setup/cleanup events identify the environment-specific behavior."
        ],
        "test": [
          {
            "action": "click",
            "label": "Run isolated StrictMode comparison",
            "expect": "\"started\": true",
            "trace": "Plain setup"
          }
        ],
        "id": "react-025.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Callback ref setup and cleanup",
        "expected": "Removing the ref target records its cleanup. Development StrictMode can also replay the initial ref check.",
        "steps": [
          "The callback receives the actual input node at commit.",
          "React 19 supports the cleanup returned by that ref callback."
        ],
        "test": [
          {
            "action": "click",
            "label": "Toggle ref target",
            "expect": "\"show\": false",
            "trace": "ref cleanup"
          }
        ],
        "id": "react-025.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-025.q01",
        "level": "Beginner",
        "question": "What does StrictMode mean?",
        "answer": "StrictMode enables development checks for render purity, effect cleanup and ref cleanup. It does not duplicate production effects."
      },
      {
        "id": "react-025.q02",
        "level": "Beginner",
        "question": "When would you use StrictMode?",
        "answer": "Find missing cleanup and impure assumptions during development."
      },
      {
        "id": "react-025.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Actual strict versus ordinary root comparison”.",
        "answer": "Development replays the strict root’s effect; production disables that development replay."
      },
      {
        "id": "react-025.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Counting development setup calls as separate user mounts.",
        "answer": "Use cleanup-correct logic and describe the current environment explicitly."
      },
      {
        "id": "react-025.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using StrictMode in production?",
        "answer": "The comparison uses separate real roots so the parent application’s StrictMode does not contaminate the ordinary-root control."
      },
      {
        "id": "react-025.q06",
        "level": "Scenario",
        "question": "How would you verify “Callback ref setup and cleanup” in a real application?",
        "answer": "Removing the ref target records its cleanup. Development StrictMode can also replay the initial ref check. Observe the actual controls and committed output. The callback receives the actual input node at commit. React 19 supports the cleanup returned by that ref callback."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-026",
    "description": "Accessible controls use semantic HTML, labels, keyboard behavior and accurate ARIA state.",
    "when": "Make interactions usable without a pointer and expose errors to assistive technology.",
    "avoid": "Avoid replacing native controls with click-only divs or providing ARIA state that disagrees with the UI.",
    "tradeoff": "ARIA augments semantics; it does not implement keyboard behavior for arbitrary elements.",
    "mistakes": [
      {
        "problem": "Displaying a validation error without associating it with its input.",
        "fix": "Connect label, hint/error IDs and focus the invalid control at the user-action boundary."
      }
    ],
    "examples": [
      {
        "title": "Native disclosure with ARIA state",
        "expected": "The button works with keyboard activation and exposes the same expanded value that controls the region.",
        "steps": [
          "A native button supplies Enter/Space behavior.",
          "aria-expanded and aria-controls communicate state and relationship."
        ],
        "test": [
          {
            "action": "click",
            "label": "Toggle accessible details",
            "expect": "\"expanded\": true"
          }
        ],
        "id": "react-026.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Accessible validation and focus",
        "expected": "An empty submit marks the actual input invalid, exposes an associated error and moves focus to it.",
        "steps": [
          "The label targets the generated input ID.",
          "The submit handler validates, updates accessible state and focuses the real ref."
        ],
        "test": [
          {
            "action": "click",
            "label": "Validate accessible name",
            "expect": "\"error\": true"
          },
          {
            "action": "type",
            "label": "Accessible name",
            "value": "Ada"
          },
          {
            "action": "click",
            "label": "Validate accessible name",
            "expect": "\"error\": false"
          }
        ],
        "id": "react-026.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-026.q01",
        "level": "Beginner",
        "question": "What does Accessibility basics mean?",
        "answer": "Accessible controls use semantic HTML, labels, keyboard behavior and accurate ARIA state."
      },
      {
        "id": "react-026.q02",
        "level": "Beginner",
        "question": "When would you use Accessibility basics?",
        "answer": "Make interactions usable without a pointer and expose errors to assistive technology."
      },
      {
        "id": "react-026.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Native disclosure with ARIA state”.",
        "answer": "The button works with keyboard activation and exposes the same expanded value that controls the region."
      },
      {
        "id": "react-026.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Displaying a validation error without associating it with its input.",
        "answer": "Connect label, hint/error IDs and focus the invalid control at the user-action boundary."
      },
      {
        "id": "react-026.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Accessibility basics in production?",
        "answer": "ARIA augments semantics; it does not implement keyboard behavior for arbitrary elements."
      },
      {
        "id": "react-026.q06",
        "level": "Scenario",
        "question": "How would you verify “Accessible validation and focus” in a real application?",
        "answer": "An empty submit marks the actual input invalid, exposes an associated error and moves focus to it. Observe the actual controls and committed output. The label targets the generated input ID. The submit handler validates, updates accessible state and focuses the real ref."
      }
    ],
    "reference": "https://react.dev/learn"
  },
  {
    "id": "react-027",
    "description": "useState stores a component-local snapshot. Setters queue updates for a later render; updater functions compose with previous queued values.",
    "when": "Use local state for information that changes the rendered result.",
    "avoid": "Avoid mutation, redundant derived state and assuming a setter changes the current render’s variable.",
    "tradeoff": "React batches compatible updates. Initializers must be pure; development StrictMode may call them more than once.",
    "mistakes": [
      {
        "problem": "Reading an old snapshot in a delayed callback or mutating a previously saved object.",
        "fix": "Use functional updates when the next value depends on previous state; copy every changed nested level."
      }
    ],
    "examples": [
      {
        "title": "Counter",
        "expected": "Increment changes count by one; Decrement reverses it. Reset example remounts with zero.",
        "steps": [
          "The event queues an updater.",
          "React commits a new render with the updated count."
        ],
        "test": [
          {
            "action": "click",
            "label": "Increment",
            "expect": "\"count\": 1"
          },
          {
            "action": "click",
            "label": "Decrement",
            "expect": "\"count\": 0"
          }
        ],
        "id": "react-027.e01",
        "component": "Example01",
        "aliases": [
          "react-064.e01"
        ]
      },
      {
        "title": "Functional updates",
        "expected": "One click increments by three, because every updater receives the previous queued result.",
        "steps": [
          "The three updater functions enter one queue.",
          "The queue evaluates 0→1→2→3 rather than reading the same captured zero."
        ],
        "test": [
          {
            "action": "click",
            "label": "Queue three functional increments",
            "expect": "\"count\": 3"
          }
        ],
        "id": "react-027.e02",
        "component": "Example02",
        "aliases": [
          "react-065.e01"
        ]
      },
      {
        "title": "Consecutive state updates",
        "expected": "The first queue ends at 42; a replacement followed by an updater ends at 43.",
        "steps": [
          "A direct value replaces the pending result at that queue position.",
          "Later updaters consume that replacement; a later replacement overrides earlier calculations."
        ],
        "test": [
          {
            "action": "click",
            "label": "Replace, update, replace",
            "expect": "\"count\": 42"
          },
          {
            "action": "click",
            "label": "Replace then update",
            "expect": "\"count\": 43"
          }
        ],
        "id": "react-027.e03",
        "component": "Example03",
        "aliases": [
          "react-066.e01"
        ]
      },
      {
        "title": "Object updates",
        "expected": "Editing the name preserves role; changing role preserves the entered name.",
        "steps": [
          "Spread creates a new object.",
          "Only the selected field is replaced; React observes the new state reference."
        ],
        "test": [
          {
            "action": "clear",
            "label": "Name"
          },
          {
            "action": "type",
            "label": "Name",
            "value": "Grace",
            "expect": "\"name\": \"Grace\""
          },
          {
            "action": "click",
            "label": "Change role",
            "expect": "\"role\": \"reviewer\""
          }
        ],
        "id": "react-027.e04",
        "component": "Example04",
        "aliases": [
          "react-067.e01"
        ]
      },
      {
        "title": "Array updates",
        "expected": "Add creates a new array; Remove filters by the stable ID. At most eight items are retained.",
        "steps": [
          "Generate the ID in the event, not during rendering.",
          "Use spread and filter instead of mutating the state array."
        ],
        "test": [
          {
            "action": "click",
            "label": "Add item",
            "expect": "Grace"
          },
          {
            "action": "click",
            "label": "Remove Ada",
            "expect": "\"id\": 2"
          }
        ],
        "id": "react-027.e05",
        "component": "Example05",
        "aliases": [
          "react-068.e01"
        ]
      },
      {
        "title": "Nested state updates",
        "expected": "The shallow-copy bug changes saved history too. Copy the nested path increments current without changing saved history.",
        "steps": [
          "An outer spread still shares the nested profile.",
          "The corrected update replaces both the outer object and its changed profile."
        ],
        "test": [
          {
            "action": "click",
            "label": "Shallow-copy bug",
            "expect": "\"savedHistory\": 2"
          },
          {
            "action": "click",
            "label": "Copy the nested path",
            "expect": "\"current\": 3"
          }
        ],
        "id": "react-027.e06",
        "component": "Example06",
        "aliases": [
          "react-069.e01"
        ]
      },
      {
        "title": "State batching",
        "expected": "One event changes two state fields. The commit trace shows the combined update; render-call counts are not inferred.",
        "steps": [
          "The event queues both state setters.",
          "A post-commit probe records the actual committed pair outside the trace observer."
        ],
        "test": [
          {
            "action": "click",
            "label": "Update both fields",
            "expect": "\"count\": 1",
            "trace": "batch commit"
          }
        ],
        "id": "react-027.e07",
        "component": "Example07",
        "aliases": [
          "react-070.e01"
        ]
      },
      {
        "title": "State vs local variables",
        "expected": "After a click, the event saw local 1 but the next render’s local is zero. State remains incremented.",
        "steps": [
          "The handler changes its current closure’s local variable.",
          "The next component call creates a new local binding while React restores state."
        ],
        "test": [
          {
            "action": "click",
            "label": "Update local and state",
            "expect": "\"renderLocal\": 0"
          },
          {
            "action": "click",
            "label": "Update local and state",
            "expect": "\"count\": 2"
          }
        ],
        "id": "react-027.e08",
        "component": "Example08",
        "aliases": [
          "react-071.e01"
        ]
      },
      {
        "title": "State initialization",
        "expected": "Changing seed updates the prop but not the existing initial state. Remount uses the new seed.",
        "steps": [
          "The lazy initializer is pure and supplies state only for that mounted instance.",
          "A different key creates a fresh instance and runs initialization for the new seed."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change seed",
            "expect": "\"initialSquare\": 4"
          },
          {
            "action": "click",
            "label": "Remount initializer",
            "expect": "\"initialSquare\": 9"
          }
        ],
        "id": "react-027.e09",
        "component": "Example09",
        "aliases": [
          "react-072.e01"
        ]
      },
      {
        "title": "Stale state problems",
        "expected": "Schedule captured, Add ten, Resolve produces 1. The functional version adds to the latest value instead.",
        "steps": [
          "The scheduled callback is a real closure retained across later renders.",
          "Resolving in another browser event exposes the difference between a captured value and an updater."
        ],
        "test": [
          {
            "action": "click",
            "label": "Schedule captured update"
          },
          {
            "action": "click",
            "label": "Add ten",
            "expect": "\"count\": 10"
          },
          {
            "action": "click",
            "label": "Resolve scheduled update",
            "expect": "\"count\": 1"
          },
          {
            "action": "click",
            "label": "Schedule functional update"
          },
          {
            "action": "click",
            "label": "Add ten"
          },
          {
            "action": "click",
            "label": "Resolve scheduled update",
            "expect": "\"count\": 12"
          }
        ],
        "id": "react-027.e10",
        "component": "Example10",
        "aliases": [
          "react-073.e01"
        ]
      }
    ],
    "questions": [
      {
        "id": "react-027.q01",
        "level": "Beginner",
        "question": "What does useState mean?",
        "answer": "useState stores a component-local snapshot. Setters queue updates for a later render; updater functions compose with previous queued values."
      },
      {
        "id": "react-027.q02",
        "level": "Beginner",
        "question": "When would you use useState?",
        "answer": "Use local state for information that changes the rendered result."
      },
      {
        "id": "react-027.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Counter”.",
        "answer": "Increment changes count by one; Decrement reverses it. Reset example remounts with zero."
      },
      {
        "id": "react-027.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Reading an old snapshot in a delayed callback or mutating a previously saved object.",
        "answer": "Use functional updates when the next value depends on previous state; copy every changed nested level."
      },
      {
        "id": "react-027.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useState in production?",
        "answer": "React batches compatible updates. Initializers must be pure; development StrictMode may call them more than once."
      },
      {
        "id": "react-027.q06",
        "level": "Scenario",
        "question": "How would you verify “Stale state problems” in a real application?",
        "answer": "Schedule captured, Add ten, Resolve produces 1. The functional version adds to the latest value instead. Observe the actual controls and committed output. The scheduled callback is a real closure retained across later renders. Resolving in another browser event exposes the difference between a captured value and an updater."
      }
    ],
    "reference": "https://react.dev/reference/react/useState"
  },
  {
    "id": "react-028",
    "description": "useEffect synchronizes a committed component with an external system. Dependencies select when synchronization restarts; cleanup releases the previous resources.",
    "when": "Use effects for subscriptions, timers and requests that follow mounted component state.",
    "avoid": "Avoid effects for simple derived values or direct event-only work. Never make the effect callback itself async.",
    "tradeoff": "Effects run after a commit, not during render. Development StrictMode can add setup/cleanup checks; ordering assertions must identify their environment.",
    "mistakes": [
      {
        "problem": "Writing a dependency again on every effect, missing cleanup, or committing an obsolete request result.",
        "fix": "List reactive dependencies, return synchronous cleanup and cancel/ignore obsolete async work."
      }
    ],
    "examples": [
      {
        "title": "Effect after initial mount",
        "expected": "Mount child records a setup; Remove child records cleanup. Development StrictMode may replay the initial check.",
        "steps": [
          "The child is absent before the click.",
          "A real mounted child runs its effect after commit; removing it runs cleanup."
        ],
        "test": [
          {
            "action": "click",
            "label": "Mount child",
            "expect": "\"mounted\": true",
            "trace": "initial child setup"
          },
          {
            "action": "click",
            "label": "Remove child",
            "trace": "initial child cleanup"
          }
        ],
        "id": "react-028.e01",
        "component": "Example01",
        "aliases": [
          "react-047.e01"
        ]
      },
      {
        "title": "Effect without a dependency array",
        "expected": "The trace records an effect after each committed render, including updates. Logging only updates the separate trace observer.",
        "steps": [
          "No dependency array means every commit of this component.",
          "The effect does not update its own React state, so the trace itself cannot cause a self-render loop."
        ],
        "test": [
          {
            "action": "click",
            "label": "Rerender counter",
            "expect": "\"count\": 1",
            "trace": "no-deps effect"
          }
        ],
        "id": "react-028.e02",
        "component": "Example02",
        "aliases": [
          "react-048.e01"
        ]
      },
      {
        "title": "Effect with an empty dependency array",
        "expected": "Changing the prop updates the child display but does not resubscribe its empty-array effect. Remounting does.",
        "steps": [
          "The effect reads only a stable instrumentation ref.",
          "Its [] dependency list is truly empty; changing a displayed prop does not restart it."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change displayed prop",
            "expect": "\"value\": 1",
            "trace": "empty-array setup"
          }
        ],
        "id": "react-028.e03",
        "component": "Example03",
        "aliases": [
          "react-049.e01"
        ]
      },
      {
        "title": "Effect with specific dependencies",
        "expected": "The count change cleans up the old count and sets up the new one. Unrelated state does not restart the effect.",
        "steps": [
          "React compares dependency values with Object.is.",
          "The cleanup closure retains the previous count."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change dependency",
            "expect": "\"count\": 1",
            "trace": "dependency cleanup"
          },
          {
            "action": "click",
            "label": "Change unrelated state",
            "expect": "\"other\": true"
          }
        ],
        "id": "react-028.e04",
        "component": "Example04",
        "aliases": [
          "react-050.e01"
        ]
      },
      {
        "title": "Fetching data from an API",
        "expected": "The mounted effect performs a real Express GET and shows Ada after loading. Refetch starts a new request.",
        "steps": [
          "A query key owns a real AbortController.",
          "Only the active key can publish a response; cleanup cancels the prior request."
        ],
        "test": [
          {
            "action": "wait",
            "label": "",
            "expect": "\"Ada\""
          },
          {
            "action": "click",
            "label": "Refetch Ada"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"status\": \"success\""
          }
        ],
        "prerequisites": "Requires the real Express API, through the Vite proxy or production server.",
        "id": "react-028.e05",
        "component": "Example05",
        "aliases": [
          "react-051.e01"
        ]
      },
      {
        "title": "Loading and error handling",
        "expected": "Fail request produces a real HTTP 503 and a handled error. Retry returns to success; loading is derived from the active request key.",
        "steps": [
          "The HTTP status is checked before accepting data.",
          "An obsolete key cannot expose a stale loading/error/result snapshot."
        ],
        "test": [
          {
            "action": "click",
            "label": "Fail request"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"status\": \"error\""
          },
          {
            "action": "click",
            "label": "Retry successful request"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"status\": \"success\""
          }
        ],
        "prerequisites": "The failure is an intentional bounded Express response, not a mocked browser result.",
        "id": "react-028.e06",
        "component": "Example06",
        "aliases": [
          "react-052.e01"
        ]
      },
      {
        "title": "Cleanup functions",
        "expected": "Changing room removes the previous listener and registers the new one. A notice is delivered only to the current subscription.",
        "steps": [
          "An actual EventTarget owns the listener.",
          "Cleanup removes the exact callback before the replacement setup."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change subscribed room",
            "expect": "\"room\": \"B\"",
            "trace": "subscription cleanup"
          },
          {
            "action": "click",
            "label": "Send notice",
            "trace": "notice delivered"
          }
        ],
        "id": "react-028.e07",
        "component": "Example07",
        "aliases": [
          "react-053.e01"
        ]
      },
      {
        "title": "Timers and intervals",
        "expected": "The real interval increments up to five, stops with running false and can restart for another five ticks. Stop or unmount clears its handle.",
        "steps": [
          "The effect owns one timer handle.",
          "A local tick counter avoids depending on the rendered tick state and restarting every tick."
        ],
        "test": [
          {
            "action": "click",
            "label": "Start bounded interval"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"ticks\": 5"
          },
          {
            "action": "click",
            "label": "Stop interval",
            "trace": "interval cleanup"
          }
        ],
        "id": "react-028.e08",
        "component": "Example08",
        "aliases": [
          "react-054.e01"
        ]
      },
      {
        "title": "Event listeners",
        "expected": "Each dispatched real browser event increments once. Unmount removes the exact listener.",
        "steps": [
          "The effect subscribes to a namespaced window event.",
          "The returned cleanup prevents retaining the old callback after unmount."
        ],
        "test": [
          {
            "action": "click",
            "label": "Dispatch lab ping",
            "expect": "\"received\": 1",
            "trace": "window ping handled"
          }
        ],
        "id": "react-028.e09",
        "component": "Example09",
        "aliases": [
          "react-055.e01"
        ]
      },
      {
        "title": "Infinite loop scenarios",
        "expected": "The bounded bad pattern repeatedly commits until count three. The doubled value is derived directly without another effect.",
        "steps": [
          "Updating a dependency schedules a new render and another effect.",
          "The safety cap prevents a browser lockup; derivation during render is the simpler corrected pattern."
        ],
        "test": [
          {
            "action": "click",
            "label": "Start bounded loop"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"safetyStop\": true",
            "trace": "self-dependent effect"
          }
        ],
        "id": "react-028.e10",
        "component": "Example10",
        "aliases": [
          "react-056.e01"
        ]
      },
      {
        "title": "Stale closure scenarios",
        "expected": "After incrementing, the missing-dependency listener reads zero while the corrected listener reads the current count.",
        "steps": [
          "The old callback retains its original render’s count.",
          "The corrected dependency list cleans up and replaces the callback when count changes."
        ],
        "test": [
          {
            "action": "click",
            "label": "Increment captured count"
          },
          {
            "action": "click",
            "label": "Read both closures",
            "trace": "stale closure read"
          }
        ],
        "id": "react-028.e11",
        "component": "Example11",
        "aliases": [
          "react-057.e01"
        ]
      },
      {
        "title": "Race conditions",
        "expected": "Run starts actual old/new requests. Guarded results stay Grace; unchecked results reflect whichever response arrived last. The trace records actual order.",
        "steps": [
          "Both real requests begin inside one effect.",
          "A latest-request token protects the intended result; unchecked assignment demonstrates the race."
        ],
        "test": [
          {
            "action": "click",
            "label": "Run request race"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"guarded\": \"Grace\"",
            "trace": "race complete"
          }
        ],
        "prerequisites": "Requires Express. Delay changes are controlled; universal network ordering is not assumed.",
        "id": "react-028.e12",
        "component": "Example12",
        "aliases": [
          "react-058.e01"
        ]
      },
      {
        "title": "Request cancellation",
        "expected": "Cancel active request aborts the real transport. A fresh controller is created when retrying.",
        "steps": [
          "AbortError is handled as cancellation rather than a successful empty response.",
          "Unmount or replacement also aborts owned work."
        ],
        "test": [
          {
            "action": "click",
            "label": "Cancel active request"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"status\": \"cancelled\""
          },
          {
            "action": "click",
            "label": "Start fresh request"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"status\": \"success\""
          }
        ],
        "prerequisites": "Requires the real API; the request is delayed by a bounded 1000 ms.",
        "id": "react-028.e13",
        "component": "Example13",
        "aliases": [
          "react-059.e01"
        ]
      },
      {
        "title": "StrictMode behavior",
        "expected": "Isolated roots compare actual StrictMode and ordinary mounting. Development replays effect setup/cleanup; production does not.",
        "steps": [
          "Separate roots make the comparison independent of the application root’s StrictMode.",
          "The log is emitted by actual effect setup/cleanup, never by a predicted sequence."
        ],
        "test": [
          {
            "action": "click",
            "label": "Run isolated StrictMode comparison",
            "expect": "\"started\": true",
            "trace": "Strict setup"
          }
        ],
        "id": "react-028.e14",
        "component": "Example14",
        "aliases": [
          "react-060.e01"
        ]
      },
      {
        "title": "Fetching on search changes",
        "expected": "Changing the controlled input triggers real requests; old requests are cancelled and old results are hidden. This is not a debounce.",
        "steps": [
          "The query is a real effect dependency.",
          "Cleanup cancels the previous fetch before the next response can publish obsolete data."
        ],
        "test": [
          {
            "action": "clear",
            "label": "Search names"
          },
          {
            "action": "type",
            "label": "Search names",
            "value": "Grace"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"Grace\""
          }
        ],
        "prerequisites": "Requires Express; each query change has real HTTP behavior.",
        "id": "react-028.e15",
        "component": "Example15",
        "aliases": [
          "react-061.e01"
        ]
      },
      {
        "title": "Correct async operation inside an effect",
        "expected": "The inner async function reads actual Express data; the effect itself returns a synchronous cleanup function.",
        "steps": [
          "An async effect callback would return a Promise instead of cleanup.",
          "The inner function awaits, while the outer callback immediately supplies its cleanup."
        ],
        "test": [
          {
            "action": "wait",
            "label": "",
            "expect": "\"Linus\"",
            "trace": "async inner function completed"
          }
        ],
        "prerequisites": "Requires Express. No async callback is passed directly to useEffect.",
        "id": "react-028.e16",
        "component": "Example16",
        "aliases": [
          "react-062.e01"
        ]
      },
      {
        "title": "Unnecessary effects and better alternatives",
        "expected": "Both eventually match, but the effect-derived state needs an extra commit. The trace captures the earlier stale commit instead of fabricating a timing delay.",
        "steps": [
          "A commit first contains the new inputs with the previous effectName.",
          "The effect queues another state update; direct render derivation already has the correct name."
        ],
        "test": [
          {
            "action": "clear",
            "label": "First name"
          },
          {
            "action": "type",
            "label": "First name",
            "value": "Grace"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "Grace Lovelace",
            "trace": "derived-value commit"
          }
        ],
        "id": "react-028.e17",
        "component": "Example17",
        "aliases": [
          "react-063.e01"
        ]
      }
    ],
    "questions": [
      {
        "id": "react-028.q01",
        "level": "Beginner",
        "question": "What does useEffect mean?",
        "answer": "useEffect synchronizes a committed component with an external system. Dependencies select when synchronization restarts; cleanup releases the previous resources."
      },
      {
        "id": "react-028.q02",
        "level": "Beginner",
        "question": "When would you use useEffect?",
        "answer": "Use effects for subscriptions, timers and requests that follow mounted component state."
      },
      {
        "id": "react-028.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Effect after initial mount”.",
        "answer": "Mount child records a setup; Remove child records cleanup. Development StrictMode may replay the initial check."
      },
      {
        "id": "react-028.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Writing a dependency again on every effect, missing cleanup, or committing an obsolete request result.",
        "answer": "List reactive dependencies, return synchronous cleanup and cancel/ignore obsolete async work."
      },
      {
        "id": "react-028.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useEffect in production?",
        "answer": "Effects run after a commit, not during render. Development StrictMode can add setup/cleanup checks; ordering assertions must identify their environment."
      },
      {
        "id": "react-028.q06",
        "level": "Scenario",
        "question": "How would you verify “Unnecessary effects and better alternatives” in a real application?",
        "answer": "Both eventually match, but the effect-derived state needs an extra commit. The trace captures the earlier stale commit instead of fabricating a timing delay. Observe the actual controls and committed output. A commit first contains the new inputs with the previous effectName. The effect queues another state update; direct render derivation already has the correct name."
      }
    ],
    "reference": "https://react.dev/reference/react/useEffect"
  },
  {
    "id": "react-029",
    "description": "useContext reads the nearest matching provider above the consumer and subscribes to that value.",
    "when": "Share a scoped value across distant descendants.",
    "avoid": "Avoid treating context as a replacement for every local state variable.",
    "tradeoff": "Changing a provider value rerenders its consumers; split unrelated contexts when needed.",
    "mistakes": [
      {
        "problem": "Placing the provider below its consumer.",
        "fix": "Place the provider above readers; nested providers deliberately override outer values."
      }
    ],
    "examples": [
      {
        "title": "Two readers of one theme",
        "expected": "Both readers change to dark from one provider update.",
        "steps": [
          "The provider supplies the current theme.",
          "Both children independently read the nearest provider."
        ],
        "test": [
          {
            "action": "click",
            "label": "Toggle context theme",
            "expect": "dark"
          }
        ],
        "id": "react-029.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Nested override and default",
        "expected": "Outside reads default, Inner reads inner, and only the outer reader follows changed outer.",
        "steps": [
          "The fallback is used only when no matching provider exists.",
          "The nearest provider wins independently of siblings."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change outer context",
            "expect": "changed outer"
          }
        ],
        "id": "react-029.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-029.q01",
        "level": "Beginner",
        "question": "What does useContext mean?",
        "answer": "useContext reads the nearest matching provider above the consumer and subscribes to that value."
      },
      {
        "id": "react-029.q02",
        "level": "Beginner",
        "question": "When would you use useContext?",
        "answer": "Share a scoped value across distant descendants."
      },
      {
        "id": "react-029.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Two readers of one theme”.",
        "answer": "Both readers change to dark from one provider update."
      },
      {
        "id": "react-029.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Placing the provider below its consumer.",
        "answer": "Place the provider above readers; nested providers deliberately override outer values."
      },
      {
        "id": "react-029.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useContext in production?",
        "answer": "Changing a provider value rerenders its consumers; split unrelated contexts when needed."
      },
      {
        "id": "react-029.q06",
        "level": "Scenario",
        "question": "How would you verify “Nested override and default” in a real application?",
        "answer": "Outside reads default, Inner reads inner, and only the outer reader follows changed outer. Observe the actual controls and committed output. The fallback is used only when no matching provider exists. The nearest provider wins independently of siblings."
      }
    ],
    "reference": "https://react.dev/reference/react/useContext"
  },
  {
    "id": "react-030",
    "description": "useReducer queues actions and derives the next state with a pure reducer.",
    "when": "Centralize related transitions and make allowed actions explicit.",
    "avoid": "Avoid network requests, ID generation or mutation inside reducers.",
    "tradeoff": "Reducers improve transition structure but do not automatically share state between components.",
    "mistakes": [
      {
        "problem": "Mutating state and returning the same object.",
        "fix": "Return new objects/arrays; generate identifiers at the event boundary."
      }
    ],
    "examples": [
      {
        "title": "Typed counter actions",
        "expected": "Increment adds one; reset returns zero.",
        "steps": [
          "Dispatch queues a discriminated action.",
          "The pure reducer chooses the next value."
        ],
        "test": [
          {
            "action": "click",
            "label": "Reducer increment",
            "expect": "\"count\": 1"
          },
          {
            "action": "click",
            "label": "Reducer reset",
            "expect": "\"count\": 0"
          }
        ],
        "id": "react-030.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Immutable todo transitions",
        "expected": "Add, toggle and remove produce new arrays and preserve other items.",
        "steps": [
          "The event creates the ID outside the reducer.",
          "map and filter express immutable transitions."
        ],
        "test": [
          {
            "action": "click",
            "label": "Add reducer todo"
          },
          {
            "action": "click",
            "label": "Toggle todo 1",
            "expect": "\"done\": true"
          },
          {
            "action": "click",
            "label": "Remove todo 1",
            "expect": "[]"
          }
        ],
        "id": "react-030.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-030.q01",
        "level": "Beginner",
        "question": "What does useReducer mean?",
        "answer": "useReducer queues actions and derives the next state with a pure reducer."
      },
      {
        "id": "react-030.q02",
        "level": "Beginner",
        "question": "When would you use useReducer?",
        "answer": "Centralize related transitions and make allowed actions explicit."
      },
      {
        "id": "react-030.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Typed counter actions”.",
        "answer": "Increment adds one; reset returns zero."
      },
      {
        "id": "react-030.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Mutating state and returning the same object.",
        "answer": "Return new objects/arrays; generate identifiers at the event boundary."
      },
      {
        "id": "react-030.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useReducer in production?",
        "answer": "Reducers improve transition structure but do not automatically share state between components."
      },
      {
        "id": "react-030.q06",
        "level": "Scenario",
        "question": "How would you verify “Immutable todo transitions” in a real application?",
        "answer": "Add, toggle and remove produce new arrays and preserve other items. Observe the actual controls and committed output. The event creates the ID outside the reducer. map and filter express immutable transitions."
      }
    ],
    "reference": "https://react.dev/reference/react/useReducer"
  },
  {
    "id": "react-031",
    "description": "useRef retains a mutable container across renders. Updating current does not request a render.",
    "when": "Hold DOM nodes and nonvisual imperative bookkeeping.",
    "avoid": "Avoid reading or writing mutable refs during rendering as a substitute for state.",
    "tradeoff": "DOM refs attach during commit and become unavailable when the node is removed.",
    "mistakes": [
      {
        "problem": "Expecting a ref mutation to refresh visible output.",
        "fix": "Use state for visible values and inspect refs at event/effect boundaries."
      }
    ],
    "examples": [
      {
        "title": "Focus the actual input",
        "expected": "The button focuses the native input and its real focus handler updates output.",
        "steps": [
          "React attaches the committed node to the ref.",
          "The event invokes its DOM focus method."
        ],
        "test": [
          {
            "action": "click",
            "label": "Focus ref target",
            "expect": "\"focused\": true"
          }
        ],
        "id": "react-031.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Mutable value without rerender",
        "expected": "Mutating retains one without updating the output; Read explicitly copies it to visible state.",
        "steps": [
          "A ref object survives component calls.",
          "The snapshot only changes when its setter runs."
        ],
        "test": [
          {
            "action": "click",
            "label": "Mutate retained ref",
            "expect": "\"snapshot\": 0"
          },
          {
            "action": "click",
            "label": "Read retained ref",
            "expect": "\"snapshot\": 1"
          }
        ],
        "id": "react-031.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-031.q01",
        "level": "Beginner",
        "question": "What does useRef mean?",
        "answer": "useRef retains a mutable container across renders. Updating current does not request a render."
      },
      {
        "id": "react-031.q02",
        "level": "Beginner",
        "question": "When would you use useRef?",
        "answer": "Hold DOM nodes and nonvisual imperative bookkeeping."
      },
      {
        "id": "react-031.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Focus the actual input”.",
        "answer": "The button focuses the native input and its real focus handler updates output."
      },
      {
        "id": "react-031.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Expecting a ref mutation to refresh visible output.",
        "answer": "Use state for visible values and inspect refs at event/effect boundaries."
      },
      {
        "id": "react-031.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useRef in production?",
        "answer": "DOM refs attach during commit and become unavailable when the node is removed."
      },
      {
        "id": "react-031.q06",
        "level": "Scenario",
        "question": "How would you verify “Mutable value without rerender” in a real application?",
        "answer": "Mutating retains one without updating the output; Read explicitly copies it to visible state. Observe the actual controls and committed output. A ref object survives component calls. The snapshot only changes when its setter runs."
      }
    ],
    "reference": "https://react.dev/reference/react/useRef"
  },
  {
    "id": "react-032",
    "description": "useMemo caches a calculation by Object.is comparisons of its dependencies. It is a performance optimization, not a semantic guarantee.",
    "when": "Preserve an expensive derived result or a memoized child prop when profiling justifies it.",
    "avoid": "Avoid using memoization to fix impure rendering or missing dependencies.",
    "tradeoff": "React may discard caches. Correctness must survive recalculation.",
    "mistakes": [
      {
        "problem": "Creating a new object dependency every render.",
        "fix": "Depend on relevant primitives or create the object inside the calculation."
      }
    ],
    "examples": [
      {
        "title": "Stable array versus new array",
        "expected": "After an unrelated update only the fresh-prop memo child commits; changing query updates both.",
        "steps": [
          "The unchanged query reuses the cached array.",
          "The child compares references, not array contents."
        ],
        "test": [
          {
            "action": "click",
            "label": "Unrelated memo update",
            "expect": "\"tick\": 1",
            "trace": "Fresh commit"
          }
        ],
        "id": "react-032.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Object dependency invalidation",
        "expected": "The settings-object dependency invalidates its cache while the primitive query remains equal.",
        "steps": [
          "Each render creates a different settings object.",
          "The primitive field dependency avoids unnecessary invalidation."
        ],
        "test": [
          {
            "action": "click",
            "label": "Recreate settings object",
            "expect": "\"tick\": 1",
            "trace": "Fresh commit"
          }
        ],
        "id": "react-032.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-032.q01",
        "level": "Beginner",
        "question": "What does useMemo mean?",
        "answer": "useMemo caches a calculation by Object.is comparisons of its dependencies. It is a performance optimization, not a semantic guarantee."
      },
      {
        "id": "react-032.q02",
        "level": "Beginner",
        "question": "When would you use useMemo?",
        "answer": "Preserve an expensive derived result or a memoized child prop when profiling justifies it."
      },
      {
        "id": "react-032.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Stable array versus new array”.",
        "answer": "After an unrelated update only the fresh-prop memo child commits; changing query updates both."
      },
      {
        "id": "react-032.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Creating a new object dependency every render.",
        "answer": "Depend on relevant primitives or create the object inside the calculation."
      },
      {
        "id": "react-032.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useMemo in production?",
        "answer": "React may discard caches. Correctness must survive recalculation."
      },
      {
        "id": "react-032.q06",
        "level": "Scenario",
        "question": "How would you verify “Object dependency invalidation” in a real application?",
        "answer": "The settings-object dependency invalidates its cache while the primitive query remains equal. Observe the actual controls and committed output. Each render creates a different settings object. The primitive field dependency avoids unnecessary invalidation."
      }
    ],
    "reference": "https://react.dev/reference/react/useMemo"
  },
  {
    "id": "react-033",
    "description": "useCallback caches a function identity while its dependencies remain equal. Its closure still belongs to a render.",
    "when": "Pass stable callbacks to memoized children or effect dependencies when useful.",
    "avoid": "Avoid omitting a reactive dependency to force stable identity.",
    "tradeoff": "Callback caching helps only when identity is observed by a consumer.",
    "mistakes": [
      {
        "problem": "Assuming an old callback reads new state because it was created by useCallback.",
        "fix": "Declare dependencies and use functional updaters when only previous state is needed."
      }
    ],
    "examples": [
      {
        "title": "Stable updater versus fresh callback",
        "expected": "An unrelated update commits the fresh callback child; both callbacks still increment correctly.",
        "steps": [
          "The functional updater removes the need to capture count.",
          "The stable function prop lets its memo child skip the unrelated commit."
        ],
        "test": [
          {
            "action": "click",
            "label": "Unrelated callback update",
            "trace": "Fresh callback commit"
          },
          {
            "action": "click",
            "label": "Stable callback",
            "expect": "\"count\": 1"
          }
        ],
        "id": "react-033.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Retained callback captures a snapshot",
        "expected": "The retained old callback reads zero; the current dependency-correct callback reads one.",
        "steps": [
          "Correct dependencies produce a new function after count changes.",
          "External holders of the old function still hold its old closure."
        ],
        "test": [
          {
            "action": "click",
            "label": "Retain current callback"
          },
          {
            "action": "click",
            "label": "Change callback dependency"
          },
          {
            "action": "click",
            "label": "Invoke retained callback",
            "expect": "\"read\": 0"
          },
          {
            "action": "click",
            "label": "Invoke latest callback",
            "expect": "\"read\": 1"
          }
        ],
        "id": "react-033.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-033.q01",
        "level": "Beginner",
        "question": "What does useCallback mean?",
        "answer": "useCallback caches a function identity while its dependencies remain equal. Its closure still belongs to a render."
      },
      {
        "id": "react-033.q02",
        "level": "Beginner",
        "question": "When would you use useCallback?",
        "answer": "Pass stable callbacks to memoized children or effect dependencies when useful."
      },
      {
        "id": "react-033.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Stable updater versus fresh callback”.",
        "answer": "An unrelated update commits the fresh callback child; both callbacks still increment correctly."
      },
      {
        "id": "react-033.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Assuming an old callback reads new state because it was created by useCallback.",
        "answer": "Declare dependencies and use functional updaters when only previous state is needed."
      },
      {
        "id": "react-033.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useCallback in production?",
        "answer": "Callback caching helps only when identity is observed by a consumer."
      },
      {
        "id": "react-033.q06",
        "level": "Scenario",
        "question": "How would you verify “Retained callback captures a snapshot” in a real application?",
        "answer": "The retained old callback reads zero; the current dependency-correct callback reads one. Observe the actual controls and committed output. Correct dependencies produce a new function after count changes. External holders of the old function still hold its old closure."
      }
    ],
    "reference": "https://react.dev/reference/react/useCallback"
  },
  {
    "id": "react-034",
    "description": "useLayoutEffect runs after DOM commit before the browser repaints, letting a component measure and synchronously correct its layout.",
    "when": "Measure committed DOM when a visible incorrect first frame would matter.",
    "avoid": "Avoid blocking paint for network work or ordinary synchronization.",
    "tradeoff": "Layout effects and synchronous corrections block paint. Prefer useEffect unless timing matters.",
    "mistakes": [
      {
        "problem": "Measuring DOM during render or claiming jsdom has browser geometry.",
        "fix": "Read refs in the layout phase; verify real dimensions in a browser."
      }
    ],
    "examples": [
      {
        "title": "Measure committed browser geometry",
        "expected": "A real browser measures the narrow box at 160px and the wide box at 260px; jsdom has no layout engine.",
        "steps": [
          "The class changes the actual DOM size.",
          "The layout effect measures the committed box before paint."
        ],
        "test": [
          {
            "action": "click",
            "label": "Toggle measured width",
            "expect": "\"wide\": true"
          }
        ],
        "id": "react-034.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Layout and passive effect order",
        "expected": "The trace observes actual layout/passive setup and cleanup. It does not infer when a screen paint occurred.",
        "steps": [
          "Layout setup occurs after DOM mutation.",
          "Passive setup follows layout setup; interaction effects may run before paint too."
        ],
        "test": [
          {
            "action": "click",
            "label": "Commit both effect phases",
            "trace": "passive phase"
          }
        ],
        "id": "react-034.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-034.q01",
        "level": "Beginner",
        "question": "What does useLayoutEffect mean?",
        "answer": "useLayoutEffect runs after DOM commit before the browser repaints, letting a component measure and synchronously correct its layout."
      },
      {
        "id": "react-034.q02",
        "level": "Beginner",
        "question": "When would you use useLayoutEffect?",
        "answer": "Measure committed DOM when a visible incorrect first frame would matter."
      },
      {
        "id": "react-034.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Measure committed browser geometry”.",
        "answer": "A real browser measures the narrow box at 160px and the wide box at 260px; jsdom has no layout engine."
      },
      {
        "id": "react-034.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Measuring DOM during render or claiming jsdom has browser geometry.",
        "answer": "Read refs in the layout phase; verify real dimensions in a browser."
      },
      {
        "id": "react-034.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useLayoutEffect in production?",
        "answer": "Layout effects and synchronous corrections block paint. Prefer useEffect unless timing matters."
      },
      {
        "id": "react-034.q06",
        "level": "Scenario",
        "question": "How would you verify “Layout and passive effect order” in a real application?",
        "answer": "The trace observes actual layout/passive setup and cleanup. It does not infer when a screen paint occurred. Observe the actual controls and committed output. Layout setup occurs after DOM mutation. Passive setup follows layout setup; interaction effects may run before paint too."
      }
    ],
    "reference": "https://react.dev/reference/react/useLayoutEffect"
  },
  {
    "id": "react-035",
    "description": "useImperativeHandle customizes the value exposed through a ref. React 19 function components can receive ref as a prop.",
    "when": "Expose a small command API such as focus or validation.",
    "avoid": "Prefer declarative props when they express the interaction.",
    "tradeoff": "Imperative handles couple caller and component; null-check until mounted.",
    "mistakes": [
      {
        "problem": "Exposing every internal DOM detail to the parent.",
        "fix": "Return only required commands and include reactive dependencies."
      }
    ],
    "examples": [
      {
        "title": "Expose focus and clear commands",
        "expected": "Read returns the real input value; Clear empties that input and Focus moves native focus.",
        "steps": [
          "The child owns its DOM ref.",
          "useImperativeHandle exposes a limited command object."
        ],
        "test": [
          {
            "action": "type",
            "label": "Command input",
            "value": "Ada"
          },
          {
            "action": "click",
            "label": "Handle read",
            "expect": "Ada"
          },
          {
            "action": "click",
            "label": "Handle clear",
            "expect": "\"read\": \"\""
          }
        ],
        "id": "react-035.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Expose domain validation",
        "expected": "Validation focuses an empty required control; a nonempty value validates true.",
        "steps": [
          "The handle hides the underlying node.",
          "The parent requests a domain operation instead of manipulating internals."
        ],
        "test": [
          {
            "action": "click",
            "label": "Handle validate",
            "expect": "\"valid\": false"
          },
          {
            "action": "type",
            "label": "Required handle name",
            "value": "Ada"
          },
          {
            "action": "click",
            "label": "Handle validate",
            "expect": "\"valid\": true"
          }
        ],
        "id": "react-035.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-035.q01",
        "level": "Beginner",
        "question": "What does useImperativeHandle mean?",
        "answer": "useImperativeHandle customizes the value exposed through a ref. React 19 function components can receive ref as a prop."
      },
      {
        "id": "react-035.q02",
        "level": "Beginner",
        "question": "When would you use useImperativeHandle?",
        "answer": "Expose a small command API such as focus or validation."
      },
      {
        "id": "react-035.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Expose focus and clear commands”.",
        "answer": "Read returns the real input value; Clear empties that input and Focus moves native focus."
      },
      {
        "id": "react-035.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Exposing every internal DOM detail to the parent.",
        "answer": "Return only required commands and include reactive dependencies."
      },
      {
        "id": "react-035.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useImperativeHandle in production?",
        "answer": "Imperative handles couple caller and component; null-check until mounted."
      },
      {
        "id": "react-035.q06",
        "level": "Scenario",
        "question": "How would you verify “Expose domain validation” in a real application?",
        "answer": "Validation focuses an empty required control; a nonempty value validates true. Observe the actual controls and committed output. The handle hides the underlying node. The parent requests a domain operation instead of manipulating internals."
      }
    ],
    "reference": "https://react.dev/reference/react/useImperativeHandle"
  },
  {
    "id": "react-036",
    "description": "useId generates a component-instance ID for accessibility relationships. The exact string format is an implementation detail.",
    "when": "Connect labels, hints and errors without collisions between instances.",
    "avoid": "Do not use useId as a list key or a database identifier.",
    "tradeoff": "Server rendering requires the matching component tree; this lab uses a client root.",
    "mistakes": [
      {
        "problem": "Hard-coding an ID in a reusable field.",
        "fix": "Generate an instance ID and derive its related description IDs."
      }
    ],
    "examples": [
      {
        "title": "Two independent accessible fields",
        "expected": "The two label/input pairs have distinct actual IDs, visible in their output.",
        "steps": [
          "Each child calls useId at its own stable hook position.",
          "The label htmlFor matches that instance’s input id."
        ],
        "test": [
          {
            "action": "type",
            "label": "First generated field",
            "value": "Ada",
            "expect": "Ada"
          }
        ],
        "id": "react-036.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Associate hint and error IDs",
        "expected": "The same generated prefix connects the input, hint and changing error.",
        "steps": [
          "Relationships remain stable when error text changes.",
          "No assumption is made about React’s ID format."
        ],
        "test": [
          {
            "action": "click",
            "label": "Toggle ID-associated error",
            "expect": "\"error\": true"
          }
        ],
        "id": "react-036.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-036.q01",
        "level": "Beginner",
        "question": "What does useId mean?",
        "answer": "useId generates a component-instance ID for accessibility relationships. The exact string format is an implementation detail."
      },
      {
        "id": "react-036.q02",
        "level": "Beginner",
        "question": "When would you use useId?",
        "answer": "Connect labels, hints and errors without collisions between instances."
      },
      {
        "id": "react-036.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Two independent accessible fields”.",
        "answer": "The two label/input pairs have distinct actual IDs, visible in their output."
      },
      {
        "id": "react-036.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Hard-coding an ID in a reusable field.",
        "answer": "Generate an instance ID and derive its related description IDs."
      },
      {
        "id": "react-036.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useId in production?",
        "answer": "Server rendering requires the matching component tree; this lab uses a client root."
      },
      {
        "id": "react-036.q06",
        "level": "Scenario",
        "question": "How would you verify “Associate hint and error IDs” in a real application?",
        "answer": "The same generated prefix connects the input, hint and changing error. Observe the actual controls and committed output. Relationships remain stable when error text changes. No assumption is made about React’s ID format."
      }
    ],
    "reference": "https://react.dev/reference/react/useId"
  },
  {
    "id": "react-037",
    "description": "useTransition marks nonurgent state updates and exposes whether its Actions are pending. Urgent input state stays outside the transition.",
    "when": "Keep typing responsive while a less urgent result view catches up.",
    "avoid": "Do not put the controlling input’s state inside a transition.",
    "tradeoff": "Transitions are interruptible; a small data set may finish before a pending frame is visible.",
    "mistakes": [
      {
        "problem": "Assuming every update after await is automatically marked as a transition.",
        "fix": "Wrap post-await state updates in startTransition under the currently supported API."
      }
    ],
    "examples": [
      {
        "title": "Urgent text and transition filter",
        "expected": "The input stays urgent and the filtered list receives a transition update. Trace records actual pending commits rather than promising a delay.",
        "steps": [
          "The event stores input text immediately.",
          "Only the result query update is marked nonurgent."
        ],
        "test": [
          {
            "action": "type",
            "label": "Transition search",
            "value": "Ada"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"query\": \"Ada\""
          }
        ],
        "id": "react-037.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Async Action with actual API",
        "expected": "The real HTTP acknowledgement resolves to Ada; pending follows the Action lifecycle and errors are shown.",
        "steps": [
          "The transition owns an asynchronous Action.",
          "Post-await setters are explicitly marked; unmount aborts owned requests."
        ],
        "test": [
          {
            "action": "click",
            "label": "Run transition request"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"name\": \"Ada\""
          }
        ],
        "id": "react-037.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-037.q01",
        "level": "Beginner",
        "question": "What does useTransition mean?",
        "answer": "useTransition marks nonurgent state updates and exposes whether its Actions are pending. Urgent input state stays outside the transition."
      },
      {
        "id": "react-037.q02",
        "level": "Beginner",
        "question": "When would you use useTransition?",
        "answer": "Keep typing responsive while a less urgent result view catches up."
      },
      {
        "id": "react-037.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Urgent text and transition filter”.",
        "answer": "The input stays urgent and the filtered list receives a transition update. Trace records actual pending commits rather than promising a delay."
      },
      {
        "id": "react-037.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Assuming every update after await is automatically marked as a transition.",
        "answer": "Wrap post-await state updates in startTransition under the currently supported API."
      },
      {
        "id": "react-037.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useTransition in production?",
        "answer": "Transitions are interruptible; a small data set may finish before a pending frame is visible."
      },
      {
        "id": "react-037.q06",
        "level": "Scenario",
        "question": "How would you verify “Async Action with actual API” in a real application?",
        "answer": "The real HTTP acknowledgement resolves to Ada; pending follows the Action lifecycle and errors are shown. Observe the actual controls and committed output. The transition owns an asynchronous Action. Post-await setters are explicitly marked; unmount aborts owned requests."
      }
    ],
    "reference": "https://react.dev/reference/react/useTransition"
  },
  {
    "id": "react-038",
    "description": "useDeferredValue allows a nonurgent view of a changing value to lag behind its urgent source.",
    "when": "Defer an expensive memoized result subtree while keeping input responsive.",
    "avoid": "Avoid treating it as a debounce timer or a network request limiter.",
    "tradeoff": "Background renders may be abandoned; a fast result may catch up immediately.",
    "mistakes": [
      {
        "problem": "Promising a fixed millisecond delay or expecting zero network requests per keystroke.",
        "fix": "Observe actual commits and implement cancellation separately for requests."
      }
    ],
    "examples": [
      {
        "title": "Deferred result query",
        "expected": "The urgent query updates first; the deferred result catches up. No fixed lag is guaranteed.",
        "steps": [
          "React can reuse the memoized subtree while the deferred value is old.",
          "A background render attempts the current value."
        ],
        "test": [
          {
            "action": "type",
            "label": "Deferred search",
            "value": "Grace"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"deferred\": \"Grace\""
          }
        ],
        "id": "react-038.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Explicit initial deferred value",
        "expected": "The initial commit can use the supplied empty value; later commits catch up to Ada and then Grace.",
        "steps": [
          "The second argument supplies an initial deferred fallback.",
          "The trace records those actual committed values."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change initial deferred query"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"deferred\": \"Grace\""
          }
        ],
        "id": "react-038.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-038.q01",
        "level": "Beginner",
        "question": "What does useDeferredValue mean?",
        "answer": "useDeferredValue allows a nonurgent view of a changing value to lag behind its urgent source."
      },
      {
        "id": "react-038.q02",
        "level": "Beginner",
        "question": "When would you use useDeferredValue?",
        "answer": "Defer an expensive memoized result subtree while keeping input responsive."
      },
      {
        "id": "react-038.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Deferred result query”.",
        "answer": "The urgent query updates first; the deferred result catches up. No fixed lag is guaranteed."
      },
      {
        "id": "react-038.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Promising a fixed millisecond delay or expecting zero network requests per keystroke.",
        "answer": "Observe actual commits and implement cancellation separately for requests."
      },
      {
        "id": "react-038.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useDeferredValue in production?",
        "answer": "Background renders may be abandoned; a fast result may catch up immediately."
      },
      {
        "id": "react-038.q06",
        "level": "Scenario",
        "question": "How would you verify “Explicit initial deferred value” in a real application?",
        "answer": "The initial commit can use the supplied empty value; later commits catch up to Ada and then Grace. Observe the actual controls and committed output. The second argument supplies an initial deferred fallback. The trace records those actual committed values."
      }
    ],
    "reference": "https://react.dev/reference/react/useDeferredValue"
  },
  {
    "id": "react-039",
    "description": "useDebugValue registers a custom-hook label for React Developer Tools. It does not render text into the application.",
    "when": "Make a reusable custom hook easier to inspect.",
    "avoid": "Avoid formatting expensive debug data unconditionally in render.",
    "tradeoff": "A formatter is evaluated when the hook is inspected; DevTools must be installed to see that presentation.",
    "mistakes": [
      {
        "problem": "Displaying a string in the UI and calling it a DevTools observation.",
        "fix": "Call the real API in the hook; inspect labels in React Developer Tools."
      }
    ],
    "examples": [
      {
        "title": "Register the current hook value",
        "expected": "The visible state increments; the custom hook separately registers its count with useDebugValue.",
        "steps": [
          "The hook calls the real debugging API.",
          "Only React Developer Tools presents the registered label."
        ],
        "test": [
          {
            "action": "click",
            "label": "Debug counter increment",
            "expect": "\"count\": 1"
          }
        ],
        "prerequisites": "React Developer Tools is required to inspect the debug label. The application output is ordinary state.",
        "id": "react-039.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Defer formatting until inspection",
        "expected": "The state increments while the formatter is passed by reference for DevTools inspection.",
        "steps": [
          "The hook supplies a value and formatDebugCounter.",
          "React can defer invoking that formatter until inspection."
        ],
        "test": [
          {
            "action": "click",
            "label": "Formatted debug increment",
            "expect": "\"count\": 1"
          }
        ],
        "prerequisites": "React Developer Tools is required for the label. Formatter registration and output are covered by automated checks.",
        "id": "react-039.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-039.q01",
        "level": "Beginner",
        "question": "What does useDebugValue mean?",
        "answer": "useDebugValue registers a custom-hook label for React Developer Tools. It does not render text into the application."
      },
      {
        "id": "react-039.q02",
        "level": "Beginner",
        "question": "When would you use useDebugValue?",
        "answer": "Make a reusable custom hook easier to inspect."
      },
      {
        "id": "react-039.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Register the current hook value”.",
        "answer": "The visible state increments; the custom hook separately registers its count with useDebugValue."
      },
      {
        "id": "react-039.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Displaying a string in the UI and calling it a DevTools observation.",
        "answer": "Call the real API in the hook; inspect labels in React Developer Tools."
      },
      {
        "id": "react-039.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useDebugValue in production?",
        "answer": "A formatter is evaluated when the hook is inspected; DevTools must be installed to see that presentation."
      },
      {
        "id": "react-039.q06",
        "level": "Scenario",
        "question": "How would you verify “Defer formatting until inspection” in a real application?",
        "answer": "The state increments while the formatter is passed by reference for DevTools inspection. Observe the actual controls and committed output. The hook supplies a value and formatDebugCounter. React can defer invoking that formatter until inspection."
      }
    ],
    "reference": "https://react.dev/reference/react/useDebugValue"
  },
  {
    "id": "react-040",
    "description": "useSyncExternalStore subscribes React to an external mutable source through a stable cached snapshot.",
    "when": "Integrate stores and browser APIs with concurrent rendering.",
    "avoid": "Avoid returning a new object from getSnapshot when the source did not change.",
    "tradeoff": "Server rendering also needs a consistent getServerSnapshot; the width example uses zero as the server fallback.",
    "mistakes": [
      {
        "problem": "A getSnapshot function that allocates endlessly or a subscription with no cleanup.",
        "fix": "Return a stable primitive or cached immutable snapshot and return an unsubscribe function."
      }
    ],
    "examples": [
      {
        "title": "Two subscribers to an external counter",
        "expected": "Both readers see one. After removing the second reader, the inspected subscriber count is one.",
        "steps": [
          "The store owns its count outside React.",
          "Removing a reader runs the actual unsubscribe function."
        ],
        "test": [
          {
            "action": "click",
            "label": "Increment external store",
            "expect": "\"count\": 1"
          },
          {
            "action": "click",
            "label": "Toggle second subscriber"
          },
          {
            "action": "click",
            "label": "Inspect subscriptions",
            "expect": "\"subscriptions\": 1"
          }
        ],
        "id": "react-040.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Subscribe to real viewport width",
        "expected": "Output is window.innerWidth and changes on a real resize; dispatching a resize reads the current width without inventing one.",
        "steps": [
          "The hook subscribes to the browser resize event.",
          "The primitive snapshot stays equal when the width has not changed."
        ],
        "test": [
          {
            "action": "click",
            "label": "Read current viewport",
            "expect": "\"width\":"
          }
        ],
        "id": "react-040.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-040.q01",
        "level": "Beginner",
        "question": "What does useSyncExternalStore mean?",
        "answer": "useSyncExternalStore subscribes React to an external mutable source through a stable cached snapshot."
      },
      {
        "id": "react-040.q02",
        "level": "Beginner",
        "question": "When would you use useSyncExternalStore?",
        "answer": "Integrate stores and browser APIs with concurrent rendering."
      },
      {
        "id": "react-040.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Two subscribers to an external counter”.",
        "answer": "Both readers see one. After removing the second reader, the inspected subscriber count is one."
      },
      {
        "id": "react-040.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: A getSnapshot function that allocates endlessly or a subscription with no cleanup.",
        "answer": "Return a stable primitive or cached immutable snapshot and return an unsubscribe function."
      },
      {
        "id": "react-040.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useSyncExternalStore in production?",
        "answer": "Server rendering also needs a consistent getServerSnapshot; the width example uses zero as the server fallback."
      },
      {
        "id": "react-040.q06",
        "level": "Scenario",
        "question": "How would you verify “Subscribe to real viewport width” in a real application?",
        "answer": "Output is window.innerWidth and changes on a real resize; dispatching a resize reads the current width without inventing one. Observe the actual controls and committed output. The hook subscribes to the browser resize event. The primitive snapshot stays equal when the width has not changed."
      }
    ],
    "reference": "https://react.dev/reference/react/useSyncExternalStore"
  },
  {
    "id": "react-041",
    "description": "useInsertionEffect provides CSS-in-JS libraries a phase for installing style rules before layout effects.",
    "when": "Study library-level style insertion and ownership cleanup.",
    "avoid": "Ordinary application styling should use CSS; do not update state or read attached refs in insertion effects.",
    "tradeoff": "The production example copies the server-issued style nonce instead of weakening the Content Security Policy.",
    "mistakes": [
      {
        "problem": "Using the insertion phase for layout measurements or state updates.",
        "fix": "Insert an owned style there; measure its effect later in a layout effect."
      }
    ],
    "examples": [
      {
        "title": "Insert style before observing layout",
        "expected": "The text changes from green to purple; the layout trace reads the installed rule and actual computed color.",
        "steps": [
          "Insertion installs a uniquely owned rule.",
          "Layout then reads the actual DOM and style."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change inserted color",
            "expect": "\"color\": \"purple\"",
            "trace": "style observed in layout"
          }
        ],
        "prerequisites": "Library-authoring example. No state update or ref read occurs inside useInsertionEffect.",
        "id": "react-041.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Independent style ownership and removal",
        "expected": "Two badges own two rules. Hiding the second removes only its rule; inspection reports one.",
        "steps": [
          "useId separates instance class names.",
          "Each insertion cleanup removes its own element."
        ],
        "test": [
          {
            "action": "click",
            "label": "Toggle owned style"
          },
          {
            "action": "click",
            "label": "Inspect owned styles",
            "expect": "\"rules\": 1"
          }
        ],
        "prerequisites": "Tiny CSS-in-JS library example; cleanup is verified on unmount.",
        "id": "react-041.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-041.q01",
        "level": "Beginner",
        "question": "What does useInsertionEffect mean?",
        "answer": "useInsertionEffect provides CSS-in-JS libraries a phase for installing style rules before layout effects."
      },
      {
        "id": "react-041.q02",
        "level": "Beginner",
        "question": "When would you use useInsertionEffect?",
        "answer": "Study library-level style insertion and ownership cleanup."
      },
      {
        "id": "react-041.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Insert style before observing layout”.",
        "answer": "The text changes from green to purple; the layout trace reads the installed rule and actual computed color."
      },
      {
        "id": "react-041.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Using the insertion phase for layout measurements or state updates.",
        "answer": "Insert an owned style there; measure its effect later in a layout effect."
      },
      {
        "id": "react-041.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useInsertionEffect in production?",
        "answer": "The production example copies the server-issued style nonce instead of weakening the Content Security Policy."
      },
      {
        "id": "react-041.q06",
        "level": "Scenario",
        "question": "How would you verify “Independent style ownership and removal” in a real application?",
        "answer": "Two badges own two rules. Hiding the second removes only its rule; inspection reports one. Observe the actual controls and committed output. useId separates instance class names. Each insertion cleanup removes its own element."
      }
    ],
    "reference": "https://react.dev/reference/react/useInsertionEffect"
  },
  {
    "id": "react-042",
    "description": "useActionState manages the returned state and pending status of an Action, with each queued action receiving the previous result.",
    "when": "Handle asynchronous form submissions with explicit validation and failure state.",
    "avoid": "Do not call an async dispatch outside an Action or transition.",
    "tradeoff": "This endpoint acknowledges real HTTP requests without database persistence; these examples do not claim saved records.",
    "mistakes": [
      {
        "problem": "Treating the FormData as the first callback argument instead of the second.",
        "fix": "Accept previousState first and payload second; catch expected HTTP failures."
      }
    ],
    "examples": [
      {
        "title": "Real form Action with validation and failure",
        "expected": "Submit receives a real acknowledgement; selecting Reject produces a displayed HTTP 503 result. Pending is supplied by React.",
        "steps": [
          "The native form creates FormData.",
          "The Action awaits Express and returns a new state; failures stay visible."
        ],
        "test": [
          {
            "action": "click",
            "label": "Submit action"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "acknowledged"
          }
        ],
        "id": "react-042.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Queued Actions consume previous results",
        "expected": "Two actual sequential acknowledgements accumulate total three; an unmount aborts owned work.",
        "steps": [
          "Both dispatches are inside a transition.",
          "The second action receives the first returned state."
        ],
        "test": [
          {
            "action": "click",
            "label": "Queue two actions"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"total\": 3"
          }
        ],
        "id": "react-042.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-042.q01",
        "level": "Beginner",
        "question": "What does useActionState mean?",
        "answer": "useActionState manages the returned state and pending status of an Action, with each queued action receiving the previous result."
      },
      {
        "id": "react-042.q02",
        "level": "Beginner",
        "question": "When would you use useActionState?",
        "answer": "Handle asynchronous form submissions with explicit validation and failure state."
      },
      {
        "id": "react-042.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Real form Action with validation and failure”.",
        "answer": "Submit receives a real acknowledgement; selecting Reject produces a displayed HTTP 503 result. Pending is supplied by React."
      },
      {
        "id": "react-042.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Treating the FormData as the first callback argument instead of the second.",
        "answer": "Accept previousState first and payload second; catch expected HTTP failures."
      },
      {
        "id": "react-042.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useActionState in production?",
        "answer": "This endpoint acknowledges real HTTP requests without database persistence; these examples do not claim saved records."
      },
      {
        "id": "react-042.q06",
        "level": "Scenario",
        "question": "How would you verify “Queued Actions consume previous results” in a real application?",
        "answer": "Two actual sequential acknowledgements accumulate total three; an unmount aborts owned work. Observe the actual controls and committed output. Both dispatches are inside a transition. The second action receives the first returned state."
      }
    ],
    "reference": "https://react.dev/reference/react/useActionState"
  },
  {
    "id": "react-043",
    "description": "useOptimistic overlays temporary state during an Action and reverts to the base when the Action ends.",
    "when": "Show a tentative result while a real request is pending.",
    "avoid": "Do not claim an optimistic value has been persisted or update outside an Action.",
    "tradeoff": "The bounded slow acknowledgement makes pending behavior inspectable; success still does not persist to a database.",
    "mistakes": [
      {
        "problem": "Leaving temporary state visible after rejection or duplicating a confirmed item on rebase.",
        "fix": "Keep authoritative base state separate and use a pure ID-aware optimistic reducer."
      }
    ],
    "examples": [
      {
        "title": "Optimistic item confirmation and rollback",
        "expected": "The tentative item appears during real HTTP work, becomes confirmed on success and disappears on rejection.",
        "steps": [
          "The pure reducer adds by ID and preserves confirmed versions on rebase.",
          "Only success updates the authoritative list."
        ],
        "test": [
          {
            "action": "click",
            "label": "Add optimistic item"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"confirmed\": 1"
          }
        ],
        "id": "react-043.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Rebase optimistic delta on a changing base",
        "expected": "During pending, adding ten rebases the optimistic one to eleven. Rejection leaves ten; success confirms eleven.",
        "steps": [
          "The overlay reducer consumes the latest base.",
          "A failure drops the overlay without losing an unrelated base update."
        ],
        "test": [
          {
            "action": "click",
            "label": "Optimistic increment"
          },
          {
            "action": "click",
            "label": "External base plus ten"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "\"base\": 11"
          }
        ],
        "id": "react-043.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-043.q01",
        "level": "Beginner",
        "question": "What does useOptimistic mean?",
        "answer": "useOptimistic overlays temporary state during an Action and reverts to the base when the Action ends."
      },
      {
        "id": "react-043.q02",
        "level": "Beginner",
        "question": "When would you use useOptimistic?",
        "answer": "Show a tentative result while a real request is pending."
      },
      {
        "id": "react-043.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Optimistic item confirmation and rollback”.",
        "answer": "The tentative item appears during real HTTP work, becomes confirmed on success and disappears on rejection."
      },
      {
        "id": "react-043.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Leaving temporary state visible after rejection or duplicating a confirmed item on rebase.",
        "answer": "Keep authoritative base state separate and use a pure ID-aware optimistic reducer."
      },
      {
        "id": "react-043.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useOptimistic in production?",
        "answer": "The bounded slow acknowledgement makes pending behavior inspectable; success still does not persist to a database."
      },
      {
        "id": "react-043.q06",
        "level": "Scenario",
        "question": "How would you verify “Rebase optimistic delta on a changing base” in a real application?",
        "answer": "During pending, adding ten rebases the optimistic one to eleven. Rejection leaves ten; success confirms eleven. Observe the actual controls and committed output. The overlay reducer consumes the latest base. A failure drops the overlay without losing an unrelated base update."
      }
    ],
    "reference": "https://react.dev/reference/react/useOptimistic"
  },
  {
    "id": "react-044",
    "description": "useEffectEvent reads the latest committed values from an event belonging to an Effect, without making those values reactive synchronization inputs.",
    "when": "Read notification-only values in effect-installed callbacks while keeping real subscription dependencies explicit.",
    "avoid": "Never call an Effect Event directly from a UI event, pass it to another component, or use it to hide a real dependency.",
    "tradeoff": "Effect Event identity is not stable and must be excluded from effect dependencies. The linter enforces its scope.",
    "mistakes": [
      {
        "problem": "Omitting the room dependency because an Effect Event can read room.",
        "fix": "Keep room in the subscription effect dependencies; place only nonreactive event logic inside useEffectEvent."
      }
    ],
    "examples": [
      {
        "title": "Latest count in a persistent listener",
        "expected": "Change count then dispatch: the effect-installed listener records one without resubscribing.",
        "steps": [
          "The button dispatches a native EventTarget event.",
          "Only the callback installed by the effect invokes the Effect Event."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change latest count"
          },
          {
            "action": "click",
            "label": "Dispatch effect-installed notice",
            "trace": "latest effect event"
          }
        ],
        "id": "react-044.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Latest theme without reconnecting",
        "expected": "Change theme then dispatch: dark is read without replacing the subscription.",
        "steps": [
          "Theme is notification data.",
          "The subscription inputs are unchanged."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change latest theme"
          },
          {
            "action": "click",
            "label": "Dispatch effect-installed notice",
            "trace": "dark"
          }
        ],
        "id": "react-044.e02",
        "component": "Example02",
        "aliases": []
      },
      {
        "title": "Reactive room still replaces subscription",
        "expected": "Changing room cleans up A and subscribes B; changing notification theme alone does not.",
        "steps": [
          "Room affects the external subscription and stays reactive.",
          "The Effect Event reads latest notification data."
        ],
        "test": [
          {
            "action": "click",
            "label": "Change reactive room",
            "trace": "channel unsubscribe"
          },
          {
            "action": "click",
            "label": "Change room notification theme"
          },
          {
            "action": "click",
            "label": "Dispatch effect-installed notice",
            "trace": "dark"
          }
        ],
        "id": "react-044.e03",
        "component": "Example03",
        "aliases": []
      },
      {
        "title": "Timer reads latest increment",
        "expected": "The installed timer reads the latest step size, stops after five ticks with running false, can restart, and is cleared on stop/unmount.",
        "steps": [
          "The timer callback belongs to its installing effect.",
          "Step changes do not recreate the interval."
        ],
        "test": [
          {
            "action": "click",
            "label": "Use increment two"
          },
          {
            "action": "click",
            "label": "Start effect-event timer"
          },
          {
            "action": "wait",
            "label": "",
            "trace": "latest timer increment"
          },
          {
            "action": "click",
            "label": "Stop effect-event timer",
            "trace": "effect-event timer cleanup"
          }
        ],
        "id": "react-044.e04",
        "component": "Example04",
        "aliases": []
      },
      {
        "title": "Latest mute flag controls a notification",
        "expected": "The listener reads muted true and records notified false after the toggle.",
        "steps": [
          "Mute controls event response rather than subscription identity.",
          "No reactive subscription dependency is suppressed."
        ],
        "test": [
          {
            "action": "click",
            "label": "Toggle latest mute"
          },
          {
            "action": "click",
            "label": "Dispatch effect-installed notice",
            "trace": "\"notified\": false"
          }
        ],
        "id": "react-044.e05",
        "component": "Example05",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-044.q01",
        "level": "Beginner",
        "question": "What does useEffectEvent mean?",
        "answer": "useEffectEvent reads the latest committed values from an event belonging to an Effect, without making those values reactive synchronization inputs."
      },
      {
        "id": "react-044.q02",
        "level": "Beginner",
        "question": "When would you use useEffectEvent?",
        "answer": "Read notification-only values in effect-installed callbacks while keeping real subscription dependencies explicit."
      },
      {
        "id": "react-044.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Latest count in a persistent listener”.",
        "answer": "Change count then dispatch: the effect-installed listener records one without resubscribing."
      },
      {
        "id": "react-044.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Omitting the room dependency because an Effect Event can read room.",
        "answer": "Keep room in the subscription effect dependencies; place only nonreactive event logic inside useEffectEvent."
      },
      {
        "id": "react-044.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using useEffectEvent in production?",
        "answer": "Effect Event identity is not stable and must be excluded from effect dependencies. The linter enforces its scope."
      },
      {
        "id": "react-044.q06",
        "level": "Scenario",
        "question": "How would you verify “Latest mute flag controls a notification” in a real application?",
        "answer": "The listener reads muted true and records notified false after the toggle. Observe the actual controls and committed output. Mute controls event response rather than subscription identity. No reactive subscription dependency is suppressed."
      }
    ],
    "reference": "https://react.dev/reference/react/useEffectEvent"
  },
  {
    "id": "react-045",
    "description": "React use reads a context or a stable Promise resource. Unlike Hooks, use may be called conditionally, but still only while a component or Hook renders.",
    "when": "Read a conditionally needed context or a Promise owned above a Suspense boundary.",
    "avoid": "Do not create a new fetch Promise during every render or call use inside try/catch.",
    "tradeoff": "This client-only lesson uses a real Express request; Server Components and streaming rendering are outside this phase.",
    "mistakes": [
      {
        "problem": "Recreating the Promise on every suspended render.",
        "fix": "Create the resource in an event or stable owner; use Suspense for pending and an error boundary for rejection."
      }
    ],
    "examples": [
      {
        "title": "Read context conditionally with use",
        "expected": "The disabled branch does not read context; the enabled branch reads provided.",
        "steps": [
          "use is allowed in a conditional render branch.",
          "Ordinary Hooks still require unconditional stable ordering."
        ],
        "test": [
          {
            "action": "click",
            "label": "Toggle conditional context read",
            "expect": "provided"
          }
        ],
        "id": "react-045.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Stable real Promise under Suspense",
        "expected": "The actual request suspends, then displays three names. A rejected resource reaches the boundary; a new resource retries.",
        "steps": [
          "The event creates one stable Promise per attempt.",
          "use reads that same Promise through suspended renders."
        ],
        "test": [
          {
            "action": "click",
            "label": "Create Promise resource"
          },
          {
            "action": "wait",
            "label": "",
            "expect": "Linus"
          }
        ],
        "prerequisites": "Suspense and an error boundary are supporting prerequisites here; their standalone Phase 4 lessons remain planned.",
        "id": "react-045.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-045.q01",
        "level": "Beginner",
        "question": "What does React use API mean?",
        "answer": "React use reads a context or a stable Promise resource. Unlike Hooks, use may be called conditionally, but still only while a component or Hook renders."
      },
      {
        "id": "react-045.q02",
        "level": "Beginner",
        "question": "When would you use React use API?",
        "answer": "Read a conditionally needed context or a Promise owned above a Suspense boundary."
      },
      {
        "id": "react-045.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Read context conditionally with use”.",
        "answer": "The disabled branch does not read context; the enabled branch reads provided."
      },
      {
        "id": "react-045.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Recreating the Promise on every suspended render.",
        "answer": "Create the resource in an event or stable owner; use Suspense for pending and an error boundary for rejection."
      },
      {
        "id": "react-045.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using React use API in production?",
        "answer": "This client-only lesson uses a real Express request; Server Components and streaming rendering are outside this phase."
      },
      {
        "id": "react-045.q06",
        "level": "Scenario",
        "question": "How would you verify “Stable real Promise under Suspense” in a real application?",
        "answer": "The actual request suspends, then displays three names. A rejected resource reaches the boundary; a new resource retries. Observe the actual controls and committed output. The event creates one stable Promise per attempt. use reads that same Promise through suspended renders."
      }
    ],
    "reference": "https://react.dev/reference/react/use"
  },
  {
    "id": "react-046",
    "description": "Custom Hooks compose reusable stateful logic by calling Hooks. Each call has its own state unless it deliberately subscribes to a shared source.",
    "when": "Reuse lifecycle and state logic while leaving presentation to components.",
    "avoid": "Avoid calling Hooks conditionally or assuming two calls share local state.",
    "tradeoff": "Sharing logic does not share state; context or an external store is needed for intentional sharing.",
    "mistakes": [
      {
        "problem": "Extracting logic into an ordinary function and calling Hooks at arbitrary times.",
        "fix": "Name custom Hooks with use and call them at the top level."
      }
    ],
    "examples": [
      {
        "title": "Two independent custom counter calls",
        "expected": "Incrementing First leaves Second zero; the hook caps its own count at five.",
        "steps": [
          "Each call gets independent Hook slots.",
          "The shared function encapsulates transition rules."
        ],
        "test": [
          {
            "action": "click",
            "label": "First custom: 0",
            "expect": "\"first\": 1"
          }
        ],
        "id": "react-046.e01",
        "component": "Example01",
        "aliases": []
      },
      {
        "title": "Reusable Escape listener lifecycle",
        "expected": "Open shows the panel; the actual global Escape listener closes it and is removed on unmount.",
        "steps": [
          "The hook owns its subscription and cleanup.",
          "The component owns the displayed panel."
        ],
        "test": [
          {
            "action": "click",
            "label": "Open custom-hook panel",
            "expect": "\"open\": true"
          },
          {
            "action": "click",
            "label": "Dispatch Escape key",
            "expect": "\"open\": false"
          }
        ],
        "id": "react-046.e02",
        "component": "Example02",
        "aliases": []
      }
    ],
    "questions": [
      {
        "id": "react-046.q01",
        "level": "Beginner",
        "question": "What does Custom Hooks mean?",
        "answer": "Custom Hooks compose reusable stateful logic by calling Hooks. Each call has its own state unless it deliberately subscribes to a shared source."
      },
      {
        "id": "react-046.q02",
        "level": "Beginner",
        "question": "When would you use Custom Hooks?",
        "answer": "Reuse lifecycle and state logic while leaving presentation to components."
      },
      {
        "id": "react-046.q03",
        "level": "Intermediate",
        "question": "Predict the result of “Two independent custom counter calls”.",
        "answer": "Incrementing First leaves Second zero; the hook caps its own count at five."
      },
      {
        "id": "react-046.q04",
        "level": "Intermediate",
        "question": "How would you fix this mistake: Extracting logic into an ordinary function and calling Hooks at arbitrary times.",
        "answer": "Name custom Hooks with use and call them at the top level."
      },
      {
        "id": "react-046.q05",
        "level": "Advanced",
        "question": "What tradeoff matters when using Custom Hooks in production?",
        "answer": "Sharing logic does not share state; context or an external store is needed for intentional sharing."
      },
      {
        "id": "react-046.q06",
        "level": "Scenario",
        "question": "How would you verify “Reusable Escape listener lifecycle” in a real application?",
        "answer": "Open shows the panel; the actual global Escape listener closes it and is removed on unmount. Observe the actual controls and committed output. The hook owns its subscription and cleanup. The component owns the displayed panel."
      }
    ],
    "reference": "https://react.dev/learn"
  }
] satisfies ReactLesson[];
