// Qaidah Academy Lessons Database - Based on Book 1
// Structured according to the user's Book 1 curriculum

const lessonsDatabase = {
  modules: [
    {
      id: 1,
      name: "Introduction & Mouth Anatomy",
      description: "Understanding Arabic pronunciation and mouth positioning",
      totalLessons: 2,
      lessons: [
        {
          id: 1,
          title: "Mouth Anatomy & Letter Origins",
          arabicLetters: ["All Letters"],
          pronunciation: ["Complete Mouth Diagram"],
          objectives: [
            "Understand mouth anatomy for Arabic pronunciation",
            "Identify where each letter sound originates",
            "Learn proper tongue and lip positioning"
          ],
          tips: "This interactive diagram shows exactly where each Arabic letter sound comes from in your mouth!",
          duration: 20,
          points: 75,
          hasDiagram: true,
          diagramType: "mouth_anatomy",
          content: {
            introduction: "Welcome to Arabic! Let's start by understanding how your mouth works to produce Arabic sounds. This interactive diagram will show you exactly where each letter comes from.",
            mouthDiagram: {
              title: "Arabic Letter Origins in the Mouth",
              description: "Click on different areas to see which letters are produced there",
              areas: [
                {
                  id: "lips",
                  name: "Lips (الشفتان)",
                  letters: ["ب", "م", "ف", "و"],
                  description: "Letters produced using the lips",
                  color: "#FF6B6B"
                },
                {
                  id: "teeth",
                  name: "Teeth (الأسنان)",
                  letters: ["ت", "ث", "د", "ذ", "ط", "ظ"],
                  description: "Letters produced using the teeth",
                  color: "#4ECDC4"
                },
                {
                  id: "tongue_tip",
                  name: "Tongue Tip (طرف اللسان)",
                  letters: ["ت", "د", "ط", "ن", "ر", "ل"],
                  description: "Letters produced with the tip of the tongue",
                  color: "#45B7D1"
                },
                {
                  id: "tongue_middle",
                  name: "Tongue Middle (وسط اللسان)",
                  letters: ["ج", "ش", "ي"],
                  description: "Letters produced with the middle of the tongue",
                  color: "#96CEB4"
                },
                {
                  id: "tongue_back",
                  name: "Tongue Back (خلف اللسان)",
                  letters: ["ك", "ق"],
                  description: "Letters produced with the back of the tongue",
                  color: "#FFEAA7"
                },
                {
                  id: "throat",
                  name: "Throat (الحلق)",
                  letters: ["ع", "غ", "ح", "خ"],
                  description: "Letters produced from the throat",
                  color: "#DDA0DD"
                }
              ]
            }
          }
        },
        {
          id: 2,
          title: "Letters of the Lips: ف، و، م، ب",
          arabicLetters: ["ف", "و", "م", "ب"],
          pronunciation: ["Faa (F)", "Waw (W)", "Meem (M)", "Baa (B)"],
          objectives: [
            "Master the four lip letters",
            "Practice proper lip positioning",
            "Recognize these letters in words"
          ],
          tips: "These four letters all use your lips! Watch how your lips move for each one.",
          duration: 25,
          points: 100,
          hasDiagram: true,
          diagramType: "lip_letters",
          content: {
            introduction: "Today we learn the four letters that come from your lips! Each one uses your lips differently.",
            lipShapes: [
              {
                letter: "ب",
                name: "Baa",
                sound: "B",
                lipPosition: "Both lips pressed together, then release",
                description: "Like saying 'bubble' - lips come together and pop open",
                color: "#FF6B6B"
              },
              {
                letter: "م",
                name: "Meem", 
                sound: "M",
                lipPosition: "Both lips pressed together, air through nose",
                description: "Like saying 'mama' - lips together, sound comes through nose",
                color: "#4ECDC4"
              },
              {
                letter: "ف",
                name: "Faa",
                sound: "F", 
                lipPosition: "Top teeth on bottom lip",
                description: "Like saying 'fish' - top teeth touch bottom lip",
                color: "#45B7D1"
              },
              {
                letter: "و",
                name: "Waw",
                sound: "W",
                lipPosition: "Lips rounded and pushed forward",
                description: "Like saying 'water' - lips make a small circle",
                color: "#96CEB4"
              }
            ],
            practiceGrid: {
              title: "Practice Grid - Letters of the Lips",
              instructions: "Read each combination. The red letter is the focus letter.",
              grid: [
                ["ب", "م", "ف", "و"],
                ["وبَ", "ومَ", "وفَ", "ووَ"],
                ["فبَ", "فمَ", "ف", "ف"],
                ["فمَ", "فوَ", "ففَ", "ف"],
                ["موَ", "مبَ", "م", "م"],
                ["مبَ", "ممَ", "مفَ", "م"],
                ["بفَ", "بوَ", "ب", "ب"]
              ],
              focusLetters: [
                ["ب", "م", "ف", "و"],
                ["ب", "م", "ف", "و"],
                ["ب", "م", "ف", "ف"],
                ["م", "و", "ف", "ف"],
                ["و", "ب", "م", "م"],
                ["ب", "م", "ف", "م"],
                ["ف", "و", "ب", "ب"]
              ]
            }
          }
        }
      ]
    },
    {
      id: 2,
      name: "Basic Letters - Group 1",
      description: "Learn the first group of Arabic letters with proper pronunciation",
      totalLessons: 4,
      lessons: [
        {
          id: 3,
          title: "Letters: Alif, Ba, Ta, Tha",
          arabicLetters: ["ا", "ب", "ت", "ث"],
          pronunciation: ["Alif (A)", "Ba (B)", "Ta (T)", "Tha (TH)"],
          objectives: [
            "Recognize the four letters visually",
            "Pronounce each letter correctly",
            "Distinguish between similar letters"
          ],
          tips: "Alif is a straight vertical line. Ba, Ta, and Tha have similar shapes but different dots.",
          duration: 15,
          points: 50
        },
        {
          id: 4,
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
          id: 5,
          title: "Letters: Dal, Dhal",
          arabicLetters: ["د", "ذ"],
          pronunciation: ["Dal (D)", "Dhal (DH)"],
          objectives: [
            "Recognize Dal and Dhal",
            "Pronounce the 'th' sound in Dhal",
            "Practice writing these non-connecting letters"
          ],
          tips: "Dal and Dhal don't connect to letters after them.",
          duration: 15,
          points: 50
        },
        {
          id: 6,
          title: "Letters: Ra, Zay",
          arabicLetters: ["ر", "ز"],
          pronunciation: ["Ra (R)", "Zay (Z)"],
          objectives: [
            "Master the rolling 'R' sound",
            "Distinguish between Ra and Zay",
            "Practice proper tongue positioning"
          ],
          tips: "Ra requires a rolling motion of the tongue.",
          duration: 15,
          points: 50
        }
      ]
    },
    {
      id: 3,
      name: "Basic Letters - Group 2",
      description: "Continue learning Arabic letters with focus on pronunciation",
      totalLessons: 4,
      lessons: [
        {
          id: 7,
          title: "Letters: Seen, Sheen",
          arabicLetters: ["س", "ش"],
          pronunciation: ["Seen (S)", "Sheen (SH)"],
          objectives: [
            "Distinguish between S and SH sounds",
            "Practice proper tongue positioning",
            "Recognize the letter shapes"
          ],
          tips: "Sheen has three dots above, Seen has none.",
          duration: 15,
          points: 50
        },
        {
          id: 8,
          title: "Letters: Sad, Dad",
          arabicLetters: ["ص", "ض"],
          pronunciation: ["Sad (S)", "Dad (D)"],
          objectives: [
            "Master the emphatic sounds",
            "Practice proper throat positioning",
            "Distinguish between regular and emphatic letters"
          ],
          tips: "These are emphatic letters - they come from deeper in the throat.",
          duration: 15,
          points: 50
        },
        {
          id: 9,
          title: "Letters: Ta, Za",
          arabicLetters: ["ط", "ظ"],
          pronunciation: ["Ta (T)", "Za (Z)"],
          objectives: [
            "Master the emphatic T sound",
            "Practice the emphatic Z sound",
            "Recognize the letter differences"
          ],
          tips: "Both are emphatic letters with similar shapes but different dots.",
          duration: 15,
          points: 50
        },
        {
          id: 10,
          title: "Letters: Ain, Ghain",
          arabicLetters: ["ع", "غ"],
          pronunciation: ["Ain (A)", "Ghain (GH)"],
          objectives: [
            "Master the throat sounds",
            "Practice proper throat positioning",
            "Distinguish between the two sounds"
          ],
          tips: "These are the deepest throat sounds in Arabic.",
          duration: 15,
          points: 50
        }
      ]
    },
    {
      id: 4,
      name: "Basic Letters - Group 3",
      description: "Complete the basic Arabic alphabet",
      totalLessons: 4,
      lessons: [
        {
          id: 11,
          title: "Letters: Fa, Qaf",
          arabicLetters: ["ف", "ق"],
          pronunciation: ["Fa (F)", "Qaf (Q)"],
          objectives: [
            "Master the F sound",
            "Practice the Q sound from the back of the throat",
            "Distinguish between the two letters"
          ],
          tips: "Qaf is pronounced from the back of the throat, like a 'K' but deeper.",
          duration: 15,
          points: 50
        },
        {
          id: 12,
          title: "Letters: Kaf, Lam",
          arabicLetters: ["ك", "ل"],
          pronunciation: ["Kaf (K)", "Lam (L)"],
          objectives: [
            "Master the K sound",
            "Practice the L sound",
            "Recognize the letter shapes"
          ],
          tips: "Lam connects to letters after it, Kaf usually doesn't.",
          duration: 15,
          points: 50
        },
        {
          id: 13,
          title: "Letters: Meem, Noon",
          arabicLetters: ["م", "ن"],
          pronunciation: ["Meem (M)", "Noon (N)"],
          objectives: [
            "Master the M and N sounds",
            "Practice nasal sounds",
            "Recognize the letter differences"
          ],
          tips: "Both are nasal sounds - air comes through the nose.",
          duration: 15,
          points: 50
        },
        {
          id: 14,
          title: "Letters: Ha, Waw, Ya",
          arabicLetters: ["ه", "و", "ي"],
          pronunciation: ["Ha (H)", "Waw (W)", "Ya (Y)"],
          objectives: [
            "Master the final three letters",
            "Understand their dual role as consonants and vowels",
            "Practice proper pronunciation"
          ],
          tips: "These letters can be both consonants and vowels depending on context.",
          duration: 15,
          points: 50
        }
      ]
    },
    {
      id: 5,
      name: "Short Vowels (Harakat)",
      description: "Learn the three short vowels: Fatha, Kasra, Damma",
      totalLessons: 6,
      lessons: [
        {
          id: 15,
          title: "Fatha - Short 'A' Sound",
          arabicLetters: ["َ"],
          pronunciation: ["Fatha (A)"],
          objectives: [
            "Understand the Fatha vowel",
            "Practice reading with Fatha",
            "Recognize Fatha in words"
          ],
          tips: "Fatha is a short 'a' sound, like in 'cat'.",
          duration: 20,
          points: 75
        },
        {
          id: 16,
          title: "Kasra - Short 'I' Sound",
          arabicLetters: ["ِ"],
          pronunciation: ["Kasra (I)"],
          objectives: [
            "Understand the Kasra vowel",
            "Practice reading with Kasra",
            "Distinguish between Fatha and Kasra"
          ],
          tips: "Kasra is a short 'i' sound, like in 'sit'.",
          duration: 20,
          points: 75
        },
        {
          id: 17,
          title: "Damma - Short 'U' Sound",
          arabicLetters: ["ُ"],
          pronunciation: ["Damma (U)"],
          objectives: [
            "Understand the Damma vowel",
            "Practice reading with Damma",
            "Master all three short vowels"
          ],
          tips: "Damma is a short 'u' sound, like in 'put'.",
          duration: 20,
          points: 75
        },
        {
          id: 18,
          title: "Fatha with All Letters",
          arabicLetters: ["All Letters + َ"],
          pronunciation: ["A sound with all letters"],
          objectives: [
            "Practice Fatha with every letter",
            "Build reading confidence",
            "Master letter-vowel combinations"
          ],
          tips: "Practice each letter with Fatha to build fluency.",
          duration: 25,
          points: 100
        },
        {
          id: 19,
          title: "Kasra with All Letters",
          arabicLetters: ["All Letters + ِ"],
          pronunciation: ["I sound with all letters"],
          objectives: [
            "Practice Kasra with every letter",
            "Build reading confidence",
            "Master letter-vowel combinations"
          ],
          tips: "Practice each letter with Kasra to build fluency.",
          duration: 25,
          points: 100
        },
        {
          id: 20,
          title: "Damma with All Letters",
          arabicLetters: ["All Letters + ُ"],
          pronunciation: ["U sound with all letters"],
          objectives: [
            "Practice Damma with every letter",
            "Build reading confidence",
            "Master all vowel combinations"
          ],
          tips: "Practice each letter with Damma to build fluency.",
          duration: 25,
          points: 100
        }
      ]
    },
    {
      id: 6,
      name: "Long Vowels (Madd)",
      description: "Learn the long vowels and their rules",
      totalLessons: 4,
      lessons: [
        {
          id: 21,
          title: "Alif Madd - Long 'A' Sound",
          arabicLetters: ["ا", "آ"],
          pronunciation: ["Alif Madd (AA)"],
          objectives: [
            "Understand long A sound",
            "Practice reading with Alif Madd",
            "Distinguish short and long vowels"
          ],
          tips: "Alif Madd makes a long 'aa' sound, like in 'father'.",
          duration: 20,
          points: 75
        },
        {
          id: 22,
          title: "Waw Madd - Long 'U' Sound",
          arabicLetters: ["و"],
          pronunciation: ["Waw Madd (UU)"],
          objectives: [
            "Understand long U sound",
            "Practice reading with Waw Madd",
            "Master Waw as both consonant and vowel"
          ],
          tips: "Waw can be a consonant (W) or long vowel (UU).",
          duration: 20,
          points: 75
        },
        {
          id: 23,
          title: "Ya Madd - Long 'I' Sound",
          arabicLetters: ["ي"],
          pronunciation: ["Ya Madd (II)"],
          objectives: [
            "Understand long I sound",
            "Practice reading with Ya Madd",
            "Master Ya as both consonant and vowel"
          ],
          tips: "Ya can be a consonant (Y) or long vowel (II).",
          duration: 20,
          points: 75
        },
        {
          id: 24,
          title: "Mixed Long Vowels Practice",
          arabicLetters: ["ا", "و", "ي"],
          pronunciation: ["All long vowels"],
          objectives: [
            "Practice all long vowels together",
            "Build reading fluency",
            "Master vowel recognition"
          ],
          tips: "Practice reading words with different long vowels.",
          duration: 25,
          points: 100
        }
      ]
    }
  ]
};

// Export the database
window.lessonsDatabase = lessonsDatabase;