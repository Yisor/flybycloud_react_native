import pinyin from 'tiny-pinyin';

export const getPinyinLetter = (data) => {
  return pinyin.convertToPinyin(data);;
}

