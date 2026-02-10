// Scenario data - Complete configurations for both scenarios

export const scenariosData = [
  {
    id: 'cafe-order',
    title: 'Ordering Food at Café',
    difficulty: 'Easy',
    duration: '5-10 min',
    xpReward: 30,
    thumbnail: null, // Will use placeholder
    description: "You're at a café in Paris. The waiter approaches and it's time to practice ordering in French. Can you order food and drinks successfully?",
    characters: [
      { name: 'Pierre', role: 'Waiter', personality: 'Friendly' },
      { name: 'Marie', role: 'Café Patron', personality: 'Bystander' }
    ],
    scenes: [
      {
        sceneId: 'cafe-scene-1',
        videoUrl: null, // Placeholder
        characterName: 'Pierre (Waiter)',
        characterDialogue: 'Bonjour! Que désirez-vous commander?',
        dialogueTranslation: 'Hello! What would you like to order?',
        sceneContext: 'The waiter approaches your table with a notepad',
        
        options: [
          {
            id: 'cafe-1-a',
            textInTargetLang: 'Je voudrais un croissant.',
            textTranslation: "I'd like a croissant",
            pronunciationGuide: 'zhuh voo-dreh uhn kwah-sohn',
            nextSceneId: 'cafe-scene-2a',
            baseScore: 85,
            isOptimal: true,
            feedback: {
              positive: "Great choice! Your pronunciation of 'voudrais' was clear.",
              improvements: [
                "Try to roll the 'r' in 'croissant' more",
                "Remember to liaison between 'un' and 'croissant'"
              ],
              naturalPhrasing: "Je voudrais un croissant, s'il vous plaît."
            }
          },
          {
            id: 'cafe-1-b',
            textInTargetLang: "Un café, s'il vous plaît.",
            textTranslation: 'A coffee, please',
            pronunciationGuide: 'uhn ka-feh seel voo pleh',
            nextSceneId: 'cafe-scene-2b',
            baseScore: 90,
            isOptimal: true,
            feedback: {
              positive: 'Excellent! Very polite and natural phrasing.',
              improvements: [
                "Your 's'il vous plaît' was a bit fast - slow it down"
              ],
              naturalPhrasing: 'Perfect as is!'
            }
          },
          {
            id: 'cafe-1-c',
            textInTargetLang: 'Pardon, je ne comprends pas.',
            textTranslation: "Sorry, I don't understand",
            pronunciationGuide: 'par-dohn zhuh nuh kohm-prohn pah',
            nextSceneId: 'cafe-scene-2c',
            baseScore: 70,
            isOptimal: false,
            feedback: {
              positive: 'Good job asking for clarification!',
              improvements: [
                'This is useful, but try to understand first',
                "Practice: 'Pouvez-vous répéter?' (Can you repeat?)"
              ],
              naturalPhrasing: 'Pardon, pouvez-vous répéter plus lentement?'
            }
          },
          {
            id: 'cafe-1-d',
            textInTargetLang: '[Point at menu silently]',
            textTranslation: 'Non-verbal communication',
            pronunciationGuide: null,
            nextSceneId: 'cafe-scene-2d',
            baseScore: 50,
            isOptimal: false,
            feedback: {
              positive: 'You communicated your needs!',
              improvements: [
                "Try using words next time - pointing doesn't build speaking skills",
                "Even a simple 'Ça' (that) while pointing is better"
              ],
              naturalPhrasing: "Je voudrais ça, s'il vous plaît. (I'd like that, please)"
            }
          }
        ]
      },
      
      {
        sceneId: 'cafe-scene-2a',
        videoUrl: null,
        characterName: 'Pierre (Waiter)',
        characterDialogue: 'Un croissant! Excellent choix. Et pour boire?',
        dialogueTranslation: 'A croissant! Excellent choice. And to drink?',
        sceneContext: 'The waiter writes down your order',
        
        options: [
          {
            id: 'cafe-2a-a',
            textInTargetLang: "Un café au lait, s'il vous plaît.",
            textTranslation: 'A latte, please',
            pronunciationGuide: 'uhn ka-feh oh leh seel voo pleh',
            nextSceneId: 'cafe-scene-3',
            baseScore: 92,
            isOptimal: true,
            feedback: {
              positive: 'Perfect order! Natural and polite.',
              improvements: [],
              naturalPhrasing: 'Excellent!'
            }
          },
          {
            id: 'cafe-2a-b',
            textInTargetLang: 'Rien, merci.',
            textTranslation: 'Nothing, thank you',
            pronunciationGuide: 'ree-ahn mair-see',
            nextSceneId: 'cafe-scene-3',
            baseScore: 88,
            isOptimal: true,
            feedback: {
              positive: 'Good, polite response!',
              improvements: [
                "You could add 'pour moi' (for me) to be extra clear"
              ],
              naturalPhrasing: 'Rien pour moi, merci.'
            }
          }
        ]
      },
      
      {
        sceneId: 'cafe-scene-2b',
        videoUrl: null,
        characterName: 'Pierre (Waiter)',
        characterDialogue: 'Bien sûr! Petit ou grand?',
        dialogueTranslation: 'Of course! Small or large?',
        sceneContext: 'The waiter asks about coffee size',
        
        options: [
          {
            id: 'cafe-2b-a',
            textInTargetLang: "Grand, s'il vous plaît.",
            textTranslation: 'Large, please',
            pronunciationGuide: 'grohn seel voo pleh',
            nextSceneId: 'cafe-scene-3',
            baseScore: 90,
            isOptimal: true,
            feedback: {
              positive: 'Clear and direct!',
              improvements: [],
              naturalPhrasing: 'Perfect!'
            }
          },
          {
            id: 'cafe-2b-b',
            textInTargetLang: 'Petit.',
            textTranslation: 'Small',
            pronunciationGuide: 'puh-tee',
            nextSceneId: 'cafe-scene-3',
            baseScore: 85,
            isOptimal: true,
            feedback: {
              positive: 'Good choice!',
              improvements: [
                "Adding 's'il vous plaît' makes it more polite"
              ],
              naturalPhrasing: "Petit, s'il vous plaît."
            }
          }
        ]
      },
      
      {
        sceneId: 'cafe-scene-2c',
        videoUrl: null,
        characterName: 'Pierre (Waiter)',
        characterDialogue: 'Ah, désolé. Je parle trop vite. Que... voulez... vous?',
        dialogueTranslation: 'Ah, sorry. I speak too fast. What... do... you... want?',
        sceneContext: 'The waiter speaks more slowly',
        
        options: [
          {
            id: 'cafe-2c-a',
            textInTargetLang: 'Un café, merci.',
            textTranslation: 'A coffee, thank you',
            pronunciationGuide: 'uhn ka-feh mair-see',
            nextSceneId: 'cafe-scene-3',
            baseScore: 78,
            isOptimal: true,
            feedback: {
              positive: 'You recovered well!',
              improvements: [
                'Now you understand - great adaptation'
              ],
              naturalPhrasing: 'Good!'
            }
          },
          {
            id: 'cafe-2c-b',
            textInTargetLang: 'English, please?',
            textTranslation: 'English, please?',
            pronunciationGuide: null,
            nextSceneId: 'cafe-scene-3',
            baseScore: 60,
            isOptimal: false,
            feedback: {
              positive: 'Communication succeeded!',
              improvements: [
                'Try to stick with French - it builds confidence',
                'Even broken French is better practice'
              ],
              naturalPhrasing: 'Try: "Parlez-vous anglais?"'
            }
          }
        ]
      },
      
      {
        sceneId: 'cafe-scene-2d',
        videoUrl: null,
        characterName: 'Pierre (Waiter)',
        characterDialogue: 'Ah... vous voulez ça? Très bien.',
        dialogueTranslation: 'Ah... you want this? Very good.',
        sceneContext: 'The waiter looks slightly confused but understands',
        
        options: [
          {
            id: 'cafe-2d-a',
            textInTargetLang: 'Oui, merci.',
            textTranslation: 'Yes, thank you',
            pronunciationGuide: 'wee mair-see',
            nextSceneId: 'cafe-scene-3',
            baseScore: 65,
            isOptimal: true,
            feedback: {
              positive: 'You used words this time!',
              improvements: [
                'Next time, try to start with words instead of pointing'
              ],
              naturalPhrasing: 'Good recovery!'
            }
          }
        ]
      },
      
      {
        sceneId: 'cafe-scene-3',
        videoUrl: null,
        characterName: 'Pierre (Waiter)',
        characterDialogue: 'Parfait! Ça fait 8 euros.',
        dialogueTranslation: 'Perfect! That will be 8 euros.',
        sceneContext: 'The waiter presents the bill',
        
        options: [
          {
            id: 'cafe-3-a',
            textInTargetLang: 'Voici. Merci beaucoup!',
            textTranslation: 'Here you go. Thank you very much!',
            pronunciationGuide: 'vwah-see mair-see bow-koo',
            nextSceneId: 'cafe-complete',
            baseScore: 95,
            isOptimal: true,
            feedback: {
              positive: 'Excellent closing! Very polite.',
              improvements: [],
              naturalPhrasing: 'Perfect!'
            }
          },
          {
            id: 'cafe-3-b',
            textInTargetLang: 'Merci.',
            textTranslation: 'Thank you',
            pronunciationGuide: 'mair-see',
            nextSceneId: 'cafe-complete',
            baseScore: 85,
            isOptimal: true,
            feedback: {
              positive: 'Good!',
              improvements: [
                "'Merci beaucoup' adds extra politeness"
              ],
              naturalPhrasing: 'Good enough!'
            }
          }
        ]
      }
    ],
    
    completion: {
      sceneId: 'cafe-complete',
      successMessage: 'You successfully ordered food and drinks!',
      characterQuote: 'Merci! Votre commande arrive.',
      characterQuoteTranslation: 'Thank you! Your order is coming.',
      outcomeVariants: {
        excellent: 'You ordered confidently and naturally!',
        good: 'You completed the order successfully!',
        fair: 'You managed to order despite some struggles.',
        struggled: 'You got what you needed, but practice will help!'
      }
    }
  },
  
  // Scenario 2: Business Networking
  {
    id: 'networking',
    title: 'Business Networking Event',
    difficulty: 'Medium',
    duration: '10-15 min',
    xpReward: 50,
    thumbnail: null,
    description: "You're at a business networking event in Paris. Make a good first impression by introducing yourself professionally in French.",
    characters: [
      { name: 'Thomas', role: 'Business Professional', personality: 'Formal' },
      { name: 'Sophie', role: 'Startup Founder', personality: 'Casual' }
    ],
    scenes: [
      {
        sceneId: 'networking-scene-1',
        videoUrl: null,
        characterName: 'Thomas (Business Professional)',
        characterDialogue: 'Oh, bonjour! Vous êtes nouveau ici?',
        dialogueTranslation: 'Oh, hello! Are you new here?',
        sceneContext: 'A professional notices you at the networking event',
        
        options: [
          {
            id: 'network-1-a',
            textInTargetLang: "Oui, je m'appelle [Name]. Enchanté!",
            textTranslation: "Yes, I'm [Name]. Nice to meet you!",
            pronunciationGuide: 'wee zhuh ma-pell ... ohn-shohn-tay',
            nextSceneId: 'networking-scene-2a',
            baseScore: 92,
            isOptimal: true,
            feedback: {
              positive: 'Perfect introduction! Very professional.',
              improvements: [],
              naturalPhrasing: 'Excellent for business context!'
            }
          },
          {
            id: 'network-1-b',
            textInTargetLang: "Salut! Oui, c'est mon premier événement.",
            textTranslation: 'Hi! Yes, my first event.',
            pronunciationGuide: 'sa-loo wee say mohn pruh-mee-ay ay-ven-mohn',
            nextSceneId: 'networking-scene-2b',
            baseScore: 85,
            isOptimal: true,
            feedback: {
              positive: 'Friendly approach!',
              improvements: [
                "'Salut' is a bit casual for business - 'Bonjour' is safer"
              ],
              naturalPhrasing: "Consider: 'Bonjour! Oui, c'est mon premier événement.'"
            }
          },
          {
            id: 'network-1-c',
            textInTargetLang: 'Sorry, do you speak English?',
            textTranslation: 'Sorry, do you speak English?',
            pronunciationGuide: null,
            nextSceneId: 'networking-scene-2c',
            baseScore: 60,
            isOptimal: false,
            feedback: {
              positive: 'You communicated!',
              improvements: [
                'Try French first - most professionals appreciate the effort',
                "Learn: 'Parlez-vous anglais?'"
              ],
              naturalPhrasing: 'Try: "Bonjour! Parlez-vous anglais?"'
            }
          },
          {
            id: 'network-1-d',
            textInTargetLang: '[Smile and nod]',
            textTranslation: 'Non-verbal',
            pronunciationGuide: null,
            nextSceneId: 'networking-scene-2d',
            baseScore: 50,
            isOptimal: false,
            feedback: {
              positive: 'Body language matters!',
              improvements: [
                'But words are essential for networking',
                'Even a simple "Bonjour" is better'
              ],
              naturalPhrasing: 'Try: "Bonjour!" with a smile'
            }
          }
        ]
      },
      
      {
        sceneId: 'networking-scene-2a',
        videoUrl: null,
        characterName: 'Thomas',
        characterDialogue: "Enchanté aussi. Je m'appelle Thomas. Vous travaillez dans quel domaine?",
        dialogueTranslation: "Nice to meet you too. I'm Thomas. What field do you work in?",
        sceneContext: 'Thomas asks about your professional background',
        
        options: [
          {
            id: 'network-2a-a',
            textInTargetLang: 'Je travaille dans la technologie.',
            textTranslation: 'I work in technology',
            pronunciationGuide: 'zhuh trah-vye dohn la tek-noh-loh-zhee',
            nextSceneId: 'networking-scene-3',
            baseScore: 90,
            isOptimal: true,
            feedback: {
              positive: 'Clear and professional!',
              improvements: [],
              naturalPhrasing: 'Perfect!'
            }
          },
          {
            id: 'network-2a-b',
            textInTargetLang: 'Je suis étudiant en commerce.',
            textTranslation: 'I am a business student',
            pronunciationGuide: 'zhuh swee ay-too-dee-ohn ohn ko-mairs',
            nextSceneId: 'networking-scene-3',
            baseScore: 88,
            isOptimal: true,
            feedback: {
              positive: 'Great response!',
              improvements: [],
              naturalPhrasing: 'Natural!'
            }
          }
        ]
      },
      
      {
        sceneId: 'networking-scene-2b',
        videoUrl: null,
        characterName: 'Sophie (Startup Founder)',
        characterDialogue: 'Cool! Bienvenue. Tu fais quoi comme travail?',
        dialogueTranslation: 'Cool! Welcome. What do you do for work?',
        sceneContext: 'Sophie responds casually',
        
        options: [
          {
            id: 'network-2b-a',
            textInTargetLang: 'Je travaille en tech.',
            textTranslation: 'I work in tech',
            pronunciationGuide: 'zhuh trah-vye ohn tek',
            nextSceneId: 'networking-scene-3',
            baseScore: 85,
            isOptimal: true,
            feedback: {
              positive: 'Casual and natural!',
              improvements: [],
              naturalPhrasing: 'Good match for informal setting!'
            }
          }
        ]
      },
      
      {
        sceneId: 'networking-scene-2c',
        videoUrl: null,
        characterName: 'Thomas',
        characterDialogue: 'Yes, I do. But your French will improve faster if you try!',
        dialogueTranslation: 'Yes, I do. But your French will improve faster if you try!',
        sceneContext: 'Thomas encourages you',
        
        options: [
          {
            id: 'network-2c-a',
            textInTargetLang: "D'accord. Je m'appelle [Name].",
            textTranslation: "Okay. I'm [Name].",
            pronunciationGuide: 'da-kor zhuh ma-pell',
            nextSceneId: 'networking-scene-3',
            baseScore: 72,
            isOptimal: true,
            feedback: {
              positive: 'You tried again - great!',
              improvements: [],
              naturalPhrasing: 'Good recovery!'
            }
          }
        ]
      },
      
      {
        sceneId: 'networking-scene-2d',
        videoUrl: null,
        characterName: 'Thomas',
        characterDialogue: '[Looks confused] Um... bonjour?',
        dialogueTranslation: '[Looks confused] Um... hello?',
        sceneContext: 'Thomas waits for you to speak',
        
        options: [
          {
            id: 'network-2d-a',
            textInTargetLang: 'Bonjour!',
            textTranslation: 'Hello!',
            pronunciationGuide: 'bohn-zhoor',
            nextSceneId: 'networking-scene-3',
            baseScore: 68,
            isOptimal: true,
            feedback: {
              positive: 'You spoke!',
              improvements: [
                'Add your name next time'
              ],
              naturalPhrasing: "Try: 'Bonjour, je m'appelle...'"
            }
          }
        ]
      },
      
      {
        sceneId: 'networking-scene-3',
        videoUrl: null,
        characterName: 'Thomas/Sophie',
        characterDialogue: 'Super! Voici ma carte de visite.',
        dialogueTranslation: 'Great! Here is my business card.',
        sceneContext: 'They offer their business card',
        
        options: [
          {
            id: 'network-3-a',
            textInTargetLang: 'Merci beaucoup. Voici la mienne.',
            textTranslation: 'Thank you very much. Here is mine.',
            pronunciationGuide: 'mair-see bow-koo vwah-see la mee-en',
            nextSceneId: 'networking-complete',
            baseScore: 95,
            isOptimal: true,
            feedback: {
              positive: 'Perfect professional exchange!',
              improvements: [],
              naturalPhrasing: 'Excellent!'
            }
          },
          {
            id: 'network-3-b',
            textInTargetLang: 'Merci!',
            textTranslation: 'Thank you!',
            pronunciationGuide: 'mair-see',
            nextSceneId: 'networking-complete',
            baseScore: 82,
            isOptimal: true,
            feedback: {
              positive: 'Good!',
              improvements: [
                "Offer your card too: 'Voici la mienne'"
              ],
              naturalPhrasing: 'Functional but could be smoother'
            }
          }
        ]
      }
    ],
    
    completion: {
      sceneId: 'networking-complete',
      successMessage: 'You made a professional connection!',
      characterQuote: 'Ravi de vous avoir rencontré. À bientôt!',
      characterQuoteTranslation: 'Pleased to have met you. See you soon!',
      outcomeVariants: {
        excellent: 'You networked like a pro!',
        good: 'You made a solid connection!',
        fair: 'You introduced yourself successfully!',
        struggled: 'You participated - keep practicing!'
      }
    }
  }
];

// Helper functions

export function getScenarioById(id) {
  return scenariosData.find(s => s.id === id);
}

export function getSceneById(scenarioId, sceneId) {
  const scenario = getScenarioById(scenarioId);
  if (!scenario) return null;
  return scenario.scenes.find(s => s.sceneId === sceneId);
}

export function getOptionById(scenarioId, sceneId, optionId) {
  const scene = getSceneById(scenarioId, sceneId);
  if (!scene) return null;
  return scene.options.find(o => o.id === optionId);
}

export default scenariosData;