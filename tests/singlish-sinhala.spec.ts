import { test, expect } from '@playwright/test';

/**
 * Data extracted from your "my one.xlsx" file.
 * Total scenarios: 35 (24 Positive, 10 Negative, 1 UI)
 */
const testData = [
  { id: 'Pos_Fun_0001', name: 'Convert a short daily greeting phrase', input: 'oyaata kohomadha?', expected: 'ඔයාට කොහොමද?' },
  { id: 'Pos_Fun_0002 - Convert simple daily sentence', input: 'mama gedhara yanavaa', expected: 'මම ගෙදර යනවා' },
  { id: 'Pos_Fun_0003 - Convert greeting sentence', input: 'good morning amma', expected: 'good morning අම්මා' },
  { id: 'Pos_Fun_0004 - Convert school activity sentence', input: 'mama school yanavaa', expected: 'මම school යනවා' },
  { id: 'Pos_Fun_0005 - Convert eating activity sentence', input: 'mama bath kanavaa', expected: 'මම බත් කනවා' },
  { id: 'Pos_Fun_0006 - Convert Sleeping activity sentence', input: 'mama nidagannavaa', expected: 'මම නිදාගන්නවා' },
  { id: 'Pos_Fun_0007 - Convert working sentence', input: 'mama dhaen vaeda karanavaa', expected: 'මම දැන් වැඩ කරනවා' },
  { id: 'Pos_Fun_0008 - Convert going outside sentence', input: 'mama eliyata yanavaa', expected: 'මම එලියට යනවා' },
  { id: 'Pos_Fun_0009 - Convert a short daily greeting phrase', input:  'mama gedhara yanavaa', expected: 'මම ගෙදර යනවා' },
  { id: 'Pos_Fun_0010 - Convert studing sentence', input: 'mama igena gannavaa', expected: 'මම ඉගෙන ගන්නවා' },
  { id: 'Pos_Fun_0011 - Convert reading sentence', input:  'mama potha kiyavanavaa', expected: 'මම පොත කියවනවා' },
  { id: 'Pos_Fun_0012 - Convert watching TV sentence', input: 'mama tv balanavaa', expected: 'මම ට්ව් බලනවා' },
  { id: 'Pos_Fun_0013 - Convert drinking water sentence', input: 'mama vathura bonavaa', expected: 'මම වතුර බොනවා' },
  { id: 'Pos_Fun_0014 - Convert walking sentence', input:  'mama payin yanavaa', expected: 'මම පයින් යනවා' },
  { id: 'Pos_Fun_0015 - Convert walking sentence', input:  'mama dhuvanavaa', expected: 'මම දුවනවා' },
  { id: 'Pos_Fun_0016 - Convert playing sentence', input:  'mama sellam karanavaa', expected: 'මම සෙල්ලම් කරනවා' },
  { id: 'Pos_Fun_0017 - Convert eating fruits sentence', input:  'mama palathuru kanavaa', expected: 'මම පලතුරු කනවා' },
  { id: 'Pos_Fun_0018 - Tooltip shows full text', input:  'mama gedhara yanavaa, oba dhakinna puluvandha?', expected:'මම ගෙදර යනවා, ඔබ දකින්න පුලුවන්ද?'},
  { id: 'Pos_Fun_0019 - Convert polite phrasing', input: 'karuNaakaralaa mata podi udhavvak karanna puLuvandha?', expected:'කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුළුවන්ද?'},
  { id: 'Pos_Fun_0020 - Convert learning sentence', input:  'mama Sinhala igena gannavaa', expected: 'මම Sinhala ඉගෙන ගන්නවා' },
  { id: 'Pos_Fun_0021 - Convert coming sentence', input:  'mama enavaa', expected: 'මම එනවා' },
  { id: 'Pos_Fun_0022 - Frequent expression conversion', input: 'mata baya hithenavaa', expected: 'මට බය හිතෙනවා' },
  { id: 'Pos_Fun_0023 - Convert conditional sentence', input: 'oba yannee nam mama ehema karanavaa', expected:  'ඔබ යන්නේ නම් මම එහෙම කරනවා' },
  { id: 'Pos_Fun_0024 - Convert standing sentence', input: 'mama hitagena inne', expected:  'මම හිටගෙන ඉන්නෙ' },
  
  
  
  { id: 'Neg_Fun_0001', name: 'Slang handling', input: 'Thanks machan', expected: 'Thanks මචන්' },
  { id: 'Neg_Fun_0002', name: 'Incorrect spacing', input: 'mamagedharayanavaa', expected: 'mama gedhara yanavaa' },
  { id: 'Neg_Fun_0003', name: 'Invalid characters', input: 'mama ??? Karanavaa', expected: 'මම ??? කරනවා' },
  { id: 'Neg_Fun_0004', name: 'Empty input', input:  '', expected: 'Error message' },
  { id: 'Neg_Fun_0005', name: 'Numeric input handling', input: 'mama 123 yanavaa', expected: 'Invalid input error' },
  { id: 'Neg_Fun_0006', name: 'Mixed language input', input: 'mama go yanavaa', expected: 'Mixed language not supported' },
  { id: 'Neg_Fun_0007', name: 'Uppercase input handling', input: 'MAMA GEDHARA YANAVAA', expected: 'Proper sentence conversion' },
  { id: 'Neg_Fun_0008', name: 'Unsupported symbols', input: 'mama @ gedhara yanavaa', expected: 'Invalid symbol error' },
  { id: 'Neg_Fun_0009', name: 'Exceed character limit', input: 'sentence longer than allowed length', expected: 'Length validation error' },
  { id: 'Neg_Fun_0010', name: 'Unsupported question format', input: 'why you go there', expected: 'Unsupported sentence type' },

  { id: 'Pos_UI_0001', name: 'Verify input and output text display UI', input: 'mama gedara inne', expected: 'Proper Sinhala text shown with correct font and alignment' }
];

test.describe('IT3040 Assignment: Swift Translator Automation', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the translator and wait for it to load
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  for (const scenario of testData) {
    test(`${scenario.id}: ${scenario.name} | SAVINDU`, async ({ page }, testInfo) => {
      // 1. Identify Input and Output fields
      // Based on the site structure, we find the first and last textareas
      const inputArea = page.getByPlaceholder("Input Your Singlish Text Here.");
      const outputArea = page.locator('div.bg-slate-50');

      // 2. Perform actions
      await inputArea.fill(scenario.input);
      
      // 3. Wait for real-time conversion (Brief delay for JS to run)
      await page.waitForTimeout(1000); 

      // 4. Capture Actual Output
      const actualOutput = await outputArea.innerHTML();

      // 5. Log for Excel Reporting
      console.log(`TC ID: ${scenario.id}`);
      console.log(`Actual Output: ${actualOutput}`);

      // 6. Attach to report for easy copying
      testInfo.annotations.push({
        type: 'Actual Output (Sinhala)',
        description: actualOutput
      });

      await expect(outputArea).toHaveText(scenario.expected);

      // // 7. Verify Result (Assertions)
      // // Note: Negative scenarios might fail this assertion, which validates the "Failure"
      // if (scenario.id.startsWith('Pos')) {
        
      // } else {
      //   // For Negative scenarios, we expect some inconsistency or capture the bug
      //   console.warn(`[NEG] ${scenario.id} captured result: ${actualOutput}`);
      // }
    });
  }

  
});