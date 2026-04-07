// Scenario data - Complete configurations for both scenarios

export const scenariosData = [
  {
    id: 'restaurant-order',
    title: 'Ordering Food at Restaurant',
    difficulty: 'Easy',
    duration: '5-10 min',
    xpReward: 30,
    thumbnail: '/images/chinese-restaurant.jpg',
    description: "You're at a restaurant in China. The waiter approaches and it's time to practice ordering in Chinese. Can you order food and drinks successfully?",
    characters: [
      { name: 'Pierre', role: 'Waiter', personality: 'Friendly' },
      { name: 'Marie', role: 'Restaurant Patron', personality: 'Bystander' }
    ],
    scenes: [
      {
        sceneId: 'restaurant-scene-1',
        videoUrl: '/videos/restaurant-scene-1.mp4',
        characterName: 'Pierre (Waiter)',
        characterDialogue: 'Bonjour! Que désirez-vous commander?',
        dialogueTranslation: 'Hello! What would you like to order?',
        sceneContext: 'The waiter approaches your table with a notepad',
        options: [
          {
            id: 'restaurant-1-a',
            textInTargetLang: 'Je voudrais un croissant.',
            textTranslation: "I'd like a croissant",
            pronunciationGuide: 'zhuh voo-dreh uhn kwah-sohn',
            cheatSheet: { phrase: 'Je voudrais…', pinyin: 'zhuh voo-dreh', translation: "I'd like…" },
            nextSceneId: 'restaurant-scene-2a',
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
            id: 'restaurant-1-b',
            textInTargetLang: "Un café, s'il vous plaît.",
            textTranslation: 'A coffee, please',
            pronunciationGuide: 'uhn ka-feh seel voo pleh',
            cheatSheet: { phrase: "Un café, s'il vous plaît", pinyin: 'uhn ka-feh', translation: 'A coffee, please' },
            nextSceneId: 'restaurant-scene-2b',
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
            id: 'restaurant-1-c',
            textInTargetLang: 'Pardon, je ne comprends pas.',
            textTranslation: "Sorry, I don't understand",
            pronunciationGuide: 'par-dohn zhuh nuh kohm-prohn pah',
            cheatSheet: { phrase: 'Je ne comprends pas', pinyin: 'zhuh nuh kohm-prohn', translation: "I don't understand" },
            nextSceneId: 'restaurant-scene-2c',
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
            id: 'restaurant-1-d',
            textInTargetLang: '[Point at menu silently]',
            textTranslation: 'Non-verbal communication',
            pronunciationGuide: null,
            cheatSheet: { phrase: '[Point at menu]', pinyin: null, translation: 'Non-verbal' },
            nextSceneId: 'restaurant-scene-2d',
            baseScore: 50,
            isOptimal: false,
            feedback: {
              positive: 'You communicated your needs!',
              improvements: [
                "Try using words next time - pointing doesn't build speaking skills",
                "Even a simple 'Ça' (that) while pointing is better"
              ],
              naturalPhrasing: "Je voudrais ça, s'il vous plaît."
            }
          }
        ]
      }
    ],
    completion: {
      sceneId: 'restaurant-complete',
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

  // ─── Scenario 2: Business Networking (Chinese) ───────────────────────────────
  {
    id: 'networking',
    title: 'Business Networking Event',
    difficulty: 'Medium',
    duration: '10-15 min',
    xpReward: 50,
    thumbnail: '/images/chinese-business.jpg',
    description: "You're at the Shanghai Tech Innovation Summit. A senior venture capitalist approaches you — make a strong first impression in Chinese.",
    characters: [
      { name: '王总', role: 'Venture Capitalist', personality: 'Formal' },
      { name: 'Sophie', role: 'Startup Founder', personality: 'Casual' }
    ],

    // Linear: scene-1 → scene-2 → scene-3 → complete
    // Replace videoUrl values with your actual CapCut exports when ready
    scenes: [
      // ── Scene 1: Wang Zong approaches and asks your direction ──────────────
      {
        sceneId: 'networking-scene-1',
        videoUrl: '/videos/networking/scene-1.mp4',
        characterName: '王总',
        characterDialogue: '你好，我是王总。你是做哪个方向的？',
        dialogueTranslation: 'Hello, I am Wang Zong. What field are you in?',
        sceneContext: 'A senior VC at the Shanghai Tech Summit approaches you',

        options: [
          {
            id: 'network-1-a',
            textInTargetLang: '您好，王总！',
            textTranslation: 'Hello, Wang Zong!',
            pronunciationGuide: 'nín hǎo, wáng zǒng!',
            sentiment: 'formal',
            cheatSheet: { phrase: '我叫 [Name]', pinyin: 'wǒ jiào [name]', translation: 'My name is…' },
            nextSceneId: 'networking-scene-2',
            baseScore: 95,
            isOptimal: true,
            feedback: {
              positive: 'Excellent! Professional address with 总 shows respect.',
              improvements: [],
              naturalPhrasing: '你好，王总。我叫 [Name]，我是做人工智能的，很高兴认识您。'
            }
          },
          {
            id: 'network-1-b',
            textInTargetLang: '您好！我做人工智能行业！',
            textTranslation: 'Hello! I work in the artificial intelligence industry!',
            pronunciationGuide: 'nín hǎo! wǒ zuò réngōng zhìnéng hángyè!',
            sentiment: 'confident',
            cheatSheet: { phrase: '我是工程师', pinyin: 'wǒ shì gōngchéngshī', translation: 'I\'m an engineer' },
            nextSceneId: 'networking-scene-2',
            baseScore: 90,
            isOptimal: true,
            feedback: {
              positive: 'Great use of 您好 — very respectful in a formal setting.',
              improvements: [
                'Introducing your name first is more natural in Chinese networking'
              ],
              naturalPhrasing: '您好！我叫 [Name]，是一名专注于 AI 创业的工程师。'
            }
          },
          {
            id: 'network-1-c',
            textInTargetLang: '嗨，我在科技行业',
            textTranslation: 'Hi, I work in tech',
            pronunciationGuide: 'hāi, wǒ zài kējì hángyè',
            sentiment: 'casual',
            cheatSheet: { phrase: '我在科技行业', pinyin: 'wǒ zài kējì', translation: 'I\'m in tech' },
            nextSceneId: 'networking-scene-2',
            baseScore: 75,
            isOptimal: false,
            feedback: {
              positive: 'Clear and understandable!',
              improvements: [
                'Too vague for a business event — be specific about your role',
                'Using 您 instead of 你 shows more respect to a senior'
              ],
              naturalPhrasing: '您好，我在人工智能行业工作，专注于早期创业。'
            }
          },
          {
            id: 'network-1-d',
            textInTargetLang: '我是学生...',
            textTranslation: 'I\'m a student...',
            pronunciationGuide: 'wǒ shì xuéshēng...',
            sentiment: 'neutral',
            cheatSheet: { phrase: '我是学生', pinyin: 'wǒ shì xuéshēng', translation: 'I\'m a student' },
            nextSceneId: 'networking-scene-2',
            baseScore: 60,
            isOptimal: false,
            feedback: {
              positive: 'Honest and humble — that can work!',
              improvements: [
                'At a professional summit, frame yourself as an aspiring professional',
                'Add what you study or your interest area'
              ],
              naturalPhrasing: '您好，我是计算机专业的学生，对 AI 创业非常感兴趣。'
            }
          }
        ]
      },

      // ── Scene 2: Wang Zong shows interest, asks about your project ──────────
      {
        sceneId: 'networking-scene-2',
        videoUrl: '/videos/networking/scene-2.mp4',
        characterName: '王总',
        characterDialogue: '哦，人工智能？很有意思。你们公司现在在做什么项目？',
        dialogueTranslation: 'Oh, AI? Very interesting. What project is your company working on now?',
        sceneContext: 'Wang Zong leans in, visibly engaged',

        options: [
          {
            id: 'network-2-a',
            textInTargetLang: 'AI语言学习平台',
            textTranslation: 'AI language learning platform',
            pronunciationGuide: 'AI yǔyán xuéxí píngtái',
            sentiment: 'confident',
            cheatSheet: { phrase: 'AI 语言学习平台', pinyin: 'AI yǔyán píngtái', translation: 'AI language platform' },
            nextSceneId: 'networking-scene-3',
            baseScore: 95,
            isOptimal: true,
            feedback: {
              positive: 'Perfect pitch in Chinese — concise and clear!',
              improvements: [],
              naturalPhrasing: '我们在开发一个 AI 语言学习平台，帮助用户通过真实场景练习口语。'
            }
          },
          {
            id: 'network-2-b',
            textInTargetLang: '教育类语音识别',
            textTranslation: 'Education speech recognition',
            pronunciationGuide: 'jiàoyù lèi yǔyīn shíbié',
            sentiment: 'formal',
            cheatSheet: { phrase: '语音识别技术', pinyin: 'yǔyīn shíbié', translation: 'Speech recognition' },
            nextSceneId: 'networking-scene-3',
            baseScore: 90,
            isOptimal: true,
            feedback: {
              positive: 'Technically strong answer!',
              improvements: [
                'Could mention the user benefit, not just the technology'
              ],
              naturalPhrasing: '我们做语音识别技术，专门用于教育领域，帮助学习者提高发音。'
            }
          },
          {
            id: 'network-2-c',
            textInTargetLang: '还在早期阶段...',
            textTranslation: 'Still early stage...',
            pronunciationGuide: 'hái zài zǎoqī jiēduàn...',
            sentiment: 'neutral',
            cheatSheet: { phrase: '还在早期阶段', pinyin: 'hái zài zǎoqī', translation: 'Still early stage' },
            nextSceneId: 'networking-scene-3',
            baseScore: 55,
            isOptimal: false,
            feedback: {
              positive: 'Grammatically correct!',
              improvements: [
                'This closes the conversation — VCs want to hear your vision',
                'Share a high-level direction at minimum'
              ],
              naturalPhrasing: '我们还在早期，但核心方向是用 AI 解决语言学习中的口语问题。'
            }
          },
          {
            id: 'network-2-d',
            textInTargetLang: '可以说英文吗？',
            textTranslation: 'Can I speak English?',
            pronunciationGuide: 'kěyǐ shuō yīngwén ma?',
            sentiment: 'neutral',
            cheatSheet: { phrase: '可以说英文吗', pinyin: 'kěyǐ shuō yīngwén', translation: 'Can I speak English?' },
            nextSceneId: 'networking-scene-3',
            baseScore: 50,
            isOptimal: false,
            feedback: {
              positive: 'The sentence itself is good Chinese!',
              improvements: [
                'You made it this far — keep going in Chinese',
                'Even imperfect Chinese shows effort and earns respect'
              ],
              naturalPhrasing: '我的中文还在学习中，但我尽量用中文介绍。我们在做 AI 语言学习。'
            }
          }
        ]
      },

      // ── Scene 3: Wang Zong offers his card ───────────────────────────────────
      {
        sceneId: 'networking-scene-3',
        videoUrl: '/videos/networking/scene-3.mp4',
        characterName: '王总',
        characterDialogue: '我觉得我们可以合作。我们保持联系吧。',
        dialogueTranslation: "I think we can collaborate. Let's keep in touch.",
        sceneContext: 'Wang Zong reaches into his suit and offers his business card',

        options: [
          {
            id: 'network-3-a',
            textInTargetLang: '期待与您合作！',
            textTranslation: 'Looking forward to working together!',
            pronunciationGuide: 'qīdài yǔ nín hézuò!',
            sentiment: 'warm',
            cheatSheet: { phrase: '这是我的名片', pinyin: 'zhè shì míngpiàn', translation: 'Here\'s my card' },
            nextSceneId: 'networking-complete',
            baseScore: 98,
            isOptimal: true,
            feedback: {
              positive: 'Outstanding closing! 期待 is natural professional Chinese.',
              improvements: [],
              naturalPhrasing: '太好了，谢谢王总！这是我的名片，期待和您进一步合作。'
            }
          },
          {
            id: 'network-3-b',
            textInTargetLang: '这是我的名片',
            textTranslation: 'Here is my card',
            pronunciationGuide: 'zhè shì wǒ de míngpiàn',
            sentiment: 'formal',
            cheatSheet: { phrase: '我很期待合作', pinyin: 'wǒ hěn qīdài', translation: 'Looking forward' },
            nextSceneId: 'networking-complete',
            baseScore: 92,
            isOptimal: true,
            feedback: {
              positive: 'Warm and professional close!',
              improvements: [],
              naturalPhrasing: 'Great!'
            }
          },
          {
            id: 'network-3-c',
            textInTargetLang: '学到了很多',
            textTranslation: 'Learned a lot',
            pronunciationGuide: 'xué dào le hěn duō',
            sentiment: 'warm',
            cheatSheet: { phrase: '学到了很多', pinyin: 'xué dào hěn duō', translation: 'Learned a lot' },
            nextSceneId: 'networking-complete',
            baseScore: 75,
            isOptimal: false,
            feedback: {
              positive: 'Polite and respectful!',
              improvements: [
                'Sounds more like a student than a peer — offer your card',
                'Position yourself as a potential collaborator'
              ],
              naturalPhrasing: '谢谢王总！很高兴认识您，希望以后有机会合作。'
            }
          },
          {
            id: 'network-3-d',
            textInTargetLang: '好的，再见',
            textTranslation: 'Okay, goodbye',
            pronunciationGuide: 'hǎo de, zàijiàn',
            sentiment: 'neutral',
            cheatSheet: { phrase: '谢谢，再见', pinyin: 'xièxiè, zàijiàn', translation: 'Thank you, bye' },
            nextSceneId: 'networking-complete',
            baseScore: 65,
            isOptimal: false,
            feedback: {
              positive: 'Clean exit!',
              improvements: [
                'You missed the chance to exchange contact info',
                'Always offer your card when a VC offers theirs'
              ],
              naturalPhrasing: '谢谢王总！可以加一下您的微信吗？'
            }
          }
        ]
      }
    ],

    completion: {
      sceneId: 'networking-complete',
      successMessage: 'You made a professional connection at the summit!',
      characterQuote: '很高兴认识你。期待我们的合作！',
      characterQuoteTranslation: 'Great to meet you. Looking forward to our collaboration!',
      outcomeVariants: {
        excellent: 'You networked like a seasoned professional!',
        good: 'You made a solid impression on Wang Zong!',
        fair: 'You introduced yourself and held the conversation!',
        struggled: 'You participated — keep practicing your Chinese!'
      }
    }
  }
];

// ─── Helper functions ─────────────────────────────────────────────────────────

export function getScenarioById(id) {
  return scenariosData.find(s => s.id === id);
}

export function getSceneById(scenarioId, sceneId) {
  const scenario = getScenarioById(scenarioId);
  if (!scenario) return null;
  return scenario.scenes.find(s => s.sceneId === sceneId);
}

export function getFirstSceneId(scenarioId) {
  const scenario = getScenarioById(scenarioId);
  if (!scenario || !scenario.scenes.length) return null;
  return scenario.scenes[0].sceneId;
}

export function getOptionById(scenarioId, sceneId, optionId) {
  const scene = getSceneById(scenarioId, sceneId);
  if (!scene) return null;
  return scene.options.find(o => o.id === optionId);
}

export default scenariosData;
