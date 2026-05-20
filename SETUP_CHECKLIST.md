# Setup Checklist — Elite Kids Chore Tracker

Use this checklist to build the sheet from scratch in the recommended order.

## ✅ Repo files
- [ ] `apps-script/Code.gs` added to Apps Script editor
- [ ] `README.md` reviewed for formulas/formatting rules
- [ ] `template/` CSVs imported into corresponding tabs

## ✅ Google Sheet tabs (in order)
- [ ] 📅 Weekly Chores
- [ ] 👦 Kid 1: Ledger
- [ ] 👧 Kid 2: Ledger
- [ ] 📊 Master Dashboard
- [ ] 🏁 Instructions
- [ ] Master Chore List

## ✅ Named range
- [ ] Create named range `MasterChoreList` → `Master Chore List`!A:C

## ✅ Formulas
### 📅 Weekly Chores
- [ ] D2: `=IFERROR(VLOOKUP(C2, MasterChoreList, 2, FALSE), "")`
- [ ] E2: `=IFERROR(VLOOKUP(C2, MasterChoreList, 3, FALSE), 0)`
- [ ] Drag D2:E2 down

### 👦 Kid 1: Ledger / 👧 Kid 2: Ledger
- [ ] B2: `=IFERROR(SUMIFS(D6:D, C6:C, "Spend Wallet"), 0)`
- [ ] C2: `=IFERROR(SUMIFS(D6:D, C6:C, "Save Bank"), 0)`
- [ ] D2: `=IFERROR(SUMIFS(D6:D, C6:C, "Give Box"), 0)`
- [ ] E2: `=IFERROR(SUMIFS(D6:D, C6:C, "Milestone Goals"), 0)`

### 📊 Master Dashboard
- [ ] H7: `=IFERROR(SUMIFS('👦 Kid 1: Ledger'!D:D, '👦 Kid 1: Ledger'!B:B, "Interest Reward"), 0)`
- [ ] I7: `=IFERROR(SPARKLINE(H7, {"charttype","bar"; "max",D7; "color1","#A3BE8C"}), "Waiting for interest...")`
- [ ] Drag H7:I7 down to row 8 and update Kid 2 sheet refs

## ✅ Data validation
### 📅 Weekly Chores
- [ ] Column B dropdown: `Kid 1, Kid 2`
- [ ] Column C dropdown (from range): `=MasterChoreList`

### 👦 Kid 1: Ledger
- [ ] Column B dropdown: `Chore Payout, Manual Deposit, Manual Withdrawal, Interest Reward, Goal Milestone Allocation`
- [ ] Column C dropdown: `Spend Wallet, Save Bank, Give Box, Milestone Goals`

## ✅ Conditional formatting
### 📅 Weekly Chores (A2:G100)
- [ ] Pending verification: `=AND($F2=TRUE, $G2=FALSE)` → background `#FFF9C4`
- [ ] Completed & approved: `=AND($F2=TRUE, $G2=TRUE)` → background `#D4EFDF`

### 👦 Kid 1: Ledger (D6:D1000)
- [ ] Income: greater than `0` → bg `#E8F5E9`, text `#2E7D32`
- [ ] Withdrawals: less than `0` → bg `#FFEBEE`, text `#C62828`

## ✅ Script setup
- [ ] Open **Extensions → Apps Script**
- [ ] Paste `apps-script/Code.gs`
- [ ] Save, run a function once, and authorize
- [ ] Reload sheet to see **🏦 Family Bank** menu
