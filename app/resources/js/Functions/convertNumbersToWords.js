function numberToWords(num) {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const scales = ['', 'thousand', 'million', 'billion', 'trillion'];

  function convertLessThanThousand(n) {
    if (n === 0) return '';
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? '-' + ones[n % 10] : '');
    return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 !== 0 ? ' ' + convertLessThanThousand(n % 100) : '');
  }

  if (num === 0) return 'zero';

  let words = '';
  let scaleIndex = 0;

  while (num > 0) {
    if (num % 1000 !== 0) {
      words = convertLessThanThousand(num % 1000) + ' ' + scales[scaleIndex] + ' ' + words;
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return words.trim();
}



// 文字列内の全ての数字を英語綴りの数字に変更して返す。
export default function convertNumbersToWords(text) {
  // 序数の処理
  text = text.replace(/(\d+)(st|nd|rd|th)/g, (match, number, suffix) => {
    const words = numberToWords(parseInt(number));
    return words + (suffix === 'st' ? ' first' : suffix === 'nd' ? ' second' : suffix === 'rd' ? ' third' : 'th');
  });

  // 小数点の処理
  text = text.replace(/(\d+)\.(\d+)/g, (match, intPart, decimalPart) => {
    return numberToWords(parseInt(intPart)) + ' point ' + decimalPart.split('').map(digit => numberToWords(parseInt(digit))).join(' ');
  });

  // 整数の処理
  text = text.replace(/\d+/g, match => numberToWords(parseInt(match)));

  return text;
}
