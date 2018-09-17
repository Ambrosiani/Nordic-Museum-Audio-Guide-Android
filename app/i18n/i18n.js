// Copyright(c) 2018 Stiftelsen Nordiska museet (Aron.Ambrosiani@nordiskamuseet.se), 
// Maria Lindblad (mali4@kth.se), 
// Anita Software Development AB (Tommy Samuelsson) (tommysam@kth.se).

// Copyright(c) 2018 Gustav Kjellberg, Gustaf Lidfeldt, Diar Sabri, Maria Lindblad,
// Lars Lundin, Carl Hultberg, Bruhan Hashi, Sebastian Franzén, Jesper Öberg,
// Björn Aurell Hansson, Tommy Samuelsson. gustav.kjellberg@hotmail.com

import I18n from 'react-native-i18n';
import { strings } from './strings';
import Realm from 'realm';

export const languageRealm = {
  name: 'languageRealm',
  properties: {
    name: { type: 'string', default: 'default' },
    path: { type: 'string', default: 'default' },
    number: { type: 'string', default: 'default' },
  }
};


export const realm = new Realm({ schema: [languageRealm]  });

export const languageR = realm.objects('languageRealm');
console.log(languageR.length);

if (languageR.length == 0) {
  realm.write(() => {
    let lang = realm.create('languageRealm', {
      name: 'none',
    });
  });
}

I18n.translations = strings;
I18n.locale = `${languageR[0].name}`;

if(I18n.locale === 'seSma' ||
    I18n.locale === 'seSme' ||
    I18n.locale === 'seSmj' ||
    I18n.locale === 'svSimple' ||
    I18n.locale === 'svKids'){
  I18n.fallbacks = true;
  I18n.defaultLocale = `sv`;
}else{
  I18n.fallbacks = true;
  I18n.defaultLocale = `en`;
}

export default I18n;
