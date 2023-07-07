export enum LANG_CODES {
  EN = "en",
}
export enum PROGRESS_STATUS {
  DONE = "DONE",
  IN_PROGRESS = "IN_PROGRESS",
  FAILED = "FAILED",
}
export const RFC_3339 = "YYYY-MM-DDTHH:mm:ss.sssZ";

export const HEADER_COLUMNS_LIST = ["A", "B", "C"];

export const DUMMY_ROWS_LIST = [
  [
    { id: "A0", value: "3", formula: "" },
    { id: "B0", value: "18", formula: "" },
    { id: "C0", value: null, formula: "=12 + 3 / (2)" },
  ],
  [
    { id: "A1", value: "3", formula: "" },
    { id: "B1", value: null, formula: "=2.5 * 2" },
    { id: "C1", value: "3", formula: "" },
  ],
  [
    { id: "A2", value: null, formula: "=2*4-3,3" },
    { id: "B2", value: null, formula: "=A0+B0/2" },
    { id: "C2", value: "1", formula: "" },
  ],
  [
    { id: "A3", value: "7", formula: "" },
    { id: "B3", value: "1", formula: "" },
    { id: "C3", value: "1", formula: "" },
  ],
  [
    { id: "A4", value: "7", formula: "" },
    { id: "B4", value: "1", formula: "" },
    { id: "C4", value: "1", formula: "" },
  ],
  [
    { id: "A5", value: "7", formula: "" },
    { id: "B5", value: "1", formula: "" },
    { id: "C5", value: "1", formula: "" },
  ],
  [
    { id: "A6", value: "7", formula: "" },
    { id: "B6", value: "1", formula: "" },
    { id: "C6", value: "1", formula: "" },
  ],
  [
    { id: "A7", value: "7", formula: "" },
    { id: "B7", value: "1", formula: "" },
    { id: "C7", value: "1", formula: "" },
  ],
];

export const SERVICE_TEXT = "Not included in free trial, lol";
