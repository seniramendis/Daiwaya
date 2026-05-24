const archetypes = {
  1: {
    title: 'The Magician — මැජිෂන්',
    description: 'The Magician: A path of manifestation, leadership, and raw creative power. මැජිෂන්: පැහැදිලි නායකත්වයක්, නිර්මාණශීලී ශක්තියක් සහ සිහින සැබෑ කරගැනීමේ සුවිශේෂී හැකියාවන්.\n\nThis center encourages you to act with confidence, move through change gracefully, and embrace your destiny as a catalyst for others. මෙම මධ්‍යස්ථානය ඔබට විශ්වාසයෙන් ක්‍රියා කරමින්, වෙනස්කම් සාමකාමීව හමුවීම සහ අන් අය සඳහා ප්‍රේරණීය විනිවිදභාවය කේන්ද්‍ර කරගැනීමට උත්තේජනය කරයි.',
  },
  2: {
    title: 'The High Priestess — හයි ප්‍රීස්ටස්',
    description: 'The High Priestess: Deep intuitive wisdom, diplomatic balance, and spiritual clarity. හයි ප්‍රීස්ටස්: ගැඹුරු ආධ්‍යාත්මික ඥානය, සාමය සහ සහජ බුද්ධිය කෙරෙහි විශ්වාසය තැබීම.\n\nYou are guided to listen to inner counsel, honor quiet strength, and blend compassion with ceremony. ඔබේ අභ්‍යන්තර උපදේශය අසා, නිහතමය ශක්තිය ගරු කළ යුතු අතර, කරුණාව සහ උත්සව ආචාර එක්ක වැඩ කරන්න.',
  },
  3: {
    title: 'The Empress — එම්ප්‍රස්',
    description: 'The Empress: Nurturing abundance, intuitive artistry, and soulful prosperity. එම්ප්‍රස්: සමෘද්ධි පෝෂණය, නෙවනුවන ශිල්පීය හැකියාවන් සහ ආත්මික වාසය.\n\nThis archetype reminds you to create beauty, protect those you love, and build legacy from a place of grace. මෙම ආකාරය ඔබට සුන්දරතාවය නිර්මාණය කිරීමට, ප්‍රියකරුවන් රැක ගැනීමට සහ කරුණාවෙන් පදනම් වූ උරුමයක් තනා ගැනීමට මතක් කරයි.',
  },
  4: {
    title: 'The Emperor — එම්පෙරර්',
    description: 'The Emperor: Firm structure, dependable authority, and grounded leadership. එම්පෙරර්: ශක්තිමත් ව්‍යුහය, විශ්වාසදායක අධිපතීත්වය සහ පදනම.\n\nWhen this number shines, you are called to lead with discipline, protect your circle, and transform tradition with clarity. ඔබට ආඛ්‍යාතය සහිතව නායකත්වය දක්වමින්, ඔබේ වටපිටාව ආරක්ෂා කර, පැහැදිලිත්වයෙන් උරුමය වෙනස් කළ යුතු වේ.',
  },
  5: {
    title: 'The Hierophant — හයරොෆන්ට්',
    description: 'The Hierophant: Sacred teaching, ritual wisdom, and cultural resonance. හයරොෆන්ට්: පූජාශීලි ඉගැන්වීම්, අවට විද්‍යාව සහ සංස්කෘතික ගැලපීම.\n\nYour journey is about finding truth in tradition, guiding others gently, and honoring your inner priesthood. ඔබේ ගමන සාම්ප්‍රදායිකත්වයේ සත්‍යය සොයා ගෙන, අන් අය මෘදු ලෙස මග පෙන්වමින්, ඔබේ අභ්‍යන්තර පූජකත්වය ගරු කිරීමටයි.',
  },
  6: {
    title: 'The Lovers — ලවර්ස්',
    description: 'The Lovers: Harmonious connection, conscious choice, and heart-led union. ලවර්ස්: සමුද්‍ර ජාලය, සජාතීක තේරීම සහ හදවතෙන් නියමිත සම්බන්ධතාව.\n\nThis center encourages partnership, soulful decision-making, and the courage to love openly. මෙම මධ්‍යස්ථානය සමීපත්වය, ආත්මීය තීරණ ගැනීම සහ විවෘතව ආදරය කිරීම සඳහා ඔබව උද්දීපනය කරයි.',
  },
  7: {
    title: 'The Chariot — චැරියට්',
    description: 'The Chariot: Determined momentum, focused ambition, and victorious travel. චැරියට්: තීරණාත්මක ව්‍යාපාරිකත්වය, කෙරුණු ඉලක්කය සහ ජයග්‍රහණ ගමන.\n\nYou are meant to move swiftly and faithfully through life’s currents, steering with intuition and bold resolve. ඔබගේ ජීවන ධාරා හරහා වේගයෙන් සහ විශ්වාසයෙන් යාම සඳහා, නිර්ණායක හේතු සහ දැනුම සමග පාලනය කළ යුතුය.',
  },
  8: {
    title: 'Strength — ස්ට්‍රෙන්ත්',
    description: 'Strength: Inner courage, compassionate endurance, and transformative grace. ස්ට්‍රෙන්ත්: අභ්‍යන්තර වීරත්වය, කරුණාවත් ධෛර්යය සහ වෙනස් කරවන කරුණාව.\n\nThis archetype speaks of quiet resilience, soulful healing, and the power of gentle persistence. මෙම ආකාරය නිහතමානී ශක්තිය, ආත්මීය සුවය සහ මිත්‍රවන්ත ඉවසීම පිළිබඳව කතා කරයි.',
  },
  9: {
    title: 'The Hermit — හැමට්',
    description: 'The Hermit: Solitude, deep reflection, and luminous inner guidance. හැමට්: එකඟ සන්සුන්භාවය, ගැඹුරු විමසුම සහ දිලිසෙන අභ්‍යන්තර පාරදක්වනය.\n\nYour essence is to retreat wisely, gather clarity, and return with insight that glows for others. ඔබට යථාර්ථයෙන් ඉවත්ව, පැහැදිලිත්වය රැදී ගැනීමට සහ අන් අය සඳහා හිරුකිරණ වැනි දැනුමක් නැගෙනීමට අවශ්‍ය වේ.',
  },
  10: {
    title: 'The Wheel of Fortune — බහුවිධ රොදය',
    description: 'The Wheel of Fortune: Cycles of opportunity, karmic shift, and fortunate timing. බහුවිධ රොදය: අවස්ථා චක්‍ර, කර්ම පරිවර්තනය සහ සුභ වේලාව.\n\nThis center invites you to trust timing, embrace change, and align with your higher fate. මෙම මධ්‍යස්ථානය ඔබට කාලය විශ්වාස කිරීමට, වෙනස්කම් පිළිගැනීමට සහ උසස් පුරප්පාඩුව සමඟ සමාන වීමට ආරාධනා කරයි.',
  },
  11: {
    title: 'Justice — ජස්ටිස්',
    description: 'Justice: Balanced truth, fair decisions, and refined discernment. ජස්ටිස්: සමානාත්මක සත්‍යය, යුතු තීරණ සහ පිරිසිදු වින්දනය.\n\nThis archetype asks you to weigh your actions carefully and honor the wisdom of honest outcomes. මෙම ආකාරය ඔබට ඔබේ ක්‍රියා පිළිබඳව අවදානමෙන් සිතීමට සහ සැබෑ ප්‍රතිඵලයන්ගේ උගතුම ගරු කිරීමට ඉල්ලයි.',
  },
  12: {
    title: 'The Hanged Man — හැන්ගඩ් මැන්',
    description: 'The Hanged Man: Perspective shift, surrender, and sacred patience. හැන්ගඩ් මැන්: දැක්ම වෙනස් කිරීම, වෙරදාවට වරදාව සහ පූජාධික්ෂේපය.\n\nYou are invited to release control, see life from an elevated angle, and let stillness reveal hidden purpose. ඔබට පාලනය අත්හැර, ජීවිතය උසස් දැක්මකින් නරඹා, නිශ්ශබ්දතාවය හරහා සැඟවුණු අරමුණ බලා ගැනීමට කැඳවයි.',
  },
  13: {
    title: 'Death — ඩෙත්',
    description: 'Death: Profound transformation, rebirth, and the power of release. ඩෙත්: ගැඹුරු පරිවර්තනය, නැවත උපත සහ නිදහස් කිරීමේ ශක්තිය.\n\nThis center signifies an ending that births something more luminous, inviting surrender and renewal. මෙම මධ්‍යස්ථානය වෙයි අන්තිමක් උතුම් දෙයක් පණිවිඩ කරනවා, නිදහසේ සහ නවීකරණයේ ආරාධනයක්.',
  },
  14: {
    title: 'Temperance — ටෙම්පරන්ස්',
    description: 'Temperance: Fluid harmony, gentle blending, and balanced integration. ටෙම්පරන්ස්: සරල සමාජ, මෘදු සමීකරණය සහ සමානාත්මක ඒකාබද්ධතාව.\n\nYou are called to blend energy softly, cultivate graceful rhythm, and hold polarities in peace. ඔබට ශක්තිය නොපහව යන ලෙස මිශ්‍ර කිරීමට, සුළගක් මෙන් ඒකාබද්ධතාවය වර්ධනය කිරීමට සහ විරෝධයට සාමය තබා ගැනීමට ඉල්ලයි.',
  },
  15: {
    title: 'The Devil — ඩෙවිල්',
    description: 'The Devil: Shadow mastery, intense ambition, and awakening through release. ඩෙවිල්: සෙයඩෝන් පාලනය, තද අභිලාෂය සහ නිදහසේ මග.\n\nThis archetype challenges you to see the hidden chains, transform temptation, and choose freedom with bravery. මෙම ආකාරය ඔබට සඟවා ඇති හෙළිදරව්වන් දැක, වැඩියෙන් අභිලාෂය වෙනස් කර, වීරත්වයෙන් නිදහස තෝරා ගැනීමට උත්සාහ කරයි.',
  },
  16: {
    title: 'The Tower — ටවර්',
    description: 'The Tower: Sudden revelation, clearing collapse, and liberated awakening. ටවර්: හදිසි හෙළිදරව්ව, විනාසය සහ නිදහස් වූ අවබෝධය.\n\nThis number calls for courage when structures fall, trusting that the new foundation is more true. මෙම අංකය මංගල සංකල්ප සිදු වූ විට වීරත්වය අවශ්‍ය වන බව කියයි, නව පදනම සැබෑ බව විශ්වාස කරන්න.',
  },
  17: {
    title: 'The Star — ස්ටාර්',
    description: 'The Star: Hope, cosmic renewal, and intuitive inspiration. ස්ටාර්: භාරය, අභ්‍යවකාශය නැවත සත්‍ය කරගැනීම සහ හැඟීම් ආශිර්වාදය.\n\nYou are invited to follow your inner light, restore trust, and shine with selfless kindness. ඔබේ අභ්‍යන්තර ආලෝකය පසුපස යාමට, විශ්වාසය නැවත ගොඩනගා ගැනීමට සහ නොමනා කරුණාවෙන් දිලෙන්නට ආරාධනා කරයි.',
  },
  18: {
    title: 'The Moon — මූන්',
    description: 'The Moon: Intuitive mystery, emotional depth, and dreamlike insight. මූන්: ආධ්‍යාත්මික අඳුරුකම, භාවනා සන්සුන්භාවය සහ සිහිනයෙන් එන දැනුම.\n\nThis center asks you to trust your inner landscape, honor cycles, and allow intuition to guide you through shadow. මෙම ආකාරය ඔබට ඔබේ අභ්‍යන්තර පරිසරයට විශ්වාස කර, චක්‍ර ගරු කර, පැහැදිලි නොවන මාවත් හරහා ආත්මයට මාර්ග පෙන්වීමට කියයි.',
  },
  19: {
    title: 'The Sun — සන්',
    description: 'The Sun: Radiant success, joyful vitality, and bright expression. සන්: ප්‍රභාමත් ජයග්‍රහණය, ප්‍රීතිමත් ශක්තිය සහ දිලෙන ප්‍රකාශය.\n\nThis archetype supports creative confidence, clear purpose, and the courage to celebrate your true self. මෙම මධ්‍යස්ථානය නිර්මාණශීලී විශ්වාසය, පැහැදිලි අරමුණ සහ ඔබගේ සැබෑ ස්වභාවය සමරන්නා වූ වීරත්වය උදෙසා උදව් කරයි.',
  },
  20: {
    title: 'Judgement — ජඩ්ජ්මන්ට්',
    description: 'Judgement: Awakening recall, authentic renewal, and soulful accountability. ජඩ්ජ්මන්ට්: අවදිවීමේ මතක, සැබෑ නැවත උපැනීම සහ ආත්මීය වගකීම.\n\nYou are guided to answer your higher calling, release regret, and step into a clearer future. ඔබට ඔබේ උසස් ප්‍රාර්ථනාවට පිළිතුරු දීමට, පසුතැව නැවත නිරාකරණය කිරීමට සහ පැහැදිලි අනාගතයක් වෙත පියවර ගැනීමට මග පෙන්වයි.',
  },
  21: {
    title: 'The World — වර්ල්ඩ්',
    description: 'The World: Completion, global completion, and soulful integration. වර්ල්ඩ්: සම්පූර්ණත්වය, ගෝලීය තෘප්තිය සහ ආත්මීය ඒකාබද්ධතාව.\n\nWhen this number appears, you are invited to blend past lessons, celebrate achievement, and prepare for the next cycle. මෙම අංකය පෙනෙන විට, ඔබට පසුගිය පාඩම් එකට එකතු කර, සාර්ථකත්වය සැමරුම් කර, ඊළඟ චක්‍රයට සූදානම් වීමට මග පෙන්වයි.',
  },
  22: {
    title: 'The Master Builder — මාස්ටර් බිල්ඩර්',
    description: 'The Master Builder: Visionary structure, emancipated genius, and sacred legacy. මාස්ටර් බිල්ඩර්: දර්ශනීය ව්‍යුහය, නිදහස් ප්‍රඥාව සහ පූජනීය උරුමය.\n\nThis archetype invites you to craft lasting systems, lead with compassion, and leave an inspired mark across generations. මෙම ආකාරය ඔබට දිගුකාලීන පද්ධති සකස් කිරීමට, කරුණාවෙන් නායකත්වය දක්වීමට සහ පරම්පරාවන්ට ආගන්තුක සළකුණක් අතුරුදන් නොකර සිදු කිරීමට ආරාධනා කරයි.',
  },
};

export default archetypes;
