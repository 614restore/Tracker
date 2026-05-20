# Elite Kids Chore Tracker — Setup Guide

This guide pairs with the Apps Script in `apps-script/Code.gs` and provides the spreadsheet formulas, data validation, and conditional formatting rules.

## 1) Install the Apps Script
1. Open your Google Sheet.
2. Go to **Extensions → Apps Script**.
3. Replace any placeholder code with the contents of `apps-script/Code.gs`.
4. Save, then run any function once to authorize.

## 2) Frontend Formula Matrix

### 📊 Master Dashboard
**Total Interest Earned (Cell H7):**
```
=IFERROR(SUMIFS('👦 Kid 1: Ledger'!D:D, '👦 Kid 1: Ledger'!B:B, "Interest Reward"), 0)
```
**Sparkline Growth Visualizer (Cell I7):**
```
=IFERROR(SPARKLINE(H7, {"charttype","bar"; "max",D7; "color1","#A3BE8C"}), "Waiting for interest...")
```
*Drag these down to row 8 for Kid 2 and update the sheet references.*

### 📅 Weekly Chores (Row 2, drag down)
**Fetch Description (Cell D2):**
```
=IFERROR(VLOOKUP(C2, MasterChoreList, 2, FALSE), "")
```
**Fetch Payout Value (Cell E2):**
```
=IFERROR(VLOOKUP(C2, MasterChoreList, 3, FALSE), 0)
```

### 👦 Kid 1: Ledger (Mini-Dashboard)
**Spend Wallet (Cell B2):**
```
=IFERROR(SUMIFS(D6:D, C6:C, "Spend Wallet"), 0)
```
**Save Bank (Cell C2):**
```
=IFERROR(SUMIFS(D6:D, C6:C, "Save Bank"), 0)
```
**Give Box (Cell D2):**
```
=IFERROR(SUMIFS(D6:D, C6:C, "Give Box"), 0)
```
**Milestone Goals (Cell E2):**
```
=IFERROR(SUMIFS(D6:D, C6:C, "Milestone Goals"), 0)
```

## 3) UI Logic (Validation & Formatting)

### Data Validation (Dropdowns)
Apply via **Data → Data validation**.

| Tab | Range | Validation Type | Exact Configuration |
| --- | --- | --- | --- |
| `📅 Weekly Chores` | Column B | Dropdown | `Kid 1, Kid 2` |
| `📅 Weekly Chores` | Column C | Dropdown (from a range) | `=MasterChoreList` |
| `👦 Kid 1: Ledger` | Column B | Dropdown | `Chore Payout, Manual Deposit, Manual Withdrawal, Interest Reward, Goal Milestone Allocation` |
| `👦 Kid 1: Ledger` | Column C | Dropdown | `Spend Wallet, Save Bank, Give Box, Milestone Goals` |

### Conditional Formatting (Color Logic)
Apply via **Format → Conditional formatting**.

**Gamified Checkboxes** (`📅 Weekly Chores` tab | Range: `A2:G100`):
- **Rule 1 (Pending Parent Verification)**
  - Custom formula: `=AND($F2=TRUE, $G2=FALSE)`
  - Format: Background `#FFF9C4` (Soft Yellow)
- **Rule 2 (Completed & Approved)**
  - Custom formula: `=AND($F2=TRUE, $G2=TRUE)`
  - Format: Background `#D4EFDF` (Soft Green)

**Ledger Cash Flow** (`👦 Kid 1: Ledger` tab | Range: `D6:D1000`):
- **Rule 1 (Income)**
  - Condition: Greater than `0`
  - Format: Background `#E8F5E9`, Text `#2E7D32` (Green)
- **Rule 2 (Purchases/Withdrawals)**
  - Condition: Less than `0`
  - Format: Background `#FFEBEE`, Text `#C62828` (Red)

## 4) Notes
- Duplicate the ledger formulas and formatting for Kid 2 by adjusting the sheet name references.
- Ensure your sheet tabs match the names used in the script and formulas.
