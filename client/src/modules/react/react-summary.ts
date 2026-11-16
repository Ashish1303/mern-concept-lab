/* Registry summaries only; full lessons and implementation source load on demand. */
export const reactSummary = [
  {
    "id": "react-001",
    "description": "JSX describes React elements using JavaScript expressions; interpolated text is escaped, not interpreted as HTML.",
    "questions": [
      {
        "id": "react-001.q01"
      },
      {
        "id": "react-001.q02"
      },
      {
        "id": "react-001.q03"
      },
      {
        "id": "react-001.q04"
      },
      {
        "id": "react-001.q05"
      },
      {
        "id": "react-001.q06"
      }
    ],
    "examples": [
      {
        "id": "react-001.e01",
        "title": "Escaped JSX text",
        "aliases": []
      },
      {
        "id": "react-001.e02",
        "title": "Expressions produce live elements",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-002",
    "description": "A function component returns a React element tree. React invokes it during rendering and owns its state by tree identity.",
    "questions": [
      {
        "id": "react-002.q01"
      },
      {
        "id": "react-002.q02"
      },
      {
        "id": "react-002.q03"
      },
      {
        "id": "react-002.q04"
      },
      {
        "id": "react-002.q05"
      },
      {
        "id": "react-002.q06"
      }
    ],
    "examples": [
      {
        "id": "react-002.e01",
        "title": "Reusable function component",
        "aliases": []
      },
      {
        "id": "react-002.e02",
        "title": "Independent component instances",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-003",
    "description": "Props are read-only inputs supplied by the parent; a new parent render can supply different values.",
    "questions": [
      {
        "id": "react-003.q01"
      },
      {
        "id": "react-003.q02"
      },
      {
        "id": "react-003.q03"
      },
      {
        "id": "react-003.q04"
      },
      {
        "id": "react-003.q05"
      },
      {
        "id": "react-003.q06"
      }
    ],
    "examples": [
      {
        "id": "react-003.e01",
        "title": "Parent changes a child prop",
        "aliases": []
      },
      {
        "id": "react-003.e02",
        "title": "Default prop versus explicit null",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-004",
    "description": "children is a prop containing nested React content. Slots can also be passed through explicitly named props.",
    "questions": [
      {
        "id": "react-004.q01"
      },
      {
        "id": "react-004.q02"
      },
      {
        "id": "react-004.q03"
      },
      {
        "id": "react-004.q04"
      },
      {
        "id": "react-004.q05"
      },
      {
        "id": "react-004.q06"
      }
    ],
    "examples": [
      {
        "id": "react-004.e01",
        "title": "Interactive children inside a panel",
        "aliases": []
      },
      {
        "id": "react-004.e02",
        "title": "Named content slots",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-005",
    "description": "Fragments group sibling React elements without adding a wrapper DOM element. Explicit Fragment can carry a key.",
    "questions": [
      {
        "id": "react-005.q01"
      },
      {
        "id": "react-005.q02"
      },
      {
        "id": "react-005.q03"
      },
      {
        "id": "react-005.q04"
      },
      {
        "id": "react-005.q05"
      },
      {
        "id": "react-005.q06"
      }
    ],
    "examples": [
      {
        "id": "react-005.e01",
        "title": "No extra host wrapper",
        "aliases": []
      },
      {
        "id": "react-005.e02",
        "title": "Keyed fragment groups",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-006",
    "description": "Conditional rendering selects which elements exist in the React tree. false/null render nothing, while numeric zero is rendered.",
    "questions": [
      {
        "id": "react-006.q01"
      },
      {
        "id": "react-006.q02"
      },
      {
        "id": "react-006.q03"
      },
      {
        "id": "react-006.q04"
      },
      {
        "id": "react-006.q05"
      },
      {
        "id": "react-006.q06"
      }
    ],
    "examples": [
      {
        "id": "react-006.e01",
        "title": "Mount and remove a conditional branch",
        "aliases": []
      },
      {
        "id": "react-006.e02",
        "title": "Zero guard bug and boolean correction",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-007",
    "description": "Lists are rendered by mapping data to elements with stable sibling keys. Filtering changes the rendered membership.",
    "questions": [
      {
        "id": "react-007.q01"
      },
      {
        "id": "react-007.q02"
      },
      {
        "id": "react-007.q03"
      },
      {
        "id": "react-007.q04"
      },
      {
        "id": "react-007.q05"
      },
      {
        "id": "react-007.q06"
      }
    ],
    "examples": [
      {
        "id": "react-007.e01",
        "title": "Filter and map a real list",
        "aliases": []
      },
      {
        "id": "react-007.e02",
        "title": "Empty-list rendering",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-008",
    "description": "Keys identify siblings across reconciliation. Stable IDs preserve the state belonging to an item when its position changes.",
    "questions": [
      {
        "id": "react-008.q01"
      },
      {
        "id": "react-008.q02"
      },
      {
        "id": "react-008.q03"
      },
      {
        "id": "react-008.q04"
      },
      {
        "id": "react-008.q05"
      },
      {
        "id": "react-008.q06"
      }
    ],
    "examples": [
      {
        "id": "react-008.e01",
        "title": "Index-key state ownership bug",
        "aliases": []
      },
      {
        "id": "react-008.e02",
        "title": "Stable-key correction",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-009",
    "description": "React handlers are callback functions invoked for events. Synthetic events expose the origin and the current handler owner.",
    "questions": [
      {
        "id": "react-009.q01"
      },
      {
        "id": "react-009.q02"
      },
      {
        "id": "react-009.q03"
      },
      {
        "id": "react-009.q04"
      },
      {
        "id": "react-009.q05"
      },
      {
        "id": "react-009.q06"
      }
    ],
    "examples": [
      {
        "id": "react-009.e01",
        "title": "Handler runs only on a click",
        "aliases": []
      },
      {
        "id": "react-009.e02",
        "title": "Capture event fields synchronously",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-010",
    "description": "A controlled input gets its value or checked state from React and reports changes through an event handler.",
    "questions": [
      {
        "id": "react-010.q01"
      },
      {
        "id": "react-010.q02"
      },
      {
        "id": "react-010.q03"
      },
      {
        "id": "react-010.q04"
      },
      {
        "id": "react-010.q05"
      },
      {
        "id": "react-010.q06"
      }
    ],
    "examples": [
      {
        "id": "react-010.e01",
        "title": "Controlled text input",
        "aliases": []
      },
      {
        "id": "react-010.e02",
        "title": "Controlled checkbox and select",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-011",
    "description": "Uncontrolled inputs keep their current value in the DOM. defaultValue initializes the field; refs or FormData read it when needed.",
    "questions": [
      {
        "id": "react-011.q01"
      },
      {
        "id": "react-011.q02"
      },
      {
        "id": "react-011.q03"
      },
      {
        "id": "react-011.q04"
      },
      {
        "id": "react-011.q05"
      },
      {
        "id": "react-011.q06"
      }
    ],
    "examples": [
      {
        "id": "react-011.e01",
        "title": "Read an uncontrolled ref on demand",
        "aliases": []
      },
      {
        "id": "react-011.e02",
        "title": "Collect FormData on submit",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-012",
    "description": "Props are supplied by a parent for a render; state belongs to the mounted component instance and persists between its renders.",
    "questions": [
      {
        "id": "react-012.q01"
      },
      {
        "id": "react-012.q02"
      },
      {
        "id": "react-012.q03"
      },
      {
        "id": "react-012.q04"
      },
      {
        "id": "react-012.q05"
      },
      {
        "id": "react-012.q06"
      }
    ],
    "examples": [
      {
        "id": "react-012.e01",
        "title": "Initialized local state is independent from later props",
        "aliases": []
      },
      {
        "id": "react-012.e02",
        "title": "Parent-owned value stays synchronized",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-013",
    "description": "Lifting state moves shared data to the nearest common parent so several children render a consistent source of truth.",
    "questions": [
      {
        "id": "react-013.q01"
      },
      {
        "id": "react-013.q02"
      },
      {
        "id": "react-013.q03"
      },
      {
        "id": "react-013.q04"
      },
      {
        "id": "react-013.q05"
      },
      {
        "id": "react-013.q06"
      }
    ],
    "examples": [
      {
        "id": "react-013.e01",
        "title": "Shared Celsius and Fahrenheit inputs",
        "aliases": []
      },
      {
        "id": "react-013.e02",
        "title": "Sibling controls share one counter",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-014",
    "description": "Composition builds a component from smaller components and caller-provided elements instead of an inheritance hierarchy.",
    "questions": [
      {
        "id": "react-014.q01"
      },
      {
        "id": "react-014.q02"
      },
      {
        "id": "react-014.q03"
      },
      {
        "id": "react-014.q04"
      },
      {
        "id": "react-014.q05"
      },
      {
        "id": "react-014.q06"
      }
    ],
    "examples": [
      {
        "id": "react-014.e01",
        "title": "Compose a configurable shell",
        "aliases": []
      },
      {
        "id": "react-014.e02",
        "title": "Change layout props without resetting a child",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-015",
    "description": "Parent-child communication uses props for input and callback props for requests back to the owner.",
    "questions": [
      {
        "id": "react-015.q01"
      },
      {
        "id": "react-015.q02"
      },
      {
        "id": "react-015.q03"
      },
      {
        "id": "react-015.q04"
      },
      {
        "id": "react-015.q05"
      },
      {
        "id": "react-015.q06"
      }
    ],
    "examples": [
      {
        "id": "react-015.e01",
        "title": "A child renders changing parent data",
        "aliases": []
      },
      {
        "id": "react-015.e02",
        "title": "A child requests a parent quantity change",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-016",
    "description": "A callback prop lets a child report an event or validated value to its parent without owning parent state.",
    "questions": [
      {
        "id": "react-016.q01"
      },
      {
        "id": "react-016.q02"
      },
      {
        "id": "react-016.q03"
      },
      {
        "id": "react-016.q04"
      },
      {
        "id": "react-016.q05"
      },
      {
        "id": "react-016.q06"
      }
    ],
    "examples": [
      {
        "id": "react-016.e01",
        "title": "Report a selected record",
        "aliases": []
      },
      {
        "id": "react-016.e02",
        "title": "Report a child-owned draft only on submit",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-017",
    "description": "Form handling combines input ownership, submit events and validation. Client checks improve feedback but do not establish server trust.",
    "questions": [
      {
        "id": "react-017.q01"
      },
      {
        "id": "react-017.q02"
      },
      {
        "id": "react-017.q03"
      },
      {
        "id": "react-017.q04"
      },
      {
        "id": "react-017.q05"
      },
      {
        "id": "react-017.q06"
      }
    ],
    "examples": [
      {
        "id": "react-017.e01",
        "title": "Controlled form with explicit validation",
        "aliases": []
      },
      {
        "id": "react-017.e02",
        "title": "Browser constraint validation",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-018",
    "description": "A committed component can mount, update and unmount. Effects synchronize functional components; class lifecycles offer a useful historical comparison.",
    "questions": [
      {
        "id": "react-018.q01"
      },
      {
        "id": "react-018.q02"
      },
      {
        "id": "react-018.q03"
      },
      {
        "id": "react-018.q04"
      },
      {
        "id": "react-018.q05"
      },
      {
        "id": "react-018.q06"
      }
    ],
    "examples": [
      {
        "id": "react-018.e01",
        "title": "Function component lifecycle trace",
        "aliases": []
      },
      {
        "id": "react-018.e02",
        "title": "Class lifecycle comparison",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-019",
    "description": "Unmounting removes a component instance and its state. Hiding a mounted DOM subtree preserves the component’s state.",
    "questions": [
      {
        "id": "react-019.q01"
      },
      {
        "id": "react-019.q02"
      },
      {
        "id": "react-019.q03"
      },
      {
        "id": "react-019.q04"
      },
      {
        "id": "react-019.q05"
      },
      {
        "id": "react-019.q06"
      }
    ],
    "examples": [
      {
        "id": "react-019.e01",
        "title": "Conditional removal resets local state",
        "aliases": []
      },
      {
        "id": "react-019.e02",
        "title": "Hidden DOM preserves the mounted state",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-020",
    "description": "React preserves state for matching component identity at a tree position. Changing a key or component type intentionally resets that subtree.",
    "questions": [
      {
        "id": "react-020.q01"
      },
      {
        "id": "react-020.q02"
      },
      {
        "id": "react-020.q03"
      },
      {
        "id": "react-020.q04"
      },
      {
        "id": "react-020.q05"
      },
      {
        "id": "react-020.q06"
      }
    ],
    "examples": [
      {
        "id": "react-020.e01",
        "title": "Stable position versus explicit key reset",
        "aliases": []
      },
      {
        "id": "react-020.e02",
        "title": "Different component types reset at the same position",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-021",
    "description": "Rendering computes a new element description; reconciliation decides which committed DOM nodes can be reused.",
    "questions": [
      {
        "id": "react-021.q01"
      },
      {
        "id": "react-021.q02"
      },
      {
        "id": "react-021.q03"
      },
      {
        "id": "react-021.q04"
      },
      {
        "id": "react-021.q05"
      },
      {
        "id": "react-021.q06"
      }
    ],
    "examples": [
      {
        "id": "react-021.e01",
        "title": "Text updates reuse a DOM node",
        "aliases": []
      },
      {
        "id": "react-021.e02",
        "title": "Changing the host type replaces the node",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-022",
    "description": "React elements are declarative JavaScript descriptions, not live DOM nodes. React uses them as input to reconciliation.",
    "questions": [
      {
        "id": "react-022.q01"
      },
      {
        "id": "react-022.q02"
      },
      {
        "id": "react-022.q03"
      },
      {
        "id": "react-022.q04"
      },
      {
        "id": "react-022.q05"
      },
      {
        "id": "react-022.q06"
      }
    ],
    "examples": [
      {
        "id": "react-022.e01",
        "title": "Inspect an actual React element",
        "aliases": []
      },
      {
        "id": "react-022.e02",
        "title": "JSX and createElement produce equivalent descriptions",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-023",
    "description": "React dispatches capture and bubble handlers through its event system. target is the origin; currentTarget is the component’s handler node.",
    "questions": [
      {
        "id": "react-023.q01"
      },
      {
        "id": "react-023.q02"
      },
      {
        "id": "react-023.q03"
      },
      {
        "id": "react-023.q04"
      },
      {
        "id": "react-023.q05"
      },
      {
        "id": "react-023.q06"
      }
    ],
    "examples": [
      {
        "id": "react-023.e01",
        "title": "React capture and bubbling order",
        "aliases": []
      },
      {
        "id": "react-023.e02",
        "title": "Stop bubble without undoing capture",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-024",
    "description": "React batches compatible state updates from an event or asynchronous continuation into fewer commits. Rendering and committing are separate observations.",
    "questions": [
      {
        "id": "react-024.q01"
      },
      {
        "id": "react-024.q02"
      },
      {
        "id": "react-024.q03"
      },
      {
        "id": "react-024.q04"
      },
      {
        "id": "react-024.q05"
      },
      {
        "id": "react-024.q06"
      }
    ],
    "examples": [
      {
        "id": "react-024.e01",
        "title": "Batch updates from one event",
        "aliases": []
      },
      {
        "id": "react-024.e02",
        "title": "Batch updates after a promise continuation",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-025",
    "description": "StrictMode enables development checks for render purity, effect cleanup and ref cleanup. It does not duplicate production effects.",
    "questions": [
      {
        "id": "react-025.q01"
      },
      {
        "id": "react-025.q02"
      },
      {
        "id": "react-025.q03"
      },
      {
        "id": "react-025.q04"
      },
      {
        "id": "react-025.q05"
      },
      {
        "id": "react-025.q06"
      }
    ],
    "examples": [
      {
        "id": "react-025.e01",
        "title": "Actual strict versus ordinary root comparison",
        "aliases": []
      },
      {
        "id": "react-025.e02",
        "title": "Callback ref setup and cleanup",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-026",
    "description": "Accessible controls use semantic HTML, labels, keyboard behavior and accurate ARIA state.",
    "questions": [
      {
        "id": "react-026.q01"
      },
      {
        "id": "react-026.q02"
      },
      {
        "id": "react-026.q03"
      },
      {
        "id": "react-026.q04"
      },
      {
        "id": "react-026.q05"
      },
      {
        "id": "react-026.q06"
      }
    ],
    "examples": [
      {
        "id": "react-026.e01",
        "title": "Native disclosure with ARIA state",
        "aliases": []
      },
      {
        "id": "react-026.e02",
        "title": "Accessible validation and focus",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-027",
    "description": "useState stores a component-local snapshot. Setters queue updates for a later render; updater functions compose with previous queued values.",
    "questions": [
      {
        "id": "react-027.q01"
      },
      {
        "id": "react-027.q02"
      },
      {
        "id": "react-027.q03"
      },
      {
        "id": "react-027.q04"
      },
      {
        "id": "react-027.q05"
      },
      {
        "id": "react-027.q06"
      }
    ],
    "examples": [
      {
        "id": "react-027.e01",
        "title": "Counter",
        "aliases": [
          "react-064.e01"
        ]
      },
      {
        "id": "react-027.e02",
        "title": "Functional updates",
        "aliases": [
          "react-065.e01"
        ]
      },
      {
        "id": "react-027.e03",
        "title": "Consecutive state updates",
        "aliases": [
          "react-066.e01"
        ]
      },
      {
        "id": "react-027.e04",
        "title": "Object updates",
        "aliases": [
          "react-067.e01"
        ]
      },
      {
        "id": "react-027.e05",
        "title": "Array updates",
        "aliases": [
          "react-068.e01"
        ]
      },
      {
        "id": "react-027.e06",
        "title": "Nested state updates",
        "aliases": [
          "react-069.e01"
        ]
      },
      {
        "id": "react-027.e07",
        "title": "State batching",
        "aliases": [
          "react-070.e01"
        ]
      },
      {
        "id": "react-027.e08",
        "title": "State vs local variables",
        "aliases": [
          "react-071.e01"
        ]
      },
      {
        "id": "react-027.e09",
        "title": "State initialization",
        "aliases": [
          "react-072.e01"
        ]
      },
      {
        "id": "react-027.e10",
        "title": "Stale state problems",
        "aliases": [
          "react-073.e01"
        ]
      }
    ]
  },
  {
    "id": "react-028",
    "description": "useEffect synchronizes a committed component with an external system. Dependencies select when synchronization restarts; cleanup releases the previous resources.",
    "questions": [
      {
        "id": "react-028.q01"
      },
      {
        "id": "react-028.q02"
      },
      {
        "id": "react-028.q03"
      },
      {
        "id": "react-028.q04"
      },
      {
        "id": "react-028.q05"
      },
      {
        "id": "react-028.q06"
      }
    ],
    "examples": [
      {
        "id": "react-028.e01",
        "title": "Effect after initial mount",
        "aliases": [
          "react-047.e01"
        ]
      },
      {
        "id": "react-028.e02",
        "title": "Effect without a dependency array",
        "aliases": [
          "react-048.e01"
        ]
      },
      {
        "id": "react-028.e03",
        "title": "Effect with an empty dependency array",
        "aliases": [
          "react-049.e01"
        ]
      },
      {
        "id": "react-028.e04",
        "title": "Effect with specific dependencies",
        "aliases": [
          "react-050.e01"
        ]
      },
      {
        "id": "react-028.e05",
        "title": "Fetching data from an API",
        "aliases": [
          "react-051.e01"
        ]
      },
      {
        "id": "react-028.e06",
        "title": "Loading and error handling",
        "aliases": [
          "react-052.e01"
        ]
      },
      {
        "id": "react-028.e07",
        "title": "Cleanup functions",
        "aliases": [
          "react-053.e01"
        ]
      },
      {
        "id": "react-028.e08",
        "title": "Timers and intervals",
        "aliases": [
          "react-054.e01"
        ]
      },
      {
        "id": "react-028.e09",
        "title": "Event listeners",
        "aliases": [
          "react-055.e01"
        ]
      },
      {
        "id": "react-028.e10",
        "title": "Infinite loop scenarios",
        "aliases": [
          "react-056.e01"
        ]
      },
      {
        "id": "react-028.e11",
        "title": "Stale closure scenarios",
        "aliases": [
          "react-057.e01"
        ]
      },
      {
        "id": "react-028.e12",
        "title": "Race conditions",
        "aliases": [
          "react-058.e01"
        ]
      },
      {
        "id": "react-028.e13",
        "title": "Request cancellation",
        "aliases": [
          "react-059.e01"
        ]
      },
      {
        "id": "react-028.e14",
        "title": "StrictMode behavior",
        "aliases": [
          "react-060.e01"
        ]
      },
      {
        "id": "react-028.e15",
        "title": "Fetching on search changes",
        "aliases": [
          "react-061.e01"
        ]
      },
      {
        "id": "react-028.e16",
        "title": "Correct async operation inside an effect",
        "aliases": [
          "react-062.e01"
        ]
      },
      {
        "id": "react-028.e17",
        "title": "Unnecessary effects and better alternatives",
        "aliases": [
          "react-063.e01"
        ]
      }
    ]
  },
  {
    "id": "react-029",
    "description": "useContext reads the nearest matching provider above the consumer and subscribes to that value.",
    "questions": [
      {
        "id": "react-029.q01"
      },
      {
        "id": "react-029.q02"
      },
      {
        "id": "react-029.q03"
      },
      {
        "id": "react-029.q04"
      },
      {
        "id": "react-029.q05"
      },
      {
        "id": "react-029.q06"
      }
    ],
    "examples": [
      {
        "id": "react-029.e01",
        "title": "Two readers of one theme",
        "aliases": []
      },
      {
        "id": "react-029.e02",
        "title": "Nested override and default",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-030",
    "description": "useReducer queues actions and derives the next state with a pure reducer.",
    "questions": [
      {
        "id": "react-030.q01"
      },
      {
        "id": "react-030.q02"
      },
      {
        "id": "react-030.q03"
      },
      {
        "id": "react-030.q04"
      },
      {
        "id": "react-030.q05"
      },
      {
        "id": "react-030.q06"
      }
    ],
    "examples": [
      {
        "id": "react-030.e01",
        "title": "Typed counter actions",
        "aliases": []
      },
      {
        "id": "react-030.e02",
        "title": "Immutable todo transitions",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-031",
    "description": "useRef retains a mutable container across renders. Updating current does not request a render.",
    "questions": [
      {
        "id": "react-031.q01"
      },
      {
        "id": "react-031.q02"
      },
      {
        "id": "react-031.q03"
      },
      {
        "id": "react-031.q04"
      },
      {
        "id": "react-031.q05"
      },
      {
        "id": "react-031.q06"
      }
    ],
    "examples": [
      {
        "id": "react-031.e01",
        "title": "Focus the actual input",
        "aliases": []
      },
      {
        "id": "react-031.e02",
        "title": "Mutable value without rerender",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-032",
    "description": "useMemo caches a calculation by Object.is comparisons of its dependencies. It is a performance optimization, not a semantic guarantee.",
    "questions": [
      {
        "id": "react-032.q01"
      },
      {
        "id": "react-032.q02"
      },
      {
        "id": "react-032.q03"
      },
      {
        "id": "react-032.q04"
      },
      {
        "id": "react-032.q05"
      },
      {
        "id": "react-032.q06"
      }
    ],
    "examples": [
      {
        "id": "react-032.e01",
        "title": "Stable array versus new array",
        "aliases": []
      },
      {
        "id": "react-032.e02",
        "title": "Object dependency invalidation",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-033",
    "description": "useCallback caches a function identity while its dependencies remain equal. Its closure still belongs to a render.",
    "questions": [
      {
        "id": "react-033.q01"
      },
      {
        "id": "react-033.q02"
      },
      {
        "id": "react-033.q03"
      },
      {
        "id": "react-033.q04"
      },
      {
        "id": "react-033.q05"
      },
      {
        "id": "react-033.q06"
      }
    ],
    "examples": [
      {
        "id": "react-033.e01",
        "title": "Stable updater versus fresh callback",
        "aliases": []
      },
      {
        "id": "react-033.e02",
        "title": "Retained callback captures a snapshot",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-034",
    "description": "useLayoutEffect runs after DOM commit before the browser repaints, letting a component measure and synchronously correct its layout.",
    "questions": [
      {
        "id": "react-034.q01"
      },
      {
        "id": "react-034.q02"
      },
      {
        "id": "react-034.q03"
      },
      {
        "id": "react-034.q04"
      },
      {
        "id": "react-034.q05"
      },
      {
        "id": "react-034.q06"
      }
    ],
    "examples": [
      {
        "id": "react-034.e01",
        "title": "Measure committed browser geometry",
        "aliases": []
      },
      {
        "id": "react-034.e02",
        "title": "Layout and passive effect order",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-035",
    "description": "useImperativeHandle customizes the value exposed through a ref. React 19 function components can receive ref as a prop.",
    "questions": [
      {
        "id": "react-035.q01"
      },
      {
        "id": "react-035.q02"
      },
      {
        "id": "react-035.q03"
      },
      {
        "id": "react-035.q04"
      },
      {
        "id": "react-035.q05"
      },
      {
        "id": "react-035.q06"
      }
    ],
    "examples": [
      {
        "id": "react-035.e01",
        "title": "Expose focus and clear commands",
        "aliases": []
      },
      {
        "id": "react-035.e02",
        "title": "Expose domain validation",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-036",
    "description": "useId generates a component-instance ID for accessibility relationships. The exact string format is an implementation detail.",
    "questions": [
      {
        "id": "react-036.q01"
      },
      {
        "id": "react-036.q02"
      },
      {
        "id": "react-036.q03"
      },
      {
        "id": "react-036.q04"
      },
      {
        "id": "react-036.q05"
      },
      {
        "id": "react-036.q06"
      }
    ],
    "examples": [
      {
        "id": "react-036.e01",
        "title": "Two independent accessible fields",
        "aliases": []
      },
      {
        "id": "react-036.e02",
        "title": "Associate hint and error IDs",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-037",
    "description": "useTransition marks nonurgent state updates and exposes whether its Actions are pending. Urgent input state stays outside the transition.",
    "questions": [
      {
        "id": "react-037.q01"
      },
      {
        "id": "react-037.q02"
      },
      {
        "id": "react-037.q03"
      },
      {
        "id": "react-037.q04"
      },
      {
        "id": "react-037.q05"
      },
      {
        "id": "react-037.q06"
      }
    ],
    "examples": [
      {
        "id": "react-037.e01",
        "title": "Urgent text and transition filter",
        "aliases": []
      },
      {
        "id": "react-037.e02",
        "title": "Async Action with actual API",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-038",
    "description": "useDeferredValue allows a nonurgent view of a changing value to lag behind its urgent source.",
    "questions": [
      {
        "id": "react-038.q01"
      },
      {
        "id": "react-038.q02"
      },
      {
        "id": "react-038.q03"
      },
      {
        "id": "react-038.q04"
      },
      {
        "id": "react-038.q05"
      },
      {
        "id": "react-038.q06"
      }
    ],
    "examples": [
      {
        "id": "react-038.e01",
        "title": "Deferred result query",
        "aliases": []
      },
      {
        "id": "react-038.e02",
        "title": "Explicit initial deferred value",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-039",
    "description": "useDebugValue registers a custom-hook label for React Developer Tools. It does not render text into the application.",
    "questions": [
      {
        "id": "react-039.q01"
      },
      {
        "id": "react-039.q02"
      },
      {
        "id": "react-039.q03"
      },
      {
        "id": "react-039.q04"
      },
      {
        "id": "react-039.q05"
      },
      {
        "id": "react-039.q06"
      }
    ],
    "examples": [
      {
        "id": "react-039.e01",
        "title": "Register the current hook value",
        "aliases": []
      },
      {
        "id": "react-039.e02",
        "title": "Defer formatting until inspection",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-040",
    "description": "useSyncExternalStore subscribes React to an external mutable source through a stable cached snapshot.",
    "questions": [
      {
        "id": "react-040.q01"
      },
      {
        "id": "react-040.q02"
      },
      {
        "id": "react-040.q03"
      },
      {
        "id": "react-040.q04"
      },
      {
        "id": "react-040.q05"
      },
      {
        "id": "react-040.q06"
      }
    ],
    "examples": [
      {
        "id": "react-040.e01",
        "title": "Two subscribers to an external counter",
        "aliases": []
      },
      {
        "id": "react-040.e02",
        "title": "Subscribe to real viewport width",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-041",
    "description": "useInsertionEffect provides CSS-in-JS libraries a phase for installing style rules before layout effects.",
    "questions": [
      {
        "id": "react-041.q01"
      },
      {
        "id": "react-041.q02"
      },
      {
        "id": "react-041.q03"
      },
      {
        "id": "react-041.q04"
      },
      {
        "id": "react-041.q05"
      },
      {
        "id": "react-041.q06"
      }
    ],
    "examples": [
      {
        "id": "react-041.e01",
        "title": "Insert style before observing layout",
        "aliases": []
      },
      {
        "id": "react-041.e02",
        "title": "Independent style ownership and removal",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-042",
    "description": "useActionState manages the returned state and pending status of an Action, with each queued action receiving the previous result.",
    "questions": [
      {
        "id": "react-042.q01"
      },
      {
        "id": "react-042.q02"
      },
      {
        "id": "react-042.q03"
      },
      {
        "id": "react-042.q04"
      },
      {
        "id": "react-042.q05"
      },
      {
        "id": "react-042.q06"
      }
    ],
    "examples": [
      {
        "id": "react-042.e01",
        "title": "Real form Action with validation and failure",
        "aliases": []
      },
      {
        "id": "react-042.e02",
        "title": "Queued Actions consume previous results",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-043",
    "description": "useOptimistic overlays temporary state during an Action and reverts to the base when the Action ends.",
    "questions": [
      {
        "id": "react-043.q01"
      },
      {
        "id": "react-043.q02"
      },
      {
        "id": "react-043.q03"
      },
      {
        "id": "react-043.q04"
      },
      {
        "id": "react-043.q05"
      },
      {
        "id": "react-043.q06"
      }
    ],
    "examples": [
      {
        "id": "react-043.e01",
        "title": "Optimistic item confirmation and rollback",
        "aliases": []
      },
      {
        "id": "react-043.e02",
        "title": "Rebase optimistic delta on a changing base",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-044",
    "description": "useEffectEvent reads the latest committed values from an event belonging to an Effect, without making those values reactive synchronization inputs.",
    "questions": [
      {
        "id": "react-044.q01"
      },
      {
        "id": "react-044.q02"
      },
      {
        "id": "react-044.q03"
      },
      {
        "id": "react-044.q04"
      },
      {
        "id": "react-044.q05"
      },
      {
        "id": "react-044.q06"
      }
    ],
    "examples": [
      {
        "id": "react-044.e01",
        "title": "Latest count in a persistent listener",
        "aliases": []
      },
      {
        "id": "react-044.e02",
        "title": "Latest theme without reconnecting",
        "aliases": []
      },
      {
        "id": "react-044.e03",
        "title": "Reactive room still replaces subscription",
        "aliases": []
      },
      {
        "id": "react-044.e04",
        "title": "Timer reads latest increment",
        "aliases": []
      },
      {
        "id": "react-044.e05",
        "title": "Latest mute flag controls a notification",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-045",
    "description": "React use reads a context or a stable Promise resource. Unlike Hooks, use may be called conditionally, but still only while a component or Hook renders.",
    "questions": [
      {
        "id": "react-045.q01"
      },
      {
        "id": "react-045.q02"
      },
      {
        "id": "react-045.q03"
      },
      {
        "id": "react-045.q04"
      },
      {
        "id": "react-045.q05"
      },
      {
        "id": "react-045.q06"
      }
    ],
    "examples": [
      {
        "id": "react-045.e01",
        "title": "Read context conditionally with use",
        "aliases": []
      },
      {
        "id": "react-045.e02",
        "title": "Stable real Promise under Suspense",
        "aliases": []
      }
    ]
  },
  {
    "id": "react-046",
    "description": "Custom Hooks compose reusable stateful logic by calling Hooks. Each call has its own state unless it deliberately subscribes to a shared source.",
    "questions": [
      {
        "id": "react-046.q01"
      },
      {
        "id": "react-046.q02"
      },
      {
        "id": "react-046.q03"
      },
      {
        "id": "react-046.q04"
      },
      {
        "id": "react-046.q05"
      },
      {
        "id": "react-046.q06"
      }
    ],
    "examples": [
      {
        "id": "react-046.e01",
        "title": "Two independent custom counter calls",
        "aliases": []
      },
      {
        "id": "react-046.e02",
        "title": "Reusable Escape listener lifecycle",
        "aliases": []
      }
    ]
  }
];
