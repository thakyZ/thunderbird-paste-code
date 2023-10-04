import assert from "assert";
import { highlight } from "../js/highlight.mjs";

describe('highlight', () => {

    // Returns the input text if there are no bold keywords
    it('should return the input text when there are no bold keywords', () => {
      const inputText = "This is a sample text";
      const expectedOutput = "This <b>is</b> a sample text";
  
      const result = highlight(inputText);
  
      assert.equal(result, expectedOutput);
    });

    // Highlights a single bold keyword in the input text
    it('should highlight a single bold keyword in the input text', () => {
      const inputText = "This is a sample text with the keyword 'class'";
      const expectedOutput = "This <b>is</b> a sample text with the keyword '<b>class</b>'";
  
      const result = highlight(inputText);
  
      assert.equal(result, expectedOutput);
    });

    // Highlights multiple bold keywords in the input text
    it('should highlight multiple bold keywords in the input text', () => {
      const inputText = "This is a sample text with the keywords 'class' and 'function'";
      const expectedOutput = "This <b>is</b> a sample text with the keywords '<b>class</b>' and '<b>function</b>'";
  
      const result = highlight(inputText);
  
      assert.equal(result, expectedOutput);
    });

    // Does not highlight bold keywords that are substrings of other words
    it('should not highlight bold keywords that are substrings of other words', () => {
      const inputText = "This is a sample text with the word 'class' in classical music";
      const expectedOutput = "This <b>is</b> a sample text with the word '<b>class</b>' <b>in</b> classical music";
  
      const result = highlight(inputText);
  
      assert.equal(result, expectedOutput);
    });

    // Does not highlight bold keywords that are part of URLs or email addresses
    it('should not highlight bold keywords that are part of URLs or email addresses', () => {
      const inputText = "Visit my website at www.example.com or email me at info@example.com";
      const expectedOutput = "Visit my website at www.example.com or email me at info@example.com";
  
      const result = highlight(inputText);
  
      assert.equal(result, expectedOutput);
    });
});
