import pinyin from 'pinyin';

export const getPinyinLetter = (data) => {
  const letters = pinyin(data, { style: pinyin.STYLE_FIRST_LETTER })[0];
  return letters[0].toUpperCase();
}

