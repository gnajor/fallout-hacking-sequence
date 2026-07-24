const cache = new Map<number, string[]>();

export async function getWords(wordLength: number): Promise<string[]> {
  if (cache.has(wordLength)) return cache.get(wordLength)!;
  
  const words = await fetchWords(wordLength);
  cache.set(wordLength, words);
  return words;
}

async function fetchWords(wordLength: number): Promise<string[]> {
    const res = await fetch(`/data/words/words_${wordLength}.json`);
    if(!res.ok) throw new Error(`Failed to fetch words for length ${wordLength}`);
    return res.json();
}