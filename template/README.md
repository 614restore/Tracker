# Sheet Template Blueprint

Use this folder to build your Google Sheet quickly. Each CSV can be pasted/imported into a tab with the same name.

## Tabs (create in this order)
1. 📅 Weekly Chores
2. 👦 Kid 1: Ledger
3. 👧 Kid 2: Ledger
4. 📊 Master Dashboard
5. 🏁 Instructions
6. Master Chore List

## Named Range
- `MasterChoreList` → `Master Chore List`!A:C

## Import tips
- In Google Sheets, use **File → Import → Upload** and choose the CSV.
- Or copy/paste the CSV contents directly into the sheet.

## Formulas to add after import
### 📅 Weekly Chores
- D2: `=IFERROR(VLOOKUP(C2, MasterChoreList, 2, FALSE), "")`
- E2: `=IFERROR(VLOOKUP(C2, MasterChoreList, 3, FALSE), 0)`

### 👦 Kid 1: Ledger / 👧 Kid 2: Ledger
- B2: `=IFERROR(SUMIFS(D6:D, C6:C, "Spend Wallet"), 0)`
- C2: `=IFERROR(SUMIFS(D6:D, C6:C, "Save Bank"), 0)`
- D2: `=IFERROR(SUMIFS(D6:D, C6:C, "Give Box"), 0)`
- E2: `=IFERROR(SUMIFS(D6:D, C6:C, "Milestone Goals"), 0)`

### 📊 Master Dashboard
- H7: `=IFERROR(SUMIFS('👦 Kid 1: Ledger'!D:D, '👦 Kid 1: Ledger'!B:B, "Interest Reward"), 0)`
- I7: `=IFERROR(SPARKLINE(H7, {"charttype","bar"; "max",D7; "color1","#A3BE8C"}), "Waiting for interest...")`
- Drag these down to row 8 for Kid 2 and update the sheet references.
