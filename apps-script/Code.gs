/**
 * ELITE KIDS CHORE TRACKER - MASTER ENGINE
 * Automates ledger payouts, chore board resets, and interest generation.
 */

// 1. Creates a custom UI menu on spreadsheet load
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('🏦 Family Bank')
      .addItem('✅ Process Chores & Reset Week', 'processWeeklyChoresAndReset')
      .addSeparator()
      .addItem('📈 Apply Monthly Interest', 'processMonthlyInterest')
      .addToUi();
}

// 2. Processes completed chores and routes funds to the correct ledger
function processWeeklyChoresAndReset() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var choreSheet = ss.getSheetByName("📅 Weekly Chores");
  
  if (!choreSheet) {
    SpreadsheetApp.getUi().alert("Error: Could not find the '📅 Weekly Chores' tab.");
    return;
  }
  
  var lastRow = choreSheet.getLastRow();
  if (lastRow < 2) return; 
  
  var dataRange = choreSheet.getRange(2, 1, lastRow - 1, 7);
  var data = dataRange.getValues();
  var today = new Date(); 
  var choresProcessed = 0;
  
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var kidName = row[1];       
    var choreName = row[2];     
    var payoutValue = row[4];   
    var isComplete = row[5];    
    var isVerified = row[6];    
    
    // Validates if both the child and parent have approved the task
    if (isComplete === true && isVerified === true) {
      var targetLedgerName = (kidName === "Kid 1") ? "👦 Kid 1: Ledger" : "👧 Kid 2: Ledger";
      var targetSheet = ss.getSheetByName(targetLedgerName);
      
      if (targetSheet) {
        targetSheet.appendRow([
          today,                          
          "Chore Payout",                 
          "Spend Wallet",                 
          payoutValue,                    
          "Weekly Automation: " + choreName 
        ]);
        choresProcessed++;
      }
    }
  }
  
  // Clears all checkboxes to reset the board
  var resetRangeFlags = choreSheet.getRange(2, 6, lastRow - 1, 2);
  resetRangeFlags.uncheck(); 
  
  SpreadsheetApp.getUi().alert("Success! " + choresProcessed + " chores were paid out and the board has been reset for a new week.");
}

// 3. Calculates and deposits monthly compound interest
function processMonthlyInterest() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var instructionsSheet = ss.getSheetByName("🏁 Instructions");
  var dashboardSheet = ss.getSheetByName("📊 Master Dashboard");
  
  try {
    var annualInterestRate = instructionsSheet.getRange("B15").getValue();
    var monthlyRate = annualInterestRate / 12;
    var today = new Date();
    
    var kid1Ledger = ss.getSheetByName("👦 Kid 1: Ledger");
    var kid1SaveBalance = dashboardSheet.getRange("D7").getValue(); 
    if (kid1SaveBalance > 0) {
      var kid1Interest = kid1SaveBalance * monthlyRate;
      kid1Ledger.appendRow([today, "Interest Reward", "Save Bank", kid1Interest, "Monthly Automated Compound Interest"]);
    }
    
    var kid2Ledger = ss.getSheetByName("👧 Kid 2: Ledger");
    var kid2SaveBalance = dashboardSheet.getRange("D8").getValue(); 
    if (kid2SaveBalance > 0) {
      var kid2Interest = kid2SaveBalance * monthlyRate;
      kid2Ledger.appendRow([today, "Interest Reward", "Save Bank", kid2Interest, "Monthly Automated Compound Interest"]);
    }
    
    SpreadsheetApp.getUi().alert("Monthly interest has been calculated and deposited into the Save Banks!");
    
  } catch (e) {
    SpreadsheetApp.getUi().alert("Error calculating interest. Please ensure your dashboard rows and global interest rate are set up correctly.");
  }
}
