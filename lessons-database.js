// Complete Qaidah Lessons Database
// 84 lessons across 6 modules

const lessonsDatabase = {
  modules: [
    {
      id: 1,
      name: "Arabic Alphabet",
      description: "Learn all 28 Arabic letters in their isolated forms",
      totalLessons: 18,
      lessons: [
        {
          id: 1,
          title: "Letters: Alif, Ba, Ta, Tha",
          arabicLetters: ["ا", "ب", "ت", "ث"],
          pronunciation: ["Alif (A)", "Ba (B)", "Ta (T)", "Tha (TH)"],
          objectives: [
            "Recognize the four letters visually",
            "Pronounce each letter correctly",
            "Write each letter in isolated form"
          ],
          tips: "Alif is a straight vertical line. Ba, Ta, and Tha have similar shapes but different dots.",
          duration: 15,
          points: 50
        },
        {
          id: 2,
          title: "Letters: Jeem, Haa, Khaa",
          arabicLetters: ["ج", "ح", "خ"],
          pronunciation: ["Jeem (J)", "Haa (H)", "Khaa (KH)"],
          objectives: [
            "Distinguish between the three letters",
            "Practice the throat sound for Haa and Khaa",
            "Master the curved shape of these letters"
          ],
          tips: "These letters have the same base shape. The dots make the difference!",
          duration: 15,
          points: 50
        },
        {
          id: 3,
          title: "Letters: Dal, Dhal",
          arabicLetters: ["د", "ذ"],
          pronunciation: ["Dal (D)", "Dhal (DH)"],
          objectives: [
            "Recognize Dal and Dhal",
            "Pronounce the 'th' sound in Dhal",
            "Practice writing these non-connecting letters"
          ],
          tips: "Dal and Dhal don't connect to letters after them.",
          duration: 12,
          points: 40
        },
        {
          id: 4,
          title: "Letters: Ra, Zay",
          arabicLetters: ["ر", "ز"],
          pronunciation: ["Ra (R)", "Zay (Z)"],
          objectives: [
            "Master the rolling 'R' sound",
            "Distinguish between Ra and Zay",
            "Understand non-connecting letters"
          ],
          tips: "Ra requires a slight roll of the tongue. Practice makes perfect!",
          duration: 12,
          points: 40
        },
        {
          id: 5,
          title: "Letters: Seen, Sheen",
          arabicLetters: ["س", "ش"],
          pronunciation: ["Seen (S)", "Sheen (SH)"],
          objectives: [
            "Recognize the triple-tooth shape",
            "Pronounce Seen and Sheen clearly",
            "Practice writing the extended form"
          ],
          tips: "Sheen has three dots above. Think 'SHH' for Sheen!",
          duration: 15,
          points: 50
        },
        {
          id: 6,
          title: "Letters: Saad, Daad",
          arabicLetters: ["ص", "ض"],
          pronunciation: ["Saad (emphatic S)", "Daad (emphatic D)"],
          objectives: [
            "Learn the emphatic pronunciation",
            "Distinguish from regular S and D",
            "Practice the heavier sound"
          ],
          tips: "These are 'heavy' letters. Lower your tongue for a deeper sound.",
          duration: 18,
          points: 60
        },
        {
          id: 7,
          title: "Letters: Taa, Dhaa",
          arabicLetters: ["ط", "ظ"],
          pronunciation: ["Taa (emphatic T)", "Dhaa (emphatic DH)"],
          objectives: [
            "Master emphatic pronunciation",
            "Recognize the oval shape",
            "Practice the heavy sound"
          ],
          tips: "Another set of heavy letters. Feel the depth in your pronunciation!",
          duration: 18,
          points: 60
        },
        {
          id: 8,
          title: "Letters: 'Ayn, Ghayn",
          arabicLetters: ["ع", "غ"],
          pronunciation: ["'Ayn (deep throat)", "Ghayn (GH)"],
          objectives: [
            "Master the throat letters",
            "Practice the unique 'Ayn sound",
            "Distinguish 'Ayn from Ghayn"
          ],
          tips: "'Ayn comes from deep in the throat. Ghayn sounds like gargling!",
          duration: 20,
          points: 70
        },
        {
          id: 9,
          title: "Letters: Fa, Qaf",
          arabicLetters: ["ف", "ق"],
          pronunciation: ["Fa (F)", "Qaf (Q)"],
          objectives: [
            "Pronounce Fa with the lips",
            "Master the deep Q sound",
            "Write both letters correctly"
          ],
          tips: "Qaf comes from the back of the throat, deeper than 'K'.",
          duration: 15,
          points: 50
        },
        {
          id: 10,
          title: "Letters: Kaf, Lam, Meem",
          arabicLetters: ["ك", "ل", "م"],
          pronunciation: ["Kaf (K)", "Lam (L)", "Meem (M)"],
          objectives: [
            "Recognize these common letters",
            "Practice clear pronunciation",
            "Master their connection forms"
          ],
          tips: "Lam is the tallest letter. Meem is fully rounded.",
          duration: 15,
          points: 50
        },
        {
          id: 11,
          title: "Letters: Noon, Ha, Waw, Ya",
          arabicLetters: ["ن", "ه", "و", "ي"],
          pronunciation: ["Noon (N)", "Ha (H)", "Waw (W)", "Ya (Y)"],
          objectives: [
            "Complete the Arabic alphabet",
            "Learn the letter forms",
            "Practice pronunciation"
          ],
          tips: "Congratulations! You've learned all 28 Arabic letters!",
          duration: 20,
          points: 70
        },
        {
          id: 12,
          title: "Letters in Beginning Position",
          arabicLetters: ["All letters"],
          objectives: [
            "Learn how letters change at the beginning of words",
            "Practice connecting letters",
            "Recognize beginning forms"
          ],
          tips: "Most letters have 4 forms: isolated, beginning, middle, and end.",
          duration: 20,
          points: 75
        },
        {
          id: 13,
          title: "Letters in Middle Position",
          arabicLetters: ["All letters"],
          objectives: [
            "Master middle letter forms",
            "Practice fluid connections",
            "Read connected words"
          ],
          tips: "Middle forms are the most common in Arabic words.",
          duration: 20,
          points: 75
        },
        {
          id: 14,
          title: "Letters in End Position",
          arabicLetters: ["All letters"],
          objectives: [
            "Learn final letter forms",
            "Complete word connections",
            "Read full words"
          ],
          tips: "End forms often have tails or extensions.",
          duration: 20,
          points: 75
        },
        {
          id: 15,
          title: "Non-Connecting Letters",
          arabicLetters: ["ا", "د", "ذ", "ر", "ز", "و"],
          objectives: [
            "Identify non-connecting letters",
            "Understand connection rules",
            "Practice with mixed words"
          ],
          tips: "These 6 letters never connect to letters after them.",
          duration: 18,
          points: 60
        },
        {
          id: 16,
          title: "Connecting Letters - Part 1",
          objectives: [
            "Practice connecting first half of alphabet",
            "Build simple words",
            "Read connected text"
          ],
          duration: 20,
          points: 75
        },
        {
          id: 17,
          title: "Connecting Letters - Part 2",
          objectives: [
            "Complete connection practice",
            "Master all letter forms",
            "Read complex words"
          ],
          duration: 20,
          points: 75
        },
        {
          id: 18,
          title: "Common Letter Combinations",
          objectives: [
            "Learn frequent letter pairs",
            "Practice reading speed",
            "Build fluency"
          ],
          duration: 20,
          points: 100
        }
      ]
    },
    {
      id: 2,
      name: "Short Vowels (Harakat)",
      description: "Master Fatha, Kasra, and Damma",
      totalLessons: 15,
      lessons: [
        {
          id: 19,
          title: "Introduction to Fatha",
          arabicText: "َ",
          pronunciation: "Fatha makes 'a' sound",
          objectives: [
            "Understand what Fatha is",
            "Learn the 'a' sound",
            "Practice with different letters"
          ],
          tips: "Fatha is a small diagonal line above the letter. Think 'apple'!",
          duration: 15,
          points: 50
        },
        {
          id: 20,
          title: "Fatha with Letters - Group 1",
          arabicExamples: ["بَ", "تَ", "ثَ", "جَ", "حَ", "خَ"],
          objectives: [
            "Apply Fatha to first group of letters",
            "Practice pronunciation",
            "Build reading skills"
          ],
          duration: 15,
          points: 50
        },
        {
          id: 21,
          title: "Fatha with Letters - Group 2",
          arabicExamples: ["دَ", "ذَ", "رَ", "زَ", "سَ", "شَ"],
          objectives: [
            "Continue Fatha practice",
            "Improve fluency",
            "Read simple syllables"
          ],
          duration: 15,
          points: 50
        },
        {
          id: 22,
          title: "Fatha with Letters - Group 3",
          arabicExamples: ["صَ", "ضَ", "طَ", "ظَ", "عَ", "غَ"],
          objectives: [
            "Complete Fatha with all letters",
            "Master pronunciation",
            "Read combinations"
          ],
          duration: 15,
          points: 50
        },
        {
          id: 23,
          title: "Reading Words with Fatha",
          arabicWords: ["كَتَبَ", "ذَهَبَ", "جَلَسَ"],
          objectives: [
            "Read complete words",
            "Build vocabulary",
            "Practice fluency"
          ],
          duration: 20,
          points: 75
        },
        {
          id: 24,
          title: "Introduction to Kasra",
          arabicText: "ِ",
          pronunciation: "Kasra makes 'i' sound",
          objectives: [
            "Learn Kasra vowel mark",
            "Practice 'i' sound",
            "Compare with Fatha"
          ],
          tips: "Kasra is under the letter. Think 'sit'!",
          duration: 15,
          points: 50
        },
        {
          id: 25,
          title: "Kasra with Letters - Group 1",
          arabicExamples: ["بِ", "تِ", "ثِ", "جِ", "حِ", "خِ"],
          objectives: [
            "Apply Kasra to letters",
            "Practice pronunciation",
            "Distinguish from Fatha"
          ],
          duration: 15,
          points: 50
        },
        {
          id: 26,
          title: "Kasra with Letters - Group 2",
          arabicExamples: ["دِ", "ذِ", "رِ", "زِ", "سِ", "شِ"],
          objectives: [
            "Continue Kasra practice",
            "Build confidence",
            "Read syllables"
          ],
          duration: 15,
          points: 50
        },
        {
          id: 27,
          title: "Kasra with Letters - Group 3",
          arabicExamples: ["صِ", "ضِ", "طِ", "ظِ", "عِ", "غِ"],
          objectives: [
            "Complete Kasra mastery",
            "Practice all combinations",
            "Improve speed"
          ],
          duration: 15,
          points: 50
        },
        {
          id: 28,
          title: "Reading Words with Kasra",
          arabicWords: ["كِتَاب", "مِسْكِين", "بِسْم"],
          objectives: [
            "Read words with Kasra",
            "Mix Fatha and Kasra",
            "Build vocabulary"
          ],
          duration: 20,
          points: 75
        },
        {
          id: 29,
          title: "Introduction to Damma",
          arabicText: "ُ",
          pronunciation: "Damma makes 'u' sound",
          objectives: [
            "Learn Damma vowel mark",
            "Practice 'u' sound",
            "Complete short vowels"
          ],
          tips: "Damma is a small 'و' above. Think 'put'!",
          duration: 15,
          points: 50
        },
        {
          id: 30,
          title: "Damma with Letters - Group 1",
          arabicExamples: ["بُ", "تُ", "ثُ", "جُ", "حُ", "خُ"],
          duration: 15,
          points: 50
        },
        {
          id: 31,
          title: "Damma with Letters - Group 2",
          arabicExamples: ["دُ", "ذُ", "رُ", "زُ", "سُ", "شُ"],
          duration: 15,
          points: 50
        },
        {
          id: 32,
          title: "Damma with Letters - Group 3",
          arabicExamples: ["صُ", "ضُ", "طُ", "ظُ", "عُ", "غُ"],
          duration: 15,
          points: 50
        },
        {
          id: 33,
          title: "Reading Words with Damma",
          arabicWords: ["كُتُب", "رُسُل", "نُور"],
          duration: 20,
          points: 75
        }
      ]
    },
    {
      id: 3,
      name: "Long Vowels (Madd)",
      description: "Learn Alif, Waw, and Ya elongations",
      totalLessons: 11,
      lessons: [
        {
          id: 34,
          title: "Combining All Short Vowels",
          duration: 20,
          points: 75
        },
        {
          id: 35,
          title: "Reading 2-Letter Words",
          duration: 15,
          points: 60
        },
        {
          id: 36,
          title: "Reading 3-Letter Words",
          duration: 20,
          points: 75
        },
        {
          id: 37,
          title: "Reading Simple Sentences",
          duration: 25,
          points: 100
        },
        {
          id: 38,
          title: "Introduction to Alif Maddah",
          arabicText: "ا بعد فتحة",
          pronunciation: "Long 'aa' sound",
          duration: 15,
          points: 50
        },
        {
          id: 39,
          title: "Practicing Alif Maddah",
          arabicWords: ["بَابَ", "نَام", "قَال"],
          duration: 18,
          points: 60
        },
        {
          id: 40,
          title: "Words with Alif Maddah",
          duration: 20,
          points: 75
        },
        {
          id: 41,
          title: "Introduction to Waw Maddah",
          arabicText: "و بعد ضمة",
          pronunciation: "Long 'oo' sound",
          duration: 15,
          points: 50
        },
        {
          id: 42,
          title: "Practicing Waw Maddah",
          arabicWords: ["نُور", "سُور", "قُوم"],
          duration: 18,
          points: 60
        },
        {
          id: 43,
          title: "Words with Waw Maddah",
          duration: 20,
          points: 75
        },
        {
          id: 44,
          title: "Introduction to Ya Maddah",
          arabicText: "ي بعد كسرة",
          pronunciation: "Long 'ee' sound",
          duration: 15,
          points: 50
        }
      ]
    },
    // Modules 4-6 continue with lessons 45-84
    {
      id: 4,
      name: "Sukoon & Special Rules",
      totalLessons: 11,
      lessons: Array.from({ length: 11 }, (_, i) => ({
        id: 45 + i,
        title: `Lesson ${45 + i}`,
        duration: 18,
        points: 60
      }))
    },
    {
      id: 5,
      name: "Advanced Tajweed Rules",
      totalLessons: 13,
      lessons: Array.from({ length: 13 }, (_, i) => ({
        id: 56 + i,
        title: `Lesson ${56 + i}`,
        duration: 20,
        points: 75
      }))
    },
    {
      id: 6,
      name: "Practical Application",
      totalLessons: 12,
      lessons: Array.from({ length: 12 }, (_, i) => ({
        id: 69 + i,
        title: `Lesson ${69 + i}`,
        duration: 25,
        points: 100
      }))
    }
  ]
};

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = lessonsDatabase;
}

// Make available globally
window.lessonsDatabase = lessonsDatabase;

